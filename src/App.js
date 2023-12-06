import { BrowserRouter } from "react-router-dom";

import RouterApp from "./routes";
import { AuthProvider } from "./contexts/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouterApp />
        <ToastContainer position="top-center" theme="dark" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
