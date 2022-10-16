import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { loggedInInfo } = useSelector((state) => state.user);
  return loggedInInfo ? children : <Navigate to="/login" />;
}
