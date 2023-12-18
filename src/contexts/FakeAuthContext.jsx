import { createContext, useContext, useReducer } from "react";

const AutContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login( email, password ) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logOut() {
    dispatch({ type: "logout" });
  }
  return <AutContext.Provider value={{ user, isAuthenticated, login, logOut }}>{children}</AutContext.Provider>;
}

function UseAuth() {
  const context = useContext(AutContext);
  if (context === undefined) throw new Error("AuthContext was used outside AutProvider");
  return context;
}

export { AuthProvider, UseAuth };
