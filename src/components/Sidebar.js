import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import HistoryIcon from '@mui/icons-material/History';
import {Link} from "react-router-dom";


const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{background:"midnightblue"}}>
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link" style={{textDecoration:"none"}}>
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Leave Approval</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Img" />
      </div>
      <div className="info">
        <a href="/" className="d-block" style={{textDecoration:"none"}}>Somesh Sharma</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" style={{background:"white"}}/>
        <div className="input-group-append">
          <button className="btn btn-sidebar" style={{background:"steelblue"}}>
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item">
          <Link to="/home" className="nav-link ">
          <i class="bi bi-person-check" style={{fontSize:"20px"}}></i>
            <Link style={{marginLeft:"6px",textDecoration:"none"}} to="/home">
              Apply Leave
            </Link>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/history" className="nav-link">
            <HistoryIcon/>
            <Link style={{marginLeft:"6px",textDecoration:"none"}} to="/history">
              Leave History
            </Link>
          </Link>
        </li>
        
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </div>
  )
}

export default Sidebar
