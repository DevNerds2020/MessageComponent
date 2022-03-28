import { signInWithGoogle } from './service/firebase'
import { useState } from 'react'
import { useEffect } from 'react';
import { auth } from './service/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth' ;
import 'firebase/compat/firestore'
import { gitProvider } from './service/firebase';
function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])
  const googleSignInHandler = () => {
    signInWithGoogle().then(result => {
      console.log(result.user.displayName)
      const users = firebase.firestore().collection('users')
      console.log(users)
      users.doc(result.user.uid).get().then( (doc) => {
        if (!doc.exists){
          users.add({
            users: result.user.displayName
          })
        }
      })
    })
  }
  return (
    <div className="App" style={{display:"flex", alignItems:'center', justifyContent: 'center', flex: 1}}>
      
      {user===null 
      ? 
      <div style={{display:'flex', justifyContent: 'space-around', flexDirection:'column'}}>
        <div>
          <button className="button" onClick={googleSignInHandler}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
        <div>
          <button className="button" onClick={() => {auth.signInWithPopup(gitProvider)}}><i className="fab fa-google"></i>Sign in with github</button>
        </div>  
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
