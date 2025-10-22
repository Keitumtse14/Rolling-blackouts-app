import { type NextPage } from "next";
import Head from "next/head";
import SettingsIcon from '../components/mainpage/settings-icon';
import LoadSheddingInfo from "../components/mainpage/load-shedding-info";
import AddAreaInfo from "../components/mainpage/add-area-info";
import Header from '../components/mainpage/header';
import { useState } from 'react';


const Home: NextPage = () => {

  const [addAreaOpen, setAddAreaOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Eskom App</title>
        <meta name="description" content="Eskom App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto flex flex-col min-h-[100dvh] justify-start relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header addAreaOpen={addAreaOpen} setAddAreaOpen={setAddAreaOpen} />
        <div>
          <LoadSheddingInfo />
        </div>
        <div className="flex justify-center items-center">
          <AddAreaInfo addAreaOpen={addAreaOpen} setAddAreaOpen={setAddAreaOpen} />
        </div>
      </main>
    </>
  );
};

export default Home;
