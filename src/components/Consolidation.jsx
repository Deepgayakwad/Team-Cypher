import React from "react";
import { useNavigate } from "react-router-dom";

function Consolidation() {
  const navigate = useNavigate();

  const handleShowLoans = () => {
    navigate("/loans");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleShowLoans}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Show Previous Loans
      </button>
    </div>
  );
}

export default Consolidation;

