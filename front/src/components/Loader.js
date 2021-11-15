import styled from "styled-components";

function Loader(props) {
    return (
        <Container>
            <section>
            <img src="https://acegif.com/wp-content/uploads/loading-36.gif" alt=""></img>
            </section>
        </Container>
    )
}

export default Loader


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
        max-width: 100px;
        img{
            width: 50px;
        }
    }
`;