import React from "react";
import styles from "./TableSkeleton.module.css"; // Create this file for skeleton specific styles

const TableSkeleton = () => {
  const skeletonRows = Array(5).fill(null); // Adjust the number to match your pagination

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.skeletonTable}>
        <thead>
          <tr>
            {[
              "Name",
              "Go Live Date",
              "Creation Cost",
              "Occupancy",
              "Status",
              "Actions",
            ].map((header, index) => (
              <th key={index} className={styles.skeletonHeader}></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className={styles.skeletonRow}>
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <td key={i} className={styles.skeletonCell}>
                    <div className={styles.skeletonBox}></div>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
