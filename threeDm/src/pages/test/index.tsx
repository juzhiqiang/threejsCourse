import { useEffect, useState } from "react";
import "./index.less";
import { Select, message } from "antd";
import "antd/dist/antd.css";
let datas = [
  {
    id: 118,
    name: null,
    parentId: null,
    children: [
      {
        id: 1,
        name: "协同云",
        parentId: 0,
        children: [
          {
            id: 2,
            name: "协同云",
            parentId: 1,
            children: [
              {
                id: 9,
                name: "协同云",
                parentId: 2,
                children: [],
                taskNumber: "f4892d7f54b6431f8bcad9408f136f53",
                userId: "432112006",
                projectId: 118,
                startEndTime: "2023050820230514",
                hourNum: 0,
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 60,
                saturday: 0,
                sunday: 0,
                url: "www.baidu.com",
                img: "https://img-blog.csdnimg.cn/5e6b808ff9a448fb9b43ee2934be465f.png",
                checkStatus: "0",
                projStatus: "4",
                level: "3",
                taskName: "t3测试任务名称id9",
                taskTypeName: "交付中心",
                taskDescribe: "测试任务描述3",
                priority: "紧急",
                cache: null,
              },
            ],
            taskNumber: "f4892d7f54b6431f8bcad9408f136f22",
            userId: "432112006",
            projectId: 118,
            startEndTime: "2023050820230514",
            hourNum: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 60,
            saturday: 0,
            sunday: 0,
            url: "www.baidu.com",
            img: "https://img-blog.csdnimg.cn/5e6b808ff9a448fb9b43ee2934be465f.png",
            checkStatus: "0",
            projStatus: "1",
            level: "2",
            taskName: "t2测试任务名称id2",
            taskTypeName: "交付中心",
            taskDescribe: "测试任务描述2",
            priority: "紧急",
            cache: null,
          },
          {
            id: 3,
            name: "协同云",
            parentId: 1,
            children: [],
            taskNumber: "f4892d7f54b6431f8bcad9408f136f23",
            userId: "432112006",
            projectId: 118,
            startEndTime: "2023050820230514",
            hourNum: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 60,
            saturday: 0,
            sunday: 0,
            url: "www.baidu.com",
            img: "https://img-blog.csdnimg.cn/5e6b808ff9a448fb9b43ee2934be465f.png",
            checkStatus: "0",
            projStatus: "1",
            level: null,
            taskName: null,
            taskTypeName: null,
            taskDescribe: null,
            priority: null,
            cache: null,
          },
        ],
        taskNumber: "f4892d7f54b6431f8bcad9408f136f2f",
        userId: "432112006",
        projectId: 118,
        startEndTime: "2023050820230514",
        hourNum: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 60,
        saturday: 0,
        sunday: 0,
        url: "www.baidu.com",
        img: "https://img-blog.csdnimg.cn/5e6b808ff9a448fb9b43ee2934be465f.png",
        checkStatus: "0",
        projStatus: "1",
        level: "1",
        taskName: "t1测试任务名称id1",
        taskTypeName: "交付中心",
        taskDescribe: "测试任务描述",
        priority: "紧急",
        cache: null,
      },
    ],
    taskNumber: null,
    userId: null,
    projectId: null,
    startEndTime: null,
    hourNum: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
    url: null,
    img: null,
    checkStatus: null,
    projStatus: null,
    level: null,
    taskName: "协同云",
    taskTypeName: null,
    taskDescribe: null,
    priority: null,
    cache: null,
  },
  {
    id: 120,
    name: null,
    parentId: null,
    children: [
      {
        id: 7,
        name: "广州建行二期",
        parentId: 0,
        children: [],
        taskNumber: "f4892d7f54b6431f8bcad9408f136f2s3",
        userId: "432112006",
        projectId: 120,
        startEndTime: "2023050820230514",
        hourNum: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        url: "www.baidu.com",
        img: "https://img-blog.csdnimg.cn/5e6b808ff9a448fb9b43ee2934be465f.png",
        checkStatus: "0",
        projStatus: "1",
        level: null,
        taskName: null,
        taskTypeName: null,
        taskDescribe: null,
        priority: null,
        cache: null,
      },
    ],
    taskNumber: null,
    userId: null,
    projectId: null,
    startEndTime: null,
    hourNum: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
    url: null,
    img: null,
    checkStatus: null,
    projStatus: null,
    level: null,
    taskName: "广州建行二期",
    taskTypeName: null,
    taskDescribe: null,
    priority: null,
    cache: null,
  },
];

