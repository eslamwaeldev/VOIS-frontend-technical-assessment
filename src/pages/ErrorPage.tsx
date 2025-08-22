import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(`/`);
  };
  return (
    <>
      <Helmet>
        <title>An error has occurred</title>
      </Helmet>
      <main className="w-full h-full min-h-screen flex flex-col gap-6 pt-30 lg:pt-50 items-center px-8">
        <MainTitle>Oops An error has occurred !</MainTitle>
        <p className="text-sm text-center lg:text-lg font-medium">
          The page you are trying to reach is expired or unavailable
        </p>
        <button
          onClick={goHome}
          className="border-2 border-gray-700 h-11 shadow-sm hover:border-transparent hover:bg-red-500 hover:text-gray-50 rounded-lg p-2 transition-all duration-150 font-medium"
        >
          Back Home
        </button>
      </main>
    </>
  );
};

export default ErrorPage;
