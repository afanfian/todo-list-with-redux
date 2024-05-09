import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center h-screen">
      <div className="text-blue-500 mb-6">
        <RiErrorWarningLine className="text-6xl" />
      </div>
      <h1 className="text-base md:text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-8">
        Oops! The page you are looking for could not be found.
      </p>
      <Link href="/">
        <p className="text-blue-500 font-bold hover:underline">
          Go back to Home
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
