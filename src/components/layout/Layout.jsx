import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./Layout.module.css";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../../redux/authReducer/action";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout=()=>{
    dispatch(logout());
      navigate('/login');
  }

  return (
    <div className={styles.layout}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={styles.mainContent}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  handleLogout={handleLogout}/>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
