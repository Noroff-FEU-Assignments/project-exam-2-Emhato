import "./components/sass/style.scss";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
// import HomePage from "../home/HomePage";
// import AccommodationPage from "../accommodation/AccommodationPage";
// import ContactPage from "../contact/ContactPage";
// import LoginPage from "../login/LoginPage";
// import AddPage from "../add/AddPage";
import HomePage from "./components/home/HomePage";
import AccommodationPage from "./components/accommodation/AccommodationPage";
import ContactPage from "./components/contact/ContactPage";
import LoginPage from "./components/login/LoginPage";
import AddPage from "./components/add/AddPage";
import MessagesPage from "./components/messages/MessagesPage";
import EnquieriesPage from "./components/enquieries/EnquieriesPage";
import SpesificPage from "./components/spesific/SpesificPage";
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
// import './App.css';
// import Spesific from "./components/Spesific";
// import SpesificPage from "./components/spesific/SpesificPage";


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Layout /> */}
        {/* <div> */}
          <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/accommodations" element={<AccommodationPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/enquieries" element={<EnquieriesPage />} />
              <Route path="/spesific/:id" element={<SpesificPage />} />
          </Routes>
        {/* </div> */}


      </Router>

    </AuthProvider>
  );
}

export default App;

