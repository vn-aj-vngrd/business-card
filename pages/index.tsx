// import { PrismaClient } from "@prisma/client";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
// const prisma = new PrismaClient();
import { signOut, useSession } from "next-auth/react";

import LoginForm from "../components/LoginForm";
import prisma from "../lib/prisma";

const Home: React.FC<any> = ({ tasks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  console.log(tasks);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-40">
      <Head>
        <title>Next Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        {session && (
          <>
            Signed in as {session.user && session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}

        {!session && (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const tasks = await prisma.task.findMany();

  return { props: { tasks: JSON.parse(JSON.stringify(tasks)) } };
};
