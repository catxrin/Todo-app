import ReactDOM from "react-dom/client";
import App from "./App.jsx";

window.addEventListener("popstate", () => {
  if (window.location.pathname !== "/home") localStorage.removeItem("loggedIn");
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
