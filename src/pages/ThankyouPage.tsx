import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import MainTitle from "../components/MainTitle";

const ThankyouPage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(`/`);
  };
  return (
    <>
      <Helmet>
        <meta name="description" content="Thank you page for filling the KYC form" />
        <title>Thank you !</title>
      </Helmet>
      <main className="w-full h-full min-h-screen flex flex-col gap-6 pt-30 lg:pt-50 items-center px-8">
        <MainTitle>Thank you !</MainTitle>
        <p className="text-sm text-center lg:text-lg font-medium">
          We appreciate you for taking the time to fill this form.
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

export default ThankyouPage;
