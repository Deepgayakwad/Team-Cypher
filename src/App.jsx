import React, { useState } from 'react';
import Loans from './components/Loans';

export default function App() {
  const [showLoans, setShowLoans] = useState(false);

  return (
    <>
      {!showLoans ? (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={() => setShowLoans(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Consolidation
          </button>
        </div>
      ) : (
        <Loans />
      )}
    </>
  );
}






