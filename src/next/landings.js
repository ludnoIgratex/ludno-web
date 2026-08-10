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
  "bloki-igrovoy-konstruktor": { component: BloqiMain },
  "dvory-detskie-ploshchadki-dlya-zhk": { component: DvorMain },
  "gavpark-ploshchadki-dlya-sobak": { component: GavparkMain },
  "kinetikomotornye-ploshchadki": { component: KineticsMain },
  "mini-detskie-ploshchadki": { component: MiniMain },
  "prirodnaya-navigaciya": { component: NatureNavMain },
  "parkfit-sportivnye-ploshchadki": { component: ParkfitMain },
  "pleylet-sovremennye-mafy": { component: PlayletMain },
  "bashni-igrovye-kompleksy": { component: TowersMain },
  "tramptek-ulichnye-batuty": { component: TramptekMain },
};

export const landingSlugs = Object.keys(landings);
