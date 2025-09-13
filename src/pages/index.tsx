import { type NextPage } from "next";
import Head from "next/head";
import SettingsIcon from '../components/mainpage/settings-icon';
import LoadSheddingInfo from "../components/mainpage/load-shedding-info";
import AddAreaInfo from "../components/mainpage/add-area-info";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Eskom App</title>
        <meta name="description" content="Eskom App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-sm mx-auto flex flex-col min-h-[100dvh] justify-between relative gap-y-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div>
          <SettingsIcon />
          <LoadSheddingInfo />
        </div>
        <div className="flex justify-center items-center">
          <AddAreaInfo />
        </div>
      </main>
    </>
  );
};

export default Home;
