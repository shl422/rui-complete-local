import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    
    <div>
    <div className="header" />
    <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
    <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
      <div className="spinner diagonal part-1" />
      <div className="spinner horizontal" />
      <div className="spinner diagonal part-2" />
    </label>
    <div id="sidebarMenu">
      <ul className="sidebarMenuInner">
        <li>Jelena Jovanovic <span>Web Developer</span></li>
        <li><a href="https://vanila.io" target="_blank">Company</a></li>
        <li><a href="https://instagram.com/plavookac" target="_blank">Instagram</a></li>
        <li><a href="https://twitter.com/plavookac" target="_blank">Twitter</a></li>
        <li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">YouTube</a></li>
        <li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">Linkedin</a></li>
      </ul>
    </div>
    <div id="center" className="main center">
      <div className="mainInner">
        <div>PURE CSS SIDEBAR TOGGLE MENU</div>
      </div>
      <div className="mainInner">
        <div>PURE CSS SIDEBAR TOGGLE MENU</div>
      </div>
      <div className="mainInner">
        <div>PURE CSS SIDEBAR TOGGLE MENU</div>
      </div>
    </div>
  </div>
);
}


export default Dashboard;