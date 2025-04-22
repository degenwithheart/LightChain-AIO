import React from "react";
import List from "../common/List";

const BlockList: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  return (
    <List
      items={blocks}
      renderItem={(block) => (
        <div>
          <p>Block Number: {block.number}</p>
          <p>Hash: {block.hash}</p>
        </div>
      )}
    />
  );
};

export default BlockList;