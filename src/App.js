import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import { Home, inViewFadeIn } from "./pages/Home";
import { Post } from "./pages/Post";
import { Posts } from "./pages/Posts";

export function App() {
  const [loading, setLoading] = useState(true);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
  });

  const headerTransition = useAnimation();
  const footerTransition = useAnimation();

  useEffect(() => {
    if (headerInView) {
      headerTransition.start(inViewFadeIn);
    }
    if (footerInView) {
      footerTransition.start(inViewFadeIn);
    }
  }, [headerInView, footerInView]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <AuthProvider>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <ToastContainer />
          <motion.div
            initial={{ opacity: 0 }}
            ref={headerRef}
            animate={headerTransition}
          >
            <Header />
          </motion.div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
          <motion.div
            initial={{ opacity: 0 }}
            ref={footerRef}
            animate={footerTransition}
          >
            <Footer />
          </motion.div>
        </BrowserRouter>
      )}
    </AuthProvider>
  );
}
