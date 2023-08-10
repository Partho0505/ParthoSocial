import React, { useState } from "react";
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="logo">ParthoSocial</span>
          </Link>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon" />
            <input placeholder="Search from friend, post or video" type="text" className="searchInput" />
          </div>
        </div>

        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>

          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsActiveIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>

          <div className="topbarUser">
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" onClick={handleMenuToggle} />
            {showMenu && (
              <ul className="topbarDropdown">
                <li className="topbarDropdownItem">
                  <Link to={`/profile/${user.username}`} className="topbarDropdownLink">
                    <PersonIcon className="topbarDropdownIcon"/>
                    My Profile
                  </Link>
                </li>
                <li className="topbarDropdownItem">
                  <button onClick={logoutUser} className="topbarDropdownLink logoutButton">
                  <ExitToAppIcon className="topbarDropdownIcon" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

