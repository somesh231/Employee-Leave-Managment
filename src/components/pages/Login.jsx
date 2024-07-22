import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../images/pieces-blue-stationery.jpg";
import "../../Styles/LoginStyle.css";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

axios.defaults.baseURL = "";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {storetokenInLS} = useAuth();

  const navigate = useNavigate();
  // const href = useHref();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });

      console.log(res);

      if (res.ok){
        const data = await res.json();
        toast.success("Login Successfully",{autoClose:"1s"})
        storetokenInLS(data.token);
        navigate("/home");
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      console.error(err);
    }
  };

  return (
    <>
      <div className="main-log-sec" style={{ height: "cover" }}>
        <div className="log-form-sec">
          <h1 className="main-heading mb3">Login form</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                id="email"
                required
                value={user.email}
                onChange={handleInput}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Login now
            </button>
            <button type="submit" className=" btn btn-submit-register" style={{position:"relative",left:"450px",top:"90px",width:"150px",height:"50px",fontSize:"20px"}} onClick={()=>{navigate("/register")}}>
              Register now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;