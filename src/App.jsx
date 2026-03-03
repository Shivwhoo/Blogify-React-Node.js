import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/authService";
import { login, logout } from "./store/authSlice";
import { Header, LoadingPage, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res?.data?.data) {
          dispatch(login(res.data.data));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
