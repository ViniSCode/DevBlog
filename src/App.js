import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Post } from './pages/Post';
import { Posts } from "./pages/Posts";

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1800)
  }, []);

  return (
    <AuthProvider>
      {loading ? <Loading /> : <BrowserRouter >
      <ToastContainer/>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>}
    </AuthProvider>
  );
}