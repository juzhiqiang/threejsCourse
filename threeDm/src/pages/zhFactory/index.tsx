import React, { createContext, useContext, useEffect, useState } from "react";
import Scene from "./components/Scene";
import { getSmartCityList } from "./Api";
import Page from "./page";

export const MyContext = createContext({});

const ZhCity = () => {
  const [eventData, setEventData] = useState([]);
  const [sprite, setSprite] = useState({});
  const [eventHandle, setEventHandle] = useState({});

  useEffect(() => {
    getSmartCityList().then((res) => {
      if (res.data.status == 200) {
        setEventData(res?.data?.list || []);
      }
    });
  }, []);
  return (
    <MyContext.Provider value={{ eventHandle, setEventHandle }}>
      <div>
        <Scene
          eventData={eventData}
          eventHandle={eventHandle}
          onSpriteClick={(item: any, i: any) =>
            setSprite({
              item,
              i,
            })
          }
        ></Scene>
        <Page />
      </div>
    </MyContext.Provider>
  );
};

export default ZhCity;
