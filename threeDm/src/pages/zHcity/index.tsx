import { useEffect, useState } from "react";
import BigScreen from "./components/BigScreen";
import Scene from "./components/Scene";
import { getSmartCityList } from "./Api";

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
      <BigScreen
        data={eventData}
        sprite={sprite}
        onEventList={(data: any, i: any) => setEventHandle({ data, i })}
      />
    </div>
  );
};

export default ZhCity;
