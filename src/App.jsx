import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  const { loggedInInfo } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/signin" />} />
        <Route
          path="/signin"
          element={loggedInInfo ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={loggedInInfo ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
