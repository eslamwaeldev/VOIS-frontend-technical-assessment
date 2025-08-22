import { lazy } from "react";
import Loader from "./Loader";

//Layouts

export const DefaultLayout = Loader(lazy(() => import("../layouts/DefaultLayout")));

//Pages

export const ErrorPage = Loader(lazy(() => import("../pages/ErrorPage")));
export const HomePage = Loader(lazy(() => import("../pages/HomePage")));
export const ThankyouPage = Loader(lazy(() => import("../pages/ThankyouPage")));
