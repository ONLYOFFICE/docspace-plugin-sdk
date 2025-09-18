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
 * Defines the supported file types.
 */
export const enum FilesType {
  /** DocSpace room or workspace */
  room = "room",

  /** Generic file type */
  file = "file",

  /** Directory or folder */
  folder = "folder",

  /** Image file (various formats) */
  image = "image",

  /** Video file (various formats) */
  video = "video",
}

/**
 * Defines the supported file extensions.
 */
export const enum FilesExst {
  // Document formats
  /** Microsoft Word document */
  doc = ".doc",
  /** Microsoft Word document (XML-based) */
  docx = ".docx",
  /** Microsoft Word macro-enabled document */
  docm = ".docm",
  /** Microsoft Word template */
  dotx = ".dotx",
  /** OpenDocument text format */
  odt = ".odt",
  /** OpenDocument flat XML text format */
  fodt = ".fodt",
  /** OpenDocument text template */
  ott = ".ott",
  /** Rich Text Format */
  rtf = ".rtf",
  /** Plain text */
  txt = ".txt",
  /** Portable Document Format */
  pdf = ".pdf",
  /** Form document (DOCX-based) */
  docxf = ".docxf",
  /** Form document (OpenDocument-based) */
  oform = ".oform",

  // Spreadsheet formats
  /** Microsoft Excel spreadsheet */
  xls = ".xls",
  /** Microsoft Excel spreadsheet (XML-based) */
  xlsx = ".xlsx",
  /** Microsoft Excel macro-enabled spreadsheet */
  xlsm = ".xlsm",
  /** OpenDocument spreadsheet */
  ods = ".ods",
  /** OpenDocument spreadsheet template */
  ots = ".ots",

  // Presentation formats
  /** Microsoft PowerPoint presentation */
  ppt = ".ppt",
  /** Microsoft PowerPoint presentation (XML-based) */
  pptx = ".pptx",
  /** Microsoft PowerPoint macro-enabled presentation */
  pptm = ".pptm",
  /** OpenDocument presentation */
  odp = ".odp",
  /** OpenDocument presentation template */
  otp = ".otp",
  /** PowerPoint show format */
  pps = ".pps",
  /** PowerPoint show format (XML-based) */
  ppsx = ".ppsx",
  /** PowerPoint template */
  pot = ".pot",
  /** OpenDocument flat XML presentation */
  //fodp = ".fodp", // Removed, as it was not present in the original code

  // Media formats
  /** Video file (AVI format) */
  avi = ".avi",
  /** Video file (FLV format) */
  flv = ".flv",
  /** Video file (MKV format) */
  mkv = ".mkv",
  /** Video file (MOV format) */
  mov = ".mov",
  /** Video file (MP4 format) */
  mp4 = ".mp4",
  /** Video file (MPEG format) */
  mpg = ".mpg",
  /** Video file (WebM format) */
  webm = ".webm",
  /** Video file (M2TS format) */
  m2ts = ".m2ts",
  /** Video file (DVD format) */
  dvd = ".dvd",
  /** Scalable Vector Graphics */
  svg = ".svg",

  // Other formats
  /** Comma-separated values */
  csv = ".csv",
  /** DjVu format */
  djvu = ".djvu",
  /** E-book format (EPUB) */
  epub = ".epub",
  /** E-book format (FB2) */
  fb2 = ".fb2",
  /** E-book format (PB2) */
  pb2 = ".pb2",
  /** Archive format (IAF) */
  iaf = ".iaf",
  /** Calendar format (ICS) */
  ics = ".ics",
  /** Web archive (MHT) */
  mht = ".mht",
  /** XML Paper Specification */
  xps = ".xps",
  /** Extensible Markup Language */
  xml = ".xml",
}

/**
 * Defines the supported file security parameters.
 */
export const enum FilesSecurity {
  /** Permission to convert files to other formats */
  Convert = "Convert",

  /** Permission to copy files and folders */
  Copy = "Copy",

  /** Permission to apply custom filters */
  CustomFilter = "CustomFilter",

  /** Permission to delete items */
  Delete = "Delete",

  /** Permission to download files */
  Download = "Download",

  /** Permission to create duplicates of items */
  Duplicate = "Duplicate",

  /** Permission to edit files */
  Edit = "Edit",

  /** Permission to view and edit file history */
  EditHistory = "EditHistory",

  /** Permission to fill forms */
  FillForms = "FillForms",

  /** Permission to lock/unlock files */
  Lock = "Lock",

  /** Permission to move items */
  Move = "Move",

  /** Permission to view and read content */
  Read = "Read",

  /** Permission to read file history */
  ReadHistory = "ReadHistory",

  /** Permission to rename items */
  Rename = "Rename",

  /** Permission to review documents */
  Review = "Review",

  /** Permission to submit forms to gallery */
  SubmitToFormGallery = "SubmitToFormGallery",

  /** Permission to stop form filling process */
  StopFilling = "StopFilling",

  /** Permission to reset form filling */
  ResetFilling = "ResetFilling",

  /** Permission to edit forms */
  EditForm = "EditForm",

  /** Permission to comment on files */
  Comment = "Comment",

  /** Permission to create rooms from existing content */
  CreateRoomFrom = "CreateRoomFrom",

  /** Permission to copy links to files */
  CopyLink = "CopyLink",

  /** Permission to embed content */
  Embed = "Embed",
}
