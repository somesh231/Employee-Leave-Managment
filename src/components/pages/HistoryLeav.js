import  React, {useEffect,useState} from 'react';  
import { Link } from '@mui/material';
import "../../Styles/HistoryLeavStyle.css"
import { useAuth } from '../../store/auth';


const HistoryLeav=()=>{



  const {user} = useAuth();
  const {token} = useAuth();
  const [dataList,setDataList] =useState([]);

  
  
  const getEmpleavData=async()=>{
    try{
     const response = await fetch("http://localhost:5000/api/empleav/",{
      method:"GET",
      headers:{
            Authorization:`Bearer ${token}`,
      },
     }
    )
    if(response.ok){
      const data = await response.json();
      const filteredData = data.data.filter((item)=>item.EmpId===user._id);
      setDataList(filteredData);
    }}catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getEmpleavData();
  },[dataList]);

  
    return(
        <>
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Leave History</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active"></li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
         {/* Main content */}
         <div className="main-sec-dep">
          <table class="table">
            <thead>
              <tr className="table-row" >
                <th scope="col" style={{ width: "150px",fontStyle:"normal"}}>
                  Starting<br />Date
                </th>
                <th scope="col" style={{ width: "150px" }}>
                  Ending
                  <br />
                  Date
                </th>
                <th scope="col" style={{ width: "320px" }}>
                  Description
                </th>
                <th scope="col" style={{ width: "120px" }}>
                  Leave Type
                </th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el)=>{
                if(el){
                  return(
                    <tr className="table-row">
                    <td>{el.StartingDate}</td>
                    <td>{el.EndingDate}</td>
                    <td>{el.Description}</td>
                    <td className="name-admin" >{el.LeaveType}</td>
                    <td></td>
                    <td>{el.Status}</td>
              </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      {/* /.main-content */}
      </div>
        </>
    )
}

export default HistoryLeav;
