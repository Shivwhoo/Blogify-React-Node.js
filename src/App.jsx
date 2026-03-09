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
    // Check for existing session on mount
    getCurrentUser()
      .then((res) => {
        // Hamare backend structure ke hisaab se: res.data.data.user
        const userData = res?.data?.data?.user || res?.data?.data;
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  // Loading state (Minimalist Loader)
  if (loading) return <LoadingPage />;

  return (
    // Background color ko Gray-400 se Zinc-50 ya 100 kar diya for clean look
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans selection:bg-zinc-800 selection:text-white">
      <Header />
      
      {/* Main Content Area: flex-grow ensures footer stays at bottom */}
      <main className="flex-grow w-full max-w-7xl mx-auto py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;