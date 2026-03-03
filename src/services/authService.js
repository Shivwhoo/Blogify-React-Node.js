import api from "../axios/axios";

// SIGNUP
 const signup = (data) =>
  api.post("/users/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// LOGIN
 const login = (data) => api.post("/users/login", data);

// LOGOUT
 const logout = () => api.post("/users/logout");

// CURRENT USER (page refresh pe use hoga)
 const getCurrentUser = () => api.get("/users/current-user");
 

export {signup,login,logout,getCurrentUser}