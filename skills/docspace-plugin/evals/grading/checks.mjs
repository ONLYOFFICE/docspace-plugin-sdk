/*
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * The catalogues of checks, and nothing else - the file to open when adding a scenario or
 * tightening a heuristic. Every check is a text or file-system heuristic: a filter saying
 * which runs to read first, not a score to optimise. README.md explains the three.
 */

import {
  arrayGivenTo,
  bodiesOf,
  everyMentionSitsNear,
  isGuarded,
  namesCalledIn,
} from "./source.mjs";
import {
  declaredScopes,
  declaresAnItemScope,
  hasSourceFile,
  manifestField,
  manifestOf,
  projectIn,
  sourceFilesOf,
  sourceOf,
  wasPackaged,
} from "./run-output.mjs";
import {
  componentWarningsFor,
  hasNoErrors,
  registeredKeys,
  registeredKeysByScope,
} from "./validator.mjs";
import { NOT_APPLICABLE, UNKNOWN } from "./verdict.mjs";

const REGISTERS_AN_ITEM = /\badd\w+Item\s*\(/;
const CAN_THROW = /\b(fetch|axios)\s*\(|\bJSON\.parse\s*\(|\bawait\b|\.then\s*\(/;
const FETCHES = /\b(fetch|axios)\s*\(/;
const HARDCODED_COLOUR = /(?:\bcolor|[cC]olor|background\w*)\s*:\s*["']#[0-9a-fA-F]{3,8}\b/;

const onLoadCallbackBodiesOf = (sources) =>
  sources.flatMap((source) => bodiesOf(source, "onLoadCallback"));

/**
 * Are items registered inside onLoadCallback rather than at module scope? A preference, not
 * a correctness rule - it matters when the factory reads something set after the bundle
 * runs. Follows one hop, since registration is often delegated to a helper.
 */
const registersInsideOnLoadCallback = (sources) => {
  const everything = sources.join("\n");
  const bodies = onLoadCallbackBodiesOf(sources);
  if (bodies.length === 0) return false;

  if (bodies.some((body) => REGISTERS_AN_ITEM.test(body))) return true;

  return bodies.flatMap(namesCalledIn).some((helper) => {
    const definedAt = everything.search(new RegExp(`\\b${helper}\\s*[=(]`));
    if (definedAt === -1) return false;

    return REGISTERS_AN_ITEM.test(everything.slice(definedAt, definedAt + 1500));
  });
};

export const UNIVERSAL_CHECKS = {
  "zip built": (project) => wasPackaged(project),

  // Without a build the validator can only check the manifest, and it softens the
  // rest to warnings - which would score as clean and mean nothing.
  "validator clean": (project) => (wasPackaged(project) ? hasNoErrors(project) : UNKNOWN),

  "sdk 2.1.x": (project) =>
    /"@onlyoffice\/docspace-plugin-sdk":\s*"[\^~]?2\./.test(manifestOf(project)),

  "name registered correctly": (project) => {
    const pluginName = manifestField(project, "pluginName");
    if (!pluginName) return false;

    return new RegExp(`window\\.Plugins\\.${pluginName}\\s*=`).test(sourceOf(project));
  },

  "registers in onLoadCallback": (project) => {
    const sources = sourceFilesOf(project);

    if (!REGISTERS_AN_ITEM.test(sources.join("\n"))) {
      // All-non-item scopes have nothing to register, so there is no question here. An
      // item scope that registers nothing is a defect - the portal shows nothing.
      return declaresAnItemScope(project) ? false : NOT_APPLICABLE;
    }

    return registersInsideOnLoadCallback(sources);
  },

  "keys namespaced": (project) => {
    const name = manifestField(project, "name");
    if (!name) return false;

    // What the bundle registered, when it can be loaded: source text cannot separate an
    // item key from a comboBox option key, and demanding the prefix on one is wrong.
    const keys = registeredKeys(project);

    if (keys) {
      if (keys.length > 0) return keys.every((key) => String(key).includes(name));

      return declaresAnItemScope(project) ? false : NOT_APPLICABLE;
    }

    const source = sourceOf(project);
    const literals = [...source.matchAll(/\bkey:\s*"([^"]+)"/g)].map(([, key]) => key);

    // Keys are often lifted into a constant, so a literal search alone gives
    // false negatives - fall back to looking for the prefix anywhere in source.
    if (literals.length === 0) {
      if (!declaresAnItemScope(project) && !REGISTERS_AN_ITEM.test(source)) return NOT_APPLICABLE;

      return new RegExp(`"${name}[-_][^"]*"`).test(source);
    }

    return literals.every((key) => key.includes(name));
  },

  // The rule is "every callback that fetches or parses needs its own try/catch", so a
  // plugin with nothing that can throw has nothing to catch - NA, not a shortfall.
  "errors handled": (project) => {
    const source = sourceOf(project);
    if (!CAN_THROW.test(source)) return NOT_APPLICABLE;

    return /\bcatch\s*[({]/.test(source);
  },

  "no fetch in onLoadCallback": (project) =>
    !onLoadCallbackBodiesOf(sourceFilesOf(project)).some((body) => FETCHES.test(body)),

  "no dead visual values": (project) => {
    if (!wasPackaged(project)) return UNKNOWN;

    const warnings = componentWarningsFor(project);
    return warnings ? warnings.length === 0 : false;
  },

  // Hardcoded hex in a colour-ish prop breaks in the other theme and on
  // re-branded portals; the theme variables are always available instead.
  "colors via theme vars": (project) => !HARDCODED_COLOUR.test(sourceOf(project)),
};

/*
 * Checks more than one scenario wants. Keeping one definition means a fix to the
 * heuristic lands everywhere it is used.
 */

const savesSettingsFromAClick = (project) =>
  everyMentionSitsNear(sourceOf(project), "saveSettings", "onClick");

const parsesStoredSettingsDefensively = (project) => {
  const source = sourceOf(project);
  if (!/setAdminPluginSettingsValue/.test(source)) return false;

  return isGuarded(source, "setAdminPluginSettingsValue") ?? false;
};

const keepsComboBoxInSync = (project) => {
  const source = sourceOf(project);
  if (!/Components\.comboBox/.test(source)) return NOT_APPLICABLE;

  return (
    /\boptions\s*:/.test(source) &&
    /\bselectedOption\s*:/.test(source) &&
    /\bonSelect\s*:/.test(source) &&
    bodiesOf(source, "onSelect").some((body) => /updateProps/.test(body))
  );
};

const implementsInfoPanel = (project) =>
  declaredScopes(project).includes("InfoPanel") && /addInfoPanelItem\s*\(/.test(sourceOf(project));

const isNewerThan = (version, floor) => {
  const parse = (text) => text.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const [left, right] = [parse(version), parse(floor)];

  for (let index = 0; index < 3; index++)
    if ((left[index] ?? 0) !== (right[index] ?? 0)) return (left[index] ?? 0) > (right[index] ?? 0);

  return false;
};

export const SCENARIO_CHECKS = {
  "context-menu-file-action": {
    "filtered to .md": (project) => {
      const extensions = arrayGivenTo(sourceOf(project), "fileExt");
      return extensions === null ? false : /["'`]\.?md["'`]/.test(extensions);
    },
    "fileType includes file": (project) => /FilesType\.file\b/.test(sourceOf(project)),
    "showModal carries modalDialogProps": (project) =>
      everyMentionSitsNear(sourceOf(project), "showModal", "modalDialogProps"),
    "modal defines onLoad": (project) =>
      everyMentionSitsNear(sourceOf(project), "modalDialogProps", "\\bonLoad\\b"),
  },

  "settings-and-info-panel": {
    "saveSettings from a click": savesSettingsFromAClick,
    "settings parsed defensively": parsesStoredSettingsDefensively,

    // The complement of "no fetch in onLoadCallback": kept out of the wrong place, it has
    // to be in the right one.
    "panel content fetched in an onLoad": (project) => {
      const source = sourceOf(project);
      if (!FETCHES.test(source)) return NOT_APPLICABLE;

      return bodiesOf(source, "onLoad").some(
        (body) => FETCHES.test(body) || /\bawait\b/.test(body),
      );
    },

    "InfoPanel declared and implemented": implementsInfoPanel,
  },

  "extend-existing-plugin": {
    // The portal keys an installed plugin by these two, so renaming either orphans the
    // installation - the expensive kind of wrong.
    "identity preserved": (project) =>
      manifestField(project, "name") === "room-notes" &&
      manifestField(project, "pluginName") === "RoomNotes",

    "version bumped": (project) =>
      isNewerThan(manifestField(project, "version") || "0.0.0", "1.2.0"),

    "InfoPanel declared and implemented": implementsInfoPanel,

    // Asking the bundle rather than the source - the one check that tells a rebuilt project
    // from an edited one, since a stale archive carries the old scopes.
    "rebuilt with the new scope": (project) => {
      const byScope = registeredKeysByScope(project);
      if (!byScope) return UNKNOWN;

      return (byScope.InfoPanel ?? []).length > 0;
    },

    "existing item kept": (project) => {
      const keys = registeredKeys(project);
      return /room-notes-edit/.test(keys ? keys.join(" ") : sourceOf(project));
    },

    // A regenerated scaffold does not carry the fixture's own files, so their
    // survival is the cheapest evidence that the project was edited in place.
    "edited in place": (project) => hasSourceFile(project, "locales.ts"),

    "labels go through locales": (project) =>
      !/(?:label|title)\s*:\s*["'][A-Za-z]/.test(sourceOf(project)),
  },

  "ui-modal-form": {
    "tree uses the Components enum": (project) => {
      const source = sourceOf(project);
      return /component:\s*Components\./.test(source) && !/component:\s*["']/.test(source);
    },

    "modalDialogProps complete": (project) => {
      const source = sourceOf(project);
      if (!/modalDialogProps/.test(source)) return false;

      return ["displayType", "dialogHeader", "dialogBody", "onClose", "onLoad"].every((field) =>
        new RegExp(`\\b${field}\\s*:`).test(source),
      );
    },

    // The host assigns header, body and footer together, so an onLoad that
    // returns only the body wipes the other two.
    "modal onLoad returns every section": (project) => {
      const source = sourceOf(project);
      if (!/newDialogBody/.test(source)) return NOT_APPLICABLE;

      return /newDialogHeader/.test(source) && /newDialogFooter/.test(source);
    },

    "comboBox kept in sync": keepsComboBoxInSync,

    // `--error-color` does not exist. It reads like it should, it compiles into
    // an inline style, and it renders as no colour at all.
    "error via --input-error-color": (project) => {
      const source = sourceOf(project);
      return /var\(--input-error-color\)/.test(source) && !/--error-color\b/.test(source);
    },

    "error label updated by contextName": (project) => {
      const source = sourceOf(project);
      return /\bcontextName\s*:/.test(source) && /updateContext/.test(source);
    },
  },

  "native-looking-settings": {
    "saveSettings from a click": savesSettingsFromAClick,
    "settings parsed defensively": parsesStoredSettingsDefensively,
    "comboBox kept in sync": keepsComboBoxInSync,

    "toggle onChange takes no arguments": (project) => {
      const source = sourceOf(project);
      if (!/Components\.toggleButton/.test(source)) return NOT_APPLICABLE;

      return /onChange:\s*(?:async\s*)?\(\s*\)\s*(?::[^=]*)?=>/.test(source);
    },

    // The switch's inner label is absolutely positioned, so the component has no
    // intrinsic size and overlaps whatever follows it.
    "toggle given explicit dimensions": (project) => {
      const source = sourceOf(project);
      if (!/Components\.toggleButton/.test(source)) return NOT_APPLICABLE;

      return /heightProp\s*:/.test(source);
    },
  },

  "background-job-progress": {
    "uses the floating operations button": (project) =>
      /addFloatingOperationsButton/.test(sourceOf(project)),

    "operations carry the fields the host renders": (project) => {
      const source = sourceOf(project);
      if (!/floatingOperationsButtonProps/.test(source)) return false;

      return ["label", "operation", "alert", "completed"].every((field) =>
        new RegExp(`\\b${field}\\s*:`).test(source),
      );
    },

    "operation typed from the enum": (project) => /FloatingOperationType\./.test(sourceOf(project)),

    // Every other action takes an object; this one takes the bare id string, and
    // wrapping it is the mistake the shape invites.
    "removal passes the bare id": (project) => {
      const source = sourceOf(project);
      if (!/removeFloatingOperationsButton/.test(source)) return NOT_APPLICABLE;

      return !/floatingOperationsButtonPropsId\s*:\s*\{/.test(source);
    },

    "progress reported without holding a modal open": (project) => {
      const source = sourceOf(project);
      return !/showModal/.test(source) || /updateFloatingOperationsButton/.test(source);
    },
  },
};

/*
 * What each fixture must still look like after a run that was only asked what was wrong.
 * A signature, not a byte-for-byte comparison: the fixture is a living file, so comparing
 * whole files would retroactively fail every iteration already on disk. See README.md.
 */
const FIXTURE_SIGNATURES = {
  "broken-plugin": {
    source: [/window\.Plugins\.RoomStatistics/, /\busersType\s*:/, /Actions\.showModal/],
    manifest: [/"pluginName":\s*"RoomStats"/],
  },
  "working-plugin": {
    source: [/window\.Plugins\.RoomNotes/, /room-notes-edit/],
    manifest: [/"scopes":\s*\[\s*"ContextMenu"\s*\]/, /"version":\s*"1\.2\.0"/],
  },
};

const leftUnmodified = (fixture) => (_prose, runDirectory) => {
  const project = projectIn(runDirectory);
  if (!project) return UNKNOWN;

  const source = sourceOf(project);
  if (!source) return UNKNOWN;

  const signature = FIXTURE_SIGNATURES[fixture];

  return (
    signature.source.every((pattern) => pattern.test(source)) &&
    signature.manifest.every((pattern) => pattern.test(manifestOf(project)))
  );
};

/**
 * A citation the reader could follow. Agents write these several ways - `index.ts:42`,
 * `index.ts#L42`, `src/index.ts, line 42` - and the choice says nothing, so accept all.
 */
const citesALocation = (prose) => /\w+\.tsx?\s*(?:[:#]\s*L?|,?\s*line\s*)\d+/i.test(prose);

/*
 * Prose patterns, in English only, so translating a prompt before a run silently blinds
 * every column below - see README.md. Checks anchored on identifiers, scope names and file
 * paths are unaffected, and there should be as many of those as possible.
 */
const SILENTLY =
  /silent|nothing happens|no error|no warning|without (?:any )?(?:error|warning|complaint)/i;
const A_QUIRK = /quirk|inconsist|accident|historical|legacy/i;
const MODULE_SCOPE = /module[ -]scope|top[ -]level/i;

export const REPORT_CHECKS = {
  // The planted defects are documented in fixtures/broken-plugin/src/index.ts.
  "audit-broken-plugin": {
    // The root cause: nothing else can be seen until this one is found.
    "registration mismatch": (prose) =>
      /RoomStatistics/.test(prose) && /\bRoomStats\b/.test(prose),
    "wrong filter field": (prose) => /usersTypes/.test(prose) && /usersType\b/.test(prose),
    "dead showModal": (prose) => /modalDialogProps/.test(prose),
    "module-scope registration": (prose) =>
      /onLoadCallback/.test(prose) && MODULE_SCOPE.test(prose),
    "cites file and line": citesALocation,
    "left the plugin unmodified": leftUnmodified("broken-plugin"),
  },

  "explain-filter-fields": {
    "names the plural form": (prose) => /usersTypes/.test(prose),
    "contrasts it with the singular": (prose) => /usersType\b/.test(prose),

    // Naming a scope from only one side of the split reads as a confident answer and is
    // wrong half the time.
    "names scopes on both sides": (prose) =>
      /ContextMenu|InfoPanel|EventListener|ArticleButton/.test(prose) &&
      /MainButton|ProfileMenu|\bFile\b/.test(prose),

    "calls it a quirk, not a rule": (prose) => A_QUIRK.test(prose),

    // Phrased as an absence as often as an event - "no error", "nothing happens" - so
    // accept the negations too.
    "says the wrong spelling fails silently": (prose) => SILENTLY.test(prose),

    "did not build a project": (_prose, runDirectory) => projectIn(runDirectory) === null,
  },

  // The plugin handed to this one is correct, so everything the report should say is about
  // the portal. The failure mode is inventing a defect because an audit was asked for.
  "plugins-switched-off": {
    "names the portal switch": (prose) => /enablePlugins|plugins\.enabled/.test(prose),

    "places it in server settings, not the plugin": (prose) =>
      /server|portal|self-hosted|admin/i.test(prose) && /setting|config|flag|switch/i.test(prose),

    "says the portal never initialises plugins at all": (prose) =>
      /initPlugins|never (?:calls|loads|initialis|initializ|fetch)|no (?:iframe|bundle)|not (?:loaded|called)/i.test(
        prose,
      ),

    "mentions the upload switch": (prose) => /pluginOptions|\bupload\b/i.test(prose),

    // Language-neutral, standing for "look at the plugin before blaming the portal": a
    // report naming the validator or the manifest has been through the code.
    "checked the plugin before blaming the portal": (prose) =>
      /validate-plugin|config\.json|pluginName|window\.Plugins/.test(prose),

    // The plugin is correct, so a verdict pinning the symptom on it is wrong however
    // phrased. Coarse by necessity - read the report as well.
    "does not pin the fault on the plugin": (prose) =>
      !/\b(?:bug|broken|defect|wrong|incorrect|mismatch)\b[^.]{0,80}\b(?:in|of)\s+(?:the\s+)?(?:plugin|code|source|index\.ts)/i.test(
        prose,
      ),

    "left the plugin unmodified": leftUnmodified("working-plugin"),
  },
};
