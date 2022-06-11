import { useSession } from "next-auth/react";

import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Meta from "../components/Meta";
import Spinner from "../components/Spinner";
import Tasks from "../components/Tasks";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-40">
        <Spinner />
      </div>
    );
  }

  if (session) {
    return (
      <>
        <Meta title="Tasks | Home" />
        <div className="justify-center mt-10 bg-gray-40">
          <Header session={session} />
          <Tasks />
        </div>
      </>
    );
  }

  return (
    <>
      <Meta title="Tasks | Log in" />
      <div className="flex items-center justify-center min-h-screen bg-gray-40">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Home;
