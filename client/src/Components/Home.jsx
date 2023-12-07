import Header from "./Common/Header/Header";

export default () => {
  const today = new Date();
  return (
    <div className="Home__container">
      <Header />
      <center>
        <h1>Welcome to End Year Celebration {today.getFullYear()}</h1>
      </center>
    </div>
  );
};
