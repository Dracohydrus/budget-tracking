import "./Settings.css";
import { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/user/Context";
import { isValidPassword } from "../../utils/password";
import toast from '../../utils/toast';
import { userUpdate } from "../../context/user/Actions";
import Icon from '../../components/basic/Icon';

const Settings = () => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { user, dispatch } = useContext(Context);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  useEffect(() => {
    if (!user) return
    usernameRef.current.value = user.username
    emailRef.current.value = user.email
  }, [user]);


  const onUpdate = async (e) => {
    e.preventDefault();
    if (!usernameRef.current.value || usernameRef.current.value === user?.username) return;
    if (!emailRef.current.value || emailRef.current.value === user?.email) return;
    if (!passwordRef.current.value) return;
    if (!passwordConfirmationRef.current.value) return;
    if (!passwordCheck()) return;

    axiosInstance
      .put("/user/" + user._id, {
        userId: user._id,
        username: usernameRef.current.value !== user?.username ? usernameRef.current.value : null,
        email: emailRef.current.value !== user?.email ? emailRef.current.value : null,
        password: passwordRef.current.value || null,
      })
      .then((res) => {
        dispatch(userUpdate(res.data))
        toast.success("User Updated")
      })
      .catch((err) => {
        toast.error("Unable to Update User")
        console.error(err)
      });
  };

  const passwordCheck = () => {
    setPasswordErrorMessage("");
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmationRef.current.value;
    if (!password && !passwordConfirm) return true;

    const { success, error = "" } = isValidPassword(password, passwordConfirm);
    if (success) return true;
    setPasswordErrorMessage("* " + error);
    return false;
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={() => alert("Not implemented yet")}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={onUpdate}>
          <div className="settingsProfilePicture">
            <label htmlFor="fileInput">
              <Icon className="settingsProfilePictureIcon far fa-user-circle" />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} ref={usernameRef} />
          <label>Email</label>
          <input type="text" placeholder={user.email} ref={emailRef} />
          <label>Password</label>
          <input type="password" ref={passwordRef} onChange={passwordCheck} />
          <label>Confirm Password</label>
          <input type="password" ref={passwordConfirmationRef} onChange={passwordCheck} />
          <label style={{ fontSize: "1rem", color: "red", margin: "0", height: "20px", }}>
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
