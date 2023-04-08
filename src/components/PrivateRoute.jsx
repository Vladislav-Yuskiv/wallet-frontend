import { useSelector } from "react-redux";
import { userSelectors } from "../redux/user";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const isLoggedIn = useSelector(userSelectors.getLoginStatus);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
