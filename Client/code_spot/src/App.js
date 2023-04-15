import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import JobDescription from "./components/JobDescription";
import BecomeAClient from "./pages/client/becomeAClient";
import Dashboard from "./pages/dashboard/dashboard";
import Explore from "./pages/explore/explore";
import BecomeAFreelancer from "./pages/freelancer/becomeAFreelancer";
import LandingPage from "./pages/landingPage/landingPage";
import Login from "./pages/login/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<BecomeAFreelancer />} path="/becomeAFreelancer" />
          <Route element={<BecomeAClient />} path="/becomeAClient" />
          <Route element={<Login />} path="/login" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route path="/job/:id" element={<JobDescription />} />
          <Route element={<Explore />} path="/explore/*" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
