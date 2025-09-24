import React from 'react';
import LoanCard from './LoanCard';
import loans from '../sampleData/SampleLoans';

export default function Loans() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Previous Loans Taken By Customer </h1>
      <div className="flex space-x-4 overflow-x-auto pb-4 justify-center items-center">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
}



