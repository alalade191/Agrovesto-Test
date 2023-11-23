import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import HomepageBody from "@/components/home-page";

const Homepage: React.FC = () => {
  return (
    <div className="bg-[url('/images/homepage-background.png')] bg-no-repeat bg-cover h-screen w-screen object-cover flex flex-col">
      <Header />
      <HomepageBody />
    </div>
  );
};
export default Homepage;
