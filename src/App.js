import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";

import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import styled from 'styled-components';
import { useState } from "react";

const LoginWrapper = styled.div`
  background: pink;
  padding: 20px;
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  margin-top: 100px;
  img {
    width: 100px;
  }
  button {
    width: 100%;
    background: blue;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top:20px
  }
`

function App() {

  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithPopup(auth, provider)
        .then(({ user }) => {
            setUser(user);
        })
        .catch((error) => {
            alert(error.message);
        });
};

  return (
    <>

      {
        user ? (
          <>
            <Header photoURL={user.photoURL} />
            <div className="App">
              <Sidebar/>
              <Data user={user}/>
            </div>
          </>
        ) : (
          <LoginWrapper>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1200px-Google_Drive_icon_%282020%29.svg.png" alt="Google Drive"/>
            <button onClick={signIn}>Login with Google</button>
          </LoginWrapper>
        )
      }
    </>
  );
}

export default App;
