import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextType = {
  user: User | undefined,
  handleSignInWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider (props: AuthProviderProps) {

  const [user, setUser] = useState<User>();

  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error ('Missing information from Google Account.'); 
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }

  }, []);

  async function handleSignInWithGoogle () {
    // get provider // google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // popup login using google provider 
    const result = await auth.signInWithPopup(provider);
    
    // if user exists
    if (result.user) {
      //get user info
      const { displayName, photoURL, uid } = result.user

      //if something is missing throw error
      if (!displayName || !photoURL) {
        throw new Error ('Missing information from Google Account.'); 
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{user, handleSignInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}