import { useEffect, useState } from "react";
import styles from "./index.less";
import { getSmartCityList } from "../../Api";
const BigScreen = (props: any) => {
  const [data, setData] = useState([
    {
      name: "iot",
      value: 300,
      unit: "t",
    },
    {
      name: "iot",
      value: 300,
      unit: "t",
    },
    {
      name: "iot",
      value: 300,
      unit: "t",
    },
    {
      name: "iot",
      value: 300,
      unit: "t",
    },
  ]);

  return (
    <div className={styles.bigScreen}>
      <div className={styles.header}>智慧大屏</div>
      <main className={styles.main}>
        <div className={styles.left}>
          {data.map((item) => (
            <div className={styles.cityEvent}>
              <h3>
                <span>{item.name}</span>
              </h3>
              <h1>
                <img
                  src={require(`../../resocus/bg/bar.svg`)}
                  className="icon"
                />
                <span>123</span>
              </h1>
              <div className={styles.footerBoder}></div>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {(props.data || []).map((item: any, i) => (
            <div className={`${styles.cityEvent} ${styles.list}`}>
              <h3>
                <span>事件列表</span>
              </h3>
              <ul>
                <li>
                  <h1>
                    <div>
                      <span>{item.name}</span>
                    </div>
                    <span className="time"> {item.type} </span>
                  </h1>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BigScreen;
