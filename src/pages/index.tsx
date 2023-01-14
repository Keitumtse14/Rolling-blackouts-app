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

      <main className="max-w-screen-sm mx-auto mt-2">
        <SettingsIcon />
        <LoadSheddingInfo />
        <AddAreaInfo />
      </main>
    </>
  );
};

export default Home;
