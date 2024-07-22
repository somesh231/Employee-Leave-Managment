import React, { useState } from "react";
import "../../images/pieces-blue-stationery.jpg";
import "../../Styles/RegisterStyle.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/auth"
const Register = ()=>{

    const [user,setUser] = useState({
        name:"",
        username:"",
        email:"",
        phone:"",
        role:"",
        password:"",
    });

    const {storetokenInLS} = useAuth();

    const navigate = useNavigate();

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
        const response = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify(user),
        })

        const res_data = await response.json();
        console.log(response); 
        if(response.ok){
            setUser({
                name:"",
                username:"",
                email:"",
                phone:"",
                role:"",
                password:"",
            })
            storetokenInLS(response.data.token);
            toast.success("registration successfull")
            navigate("/login")   
        }else{
            toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
        }
    }catch(err){
        console.log(err);
    }

    }

    return (
        <>
                <div className="main-reg-sec" style={{height:"cover"}}>
                    <div className="reg-form-sec">
                    <h1 className="main-heading mb3">registration form</h1>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="name">Name</label>
                            <br/>
                            <input
                                type = "text"
                                name = "name"
                                placeholder="name"
                                id = "name"
                                required
                                autoComplete="off"
                                value={user.name}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <br/>
                            <input
                                type = "text"
                                name = "username"
                                placeholder="username"
                                id = "username"
                                required
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input
                                type = "email"
                                name = "email"
                                placeholder="enter your email"
                                id = "email"
                                required
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <br/>
                            <input
                                type = "number"
                                name = "phone"
                                placeholder="enter your phone number"
                                id = "phone"
                                required
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="role">Role</label>
                            <br/>
                            <input
                                type = "text"
                                name = "role"
                                placeholder="role"
                                id = "role"
                                required
                                autoComplete="off"
                                value={user.role}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <br/>
                            <input
                                type = "password"
                                name = "password"
                                placeholder="password"
                                id = "password"
                                required
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-submit">Register now</button>
                    </form>
                    </div>
                </div>
        </>
    )
}

export default Register;