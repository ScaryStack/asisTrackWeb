import { Navbar } from "../components/shared/Navbar";
import { InfoList } from "../components/shared/InfoList";

export const Info = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="logo">AsisTrack</h1>
        <InfoList />
      </div>
    </>
  );
};
