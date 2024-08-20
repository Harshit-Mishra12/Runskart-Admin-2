import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonValue}></div>
      </div>
    </div>
  );
};

export default Skeleton;
