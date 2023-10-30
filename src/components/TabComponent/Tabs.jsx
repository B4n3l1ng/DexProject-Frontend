/* eslint-disable react/prop-types */
import { useState } from "react";
import MovesTable from "../MovesTable";

const Tabs = ({ levelingMoves, tutorMoves, machineMoves }) => {
  const [activeTab, setActiveTab] = useState("leveling");
  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li
          className={activeTab === "leveling" ? "active" : ""}
          onClick={() => setActiveTab("leveling")}
        >
          Level Up Moves
        </li>
        <li
          className={activeTab === "tutor" ? "active" : ""}
          onClick={() => setActiveTab("tutor")}
        >
          Tutor Moves
        </li>
        <li
          className={activeTab === "machine" ? "active" : ""}
          onClick={() => setActiveTab("machine")}
        >
          TM/TR Moves
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "leveling" ? (
          <div className="levelUpMoves">
            <MovesTable array={levelingMoves} hasLevel />
          </div>
        ) : activeTab === "tutor" ? (
          <div className="tutorMoves">
            <MovesTable array={tutorMoves} />
          </div>
        ) : activeTab === "machine" ? (
          <div className="machineMoves">
            <MovesTable array={machineMoves} />
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default Tabs;
