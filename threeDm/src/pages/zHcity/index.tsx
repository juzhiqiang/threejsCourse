import { useEffect, useState } from "react";
import BigScreen from "./components/BigScreen";
import Scene from "./components/Scene";
import { getSmartCityList } from "./Api";

const ZhCity = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getSmartCityList().then((res) => {
      if (res.data.status == 200) {
        setEventData(res?.data?.list || []);
      }
    });
  }, []);
  return (
    <div>
      <Scene eventData={eventData}></Scene>
      <BigScreen data={eventData} />
    </div>
  );
};

export default ZhCity;
