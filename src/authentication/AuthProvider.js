import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//createContext() to share the auth data to several components 
const AuthContext = createContext();

//AuthProvider to encapsulate the authentication logic. It uses the context of authentication. 
//Cf. Apps.js & Index.js 
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")); //state of authentication

  //sending a post request to the backend with user credentials to authenticate
  const handleLogIn = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json(); // Extract JSON from response
      })
      .then((data) => {
        const token = data.token; // Extract the token
        localStorage.setItem("token", token); // Store the token in localStorage
        setIsLoggedIn(true);
        navigate(-1); //to prievious page
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  //sending a post request to the backend with user token in the header to logout. 
  const handleLogOut = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem("token"); //if success, remove token from local storage
        setIsLoggedIn(false); //change auth state  
        alert("logged out successfully!");
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    //the values we want to share between components
    <AuthContext.Provider value={{ isLoggedIn, handleLogIn, handleLogOut, setUsername, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
