// components/ImageUploader.tsx
import { uploadFile } from "@/utils/lib/uploadFile";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ImageUploader({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.includes("image/")) {
      alert("Chỉ hỗ trợ ảnh!");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Ảnh phải nhỏ hơn 5MB!");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      toast.success("Upload image successfully!");
      onUploadComplete(url);
    } catch (err) {
      toast.error("Upload image failed!");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-md border"
        />
      )}
      {file && (
        <button
          onClick={handleUpload}
          className="bg-black text-white px-4 py-2 rounded-md mt-2"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
}
