import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();

  const signUserIn = async (email, password) => {
    if (!email || !password) {
      warnIncompleteFields();
      return;
    }

    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        const docSnap = await getUserFromDB(uid);
        setLoggedUserData(
          uid,
          docSnap.data().name,
          email,
          docSnap.data().avatarURL
        );
        setLoadingAuth(false);
        redirectToDashboard();
      })
      .catch((error) => {
        setLoadingAuth(false);
        toast.error("Erro no login");
        console.error("signUserIn erro: " + error);
      });
  };

  const signUserUp = async (email, password, name) => {
    if (!email || !password || !name) {
      warnIncompleteFields();
      return;
    }

    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        await createNewUserInDB(uid, name).then(() => {
          setLoggedUserData(uid, name, email);
          redirectToDashboard();
        });
      })
      .catch((error) => {
        setLoadingAuth(false);
        toast.error("Erro ao cadastrar!");
        console.error("signUserUp erro: " + error);
      });
  };

  const createNewUserInDB = async (uid, name) => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      name: name,
      avatarURL: null,
    }).then(() => {
      setLoadingAuth(false);
      toast.success("Usuário cadastrado com sucesso!");
    });
  };

  const getUserFromDB = (uid) => {
    const docRef = doc(db, "users", uid);
    return getDoc(docRef);
  };

  const setLoggedUserData = (uid, name, email, avatarURL = null) => {
    const data = {
      uid: uid,
      name: name,
      email: email,
      avatarURL: avatarURL,
    };

    setUser(data);
    storeUserData(data);
  };

  const storeUserData = (data) => {
    localStorage.setItem("uinfo@servicesys", JSON.stringify(data));
  };

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  const warnIncompleteFields = () => {
    alert("PREENCHA TODOS OS CAMPOS");
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loadingAuth, signUserIn, signUserUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
