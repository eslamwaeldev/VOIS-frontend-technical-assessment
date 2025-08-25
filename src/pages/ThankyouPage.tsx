import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";

const ThankyouPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Thank you page for filling the KYC form" />
        <title>Thank you !</title>
      </Helmet>
      <main className="w-full h-full min-h-screen dark:bg-vodafone-gray dark:text-gray-300 flex flex-col gap-6 pt-30 lg:pt-50 items-center px-8">
        <MainTitle>Thank you !</MainTitle>
        <p className="text-sm text-center lg:text-lg font-medium">
          We appreciate you for taking the time to fill this form.
        </p>
      </main>
    </>
  );
};

export default ThankyouPage;
