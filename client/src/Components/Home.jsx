import Header from "./Common/Header/Header";
import bannerHome from "../assets/img/bannerhome.jpeg";
export default () => {
  const today = new Date();
  return (
    <div className="Home__container">
      <Header />
      <img src={bannerHome} />
    </div>
  );
};
