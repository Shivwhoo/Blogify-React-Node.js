import React from "react";
import { useDispatch } from "react-redux";
import { logout as logoutService } from "../../services/authService";
import {logout as logoutAction} from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logoutHandler = () => {
    logoutService()
    .then(() => {
      dispatch(logoutAction());
      navigate('/')

    })
    .catch(()=>{
        dispatch(logoutAction())
    })
  };

  return (
    <div>
      <button className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors duration-300" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
