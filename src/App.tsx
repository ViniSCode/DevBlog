import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Posts } from "./pages/Posts";

export function App() {
  return (
    <AuthProvider>
      <Header />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}