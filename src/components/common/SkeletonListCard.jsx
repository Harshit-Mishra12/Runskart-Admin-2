import React from "react";
import styles from "./SkeletonListCard.module.css"; // Assuming you have a CSS module for skeleton styles

const SkeletonListCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonText}></div>
    </div>
  );
};

export default SkeletonListCard;
