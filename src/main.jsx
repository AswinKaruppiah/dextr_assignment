import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Swapprovider } from "./context/SwapState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Swapprovider>
    <App />
  </Swapprovider>
);
