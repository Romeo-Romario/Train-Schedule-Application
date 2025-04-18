import React from "react";

interface Props {
  children: string;
}

const GridCard = ({ children }: Props) => {
  return (
    <div className="col p-3">
      <div className="card">
        <div className="card-body">
          <div className="card-text">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
