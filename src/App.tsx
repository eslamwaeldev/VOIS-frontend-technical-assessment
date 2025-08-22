import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />;
    </HelmetProvider>
  );
}

export default App;
