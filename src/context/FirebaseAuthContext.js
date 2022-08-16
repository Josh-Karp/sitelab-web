import { createContext, useEffect, useReducer } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getIdToken,
} from "firebase/auth";

import { firebaseAuth } from "src/utils/firebase";
import PropTypes from "prop-types";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext({
  ...initialAuthState,
  method: "Firebase",
  _getIdToken: () => Promise.resolve(),
  _createUserWithEmailAndPassword: () => Promise.resolve(),
  _signInWithEmailAndPassword: () => Promise.resolve(),
  _signInWithGoogle: () => Promise.resolve(),
  _logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [dispatch]
  );

  const _signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const _signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const _createUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const _logout = async () => {
    await signOut(firebaseAuth);
  };

  const _getIdToken = async () => {
    await getIdToken(firebaseAuth.currentUser, true);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "Firebase",
        _getIdToken,
        _createUserWithEmailAndPassword,
        _signInWithEmailAndPassword,
        _signInWithGoogle,
        _logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
