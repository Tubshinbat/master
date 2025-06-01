import { Upload, message } from "antd";
import axios from "axios-base";
import base from "lib/base";
import { useState } from "react";

export default function UploadImage({ value, onChange }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setLoading(true);
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) setTimeout(() => setProgress(0), 1000);
        onProgress({ percent });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload/memberupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}/${res.data.data}`,
      };
      onChange(img);
      message.success("Зураг амжилттай хуулагдлаа");
      setLoading(false);
    } catch (err) {
      message.error("Алдаа гарлаа");
      setLoading(false);
      onError(err);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <Upload
      customRequest={uploadImage}
      listType="picture"
      fileList={
        value
          ? [{ uid: "-1", name: value.name, status: "done", url: value.url }]
          : []
      }
      onRemove={handleRemove}
      accept="image/*"
      maxCount={1}
    >
      <div
        style={{
          border: "1px dashed #d9d9d9",
          padding: 16,
          textAlign: "center",
        }}
      >
        Зургаа оруулах эсвэл чирж оруулна уу.
      </div>
    </Upload>
  );
}
