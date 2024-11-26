/*
 * (c) Copyright Ascensio System SIA 2024
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

import { IMessage } from "../utils";

/**
 * @category TextArea Component
 *
 * Custom textarea.
 *
 * @param value - Defines the textarea value.
 *
 * @param onChange - Sets a function which is triggered whenever the textarea is changed.
 *
 * @param placeholder - Defines the textarea placeholder.
 *
 * @param isDisabled - Specifies whether the textarea is disabled.
 *
 * @param isReadOnly - Specifies whether the textarea displays the read-only content.
 *
 * @param hasError - Specifies whether to indicate that there is an error in the textarea.
 *
 * @param maxLength - Defines the maximum value length in the textarea.
 *
 * @param name - Defines the textarea HTML "name" property.
 *
 * @param tabIndex - Defines the textarea HTML "tabindex" property.
 *
 * @param fontSize - Defines the textarea font size.
 *
 * @param heightTextArea - Defines the textarea height.
 *
 * @param isJSONField - Specifies whether the textarea is prettified for JSON and the line numeration is added.
 *
 * @param enableCopy - Specifies whether the "Copy" icon is displayed in the textarea.
 *
 * @param hasNumeration - Specifies whether the numeration is inserted into the textarea.
 *
 * @param isFullHeight - Specifies whether the height of the textarea content is calculated depending on the number of lines.
 *
 * @param heightScale - Specifies whether the textarea has a height scale.
 *
 * @param copyInfoText - Specifies whether the toast / information text will be displayed when copying.
 */
export interface ITextArea {
  value: string;
  onChange: (value: string) => IMessage | void;
  placeholder?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  maxLength?: number;
  name?: string;
  tabIndex?: number;
  fontSize?: number;
  heightTextArea?: number | string;
  isJSONField?: boolean;
  enableCopy?: boolean;
  hasNumeration?: boolean;
  isFullHeight?: boolean;
  heightScale?: boolean;
  copyInfoText?: boolean;
}
