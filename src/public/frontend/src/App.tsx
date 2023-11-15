import About from "./pages/About";
import AddProjectPage from "./pages/AddProjectPage";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navigation from "./pages/Navigation";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainSite />} />
        <Route path="login" element={<Login />} />
        <Route path="project" element={<AddProjectPage />} />
        <Route path="project/detail/:id" element={<ProjectDetail />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

function MainSite() {
  return (
    <>
      <Navigation />
      <div
        style={{
          padding: "0 5%",
        }}
      >
        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
