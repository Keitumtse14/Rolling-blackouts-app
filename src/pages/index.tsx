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

      <main className="max-w-screen-sm mx-auto mt-2 flex flex-col min-h-screen justify-between relative">
        <SettingsIcon />
        <div>
          <LoadSheddingInfo />
        </div>
        <div className="flex justify-center items-center py-16">
          <AddAreaInfo />
        </div>
      </main>
    </>
  );
};

export default Home;
