import styled from "styled-components";
import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import Message from "../components/message.js";
import Loader from "../components/Loader.js";
import {BACK_URL,validateEmail} from "../constants.js";
import axios from "axios";
import Cookies from 'universal-cookie';

function Register() {
  const [load,setLoad]=useState(false);
    const [msg,setMsg]=useState("");
    const [user,setUser]=useState();
    const [newUser,setNewUser]=useState({username:"",password:"",email:""});
    const cookies = new Cookies();
    const [redirect,setRedirect]=useState(false);

    //Message Close----------------------------------------------
    function handleClose() {
        setMsg("");
    }
    //Handle Inputs---------------------------------------------
    function handleInputs(e){
        setNewUser({...newUser,[e.target.name]:e.target.value});
    }
    function redirection(){
        setTimeout(()=>{
            setRedirect(true);
        },3000)
    }
    
    //Handle register---------------------------------------------
    async function handleRegister(){
        if(newUser.username && newUser.password && newUser.email){
            setLoad(true);
            try{
                if(!validateEmail(newUser.email)) {setMsg("Please correctly format the email");
                console.log("valuda")
                setLoad(false);
                return;
            }
            const response=await axios.post(`${BACK_URL}/auth/register`,{...newUser});
                console.log(response);
                if(response.status===200){setMsg("User Successfully Registered. Redirecting to Login in 3 Seconds.");
                    redirection();
                }
                else setMsg(response.data);
                setLoad(false);
            }catch(e){
                setMsg(e.response.data);
                setLoad(false)
            }
            
        }else setMsg("All Fields are required");
        setLoad(false);
    }

    //Use effect------------------------------------------------
    useEffect(()=>{
        if(cookies.get("token")) setUser(true);
    },[])

    //Component------------------------------------------------
    return (
        <div>
        {redirect && <Navigate to="/login"/>}
        {load && <Loader/>}
            {user && <Navigate to="/"/>}
            {msg? <Message close={handleClose} message={msg}/>:
            <Container>
            <a href="https://github.com/assbomber">Aman kumar</a>
            <div>
                <h2>Register</h2>
                <Form>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input id="username" name="username" onChange={(e)=>handleInputs(e)} type="text" value={newUser.username}  placeholder="Enter your username"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input id="email" name="email" type="email" onChange={(e)=>handleInputs(e)} value={newUser.email} placeholder="Enter your email"></input>
                    </div>
                     <div>
                        <label htmlFor="pass">Password: </label>
                        <input id="pass" name="password" type="password" onChange={(e)=>handleInputs(e)} value={newUser.password} placeholder="Enter your password"></input>
                    </div>
                    <p> By Signing up you agree to the our terms and conditions.</p>
                    <a href="/login">Already a user? Login</a>
                </Form>
                <button onClick={()=>handleRegister()}>REGISTER</button>
            </div>
        </Container>}
        </div>
        
    )
}

export default Register

const Container=styled.div`
    width:100%;
    height:100vh;
    background-color:#EEEEEE;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    position: relative;
    &>a{
        position:absolute;
        bottom:10px;
        right:10px;
    }
    &>div{
        padding:20px;
        width: 100%;
        max-width:450px;
        background-color: #FED2AA;
        border-radius: 10px;
        box-shadow: 2px 3px 19px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 2px 3px 19px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 3px 19px 0px rgba(0,0,0,0.75);
        &>h2{
            margin-bottom: 10px;
        }

        &>button{
            background-color: #00A19D;
            width: 100%;
            height:50px;
            border-radius:10px;
            border:none;
            color:white;
            cursor:pointer;
            font-size: 16px;
            margin:10px 0;
            &:hover{
                transform:scale(1.01);
                transition-duration: 0.2s;
            }
        }
    }

`;

const Form=styled.div`
    &>div{
        display:flex;
        align-items:center;
        margin:10px 0;
        label{
            flex:1;
            text-align:left;
        }
        input{
            flex:3;
            padding:10px;
            border-radius: 10px;
            border:none;
            
        }
    }
    &>p,&>a{
        font-size: 14px;
        margin:10px 0;
    }

`;