 import FindGuy from "../Components/FindGuy/FindGuy";
import Home from "../Components/Home";
import ReadQR from "../Components/ReadQR/ReadQR";
import PeopleOnSite from "../Components/PeopleOnSite/PeopleOnSite"
const routes = [
  {
    path: "/",
    component: Home,
    isPrivate: false,
    isExact: true,
  },
  {
    path: "/FindGuy",
    component: FindGuy,
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
    path: "/PeopleOnSite",
    component: PeopleOnSite,
    isPrivate: false,
    isExact: true,
  } 
];

export default routes;
