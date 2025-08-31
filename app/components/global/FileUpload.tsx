'use client'

import React, { useState, useRef } from "react";

interface UploadedFile {
  file: File;
  progress: number;
}

export default function FileUpload({ title, required }: { title: string, required: boolean }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((newFile, index) => {
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
  const handleDelete = (fileToDelete: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== fileToDelete));
  };


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
          className="border-2 w-full border-dashed border-[#EDA133] h-full rounded-xl p-8 text-center bg-[rgba(252,244,233,0.5)] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-6">
            <img src="/document-upload.svg" alt="document upload icon" />
            <div className="space-y-3">
              <p className="text-lg font-medium text-black">
                اسحب وأفلت ملفاتك، أو تصفح
              </p>
              <p className="text-sm text-[#393939]">
                الصيغة المدعومة: PDF، DOC
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Files Display */}
        <div id="file-list" className="space-y-4 w-full">
          {files.map(({ file, progress }) => (
            <section
              key={file.name}
              className="bg-[#F5F5F5] border border-[#DADADA] rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/pdf-doc.svg" alt="file icon" />
                  <div>
                    <p className="text-sm font-bold text-black">{file.name}</p>
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
              <div className="w-full h-2 bg-[#FCF4E9] rounded-full overflow-hidden mt-[12px]">
                <div
                  className="progress-bar h-full bg-[#EDA133] rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

