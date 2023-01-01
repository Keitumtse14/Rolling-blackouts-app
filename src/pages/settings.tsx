import React from 'react';
import { type NextPage } from "next";
import BackArrowButton from '../components/settingspage/back-arrow-button';
import NotificationButton from '../components/settingspage/notification-button';
import ThemeButton from '../components/settingspage/theme-button';
import AutoLocationButton from '../components/settingspage/auto-location-button';

const Settings: NextPage = () => {
  return <div className="max-w-screen-sm mt-4 mx-auto">
    <div className="ml-2">
      <BackArrowButton />
      <NotificationButton />
      <ThemeButton />
      <AutoLocationButton />
    </div>
  </div>;
}

export default Settings