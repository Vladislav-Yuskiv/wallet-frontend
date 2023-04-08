import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelectors } from "../redux/user";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(userSelectors.getLoginStatus);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}
