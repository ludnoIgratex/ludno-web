"use client";

import BloqiMain from "../pages/Landings/Bloqi/BloqiMain";
import DvorMain from "../pages/Landings/Dvor/DvorMain";
import GavparkMain from "../pages/Landings/Gavpark/GavparkMain";
import KineticsMain from "../pages/Landings/Kinetics/KineticsMain";
import MiniMain from "../pages/Landings/Mini/MiniMain";
import NatureNavMain from "../pages/Landings/NatureNav/NatureNavMain";
import ParkfitMain from "../pages/Landings/Parkfit/ParkfitMain";
import PlayletMain from "../pages/Landings/Playlet/PlayletMain";
import TowersMain from "../pages/Landings/Towers/TowersMain";
import TramptekMain from "../pages/Landings/Tramptek/TramptekMain";

export const landings = {
  "bloqi-solution": { component: BloqiMain },
  "dvor-solution": { component: DvorMain },
  "gavpark-solution": { component: GavparkMain },
  "kinetics-solution": { component: KineticsMain },
  "mini-solution": { component: MiniMain },
  "nature-navigation-solution": { component: NatureNavMain },
  "parkfit-solution": { component: ParkfitMain },
  "playlet-solution": { component: PlayletMain },
  "towers-solution": { component: TowersMain },
  "tramptec-solution": { component: TramptekMain },
};

export const landingSlugs = Object.keys(landings);
