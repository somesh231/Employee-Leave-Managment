import React, { useEffect, useState } from "react";
import "../Styles/HomeStyle.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth } from "../store/auth";


const Home = () => {

  const {user} = useAuth();
  const {token} = useAuth();
  const [Employeeform,setEmployeeform] = useState({
    EmpName:"",
    EmpId:"",
    StartingDate:"",
    EndingDate:"",
    LeaveType:"",
    Description:"",
  });

  const [countSubmissions, setCountSubmissions] = useState(1);

  const handleInput = (e) => {
    e.preventDefault();
    
    if (e.target.type === 'select-one') {
      setEmployeeform((prevForm) => ({ ...prevForm, LeaveType: e.target.value }));
      setEmployeeform((prev)=>({...prev,EmpId:user._id,EmpName:user.name}));
    } else {
      setEmployeeform((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
      setEmployeeform((prev)=>({...prev,EmpId:user._id,EmpName:user.name}));
    }
  };


  const handleSubmit= async(e)=>{
    try{
      e.preventDefault();

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("http://localhost:5000/api/empleav/empleavform",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(Employeeform),
      });

      console.log(response);

      if(response.ok){
        setCountSubmissions(countSubmissions + 1);
      }

      const data = await response.json();
      console.log(data);

      // if(response.data.success){
      //   alert("Your leave applied successfully.Wait for Admin Approval");
      // }
      // console.log(response);
    }catch(err){
      console.error(err);
    }
  }

  const updateCountLeave = async()=>{
    const response = await fetch(`http://localhost:5000/api/auth/countLeave`,{
      method:"PUT",
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
            CountLeave: countSubmissions,
      }),
    })

    console.log(response);

    if(response.ok){
      const data =await response.json();
      console.log(data);
    }
  }

  



  // useEffect(()=>{
  //   await axios.get("/empleav/count")
  // })

  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Apply Leave</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/home">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Apply Leave</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}

            {/*main form*/}
            <div
              className="form-content"
              style={{
                height: "660px",
                width: "600px",
                padding: "40px 20px",
                position: "relative",
                left: "330px",
                top: "70px",
                color:"black",
                backgroundColor: "#90e0ef",
                marginBottom:"200px",
                borderRadius:"20px",
                boxShadow:"-4px 5px 19px -4px #000000"
              }}
            >
              <form onSubmit={handleSubmit}>
                <h3>Employee Leave Form</h3>
                <h6>Please fill up the form</h6>
                <br />
                <div className="mb-3">
                  <label htmlFor="exampleInputDate1" className="form-label">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputDate1"
                    aria-describedby="DateHelp"
                    name="StartingDate"
                    value={Employeeform.StartingDate}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputDate2" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputDate2"
                    aria-describedby="DateHelp"
                    name="EndingDate"
                    value={Employeeform.EndingDate}
                    onChange={handleInput}
                  />
                </div>
                <label for="Leave-Type" className="form-label">
                  Your Leave Type
                </label>
                <br />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Employeeform.LeaveType}
                      label="Age"
                      name="LeaveType"
                      onChange={handleInput}
                      style={{backgroundColor:"white"}}
                    >
                      <MenuItem value={"select"}>Click here to select any...</MenuItem>
                      <MenuItem value={"Casual"}>Casual Leave</MenuItem>
                      <MenuItem value={"Medical"}>Medical Leave</MenuItem>
                      <MenuItem value={"Restricted"}>Restricted Holiday</MenuItem>
                      <MenuItem value={"Paternity"}>Paternity Leave</MenuItem>
                      <MenuItem value={"Bereavement"}>Bereavement Leave</MenuItem>
                      <MenuItem value={"Compensatory"}>Compensatory Leave</MenuItem>
                      <MenuItem value={"Maternity"}>Maternity Leave</MenuItem>
                      <MenuItem value={"Religious"}>Religious Holiday</MenuItem>
                      <MenuItem value={"Adverse Wheather"}>Adverse Wheather Leave</MenuItem>
                      <MenuItem value={"Voting"}>Voting Leave</MenuItem>
                      <MenuItem value={"Self-Quarantine"}>Self-Quarantine Leave</MenuItem>
                      <MenuItem value={"Personal Time"}>Personal Time Off</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br/>
                <div className="condition-Para">
                <label for="Leave-Type" className="form-label">
                  Describe Your Conditions
                </label>
                <br/>
                <textarea id="w3review" name="Description" rows="4" cols="50" style={{width:"100%"}}  value={Employeeform.Description} onChange={handleInput}></textarea>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" onClick={updateCountLeave}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
};

export default Home;
