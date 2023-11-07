export default function PrivateRoute({ children, redirectPath = "/" }) {
  const user = localStorage.getItem("loggedIn");
  return user ? children : (window.location.pathname = redirectPath);
}
