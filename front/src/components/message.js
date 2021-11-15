import styled from "styled-components";

function Message(props) {
    return (
        <Container>
            <section>
            <button onClick={()=>props.close()}>X</button>
            <h2>*Note</h2>
                <p>{props.message}</p>
            </section>
        </Container>
    )
}

export default Message


const Container =styled.div`
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: 10;
    display:flex;
    justify-content: center;
    align-items:center;
    transition-duration: 0.5;
    section{
        position :relative;
        max-width: 300px;
        padding:20px;
        border-radius: 10px;
        background-color: white;
        button{
            position : absolute;
            top:10px;
            padding:0 2px;
            right:10px;
        }
    }
`;