import { grain } from "../grain";
import { bzGrain } from "../grain/bz";
import { galaxyGrain } from "../grain/galaxys";
import { Ray } from "../ray";
import { base } from "./base";

const nav = (type: string) => {
  console.log(type);
  if (type === "base") {
    base();
  } else if (type === "grain") {
    grain();
  } else if (type === "bsgrain") {
    bzGrain();
  } else if (type === "xxgrain") {
    galaxyGrain();
  } else if (type === "ray") {
    Ray();
  }
};

const dom: any = document.querySelector(".list");
dom.onclick = function (e) {
  nav(e.target.dataset.type);
};
