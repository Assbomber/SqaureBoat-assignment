import styled from "styled-components";
function Right(props) {
    return (
        <Container>
        {props.posts.length===0 && <p style={{"color":"grey","text-align": "center"}}>No Posts to show. Start following someone or make your own post.</p>}
        {props.posts.map((item,idx)=>{
            return <Post key={idx}>
                <img onClick={()=>props.remover(item._id)} src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_trash-2-512.png" alt=""/>
                <h4>👨 {item.username}</h4>
                <h6>{item.createdAt}</h6>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
            </Post> 
        })}
            
        </Container>
    )
}

export default Right

const Container=styled.div`
    flex:2;
    /* background-color:grey; */
    padding-left:20px;
    @media only screen and (max-width: 768px){
        padding:0;
        margin:20px 0;
    }
`;



const Post=styled.div`
    border-radius: 10px;
    background-color:white;
    padding:10px;
    margin:10px 0;
    position: relative;
    &>h6{
        color:rgba(0,0,0,0.5);
        margin:5px 0;
    }
    &>img{
        width:30px;
        height:30px;
        position: absolute;
        top:10px;
        right:10px;
    }
`;
