import { grain } from "../grain";
import { bzGrain } from "../grain/bz";
import { base } from "./base";

const nav = (type: string) => {
  console.log(type);
  if (type === "base") {
    base();
  } else if (type === "grain") {
    grain();
  } else {
    // bsgrain
    bzGrain();
  }
};

const dom: any = document.querySelector(".list");
dom.onclick = function (e) {
  nav(e.target.dataset.type);
};
