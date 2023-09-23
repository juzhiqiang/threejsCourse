import { useContext, useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Select } from "antd";
import { MyContext } from "..";

const Page = ({ hotQiuAction }: any) => {
  const [hotQiu, setHotQiu] = useState("none");
  const [sprite, setSprite] = useState({});
  const { eventHandle, setEventHandle }: any = useContext(MyContext);
  const handleChange = (e) => {
    setHotQiu(e);
    setEventHandle({
      hotQiuAction: e,
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
    </div>
  );
};

export default Page;
