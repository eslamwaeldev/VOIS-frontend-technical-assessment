import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";
import { useNavigate } from "react-router";
import OutlineButton from "../components/OutlineButton";

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
      <main className="w-full h-full min-h-screen dark:bg-gray-950 dark:text-gray-300 flex flex-col gap-6 pt-30 lg:pt-50 items-center px-8">
        <MainTitle>Oops An error has occurred !</MainTitle>
        <p className="text-sm text-center lg:text-lg font-medium">
          The page you are trying to reach is expired or unavailable
        </p>
        <OutlineButton onClick={goHome}>Back Home</OutlineButton>
      </main>
    </>
  );
};

export default ErrorPage;
