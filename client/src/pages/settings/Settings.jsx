import SideBar from '../../components/sidebar/SideBar';
import './Settings.css'

const Settings = () => {
  return (
      <div className="settings">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
              <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form action="" className="settingsForm">
              <div className="settingsProfilePicture">
                <label htmlFor="fileInput">
                  <i class="settingsProfilePictureIcon far fa-user-circle"></i>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}} />
              </div>
              <label>Username</label>
              <input type="text" placeholder="Kris" />
              <label>Email</label>
              <input type="text" placeholder="dracokris123@gmail.com" />
              <label>Password</label>
              <input type="password" />
              <button className="settingsSubmit">Update</button>
            </form>
          </div>
          <SideBar />
      </div>
  )
};

export default Settings;
