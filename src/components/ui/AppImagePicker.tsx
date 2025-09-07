"use client";

import React from "react";
import dynamic from "next/dynamic";

// SSR-safe dynamic imports
const ImgCrop: any = dynamic(() => import("antd-img-crop"), { ssr: false });
const Upload: any = dynamic(() => import("antd/es/upload"), { ssr: false });

export type AppImagePickerProps = {
  fileList: any[];
  onChange: (fileList: any[]) => void;
  multiple?: boolean;
  crop?: {
    aspect?: number;
    shape?: "rect" | "round";
    quality?: number;
    modalTitle?: string;
  };
  button?: React.ReactNode;
  maxCount?: number;
  className?: string;
  onPreview?: (file: any) => void;
};

export default function AppImagePicker({
  fileList,
  onChange,
  multiple = true,
  crop,
  button,
  maxCount,
  className,
  onPreview,
}: AppImagePickerProps) {
  const handleChange = ({ fileList: nextFileList }: { fileList: any[] }) => {
    onChange(nextFileList);
  };

  const CropWrapper = ({ children }: { children: React.ReactNode }) => {
    // return <ImgCrop rotationSlider>{children}</ImgCrop>;
    if (!crop) return <>{children}</>;
    return (
      <ImgCrop
        aspect={crop.aspect}
        shape={crop.shape}
        quality={crop.quality}
        modalTitle={crop.modalTitle}
      >
        {children as any}
      </ImgCrop>
    );
  };

  return (
    <div className={className}>
      <CropWrapper>
        <Upload
          style={{
            width: "100%",
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          multiple={multiple}
          maxCount={maxCount}
          accept="image/*"
          // onPreview={onPreview}
        >
          {/* <div className="w-full h-full bg-yellow-700">Add image</div> */}
          {button ?? "+"}
        </Upload>
      </CropWrapper>
    </div>
  );
}
