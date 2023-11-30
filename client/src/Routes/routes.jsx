 import FindWizeliner from "../Components/FindWizeliner/FindWizeliner";
import ReadQR from "../Components/ReadQR/ReadQR";
import WizelinersOnSite from "../Components/WizelinersOnSite/WizelinersOnSite"
const routes = [
  {
    path: "/FindWizeliner",
    component: FindWizeliner,
    isPrivate: false,
    isExact: true,
  },
  {
    path: "/ReadQR",
    component: ReadQR,
    isPrivate: false,
    isExact: true,
  } 
  , {
    path: "/WizelinersOnSite",
    component: WizelinersOnSite,
    isPrivate: false,
    isExact: true,
  } 
];

export default routes;
