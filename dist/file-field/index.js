import { Polymorphic } from "../polymorphic/index.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { createComponent, mergeProps, ref, spread, template } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { For, Show, createContext, createSignal, createStore, createUniqueId, merge, omit, snapshot, useContext } from "solid-js";
import { composeEventHandlers, visuallyHiddenStyles } from "@kobalte/utils";
//#region src/file-field/file-field-context.tsx
const FileFieldContext = createContext();
function useFileFieldContext() {
	const context = useContext(FileFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useFileFieldContext` must be used within a `FileFieldContext.Root` component");
	return context;
}
//#endregion
//#region src/file-field/util.ts
const isFileAccepted = (file, accept) => {
	if (file && accept) {
		const types = Array.isArray(accept) ? accept : accept.split(",");
		const fileName = file.name || "";
		const mimeType = (file.type || "").toLowerCase();
		const baseMimeType = mimeType.replace(/\/.*$/, "");
		return types.some((type) => {
			const validType = type.trim().toLowerCase();
			if (validType.charAt(0) === ".") return fileName.toLowerCase().endsWith(validType);
			if (validType.endsWith("/*")) return baseMimeType === validType.replace(/\/.*$/, "");
			return mimeType === validType;
		});
	}
	return true;
};
const isValidFileSize = (file, minSize, maxSize) => {
	if (file.size) {
		if (minSize && maxSize) {
			if (file.size > maxSize) return [false, "FILE_TOO_LARGE"];
			if (file.size < minSize) return [false, "FILE_TOO_SMALL"];
		} else if (minSize && file.size < minSize) return [false, "FILE_TOO_SMALL"];
		else if (maxSize && file.size > maxSize) return [false, "FILE_TOO_LARGE"];
	}
	return [true, null];
};
const isValidFileType = (file, accept) => {
	const isAcceptable = file.type === "application/x-moz-file" || isFileAccepted(file, accept);
	return [isAcceptable, isAcceptable ? null : "FILE_INVALID_TYPE"];
};
const isFilesWithinMaxRange = (acceptedFilesLength, multiple, maxFiles) => {
	if (!multiple && acceptedFilesLength > 1) return false;
	return acceptedFilesLength <= maxFiles;
};
const getFiles = (files, accept, multiple, maxFiles, minFileSize, maxFileSize, validate) => {
	const acceptedFiles = [];
	const rejectedFiles = [];
	for (const file of files) {
		const [accepted, acceptError] = isValidFileType(file, accept);
		const [isValidSize, invalidSizeErro] = isValidFileSize(file, minFileSize, maxFileSize);
		const validateErrors = validate?.(file);
		const valid = validateErrors ? validateErrors.length === 0 : true;
		if (accepted && isValidSize && valid) acceptedFiles.push(file);
		else {
			const errors = [acceptError, invalidSizeErro];
			if (!valid) errors.push(...validateErrors ?? []);
			rejectedFiles.push({
				file,
				errors: errors.filter(Boolean)
			});
		}
	}
	if (!isFilesWithinMaxRange(acceptedFiles.length, !!multiple, maxFiles)) {
		for (const file of acceptedFiles) rejectedFiles.push({
			file,
			errors: ["TOO_MANY_FILES"]
		});
		acceptedFiles.splice(0);
	}
	return {
		acceptedFiles,
		rejectedFiles
	};
};
const isDragEventWithFiles = (event) => {
	if (!event.dataTransfer) return !!event.target && "files" in event.target;
	return event.dataTransfer.types.some((type) => {
		return type === "Files" || type === "application/x-moz-file";
	});
};
const parseAcceptedTypes = (accept) => {
	if (typeof accept === "string") return accept;
	if (Array.isArray(accept)) return accept.join(",");
};
//#endregion
//#region src/file-field/file-field-dropzone.tsx
function FileFieldDropzone(props) {
	const [isDragging, setIsDragging] = createSignal(false);
	const context = useFileFieldContext();
	const others = omit(props, "ref", "onClick", "onKeyDown", "onDragOver", "onDragLeave", "onDrop");
	const onClick = (e) => {
		if (e.target.tagName === "LABEL") e.stopPropagation();
		else context.fileInputRef()?.click();
	};
	const onKeyDown = (e) => {
		if (e.defaultPrevented) return;
		if (e.key !== "Enter" && e.key !== " ") return;
		context.fileInputRef()?.click();
	};
	const onDragOver = (e) => {
		if (!context.allowDragAndDrop || context.disabled()) return;
		e.preventDefault();
		try {
			if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
		} catch {}
		isDragEventWithFiles(e);
		if ((e.dataTransfer?.items ?? []).length > 0) setIsDragging(true);
	};
	const onDragLeave = (_e) => {
		if (!context.allowDragAndDrop || context.disabled()) return;
		setIsDragging(false);
	};
	const onDrop = (e) => {
		if (context.allowDragAndDrop()) {
			e.preventDefault();
			e.stopPropagation();
		}
		const isFilesEvent = isDragEventWithFiles(e);
		if (context.disabled() || !isFilesEvent) return;
		const files = e.dataTransfer?.files;
		const fileList = Array.from(files ?? []);
		context.processFiles(fileList);
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		"aria-label": "dropzone",
		role: "button",
		tabindex: "0",
		get ["aria-disabled"]() {
			return context.disabled() ? "true" : void 0;
		},
		get ["data-dragging"]() {
			return isDragging();
		},
		ref: [(el) => context.setDropzoneRef(el), props.ref],
		get onClick() {
			return composeEventHandlers([props.onClick, onClick]);
		},
		get onKeyDown() {
			return composeEventHandlers([props.onKeyDown, onKeyDown]);
		},
		get onDragOver() {
			return composeEventHandlers([props.onDragOver, onDragOver]);
		},
		get onDragLeave() {
			return composeEventHandlers([props.onDragLeave, onDragLeave]);
		},
		get onDrop() {
			return composeEventHandlers([props.onDrop, onDrop]);
		}
	}, others));
}
//#endregion
//#region src/file-field/file-field-hidden-input.tsx
var _tmpl$ = /*#__PURE__*/ template(`<input>`);
function FileFieldHiddenInput(props) {
	const others = omit(props, "style", "ref", "onChange");
	const context = useFileFieldContext();
	const formControlContext = useFormControlContext();
	const onChange = (event) => {
		if (context.disabled()) return;
		const { files } = event.currentTarget;
		context.processFiles(Array.from(files ?? []));
	};
	var _el$ = _tmpl$();
	ref(() => (el) => {
		context.setFileInputRef(el);
		if (typeof props.ref === "function") props.ref(el);
	}, _el$);
	spread(_el$, mergeProps({
		"type": "file",
		get id() {
			return context.inputId();
		},
		get accept() {
			return context.accept();
		},
		get multiple() {
			return context.multiple();
		},
		get style() {
			return combineStyle({ ...visuallyHiddenStyles }, props.style || void 0);
		},
		get onChange() {
			return composeEventHandlers([props.onChange, onChange]);
		},
		get required() {
			return formControlContext.isRequired();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readonly() {
			return formControlContext.isReadOnly();
		}
	}, others), false);
	return _el$;
}
//#endregion
//#region src/file-field/file-field-item.tsx
function FileFieldItem(props) {
	return createComponent(Polymorphic, mergeProps({ as: "li" }, props));
}
//#endregion
//#region src/file-field/file-field-item-context.tsx
const FileFieldItemContext = createContext();
function useFileFieldItemContext() {
	const context = useContext(FileFieldItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useFileFieldItemContext` must be used within a `FileField.ItemList` component");
	return context;
}
//#endregion
//#region src/file-field/file-field-item-delete-trigger.tsx
function FileFieldItemDeleteTrigger(props) {
	const context = useFileFieldContext();
	const { file } = useFileFieldItemContext();
	const others = omit(props, "onClick");
	const handleDelete = () => {
		context.removeFile(file);
	};
	return createComponent(ButtonRoot, mergeProps({
		get onClick() {
			return composeEventHandlers([props.onClick, handleDelete]);
		},
		get disabled() {
			return context.disabled();
		}
	}, others));
}
//#endregion
//#region src/file-field/file-field-item-list.tsx
function FileFieldItemList(props) {
	const context = useFileFieldContext();
	const others = omit(props, "children");
	return createComponent(Polymorphic, mergeProps({ as: "ul" }, others, { get children() {
		return createComponent(For, {
			get each() {
				return context.acceptedFiles;
			},
			children: (file) => createComponent(FileFieldItemContext, {
				value: { file },
				get children() {
					return props.children(file);
				}
			})
		});
	} }));
}
//#endregion
//#region src/file-field/file-field-item-name.tsx
function FileFieldItemName(props) {
	const { file } = useFileFieldItemContext();
	return createComponent(Polymorphic, mergeProps({ as: "span" }, props, { get children() {
		return props.children ?? file.name;
	} }));
}
//#endregion
//#region src/file-field/file-field-item-preview.tsx
function FileFieldItemPreview(props) {
	const { file } = useFileFieldItemContext();
	const others = omit(props, "type");
	return createComponent(Show, {
		get when() {
			return file.file.type.match(props.type ?? ".*");
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "div" }, others));
		}
	});
}
//#endregion
//#region src/file-field/file-field-item-preview-image.tsx
function FileFieldItemPreviewImage(props) {
	const { file } = useFileFieldItemContext();
	return createComponent(FileFieldItemPreview, {
		type: "image/*",
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "img",
				get src() {
					return file.source;
				}
			}, props));
		}
	});
}
//#endregion
//#region src/file-field/file-field-item-size.tsx
function formatBytes(bytes, precision, sizes) {
	if (bytes === 0) return `0 ${sizes[0]}`;
	const k = 1024;
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${Number.parseFloat((bytes / k ** i).toFixed(precision))} ${sizes[i]}`;
}
function FileFieldItemSize(props) {
	const { translations } = useFileFieldContext();
	const size = () => [
		translations().bytes,
		translations().kb,
		translations().mb,
		translations().gb,
		translations().tb
	];
	const { file } = useFileFieldItemContext();
	const others = omit(props, "precision");
	return createComponent(Polymorphic, mergeProps({ as: "span" }, others, { get children() {
		return formatBytes(file.size, props.precision ?? 2, size());
	} }));
}
//#endregion
//#region src/file-field/file-field-label.tsx
function FileFieldLabel(props) {
	const context = useFileFieldContext();
	return createComponent(Polymorphic, mergeProps({
		as: "label",
		get ["for"]() {
			return context.inputId();
		}
	}, props));
}
//#endregion
//#region src/file-field/file-field.intl.ts
const FILE_FIELD_INTL_TRANSLATIONS = {
	bytes: "Bytes",
	kb: "KB",
	mb: "MB",
	gb: "GB",
	tb: "TB"
};
//#endregion
//#region src/file-field/file-field-root.tsx
function FileField$1(props) {
	const defaultId = `FileField-${createUniqueId()}`;
	const [fileInputRef, setFileInputRef] = createSignal();
	const [dropzoneRef, setDropzoneRef] = createSignal();
	const toUploadFile = (file) => ({
		source: URL.createObjectURL(file),
		name: file.name,
		size: file.size,
		file
	});
	const [acceptedFilesState, setAcceptedFilesState] = createStore([]);
	const [rejectedFilesState, setRejectedFilesState] = createStore([]);
	const mergedProps = merge({
		id: defaultId,
		allowDragAndDrop: true,
		disabled: false,
		multiple: false,
		maxFiles: 1,
		maxFileSize: Number.POSITIVE_INFINITY,
		minFileSize: 0,
		validate: void 0,
		translations: FILE_FIELD_INTL_TRANSLATIONS
	}, props);
	const processFiles = (files) => {
		const { acceptedFiles, rejectedFiles } = getFiles(files, parseAcceptedTypes(mergedProps.accept), mergedProps.multiple ?? false, mergedProps.maxFiles ?? 1, mergedProps.minFileSize, mergedProps.maxFileSize, mergedProps.validate);
		const uploadAcceptedFiles = acceptedFiles.map(toUploadFile);
		if (mergedProps.multiple) {
			setAcceptedFilesState((prevAcceptedFiles) => [...prevAcceptedFiles, ...uploadAcceptedFiles]);
			setRejectedFilesState(() => rejectedFiles);
		} else if (acceptedFiles.length > 0 && acceptedFiles.length === 1) {
			setAcceptedFilesState(() => [uploadAcceptedFiles[0]]);
			setRejectedFilesState(() => rejectedFiles);
		} else if (rejectedFiles.length > 0 && rejectedFiles.length === 1) setRejectedFilesState(() => rejectedFiles);
		mergedProps.onFileAccept?.(acceptedFiles);
		if (rejectedFiles.length > 0) mergedProps.onFileReject?.(rejectedFiles);
		mergedProps.onFileChange?.({
			acceptedFiles,
			rejectedFiles
		});
	};
	const removeFile = (file) => {
		URL.revokeObjectURL(file.source);
		setAcceptedFilesState((prevAcceptedFiles) => prevAcceptedFiles.filter((f) => f.source !== file.source));
		mergedProps.onFileChange?.({
			acceptedFiles: [...snapshot(acceptedFilesState)].map((f) => f.file),
			rejectedFiles: [...snapshot(rejectedFilesState)]
		});
	};
	const others = omit(mergedProps, ...FORM_CONTROL_PROP_NAMES);
	const { formControlContext } = createFormControl(mergedProps);
	const context = {
		inputId: () => mergedProps.id,
		fileInputRef,
		setFileInputRef,
		dropzoneRef,
		setDropzoneRef,
		disabled: () => mergedProps.disabled,
		multiple: () => mergedProps.multiple,
		accept: () => parseAcceptedTypes(mergedProps.accept),
		allowDragAndDrop: () => mergedProps.allowDragAndDrop,
		processFiles,
		acceptedFiles: acceptedFilesState,
		rejectedFiles: rejectedFilesState,
		removeFile,
		translations: () => mergedProps.translations
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(FileFieldContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({
						as: "div",
						role: "group",
						get id() {
							return mergedProps.id;
						}
					}, () => formControlContext.dataset(), others));
				}
			});
		}
	});
}
//#endregion
//#region src/file-field/file-field-trigger.tsx
function FileFieldTrigger(props) {
	const context = useFileFieldContext();
	const formControlContext = useFormControlContext();
	const others = omit(props, "onClick");
	const onClick = (event) => {
		if (context.dropzoneRef()?.contains(event.target)) event.stopPropagation();
		context.fileInputRef()?.click();
	};
	return createComponent(ButtonRoot, mergeProps({
		get disabled() {
			return context.disabled();
		},
		get onClick() {
			return composeEventHandlers([props.onClick, onClick]);
		}
	}, () => formControlContext.dataset(), others));
}
//#endregion
//#region src/file-field/index.tsx
const FileField = Object.assign(FileField$1, {
	Context: FileFieldContext,
	Dropzone: FileFieldDropzone,
	HiddenInput: FileFieldHiddenInput,
	Label: FileFieldLabel,
	Trigger: FileFieldTrigger,
	ItemList: FileFieldItemList,
	Item: FileFieldItem,
	ItemPreview: FileFieldItemPreview,
	ItemPreviewImage: FileFieldItemPreviewImage,
	ItemSize: FileFieldItemSize,
	ItemDeleteTrigger: FileFieldItemDeleteTrigger,
	ItemName: FileFieldItemName,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage
});
//#endregion
export { FileFieldContext as Context, FormControlDescription as Description, FileFieldDropzone as Dropzone, FormControlErrorMessage as ErrorMessage, FileField, FileFieldHiddenInput as HiddenInput, FileFieldItem as Item, FileFieldItemDeleteTrigger as ItemDeleteTrigger, FileFieldItemList as ItemList, FileFieldItemName as ItemName, FileFieldItemPreview as ItemPreview, FileFieldItemPreviewImage as ItemPreviewImage, FileFieldItemSize as ItemSize, FileFieldLabel as Label, FileField$1 as Root, FileFieldTrigger as Trigger, useFileFieldContext };
