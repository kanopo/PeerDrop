import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

// ! UI components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ! import pages
import Home from "./pages/Home";
import About from "./pages/About";
import P2P from "./pages/P2P";
import NotFound from "./pages/NotFound";

// ! p2p components
import Send from "./FunctionalComponent/Send";
import Recive from "./FunctionalComponent/Recive";

const App = () => {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/p2p" element={<P2P />} />


          <Route path="/p2p/send" element={<Send />} />
          <Route path="/p2p/recive" element={<Recive />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;
