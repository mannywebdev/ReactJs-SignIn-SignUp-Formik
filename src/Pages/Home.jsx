import React from "react";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Projects from "./Projects";

const Home = () => {
  return (
    <div>
      <Header />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
