import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { s as ButtonRootRenderProps } from "../index/Bjp2qtUK.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { UploadFile } from "@solid-primitives/upload";
//#region src/file-field/file-field.intl.d.ts
declare const FILE_FIELD_INTL_TRANSLATIONS: {
  bytes: string;
  kb: string;
  mb: string;
  gb: string;
  tb: string;
};
type FileFieldIntlTranslations = typeof FILE_FIELD_INTL_TRANSLATIONS;
//#endregion
//#region src/file-field/types.d.ts
type FileError = "TOO_MANY_FILES" | "FILE_INVALID_TYPE" | "FILE_TOO_LARGE" | "FILE_TOO_SMALL";
type FileRejection = {
  file: File;
  errors: FileError[];
};
type Details = {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
};
type Accept = string | string[] | undefined;
//#endregion
//#region src/file-field/file-field-context.d.ts
interface FileFieldContextValue {
  translations: Accessor<FileFieldIntlTranslations>;
  inputId: Accessor<string>;
  fileInputRef: Accessor<HTMLInputElement | undefined>;
  setFileInputRef: Setter<HTMLInputElement | undefined>;
  dropzoneRef: Accessor<HTMLElement | undefined>;
  setDropzoneRef: Setter<HTMLElement | undefined>;
  disabled: Accessor<boolean | undefined>;
  multiple: Accessor<boolean | undefined>;
  accept: Accessor<string | undefined>;
  allowDragAndDrop: Accessor<boolean | undefined>;
  processFiles: (files: File[]) => void;
  acceptedFiles: readonly UploadFile[];
  rejectedFiles: readonly FileRejection[];
  removeFile: (file: UploadFile) => void;
}
declare const FileFieldContext: import("solid-js").Context<FileFieldContextValue>;
export declare function useFileFieldContext(): FileFieldContextValue;
//#endregion
//#region src/file-field/file-field-dropzone.d.ts
interface FileFieldDropzoneOptions {}
interface FileFieldDropzoneCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onDragOver: JSX$1.EventHandlerUnion<T, DragEvent>;
  onDragLeave: JSX$1.EventHandlerUnion<T, DragEvent>;
  onDrop: JSX$1.EventHandlerUnion<T, DragEvent>;
}
interface FileFieldDropzoneRenderProps extends FileFieldDropzoneCommonProps {
  "aria-label": "dropzone";
  role: "button";
  tabindex: "0";
  "aria-disabled": "true" | undefined;
  "data-dragging": boolean;
}
type FileFieldDropzoneProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldDropzoneOptions & Partial<FileFieldDropzoneCommonProps<ElementOf<T>>>;
declare function FileFieldDropzone<T extends ValidComponent = "div">(props: PolymorphicProps<T, FileFieldDropzoneProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-hidden-input.d.ts
interface FileFieldHiddenInputProps extends ComponentProps<"input"> {}
declare function FileFieldHiddenInput(props: FileFieldHiddenInputProps): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-item.d.ts
interface FileFieldItemOptions {}
interface FileFieldItemCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldItemRenderProps extends FileFieldItemCommonProps {}
type FileFieldItemRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemOptions & Partial<FileFieldItemCommonProps<ElementOf<T>>>;
declare function FileFieldItem<T extends ValidComponent = "li">(props: PolymorphicProps<T, FileFieldItemRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/file-field/file-field-item-delete-trigger.d.ts
interface FileFieldItemDeleteTriggerOptions {}
interface FileFieldItemDeleteTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface FileFieldItemDeleteTriggerRenderProps extends FileFieldItemDeleteTriggerCommonProps, ButtonRootRenderProps {
  disabled: boolean | undefined;
}
type FileFieldItemDeleteTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = Partial<FileFieldItemDeleteTriggerCommonProps<ElementOf<T>>>;
declare function FileFieldItemDeleteTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, FileFieldItemDeleteTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-item-list.d.ts
interface FileFieldItemListOptions {
  children: (file: UploadFile) => JSX$1.Element;
}
interface FileFieldItemListCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldItemListRenderProps extends FileFieldItemListCommonProps {
  children: JSX$1.Element;
}
type FileFieldItemListProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemListOptions & Partial<FileFieldItemListCommonProps<ElementOf<T>>>;
declare function FileFieldItemList<T extends ValidComponent = "ul">(props: PolymorphicProps<T, FileFieldItemListProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-item-name.d.ts
interface FileFieldItemNameOptions {}
interface FileFieldItemNameCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
interface FileFieldItemNameRenderProps extends FileFieldItemNameCommonProps {}
type FileFieldItemNameProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemNameOptions & Partial<FileFieldItemNameCommonProps<ElementOf<T>>>;
declare function FileFieldItemName<T extends ValidComponent = "span">(props: PolymorphicProps<T, FileFieldItemNameProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-item-preview.d.ts
interface FileFieldItemPreviewOptions {
  type: string;
}
interface FileFieldItemPreviewCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldItemPreviewRenderProps extends FileFieldItemPreviewCommonProps {}
type FileFieldItemPreviewProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemPreviewOptions & Partial<FileFieldItemPreviewCommonProps<ElementOf<T>>>;
declare function FileFieldItemPreview<T extends ValidComponent = "div">(props: PolymorphicProps<T, FileFieldItemPreviewProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/file-field/file-field-item-preview-image.d.ts
interface FileFieldItemPreviewImageOptions {}
interface FileFieldItemPreviewImageCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldItemPreviewImageRenderProps extends FileFieldItemPreviewImageCommonProps {
  src: string;
}
type FileFieldItemPreviewImageProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemPreviewImageOptions & Partial<FileFieldItemPreviewImageCommonProps<ElementOf<T>>>;
declare function FileFieldItemPreviewImage<T extends ValidComponent = "img">(props: PolymorphicProps<T, FileFieldItemPreviewImageProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/file-field/file-field-item-size.d.ts
interface FileFieldItemSizeOptions {
  precision?: number;
}
interface FileFieldItemSizeCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldItemSizeRenderProps extends FileFieldItemSizeCommonProps {
  children: JSX$1.Element;
}
type FileFieldItemSizeProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldItemSizeOptions & Partial<FileFieldItemSizeCommonProps<ElementOf<T>>>;
declare function FileFieldItemSize<T extends ValidComponent = "span">(props: PolymorphicProps<T, FileFieldItemSizeProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/file-field-label.d.ts
interface FileFieldLabelOptions {}
interface FileFieldLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface FileFieldLabelRenderProps extends FileFieldLabelCommonProps {
  for: string;
}
type FileFieldLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldLabelOptions & Partial<FileFieldLabelCommonProps<ElementOf<T>>>;
declare function FileFieldLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, FileFieldLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/file-field/file-field-root.d.ts
interface FileFieldRootOptions {
  /** The localized strings of the component. */
  translations?: FileFieldIntlTranslations;
  multiple?: boolean;
  accept?: Accept;
  maxFiles?: number;
  allowDragAndDrop?: boolean;
  maxFileSize?: number;
  minFileSize?: number;
  onFileAccept?: (files: File[]) => void;
  onFileReject?: (files: FileRejection[]) => void;
  onFileChange?: (details: Details) => void;
  validate?: (file: File) => FileError[] | null;
  id?: string;
  /**
   * The name of the select.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the select should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Whether the select is read only. */
  readOnly?: boolean;
}
interface FileFieldRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface FileFieldRootRenderProps extends FileFieldRootCommonProps, FormControlDataSet {
  role: "group";
}
type FileFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldRootOptions & Partial<FileFieldRootCommonProps<ElementOf<T>>>;
declare function FileField$1<T extends ValidComponent = "div">(props: PolymorphicProps<T, FileFieldRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/file-field/file-field-trigger.d.ts
interface FileFieldTriggerOptions {}
interface FileFieldTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface FileFieldTriggerRenderProps extends FileFieldTriggerCommonProps, FormControlDataSet, ButtonRootRenderProps {}
type FileFieldTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = FileFieldTriggerOptions & Partial<FileFieldTriggerCommonProps<ElementOf<T>>>;
declare function FileFieldTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, FileFieldTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/file-field/index.d.ts
export declare const FileField: typeof FileField$1 & {
  Context: import("solid-js").Context<FileFieldContextValue>;
  Dropzone: typeof FileFieldDropzone;
  HiddenInput: typeof FileFieldHiddenInput;
  Label: typeof FileFieldLabel;
  Trigger: typeof FileFieldTrigger;
  ItemList: typeof FileFieldItemList;
  Item: typeof FileFieldItem;
  ItemPreview: typeof FileFieldItemPreview;
  ItemPreviewImage: typeof FileFieldItemPreviewImage;
  ItemSize: typeof FileFieldItemSize;
  ItemDeleteTrigger: typeof FileFieldItemDeleteTrigger;
  ItemName: typeof FileFieldItemName;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
};
//#endregion
export { type Accept, FileFieldContext as Context, FormControlDescription as Description, type Details, FileFieldDropzone as Dropzone, FormControlErrorMessage as ErrorMessage, type FileError, type FileFieldContextValue, type FormControlDescriptionCommonProps as FileFieldDescriptionCommonProps, type FormControlDescriptionOptions as FileFieldDescriptionOptions, type FormControlDescriptionProps as FileFieldDescriptionProps, type FormControlDescriptionRenderProps as FileFieldDescriptionRenderProps, type FileFieldDropzoneCommonProps, type FileFieldDropzoneOptions, type FileFieldDropzoneProps, type FileFieldDropzoneRenderProps, type FormControlErrorMessageCommonProps as FileFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as FileFieldErrorMessageOptions, type FormControlErrorMessageProps as FileFieldErrorMessageProps, type FormControlErrorMessageRenderProps as FileFieldErrorMessageRenderProps, type FileFieldHiddenInputProps, type FileFieldItemCommonProps, type FileFieldItemDeleteTriggerCommonProps, type FileFieldItemDeleteTriggerOptions, type FileFieldItemDeleteTriggerProps, type FileFieldItemDeleteTriggerRenderProps, type FileFieldItemListCommonProps, type FileFieldItemListOptions, type FileFieldItemListProps, type FileFieldItemListRenderProps, type FileFieldItemNameCommonProps, type FileFieldItemNameOptions, type FileFieldItemNameProps, type FileFieldItemNameRenderProps, type FileFieldItemOptions, type FileFieldItemPreviewCommonProps, type FileFieldItemPreviewImageCommonProps, type FileFieldItemPreviewImageOptions, type FileFieldItemPreviewImageProps, type FileFieldItemPreviewImageRenderProps, type FileFieldItemPreviewOptions, type FileFieldItemPreviewProps, type FileFieldItemPreviewRenderProps, type FileFieldItemRenderProps, type FileFieldItemRootProps, type FileFieldItemSizeCommonProps, type FileFieldItemSizeOptions, type FileFieldItemSizeProps, type FileFieldItemSizeRenderProps, type FileFieldLabelCommonProps, type FileFieldLabelOptions, type FileFieldLabelProps, type FileFieldLabelRenderProps, type FileFieldRootCommonProps, type FileFieldRootOptions, type FileFieldRootProps, type FileFieldRootRenderProps, type FileFieldTriggerCommonProps, type FileFieldTriggerOptions, type FileFieldTriggerProps, type FileFieldTriggerRenderProps, type FileRejection, FileFieldHiddenInput as HiddenInput, FileFieldItem as Item, FileFieldItemDeleteTrigger as ItemDeleteTrigger, FileFieldItemList as ItemList, FileFieldItemName as ItemName, FileFieldItemPreview as ItemPreview, FileFieldItemPreviewImage as ItemPreviewImage, FileFieldItemSize as ItemSize, FileFieldLabel as Label, FileField$1 as Root, FileFieldTrigger as Trigger };