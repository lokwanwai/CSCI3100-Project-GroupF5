import { useState, useEffect } from "react";
import axios from "axios";


//function needs to be Capital Letter in the first
const Profile = ({ userId, maskBackgroundRef }) => {
    const { showNotification } = useNotification();
  useEffect(() => {
    if (maskBackgroundRef.current) {
      maskBackgroundRef.current.scrollTo(0, 0);
    }
  }, [maskBackgroundRef]);

  return (
    <>
      <div className="col-lg-6" id="content">
          <ProfileContent/>
      </div>
    </>
  );
};

export default Profile;
