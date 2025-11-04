

import { InfoList } from "../components/shared/InfoList";
import { InfoButton } from "../components/shared/InfoButton";
import { NavigationButton } from "../components/shared/NavigationButton";

export const Info = () => {
  return (
    <>
      <div className="container">
        <h1 className="logo">AsisTrack</h1>
        <InfoList />
      </div>


      <InfoButton />
      <NavigationButton />
    </>
  );
};
