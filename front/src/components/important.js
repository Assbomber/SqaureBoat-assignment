import styled from "styled-components";

function Important(props) {
    return (
        <Container>
            <section>
            <button onClick={()=>props.close()}>X</button>
            <h2>IMPORTANT</h2>
            <ul>
                <li>This is a basic build of a social post app built for demonstration</li>
                <li>The front end has been deployed to firebase</li>
                <li>The backend has been deployed to Heroku</li>
                <li>I've used JWT for authentication</li>
                <li>Node for backend,Mongodb for database, React for frontend</li>
                <li>This does not uses a realtime database</li>
                <li>This website DOES NOT use any frontend UI toolkit, like Bootstrap, I wanted to use tailwindCSS but had no option to choose that.</li>
                <li>User can ONLY see his posts and the person he is following.</li>
                <li>Search allows you to search for other people and lets you follow them.</li>
                <li>I did'nt had enough time to show each functionality. For eg. once you follow someone, you cannot see, who you are following. But trust me, you are following them in the backend.</li>
                <li>Thanks for having!.</li>
            </ul>
            
            <p></p>
            </section>
        </Container>
    )
}

export default Important


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
        max-width: 600px;
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