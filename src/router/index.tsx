import { createBrowserRouter } from "react-router";
import { DefaultLayout, ErrorPage, HomePage, ThankyouPage } from "./dynamicImporter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/thanks",
        element: <ThankyouPage />,
      },
    ],
  },
]);

export default router;
