import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";

import LoginForm from "../components/LoginForm";
import Meta from "../components/Meta";
import Spinner from "../components/Spinner";
import Tasks from "../components/Tasks";
import prisma from "../lib/prisma";

const Home: React.FC<any> = ({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  console.log(tasks);

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
        <Tasks session={session} tasks={tasks} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { props: { tasks: null } };
  }

  const tasks = await prisma.task.findMany({
    where: {
      userEmail: session.user && session.user.email,
    },
  });
  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
};
