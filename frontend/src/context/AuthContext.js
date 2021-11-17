import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let token = localStorage.getItem("authTokens");

  let [authToken, setAuthToken] = useState(() =>
    token ? JSON.parse(token) : null
  );
  let [user, setUser] = useState(() => (token ? jwt_decode(token) : null));
  let [loading, setLoading] = useState(true);
  const history = useHistory();
  let loginUser = (e) => {
    axios
      .post("127.0.0.1:8000/login", {
        username: e.username,
        password: e.password,
      })
      .then((res) => {
        if (res.status === 200) {
          setAuthToken(res.data);
          setUser(jwt_decode(res.data.access));
          localStorage.setItem("authTokens", JSON.stringify(res.data));
          history.push("/");
        } else {
          console.log("sth wrong");
        }
      });
  };
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };

  let contextData = {
    authToken: authToken,
    user: user,
    setUser,
    setAuthToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  useEffect(() => {
    if (authToken) {
      setUser(jwt_decode(authToken.access));
    }
    setLoading(false);
  }, [authToken, loading]);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
