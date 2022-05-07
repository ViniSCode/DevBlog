import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components/Header";
import { ReadPost } from "./components/ReadPost";
import { AuthProvider } from "./contexts/AuthContext";
import { CreatePosts } from "./pages/CreatePosts";
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
          <Route path="/posts/:id" element={<ReadPost />} />
          
          <Route path="/posts/create" element={<CreatePosts />} />
          <Route path="/admin/posts/create" element={<CreatePosts />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}