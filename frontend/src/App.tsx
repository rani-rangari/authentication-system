import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages WITH Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Other pages like About, Contact, etc */}
        </Route>

        {/* Auth Pages WITHOUT Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
