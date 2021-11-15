import styled from "styled-components";
import Left from "./Left.js";
import Right from "./Right.js";
import {useState,useEffect} from "react";
import Cookies from 'universal-cookie';
import {BACK_URL} from "../constants.js";
import axios from "axios";
import {Navigate} from "react-router-dom";
import Message from "./message.js";

function Body(props) {
    const [msg,setMsg]=useState("");
    const [user,setUser]=useState(true);
    const [userDetails,setUserDetails]=useState();
    const [posts,setPosts]=useState([]);
    const [sortedPost,setSortedPost]=useState([]);
    const cookies = new Cookies();
    const id=cookies.get("id");
    const token=cookies.get("token");

     //Handle Close----------------------------------------------
    function handleClose() {
        setMsg("");
    }
    //UseEffect--------------------------------
    useEffect(()=>{
        if(cookies.get("token")){
            async function getUser(){
                try{
                    
                    const res=await axios.get(`${BACK_URL}/user/${id}`,{headers:{token:token}});
                    const res2=await axios.get(`${BACK_URL}/post/feed`,{headers:{token:token}});
                    if(res.status===200){
                        setUser(true);
                        setUserDetails(res.data);
                        setPosts(res2.data);
                    } else setUser(false);
                }catch(e){
                    setUser(false);
                    // console.log(e.message);
                }       
            }
            getUser();
        }else setUser(false);
    },[])

    useEffect(()=>{
        console.log("sorting");
        console.log(posts);
        const sortPost=posts.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt)
        })
        setSortedPost(sortPost);
    },[posts]);

    //Add post----------------------------------------------------
    async function addPost(post){
        try{
       const res=await axios.post(`${BACK_URL}/post`,{username:userDetails.username,title:post.title,desc:post.desc},{headers:{token:token}});
       if(res.status===200) setPosts([...posts,res.data]);
        }catch(e){
            setMsg(e.response.data);
        }
    }

    //Remove Post-------------------------------------------------
    async function removePost(id){
        try{
       const res=await axios.delete(`${BACK_URL}/post/${id}`,{headers:{token:token}});
       if(res.status===200){
           setMsg(res.data);
           const filteredPosts=posts.filter(post =>{
               if(post._id===id) return false;
               else return true;
           })
           setPosts(filteredPosts);
       }
        }catch(e){
            setMsg(e.response.data+ ". User only is allowed to remove his own posts");
        }
    }
    return (
        <div>
            {msg ? <Message message={msg} close={handleClose}/>:
            <Container>
        
        {!user && <Navigate to="/login"/> }
            <Left user={userDetails} poster={addPost} />
            <Right posts={sortedPost} remover={removePost} />
        </Container>}
        </div>
        
    )
}

export default Body

const Container=styled.div`
    max-width:1094px;
    width:100%;
    background-color:#FEF5ED;
    position:relative;
    margin:40px auto;
    padding:20px;
    border-radius: 10px;
    box-shadow: 0px 2px 35px -8px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 2px 35px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 35px -8px rgba(0,0,0,0.75);
    display:flex;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
