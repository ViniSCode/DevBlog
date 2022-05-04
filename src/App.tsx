import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminCreatePosts } from "./pages/AdmCreatePost";
import { Home } from "./pages/Home";
import { Posts } from "./pages/Posts";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
      <ToastContainer/>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/admin/posts/create" element={<AdminCreatePosts />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}