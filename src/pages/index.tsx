import { type NextPage } from "next";
import Head from "next/head";
import Something from "../components/something";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Eskom App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Something />
    </>
  );
};

export default Home;
