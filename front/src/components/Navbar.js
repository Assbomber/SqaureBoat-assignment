import styled from "styled-components";
import Cookies from 'universal-cookie';
import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";
import {BACK_URL} from "../constants.js";
import Message from "./message.js";
import axios from "axios";
function Navbar() {
    const [logout,setLogout]=useState(false);
    const [search,setSearch]=useState("");
    const [people,setPeople]=useState([]);
    const [msg,setMsg]=useState("");
    const cookies=new Cookies();
    const token=cookies.get("token");
    function signout(){
        cookies.remove('token', { path: '/' });
        cookies.remove('id', { path: '/' });
        setLogout(true);
    }


    function handleClose() {
        setMsg("");
    }

    useEffect(()=>{
        async function getPeople(){
            try{
                const res=await axios.get(`${BACK_URL}/user/find/${search}`,{headers:{token:token}});
                if(res.status===200) setPeople(res.data);
            }catch(e){
                // console.log(e.message);
            }
        }
        getPeople();
    },[search])


    async function follow(id){
        console.log("follow",id);
        try{
                const res=await axios.put(`${BACK_URL}/user/follow/${id}`,{},{headers:{token:token}});
                if(res.status===200){ setMsg("You are following this user. You'll be seeing future status updates from this user");
                    setSearch("")
                }
            }catch(e){
                setMsg(e.response.data);
            }
    }

    return (
        <div>
            {msg ? <Message message={msg} close={handleClose}/>:
            <Container>
         {logout && <Navigate to="/login"/>}
            <div>
                <h1>.AMAN</h1>
                <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search your friends"/>
            </div>
             {search && 
             <People>
                 {people.length===0 && "No one found"}
                 {people.map((item,idx)=>{
                     return <Person>
                     <p>👨 {item.username} </p>
                     <button onClick={()=>follow(item._id)}>Follow</button>
                     </Person>
                 })}
             </People>}
            <div onClick={()=>signout()}>Logout</div>
           
        </Container>}
        </div>
        
        
        
    )
}

export default Navbar

const Container=styled.div`
    padding:0 5%;
    width: 100%;
    position: relative;
    height: 50px;
    background-color:#F7D08A;
    box-shadow: 0px 2px 35px -15px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 2px 35px -15px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 35px -15px rgba(0,0,0,0.75);
    display:flex;
    justify-content:space-between;
    align-items:center;
    @media only screen and (max-width:768px){
        h1{
            font-size: 20px;
        }
    }
    &>div:first-child{
        display:flex;
        align-items:center;
        position:relative;
        input{
            position:relative;
            color:grey;
            width:100%;
            margin:0 10px;
            padding:10px;
            border:none;
            outline:none;
            border-radius: 5px;
            
        }
    }
    &>div:last-child{
        background-color:#8E0505;
        border-radius: 5px;
        padding:5px;
        color:white;
        font-size: 14px;
        &:hover{
            transform:scale(1.02);
            transition-duration: 0.2s;
            cursor:pointer;
        }
    }
`;

const People=styled.div`
    width: 100%;
    max-width:400px;
    max-height: 300px;
    position:absolute;
    top:50px;
    border:1px solid rgba(0,0,0,0.5);
     border-top:none;
    border-radius: 0 0 10px 10px;
    background-color: white;
    z-index:10;
    background-color:#F7D08A;
    overflow-y: scroll;
    padding:10px;

`;
const Person=styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.5);
    padding:5px;
    display:flex;
    justify-content: space-between;
`;
