import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import Swal from "sweetalert2";
import { User } from "../types/user";

export interface UserContextData {
  user: User;
  checkForUser: boolean;
  setUser: (user: User) => void;
  signInUser: () => void;
  logoutUser: () => void;
}

export const UserContext = createContext<Partial<UserContextData>>({});

const UserProvider: React.FC = ({children}) => {
  const [ user, setUser ] = useState<User>({dbRef: "public/", loggedIn: false});
  const [ checkForUser, setCheckForUser ] = useState<boolean>(true);

  useEffect(function checkForAuthenticatedUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({dbRef: user.uid + "/", loggedIn: true});
      }
      setCheckForUser(false)
    })
  }, [])

  const signInUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(({user}) => {
        if (user) {
          setUser({
            dbRef: user.uid + "/",
            loggedIn: true
          })
        }
        setCheckForUser(true);
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: "There was an error signing in: " + error,
          icon: "error",
          confirmButtonText: "OK"
        })
      })
  }

  const logoutUser = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser({
          dbRef: "public/",
          loggedIn: false
        })
        setCheckForUser(true);
      })
      .catch(error => {
        Swal.fire({
          title: "Error!",
          text: "There was an error while logging out: " + error,
          icon: "error",
          confirmButtonText: "OK"
        })
      })
  }

  const value = {
    user,
    checkForUser,
    setUser,
    signInUser,
    logoutUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;