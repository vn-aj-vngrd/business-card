import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import { Key } from "react";

import LoginForm from "../components/LoginForm";
import Meta from "../components/Meta";
import Spinner from "../components/Spinner";
import Tasks from "../components/Tasks";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { props: { tasks: null } };
  }

  const res = await prisma.task.findMany({
    where: {
      userEmail: session.user && session.user.email,
    },
  });

  const finishedTasks = res.filter((task) => task.completed);
  const unfinishedTasks = res.filter((task) => !task.completed);

  const tasks = { finishedTasks, unfinishedTasks };

  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
};

type Task = {
  tasks: {
    id: Key;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
  };
};

const Home: React.FC<Task> = ({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <div className="flex justify-center min-h-screen bg-gray-40">
          <Tasks session={session} tasks={tasks} />
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
