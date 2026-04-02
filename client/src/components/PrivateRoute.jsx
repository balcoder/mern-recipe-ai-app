import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // if currentUser render the child route in App.js(/profile) using outlet
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
