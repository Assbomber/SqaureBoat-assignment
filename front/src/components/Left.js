import styled from "styled-components";
import {useState} from "react";
function Left(props) {
    const [title,setTitle]=useState();
    const [desc,setDesc]=useState();
    return (
        <Container>
            <User>
                <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt=""></img>
                <h3>{!props.user? "username": props.user.username}</h3>
            </User>
            <Post>
            <h2>What's up today?</h2>
            <NewPost>
                <div>
                    <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
                    <textarea rows="3" name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Status"/>
                </div>
                <button onClick={()=>props.poster({title,desc})}><img src="https://purepng.com/public/uploads/large/purepng.com-white-paper-planpaper-planeaeroplanepaper-gliderpaper-dartaircraftfolded-paperpaperboardclipartblack-1421526588365fbthe.png" alt=""></img></button>
            </NewPost>
            </Post>
            
        </Container>
    )
}

export default Left

const Container=styled.div`
    flex:1;
    position: sticky;
    top:0px;
    
`;

const User=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    &>img{
        width:100px;
        height:100px;
        border-radius: 50%;
    }
`;

const NewPost=styled.div`
    background-color:white;
    display:flex;
    border-radius: 10px;
    margin:10px 0;
    div{
        flex:1;
        input,textarea{
            border-radius: 0 0 0 10px;
            padding:10px;
            width:100%;
            border:none;
            outline:none;
            &:first-child{
                border-bottom: 1px solid rgba(0,0,0,0.5);
                border-radius: 10px 0 0 0;
            }
            
        }
    }
    button{
        background-color:#1597E5;
        border:none;
        outline:none;
        cursor:pointer;
        border-radius: 0 10px 10px 0;
        img{
            width:40px;
        }
        &:hover{
            transform:scale(1.02);
            transition-duration: 0.2s;
        }
    }
    
`;

const Post=styled.div`
    padding:10px;
    margin-top:20px;
    &>h2{
        text-align: center;
    }
`;


