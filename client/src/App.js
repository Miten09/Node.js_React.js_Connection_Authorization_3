import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ErrorPage } from "./components/ErrorPage";
import Logout from "./components/Logout";
import { createContext } from "react";

const UserContext = createContext();

function App() {
  const Routing = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  };
  return (
    <>
      <UserContext.Provider>
        <NavBar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext };
