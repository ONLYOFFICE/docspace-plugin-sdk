/**
 * (c) Copyright Ascensio System SIA 2025
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
 *
 * @license
 */

/**
 * @packageDocumentation
 *
 * Here is a description of the module Components.
 *
 * @categoryDescription Button
 *
 * Here is a description of the category Button.
 *
 * @categoryDescription Box
 *
 * Here is a description of the category Box.
 *
 * @categoryDescription Checkbox
 *
 * Here is a description of the category Checkbox.
 *
 * @categoryDescription ComboBox
 *
 * Here is a description of the category ComboBox.
 *
 * @categoryDescription CreateDialog
 *
 * Here is a description of the category CreateDialog.
 *
 * @categoryDescription Frame
 *
 * Here is a description of the category Frame.
 *
 * @categoryDescription Image
 *
 * Here is a description of the category Image.
 *
 * @categoryDescription Input
 *
 * Here is a description of the category Input.
 *
 * @categoryDescription Label
 *
 * Here is a description of the category Label.
 *
 * @categoryDescription ModalDialog
 *
 * Here is a description of the category ModalDialog.
 *
 * @categoryDescription Skeleton
 *
 * Here is a description of the category Skeleton.
 *
 * @categoryDescription Text
 *
 * Here is a description of the category Text.
 *
 * @categoryDescription TextArea
 *
 * Here is a description of the category TextArea.
 *
 * @categoryDescription Toast
 *
 * Here is a description of the category Toast.
 *
 * @categoryDescription ToggleButton
 *
 * Here is a description of the category ToggleButton.
 *
 * @module Components
 */

import { ICreateDialog } from "./ICreateDialog";
import { IComboBox, IComboBoxItem } from "./IComboBox";
import { IModalDialog, ModalDisplayType } from "./IModalDialog";
import { IImage } from "./IImage";
import { IFrame } from "./IFrame";
import { ITextArea } from "./ITextArea";
import { IText } from "./IText";
import { ILabel } from "./ILabel";
import { IBox, IBorderProp } from "./IBox";
import {
  Component,
  BoxGroup,
  ButtonGroup,
  CheckboxGroup,
  ComboBoxGroup,
  IFrameGroup,
  ImageGroup,
  InputGroup,
  LabelGroup,
  SkeletonGroup,
  TextGroup,
  TextAreaGroup,
  ToggleButtonGroup,
} from "./Component";
import { IInput, InputSize, InputType, InputAutocomplete } from "./IInput";
import { ICheckbox } from "./ICheckbox";
import { IToggleButton } from "./IToggleButton";
import { IToast, ToastType } from "./IToast";
import { IButton, ButtonSize } from "./IButton";
import { ISkeleton } from "./ISkeleton";

export {
  IBox,
  IBorderProp,
  IButton,
  ButtonSize,
  ICheckbox,
  IInput,
  InputSize,
  InputType,
  InputAutocomplete,
  IToggleButton,
  IToast,
  ToastType,
  Component,
  BoxGroup,
  ButtonGroup,
  CheckboxGroup,
  ComboBoxGroup,
  IFrameGroup,
  ImageGroup,
  InputGroup,
  LabelGroup,
  SkeletonGroup,
  TextGroup,
  TextAreaGroup,
  ToggleButtonGroup,
  ILabel,
  IText,
  ITextArea,
  IFrame,
  IImage,
  IModalDialog,
  ModalDisplayType,
  IComboBox,
  IComboBoxItem,
  ICreateDialog,
  ISkeleton,
};
