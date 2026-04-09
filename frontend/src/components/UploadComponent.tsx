import { useState } from 'react';

interface Claim {
  claim_text: string;
  theme: string;
  confidence: number;
  metrics?: string | null;
}

interface UploadComponentProps {
  onClaimsExtracted?: (claims: Claim[]) => void;
  onLoading?: (isLoading: boolean) => void;
}

export default function UploadComponent({ onClaimsExtracted, onLoading }: UploadComponentProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    onLoading?.(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);

      if (data.success && data.claims) {
        onClaimsExtracted?.(data.claims);
      }

      setTimeout(() => {
        setIsUploading(false);
        onLoading?.(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      setIsUploading(false);
      onLoading?.(false);
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-surface-variant bg-surface-container/50 hover:border-primary/50'
        }`}
      >
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm" />

        <div className="relative z-10">
          <div className="mb-4 flex justify-center">
            <span className="material-symbols-outlined text-primary text-6xl">cloud_upload</span>
          </div>

          <h3 className="text-xl font-semibold text-white font-headline">Upload CSR Document</h3>
          <p className="mt-2 text-[#a7aca9]">
            Drag and drop your PDF here, or click to select
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            disabled={isUploading}
            className="absolute inset-0 cursor-pointer opacity-0"
          />

          <button
            disabled={isUploading}
            className="mt-4 rounded-lg bg-[#46ff78] px-6 py-2 font-semibold text-[#005d23] transition-all hover:bg-[#06ee65] disabled:bg-[#202724]"
          >
            {isUploading ? 'Uploading...' : 'Select PDF'}
          </button>

          {/* Progress bar */}
          {isUploading && uploadProgress > 0 && (
            <div className="mt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-surface-variant">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-[#a7aca9]">{uploadProgress}%</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-[#ff716c]/50 bg-[#ff716c]/10 p-4 text-[#ffa8a3]">
          {error}
        </div>
      )}
    </div>
  );
}
