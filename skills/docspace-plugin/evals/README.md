# Evals

A measuring instrument for the skill, not part of it. Nothing in `SKILL.md` references this directory and no agent reads it while working — it costs nothing at runtime.

## Why it exists

`test-validator.mjs` proves the validator catches what it should. It says nothing about the part that is hardest to get right: whether the *instructions* lead an agent to a correct plugin. That question has no static answer. The only way to see it is to run the thing.

So each scenario here is run twice — once with the skill in context, once without — and the two are compared. The comparison is the point, and it answers in both directions:

- a check the with-skill run passes and the baseline fails is a passage doing real work;
- a check **both** pass is a passage that can probably be deleted. The model already knew. Half of improving a skill is cutting text that changes nothing, because a shorter skill is a skill the model follows more closely.

## The scenarios

[`evals.json`](evals.json) holds nine, covering all three jobs the skill claims:

| # | Name | Mode | What it puts under strain |
|---|---|---|---|
| 0 | `context-menu-file-action` | build | the common case — one scope, a file-type filter, a modal |
| 1 | `settings-and-info-panel` | build | two scopes that interact, and settings that arrive after installation |
| 2 | `audit-broken-plugin` | audit | four silent failures, one of which masks the other three |
| 3 | `extend-existing-plugin` | build | a live contract: name, keys, version, existing conventions |
| 4 | `ui-modal-form` | build | declarative component trees and live validation across two elements |
| 5 | `explain-filter-fields` | explain | answering a question without building anything |
| 6 | `native-looking-settings` | build | visual fidelity: real component defaults, dead enum values, theme variables, comboBox option shape |
| 7 | `plugins-switched-off` | audit | a **correct** plugin and a portal with the plugin system turned off — the answer is not in the code |
| 8 | `background-job-progress` | build | a long job reported through the portal's own progress button rather than a held-open modal |

Scenario 7 is the one that inverts the habit the others build. Asked to audit, an agent audits; handed a plugin with nothing wrong with it, the tempting move is to find something anyway. The symptom it describes — installs, reloads, nothing appears, nothing in the console — is what a portal with `enablePlugins` false looks like from the outside, and no edit to the plugin will ever fix it.

Prompts are written the way someone would actually ask — lowercase, mid-thought, sometimes with the wrong vocabulary. A prompt that names the right SDK concepts tests nothing, because recognising the request is half the job.

Three of them start from a fixture rather than an empty directory:

- [`fixtures/broken-plugin/`](fixtures/broken-plugin/) — compiles, packs, installs, and does nothing. Its four planted defects are listed at the top of its `src/index.ts`.
- [`fixtures/working-plugin/`](fixtures/working-plugin/) — a small plugin that builds and validates clean, so the eval can ask for a feature to be *added* (3) or for a fault that is not in it to be found (7). Keep it that way: if this one ever stops validating, both of those are measuring the wrong thing.

## When to run them

**Not once per iteration.** This suite does not make the skill better and it is not what improvement comes from — both of the first two iterations grew the references by reading the portal's own client, and the suite was blind to nearly all of it. What it does is notice when an edit to `SKILL.md` or a reference breaks something that used to work, which nothing else here can: there is no compiler for prose.

So run it the way you run tests: **after a change to the skill, before shipping it.** Once, not in a loop. Re-running an unchanged skill against unchanged fixtures re-measures the same thing and tells you nothing you did not already have.

The one exception is when you want to know how noisy a result is — see the note on samples below.

## Running them

Ask `skill-creator` — it owns the protocol and this directory only supplies the material:

```
run the evals for skills/docspace-plugin, iteration-3
```

It spawns two runs per scenario, saves them under `<workspace>/iteration-N/eval-<id>/{with_skill,without_skill}/`, and opens a viewer over the results.

**Run the prompts verbatim — do not translate them.** A handful of the report checks read the words a run chose rather than an identifier, and they are written in English only. Hand a translated prompt to a run and those columns stop reporting "the run missed this" and start reporting nothing at all, in every run, which looks identical to a pass being taken away. Iteration-2 was run on translated prompts and three of its report columns measured nothing as a result.

Pick `without_skill` for the baseline, not `old_skill`. Two adjacent revisions of the same skill produce nearly identical runs — iteration-1 was graded that way and the two arms differed in a single cell out of a hundred, which is not a result, it is a measurement with no room in it.

Then grade the mechanical half:

```sh
node skills/docspace-plugin/evals/grade.mjs <workspace>/iteration-3
```

