import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export default AuthContext;

let loginUrl = "";
let signUpUrl = "";

if (process.env.NODE_ENV === "development") {
  loginUrl = "http://weblog.127.0.0.1:8000/api/v1/auth/jwt/create/";
  signUpUrl = "http://weblog.127.0.0.1:8000/api/v1/auth/users/";
} else if (process.env.NODE_ENV === "production") {
  loginUrl = "http://weblog.alizabetpour.ir/api/v1/auth/jwt/create/";
  signUpUrl = "http://weblog.alizabetpour.ir/api/v1/auth/users/";
}

export const AuthProvider = ({ children }) => {
  let token = localStorage.getItem("authTokens");
  const { addToast } = useToasts();
  let [authToken, setAuthToken] = useState(() =>
    token ? JSON.parse(token) : null
  );
  let [user, setUser] = useState(() => (token ? jwt_decode(token) : null));
  let [loading, setLoading] = useState(true);
  const history = useHistory();
  let loginUser = async (username, password) => {
    axios
      .post(loginUrl, {
        username: username,
        password: password,
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
      })
      .catch((err) => {
        for (let elem in err.response.data) {
          addToast(err.response.data[elem], {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  };
  let signupUser = (username, email, password) => {
    axios
      .post(signUpUrl, {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.statusText === "Created") {
          loginUser(username, password);
        }
      })
      .catch((err) => {
        for (let elem in err.response.data) {
          addToast(err.response.data[elem], {
            appearance: "error",
            autoDismiss: true,
          });
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
    signupUser: signupUser,
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
