import { useContext, useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Select } from "antd";
import { MyContext } from "..";

const Page = ({ hotQiuAction }: any) => {
  const [hotQiu, setHotQiu] = useState("none");
  const [cameraTab, setCameraTab] = useState("default");
  const [control, setControl] = useState("Orbit");
  const { eventHandle, setEventHandle }: any = useContext(MyContext);
  const handleChange = (e) => {
    setHotQiu(e);
    setEventHandle({
      hotQiuAction: e,
    });
  };

  const handleCamera = (e) => {
    setCameraTab(e);
    setEventHandle({
      cameraActive: e,
    });
  };

  const handleControl = (e) => {
    setControl(e);
    setEventHandle({
      controlActive: e,
    });
  };

  return (
    <div className={styles.page}>
      <Select
        className={`${styles.event}`}
        style={{ width: 120 }}
        onChange={handleChange}
        value={hotQiu}
        options={[
          { value: "none", label: "热气球动画" },
          { value: "line", label: "直线飞过" },
          { value: "all", label: "环绕园区" },
        ]}
      />
      <Select
        className={`${styles.event}`}
        style={{ width: 120 }}
        onChange={handleCamera}
        value={cameraTab}
        options={[
          { value: "default", label: "默认镜头" },
          { value: "carcamera_Orientation", label: "第三人称" },
          { value: "rightcamera_Orientation", label: "右侧跟随视角" },
          { value: "focus_dance", label: "聚焦单体建筑" },
        ]}
      />
      <Select
        className={`${styles.event}`}
        style={{ width: 120 }}
        onChange={handleControl}
        value={control}
        options={[
          { value: "Orbit", label: "轨道控制器" },
          { value: "Fly", label: "飞行控制器" },
          { value: "FirstPerson", label: "第一人称控制器" },
        ]}
      />
    </div>
  );
};

export default Page;
