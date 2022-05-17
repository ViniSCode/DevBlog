import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Post } from './pages/Post';
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
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}