let counts = 0;
export default function HomePage() {
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  const [rotia, setRotia] = useState(0);
  const [selectTime, setSelectTime] = useState([
    {
      startTime: "--:--",
      endTime: "--:--",
    },
  ]);

  // 对初始数据不完整进行补充
  function flatten(data: any[]) {
    let result: any = [];
    let i = 1;
    let datas: any = {};
    // 记录同类型t0
    function helper(node: any, i: any) {
      let t = i + 1;
      datas[i] = node;
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => helper(child, t));
      } else if (t != 4) {
        node.children = [{ children: [], level: t, parentId: node.id || -1 }];
        node.children.forEach((child: any) => helper(child, t));
      } else {
        result.push({
          parent0: datas[0],
          t0Id: datas[0].id,
          parent1: datas[1],
          t1Id: datas[1].id,
          parent2: datas[2],
          t2Id: datas[2].id,
          ...node,
        });
      }
    }
    data.forEach((node) => {
      helper(node, 0);
    });
    return result;
  }

  // 生成24小数数组 step 间隔步长
  function timeSlot(step: number) {
    var date = new Date();
    date.setHours(0); // 时分秒设置从零点开始
    date.setSeconds(0);
    date.setUTCMinutes(0);

    var timeArr = [];
    var slotNum = (24 * 60) / step; // 算出多少个间隔
    for (var f = 0; f < slotNum; f++) {
      var time = new Date(
        Number(date.getTime()) + Number(step * 60 * 1000 * f)
      );
      // 获取：零点的时间 + 每次递增的时间
      var hour: any = "",
        sec: any = "";
      time.getHours() < 10
        ? (hour = "0" + time.getHours())
        : (hour = time.getHours()); // 获取小时
      time.getMinutes() < 10
        ? (sec = "0" + time.getMinutes())
        : (sec = time.getMinutes()); // 获取分钟
      timeArr.push(hour + ":" + sec);
    }
    return timeArr;
  }

  // 求两个时间戳之前差
  function timeFw(day1, day2) {
    let day11 = day1.replace(/-/g, "/");
    let day22 = day2.replace(/-/g, "/");

    var day_day1 = new Date(day11);
    var day_day2 = new Date(day22);

    let disparity = day_day2.getTime() - day_day1.getTime();
    // 转为分钟数的时候，可能会出现精度丢失;你需要注意下
    // let min = Math.round(disparity / 1000 / 60);
    return disparity / 1000 / 60 / 60;
    console.log(disparity);
  }

  useEffect(() => {
    const datass = flatten(datas);
    let tId: any = {};
    datass.forEach((item: any) => {
      //   获取相同T0合并列
      const T0len = datass.filter(
        (it: any) => it.parent0.id === item.parent0.id
      ).length;
      const T1len = datass.filter(
        (it: any) => it.parent1.id === item.parent1.id
      ).length;
      const T2len = datass.filter(
        (it: any) => it.parent2.id === item.parent2.id
      ).length;

      if (tId.t0Id !== item.parent0.id) {
        tId.t0Id = item.parent0.id;
        item.t0Row = T0len;
      } else {
        item.t0Row = 0;
      }
      if (tId.t1Id !== item.parent1.id) {
        tId.t1Id = item.parent1.id;
        item.t1Row = T1len;
      } else {
        item.t1Row = 0;
      }
      if (tId.t2Id !== item.parent2.id) {
        tId.t2Id = item.parent2.id;
        item.t2Row = T2len;
      } else {
        item.t2Row = 0;
      }
    });
    setData(datass);

    let tiemAnt = timeSlot(15).map((item, i: number) => ({
      label: item,
      value: item,
    }));
    setStartTime(tiemAnt);
    setEndTime(tiemAnt);
  }, []);

  //   新增t1 ~ t3
  const addChildren = (item, id: number | string, level: number) => {
    // 待返回数组
    let arr: any = [];
    // 用于匹配第一条配对上的数据
    let index = [-1, -1, -1];
    // 对拍平数据做处理
    data.forEach((it: any, i) => {
      if (index[0] === -1 && item.t0Id === it.t0Id) index[0] = i;
      if (index[1] === -1 && item.t1Id === it.t1Id) index[1] = i;
      if (index[2] === -1 && item.t2Id === it.t2Id) index[2] = i;
      if (it[`t${level - 1}Id`] === id) {
        arr.push(it);
        // 追加一个
        if (i === index[level - 1] + item[`t${level - 1}Row`] - 1) {
          counts++;
          arr.push({
            parent0: item.parent0,
            t0Id: item.t0Id,
            parent1: level > 1 ? item.parent1 : {},
            parent2: level > 2 ? item.parent2 : {},
            t1Id: level > 1 ? item.t1Id : `custom${level}-${counts}`,
            t2Id: level > 2 ? item.t2Id : `custom${level}-${counts}`,
            t0Row: 0,
            t1Row: level < 2 ? 1 : 0,
            t2Row: level < 3 ? 1 : 0,
          });
          arr[index[0]].t0Row = arr[index[0]].t0Row + 1;
          if (level > 1) arr[index[1]].t1Row = arr[index[1]].t1Row + 1;
          if (level === 3) arr[index[2]].t2Row = arr[index[2]].t2Row + 1;
        }
        return;
      }
      //   无法匹配数据原样放回数组内
      arr.push(it);
    });
    setData(arr);
  };

  const onChange = (
    value: string,
    index: number,
    type: "startTime" | "endTime"
  ) => {
    if (type === "endTime" && selectTime[index].startTime > value)
      return message.info("结束时间不能小于开始时间");
    if (
      type === "startTime" &&
      selectTime[index].endTime < value &&
      selectTime[index].endTime !== "--:--"
    )
      return message.info("开始时间不能大于结束时间");
    let totalTime = 0;
    let newArr = selectTime.map((item: any, i) => {
      if (i === index) {
        let countTime = timeFw(
          `2023-5-16 ${type === "startTime" ? value : item.startTime}`,
          `2023-5-16 ${type === "endTime" ? value : item.endTime}`
        );

        return {
          ...item,
          [type]: value,
          countTime: countTime,
        };
      }

      return item;
    });
    newArr.forEach((item) => (totalTime += item.countTime));
    setRotia(
      (totalTime / 7.5) * 100 < 0
        ? 0
        : (totalTime / 7.5) * 100 > 100
        ? 100
        : (totalTime / 7.5) * 100
    );
    setSelectTime(newArr);
  };

  const deletes = (index: number) => {
    selectTime.splice(index, 1);
    let totalTime = 0;
    let newArr = selectTime.map((item) => item);
    newArr.forEach((item:any) => (totalTime += item.countTime));
    setRotia(
      (totalTime / 7.5) * 100 < 0
        ? 0
        : (totalTime / 7.5) * 100 > 100
        ? 100
        : (totalTime / 7.5) * 100
    );
    setSelectTime(newArr);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>项目</th>
            <th>T1</th>
            <th>T2</th>
            <th>T3</th>
            <th className="table-week">周一</th>
            <th className="table-week">周二</th>
            <th className="table-week">周三</th>
            <th className="table-week">周四</th>
            <th className="table-week">周五</th>
            <th className="table-week">周六</th>
            <th className="table-week">周日</th>
            <th>在线地址</th>
            <th>成果图片</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index) => (
            <tr key={index}>
              {item.t0Row > 0 && (
                <td rowSpan={item.t0Row}>
                  {item.parent0.taskName}
                  <div
                    className="week-add"
                    onClick={() => addChildren(item, item.parent0.id, 1)}
                  >
                    新增
                  </div>
                </td>
              )}
              {item.t1Row > 0 && (
                <td rowSpan={item.t1Row}>
                  {item.parent1.taskName || <input />}
                  <div
                    className="week-add"
                    onClick={() => addChildren(item, item.t1Id, 2)}
                  >
                    新增
                  </div>
                </td>
              )}
              {item.t2Row > 0 && (
                <td rowSpan={item.t2Row}>
                  {item.parent2.taskName || <input />}
                  <div
                    className="week-add"
                    onClick={() => addChildren(item, item.t2Id, 3)}
                  >
                    新增
                  </div>
                </td>
              )}

              <td>{item.taskName || <input />}</td>
              <td>0%</td>
              <td>0%</td>
              <td>0%</td>
              <td>0%</td>
              <td>0%</td>
              <td>0%</td>
              <td>0%</td>
              <td></td>
              <td></td>
            </tr>
          ))}
          {/* 总计 */}
          <tr className="week-count">
            <td colSpan={4}>总计</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td>0%</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {/*  */}
      <div>
        时间选择器：
        {selectTime.map((item, index) => (
          <div>
            <Select
              showSearch
              optionFilterProp="children"
              onChange={(value) => onChange(value, index, "startTime")}
              value={item.startTime}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={startTime}
            />
            至
            <Select
              showSearch
              optionFilterProp="children"
              onChange={(value) => onChange(value, index, "endTime")}
              value={item.endTime}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={endTime}
            />
            {index === selectTime.length - 1 && (
              <span
                onClick={() => {
                  selectTime.push({
                    startTime: selectTime[selectTime.length - 1].endTime,
                    endTime: "--:--",
                  });
                  setSelectTime(selectTime.map((item) => item));
                }}
              >
                新增
              </span>
            )}
            {selectTime.length > 1 && (
              <span onClick={() => deletes(index)}>删除</span>
            )}
          </div>
        ))}
      </div>
      总工时{rotia.toFixed(2)}%
    </div>
  );
}
