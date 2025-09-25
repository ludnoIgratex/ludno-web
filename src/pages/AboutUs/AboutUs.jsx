import React from "react";
import Partners from "./Partners/Partners";
import Members from "./Members/Members";
import Hero from "./Hero/Hero";
import TeamMain from "./TeamMain/TeamMain";
import Consulting from "./Consulting/Consulting";
import Production from "./Production/Production";
import ShoutOut from "./ShoutOut/ShoutOut";

const Main = () => {
  return (
    <div>
      <TeamMain/>
      <Hero />
      <Consulting/>
      <Partners />
      <Production/>
      <Members />
      <ShoutOut/>
    </div>
  );
};

export default Main;
