import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
>
  <AuthProvider>
    <UserProvider>
      <Toaster position="top-right" />
      <App />
    </UserProvider>
  </AuthProvider>
</GoogleOAuthProvider>
  </StrictMode>
);