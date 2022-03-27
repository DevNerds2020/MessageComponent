import './App.css';
import { signInWithGoogle } from './service/firebase'
import { useState } from 'react'
import { useEffect } from 'react';
import { auth } from './service/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth' ;
import { gitProvider } from './service/firebase';
function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])
  return (
    <div className="App">
      
      {user===null 
      ? 
      <div>
        <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        <button className="button" onClick={() => {auth.signInWithPopup(gitProvider)}}><i className="fab fa-google"></i>Sign in with github</button>
      </div> 
      :
        <div>
          {console.log(user)}
          <div>
            <h1>
              hello {user._delegate.displayName}
            </h1>
          </div>
          <div>
            <h2>
              email  {user._delegate.email}
            </h2>
          </div>
          <div>
            <img src={user._delegate.photoURL}></img>
          </div>
          <div>
            <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
