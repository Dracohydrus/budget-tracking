import { useContext, useRef } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./Settings.css";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onUpdate = async (e) => {
    e.preventDefault();
    if (
      !usernameRef.current.value &&
      !emailRef.current.value &&
      !passwordRef.current.value
    ) {
      return;
    }

    axiosInstance
      .put("/user/" + user._id, {
        userId: user._id,
        username: usernameRef.current.value || null,
        email: emailRef.current.value || null,
        password: passwordRef.current.value || null,
      })
      .then((res) => {
        dispatch({ type: "USER_UPDATE", payload: res.data });
        return alert("User updated");
      })
      .catch((err) => console.log(err));
  };

  const onDelete = async (e) => {
    alert("Not implemented yet");
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={onDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={onUpdate}>
          <div className="settingsProfilePicture">
            <label htmlFor="fileInput">
              <i class="settingsProfilePictureIcon far fa-user-circle"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} ref={usernameRef} />
          <label>Email</label>
          <input type="text" placeholder={user.email} ref={emailRef} />
          <label>Password</label>
          <input type="password" ref={passwordRef} />
          <button type="submit" className="settingsSubmit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
