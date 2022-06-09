// import { PrismaClient } from "@prisma/client";
import Head from "next/head";
// const prisma = new PrismaClient();
import { signIn, signOut, useSession } from "next-auth/react";

import Header from "../components/Header";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Business Card</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        {session && (
          <>
            Signed in as {session.user && session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}

        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
