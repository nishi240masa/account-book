import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import Imagepage from "../components/common/Imagepage";

// 画像をアップロードするコンポーネント
function ImageStorage() {
  const [image, setImage] = useState<File>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // formの送信処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (!image) return;
      const imageRef = ref(storage, image.name);
      // 画像をアップロードする処理を書く
      uploadBytes(imageRef, image).then(() => {
        console.log("Uploaded a file!");
      });
    } catch (err) {
      console.log(err);
    }
    //imgaeが存在しない場合は処理を終了
    e.preventDefault();

    console.log(image);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button className="button">送信</button>
      </form>
      <Imagepage />
    </div>
  );
}

export default ImageStorage;
