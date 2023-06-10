"use client";

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const uploadPhoto = useCallback(
    (e: any) => {
      const file = e.target.files[0];
      // onChange(URL.createObjectURL(file));
      onChange(file);
      /* const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        onChange(imageUrl);
      };
      if (file) {
        reader.readAsDataURL(file);
      } */
    },
    [onChange]
  );

  return (
    <label
      onClick={() => {}}
      className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
    >
      <TbPhotoPlus size={50} />
      <input type="file" className="hidden" onChange={uploadPhoto} />
      <div className="font-semibold text-lg">Click to upload</div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <img
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
            src={URL.createObjectURL(value)}
            alt="House"
          />
        </div>
      )}
    </label>
  );
};

export default ImageUpload;
