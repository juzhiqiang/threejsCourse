import { Ray } from "@/components/ray";
import styles from "./index.less";
import { threeCanvas } from "@/components";

export default function HomePage() {
  threeCanvas();
  return (
    <div className={styles.content}>
      <div className={`${styles.page} ${styles.pages1}`}>
        <h1>投射光线</h1>
        <h3>实现3d互动</h3>
      </div>
      <div className={`${styles.page} ${styles.pages2}`}>
        <h1>THREE.BufferGeometry</h1>
        <h3>酷炫三角形</h3>
      </div>
      <div className={`${styles.page} ${styles.pages3}`}>
        <h1>点光源</h1>
        <h3>点光源打造酷炫弹跳效果</h3>
      </div>
    </div>
  );
}
