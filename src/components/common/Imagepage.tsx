import React, { useState } from "react";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";

function Imagepage() {
  const [getImages, setgetImages] = useState();

  const gsReference = ref(
    storage,
    "gs://householdtypescript-7b64f.appspot.com"
  );
  return (
    <div>
      getImages
      {/* <img src={gsReference} alt="image" /> */}
    </div>
  );
}

export default Imagepage;
