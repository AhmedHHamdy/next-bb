'use client'

import { Modal } from "antd";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";

interface UploadedFile {
  file: File;
  progress: number;
}

export default function FileUpload({ title, required, setSelectedFiles }: { title: string, required: boolean, setSelectedFiles?: (values: File[]) => void }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const tInputs = useTranslations("FormInputs");

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePreview = (file: File) => {
    setPreviewFile(file);
    setIsModalOpen(true);
  };

  // Handle file selection
  // const handleFiles = (selectedFiles: FileList | null) => {
  //   if (!selectedFiles) return;

  //   const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
  //     file,
  //     progress: 0,
  //   }));

  //   setFiles((prev) => [...prev, ...newFiles]);

  //   // Simulate upload progress
  //   newFiles.forEach((newFile, index) => {
  //     let progress = 0;
  //     const interval = setInterval(() => {
  //       progress += 10;
  //       setFiles((prev) =>
  //         prev.map((f) =>
  //           f.file === newFile.file ? { ...f, progress } : f
  //         )
  //       );
  //       if (progress >= 100) clearInterval(interval);
  //     }, 200);
  //   });
  // };

  // Inside FileUpload.tsx
  // const handleFiles = (selectedFiles: FileList | null) => {
  //   if (!selectedFiles) return;

  //   const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
  //     file,
  //     progress: 0,
  //   }));

  //   setFiles((prev) => [...prev, ...newFiles]);

  //   // 🔥 Pass files back to parent
  //   if (setSelectedFiles) {
  //     setSelectedFiles(newFiles.map((f) => f.file));
  //   }

  //   // Simulate upload progress
  //   newFiles.forEach((newFile) => {
  //     let progress = 0;
  //     const interval = setInterval(() => {
  //       progress += 10;
  //       setFiles((prev) =>
  //         prev.map((f) =>
  //           f.file === newFile.file ? { ...f, progress } : f
  //         )
  //       );
  //       if (progress >= 100) clearInterval(interval);
  //     }, 200);
  //   });
  // };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
  
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      progress: 0,
    }));
  
    setFiles((prev) => {
      // ✅ Limit to 5 files max
      const combined = [...prev, ...newFiles].slice(0, 5);
  
      // 🔥 Pass files back to parent
      if (setSelectedFiles) {
        setSelectedFiles(combined.map((f) => f.file));
      }
  
      return combined;
    });
  
    // Simulate upload progress
    newFiles.forEach((newFile) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prev) =>
          prev.map((f) =>
            f.file === newFile.file ? { ...f, progress } : f
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // Delete file
  // const handleDelete = (fileToDelete: File) => {
  //   setFiles((prev) => prev.filter((f) => f.file !== fileToDelete));
  // };

  // const handleDelete = (fileToDelete: File) => {
  //   setFiles((prev) => prev.filter((f) => f.file !== fileToDelete));
  
  //   if (setSelectedFiles) {
  //     setSelectedFiles(files.filter((f) => f.file !== fileToDelete).map((f) => f.file));
  //   }
  // };

  const handleDelete = (fileToDelete: File) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.file !== fileToDelete);
  
      if (setSelectedFiles) {
        setSelectedFiles(updated.map((f) => f.file));
      }
  
      return updated;
    });
  };

  function handleFileImage(input: string): string {
    const extractExtension = (value: string): string => {
      // If it's a MIME type like image/png, take the subtype
      if (value.includes("/")) {
        return value.split("/")[1]?.toLowerCase() ?? "";
      }
      // Otherwise treat as filename and take the part after the last dot
      const lastDotIndex = value.lastIndexOf(".");
      if (lastDotIndex === -1) return "";
      return value.slice(lastDotIndex + 1).toLowerCase();
    };

    const ext = extractExtension(input);

    switch (ext) {
      // Images
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
      case "svg":
        return "/img-svg.svg";

      // Archives
      case "rar":
        return "/rar-svg.svg";
      case "zip":
        return "/zip-svg.svg";

      // Excel
      case "csv":
        return "/csv-svg.svg";
      case "xlsx":
        return "/xlsx-svg.svg";

      // Videos
      case "mp4":
        return "/mp4-svg.svg";
      case "mkv":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "webm":
        return "/vlc-svg.svg";

      // Documents
      case "ppt":
      case "pptx":
        return "/ppt-svg.svg";
      case "doc":
      case "docx":
        return "/doc-svg.svg";
      case "pdf":
        return "/pdf-doc.svg";

      default:
        return "/file-svg-icon.svg";
    }
  }


  return (
    <div
      id="file-input-settings-section"
      className="space-y-[32px] md:space-b-[48px] md:space-t-[56px]"
    >
      <h3 className="text-[20px] md:text-[24px] font-bold text-black">
        {title} 
        
        {required && <span className="text-[#FF6B6B]"> *</span>}
      </h3>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px] h-full">
        {/* Upload Area */}
        <div
          id="upload-area"
          className={`border-2 w-full border-dashed rounded-xl p-8 text-center 
            ${files.length >= 5 ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
            border-[#EDA133] bg-[rgba(252,244,233,0.5)] flex items-center justify-center`}
          // onClick={() => fileInputRef.current?.click()}
          // onDragOver={(e) => e.preventDefault()}
          // onDrop={handleDrop}
          onClick={() => {
            if (files.length < 5) fileInputRef.current?.click();
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (files.length < 5) handleDrop(e);
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            disabled={files.length >= 5} // disable after 5 files
            accept=".rar,.zip,.png,.jpg,.jpeg,.docx,.csv,.xls,.xlsx,.mp4"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-6">
            <img src="/document-upload.svg" alt="document upload icon" />
            <div className="space-y-3">
              <p className="text-lg font-medium text-black">
                {files.length >= 5
                  ? "تم الوصول إلى الحد الأقصى (5 ملفات)"
                  : "اسحب وأفلت ملفاتك أو تصفح"}
              </p>
              <p className="text-sm text-center text-[#393939]">
                الصيغة المدعومة: JPG, PNG, DOCX, XLSX, RAR, ZIP, MP4
              </p>
            </div>
          </div>
        </div>

        <Modal
          title="File Preview"
          // closable={{ 'aria-label': 'Custom Close Button' }}
          closable={true}   // ✅ must be boolean
          open={isModalOpen}
          // onOk={handleOk}
          okButtonProps={{ hidden: true }}
          onCancel={handleCancel}
          cancelButtonProps={{ hidden: true }}
        >
          {previewFile && (
            <>
            {/* Image Preview */}
            {previewFile.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(previewFile)}
                alt={previewFile.name}
                className="max-h-[70vh] mx-auto"
              />
            )}
      
            {/* PDF Preview */}
            {previewFile.type === "application/pdf" && (
              <iframe
                src={URL.createObjectURL(previewFile)}
                title="PDF Preview"
                className="w-full h-[70vh]"
              ></iframe>
            )}
      
            {/* Video Preview */}
            {previewFile.type.startsWith("video/") && (
              <video
                controls
                className="w-full max-h-[70vh] rounded-lg shadow"
              >
                <source src={URL.createObjectURL(previewFile)} type={previewFile.type} />
                Your browser does not support the video tag.
              </video>
            )}
      
            {/* Excel Preview (just download for now) */}
            {(previewFile.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
              previewFile.type === "text/csv") && (
              <p className="text-gray-600">
                Excel preview is not supported in the browser.{" "}
                <a
                  href={URL.createObjectURL(previewFile)}
                  download={previewFile.name}
                  className="text-blue-600 underline"
                >
                  Download {previewFile.name}
                </a>
              </p>
            )}
      
            {/* Fallback for unsupported files */}
            {!(
              previewFile.type.startsWith("image/") ||
              previewFile.type === "application/pdf" ||
              previewFile.type.startsWith("video/") ||
              previewFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
              previewFile.type === "text/csv"
            ) && (
              <p className="text-gray-600">
                Preview not available.{" "}
                <a
                  href={URL.createObjectURL(previewFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download instead
                </a>
              </p>
            )}
          </>
          )}
        </Modal>

        {/* Uploaded Files Display */}
        <div id="file-list" className="space-y-4 w-full">
          {files.map(({ file, progress }) => (
            <section
              key={file.name}
              className="bg-[#F5F5F5] border border-[#DADADA] rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={handleFileImage(file.name || file.type)} alt="file icon" />
                  <div>
                    <p className="text-sm font-bold text-black underline cursor-pointer" onClick={() => handlePreview(file)}>{file.name}</p>
                    <p className="text-xs text-[#4A4A4A]">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(file)}
                  className="delete-btn bg-white rounded cursor-pointer"
                >
                  <img src="/delete-icon.svg" alt="delete icon" />
                </button>
              </div>
              {progress !== 100 && <div className="w-full h-2 bg-[#FCF4E9] rounded-full overflow-hidden mt-[12px]">
                <div
                  className="progress-bar h-full bg-[#EDA133] rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

