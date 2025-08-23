import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router";
import { HelmetProvider } from "react-helmet-async";
import ThemeContextProvider from "./context/ThemeContextProvider";

function App() {
  return (
    <HelmetProvider>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </HelmetProvider>
  );
}

export default App;
