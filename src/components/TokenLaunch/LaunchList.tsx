import React from "react";
import List from "../common/List";

const LaunchList: React.FC<{ launches: any[] }> = ({ launches }) => {
  return (
    <List
      items={launches}
      renderItem={(launch) => (
        <div>
          <p>Token Name: {launch.name}</p>
          <p>Symbol: {launch.symbol}</p>
        </div>
      )}
    />
  );
};

export default LaunchList;