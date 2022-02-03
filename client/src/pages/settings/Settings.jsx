import "./Settings.css";
import { useContext, useRef, useState } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import { isValidPassword } from "../../helpers/password";

const Settings = () => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { user, dispatch } = useContext(Context);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const onUpdate = async (e) => {
    e.preventDefault();
    if (
      !usernameRef.current.value &&
      !emailRef.current.value &&
      !passwordRef.current.value &&
      !passwordConfirmationRef.current.value
    ) {
      return;
    }

    if (!passwordCheck()) return;

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

  const passwordCheck = () => {
    setPasswordErrorMessage("");
    if (!passwordRef.current.value && !passwordConfirmationRef.current.value)
      return true;
    const { success, error = "" } = isValidPassword(
      passwordRef.current.value,
      passwordConfirmationRef.current.value
    );
    if (success) return true;
    setPasswordErrorMessage("* " + error);
    return false;
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span
            className="settingsDeleteTitle"
            onClick={() => alert("Not implemented yet")}
          >
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
          <input
            type="password"
            ref={passwordRef}
            onChange={passwordCheck}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            ref={passwordConfirmationRef}
            onChange={passwordCheck}
          />
          <label
            style={{
              fontSize: "1rem",
              color: "red",
              margin: "0",
              height: "20px",
            }}
          >
            {passwordErrorMessage}
          </label>
          <button type="submit" className="settingsSubmit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
