"use client";
import { faLock, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import { useNotificationContext } from "context/notificationContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios-base";
import base from "lib/base";
import { updateUser } from "lib/actionFetch";
import Spinner from "components/Generals/Spinner";

export default function RootLayout({ children }) {
  const { user, loading } = useAuthContext();
  const { contentLoad, setError, setAlert } = useNotificationContext();
  const [imageUrl, setImageUrl] = useState();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  // Config
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setLoader(true);
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload/memberupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}/${res.data.data}`,
      };
      await updateUser(user, { picture: img.name });
      setImageUrl(img);
      setAlert(res.data.data + " Хуулагдлаа");
      setLoader(false);
      return img;
    } catch (err) {
      setError(err);
      setLoader(false);
      return false;
    }
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove("cover", file),
    fileList: imageUrl && imageUrl.name && [imageUrl],
    customRequest: (options) => uploadImage(options),
    accept: "image/*",
    name: "avatar",
    listType: "picture",
    maxCount: 1,
  };

  const uploadButton = (
    <div className="upload-picture">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div> Хуулах </div>
    </div>
  );

  useEffect(() => {
    if (user && user?.picture) {
      setImageUrl({ url: base.cdnUrl + "/350x350/" + user.picture });
    }
  }, [user]);

  if (contentLoad || !user)
    return (
      <>
        <section className="profile-section">
          <div className="container">
            <div className="row">
              <Loader />
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-md-9">
              <div className="user-box">
                <h4> Хувийн мэдээлэл </h4>
                <div className="userData-box">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="pro-box user-info">
                        <div className="user-profile">
                          {loader && <Spinner />}
                          <Upload
                            {...uploadOptions}
                            name="picture"
                            showUploadList={false}
                            className="upload-list-inline"
                          >
                            {imageUrl ? (
                              <img src={imageUrl.url} className="pic-img" />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </div>
                        <p className="username">
                          {user &&
                            user.lastName &&
                            user.lastName.substring(0, 1).toUpperCase() +
                              "." +
                              user &&
                            user.name &&
                            user.name.toUpperCase()}
                        </p>
                        <span> {user && user.email} </span>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6">
                          <Link href="/profile/info" className="user-dt-link">
                            <div className="pro-box user-details">
                              <FontAwesomeIcon icon={faUserAlt} />
                              <h6> Хувийн мэдээлэл </h6>
                              <span> Мэдээлэл засах </span>
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/profile/password"
                            className="user-dt-link"
                          >
                            <div className="pro-box  user-details">
                              <FontAwesomeIcon icon={faLock} />
                              <h6> Нууц үг </h6>
                              <span> Шинэчлэх </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
