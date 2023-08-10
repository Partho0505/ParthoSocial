import { useRef } from "react";
import "./register.css"
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.current.value !== confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("Passwords don't match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post("/auth/register", user);
                navigate("/login");

            }catch(err){
                console.log(err);
            }
        }
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">ParthoSocial</h3>
                <span className="loginDesc">Connect with friends and the world around you on ParthoSocial</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Username" ref={username} type="text" className="loginInput" required/>
                    <input placeholder="Email" ref={email} type="email" className="loginInput" required/>
                    <input placeholder="Password" ref={password} type="password" className="loginInput" required minLength={6}/>
                    <input placeholder="Confirm Password" ref={confirmPassword} type="password" className="loginInput" required minLength={6}/>
                    <button className="loginButton" type="submit">Sign Up</button>
                    <Link to={"/login"}>
                        <button className="loginRegisterButton">Log into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
