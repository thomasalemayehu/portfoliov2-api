import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home"
import Navigation from './pages/Navigation';
import Projects from "./pages/Projects";
function App() {
  return (
    <>
      <Navigation />
      <div style={{
        padding:"0 5%"
      }}>
        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App