[`grade.mjs`](grade.mjs) finds each generated project by looking for a `package.json` with `pluginName` anywhere beneath a run directory, so it does not care whether the run saved its work directly or under `outputs/`. It prints the universal table, a table per scenario that asks for anything beyond it, a summary of the comparison, and writes both `grading.json` and a readable `grading.md` beside the runs.

It is the walk and the write-up; the parts it is made of sit in [`grading/`](grading/), one job each:

| | |
|---|---|
| [`checks.mjs`](grading/checks.mjs) | the three catalogues of checks — **the file to open when adding a scenario** |
| [`verdict.mjs`](grading/verdict.mjs) | how a check answers, and how answers become a score |
| [`source.mjs`](grading/source.mjs) | reading meaning out of TypeScript text, knowing nothing about DocSpace |
| [`run-output.mjs`](grading/run-output.mjs) | what a run left behind: its project, its manifest, its prose |
| [`validator.mjs`](grading/validator.mjs) | invoking `validate-plugin.mjs` and reading its report |
| [`report.mjs`](grading/report.mjs) | tables and the summary |
| [`files.mjs`](grading/files.mjs) | reading files without first asking whether they are there |

### Samples and variance

The model is not deterministic: the same prompt twice gives different runs, so a single changed check may be the model having a different day rather than a regression. The grader says `1 sample` when that is all it has.

To get the spread, give a variant more than one run directory — `with_skill`, `with_skill-2`, `with_skill-3`. The grader groups them, averages the score and prints the range next to it. Worth doing for the one scenario a change was supposed to affect; not worth doing for all nine.

## What the grader can and cannot tell you

It decides the questions nobody should answer by hand: did it build, is the archive there, is the SDK the right major, are the keys namespaced, did the report name the defect. It answers four ways, and the last two are not the same thing:

| | |
|---|---|
| `✓` | passed |
| `·` | failed |
| `?` | **unknown** — the check applies here but could not decide. Read the run. A check that is *permanently* unknown is a broken check, not a finding. |
| `–` | **not applicable** — there is nothing here for it to be about, and it is left out of the score. A settings-only plugin registers no items, so "are the item keys namespaced" is not a question about it. |

That distinction is worth the two symbols. Scoring a not-applicable check as a shortfall gives every table a deficit no revision can close, and after a while nobody reads the number.

The summary at the end is the part to read first, because a **tie** is a finding in its own right: if the baseline reached the same score, the passages that scenario exercises are telling the model something it already knew, and the text is a candidate for cutting. A shorter skill is one the model follows more closely.

The checks are text and file-system heuristics. A regex cannot distinguish a correct finding from a lucky word, and it cannot see whether the code is any good. Treat the tables as a filter that tells you which runs to read first — not as a score to optimise. Two habits keep them honest:

- **Anchor a check on an identifier wherever one will do.** A scope name, a field, a file path or a `key:` is the same string in any report; a check that reads the words around it is not. `registration mismatch` looks for `RoomStatistics` and `RoomStats` and is solid; `calls it a quirk, not a rule` reads prose and is only as good as the phrasing it guessed.
- **Fixture checks match signatures, not whole files.** "Did the run leave the plugin alone" compares the parts a helpful edit would have to disturb — the planted defects, the name and scopes the portal keys the installation by. Comparing the copy to the fixture byte for byte fails every iteration already on disk the moment somebody fixes a typo in the fixture.

## Adding one

The most valuable scenarios come from real failures. When someone reports that the skill produced a plugin that did not work, turn the report into a scenario before fixing anything: watch it fail, fix `SKILL.md`, watch it pass. That defect is then covered permanently, which is not true of a fix applied on its own.

A new scenario needs an entry in `evals.json` with a `name`, a `mode` (`build`, `audit` or `explain`) and its assertions. If some of those assertions can be checked mechanically, [`grading/checks.mjs`](grading/checks.mjs) has three catalogues for them:

- `UNIVERSAL_CHECKS` — asked of every generated project. Only add here what is true of *any* plugin.
- `SCENARIO_CHECKS[<name>]` — what this scenario in particular put under strain. This is where the discriminating assertions belong; the universal set saturates quickly, and a scenario whose interesting half is never automated cannot show a regression in it.
- `REPORT_CHECKS[<name>]` — for `audit` and `explain`, which produce a report rather than a project.

A scenario with no mechanical checks is fine — it is simply graded by reading. Two things to avoid when writing one: a check that cannot resolve on the scenario's own fixture (return `NA`, not `false`), and a heuristic that assumes the shape the code happened to take in one run. Both of the checks added with scenarios 7 and 8 failed on their first pass for the second reason — a list lifted into a constant, a callback with a return-type annotation containing a brace — which is the normal way this goes. Run the grader over an existing iteration before trusting a new check.
