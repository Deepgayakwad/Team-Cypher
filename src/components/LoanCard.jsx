import React from 'react';

export default function LoanCard({ loan }) {
  const handleSelect = () => alert(`Selected loan: ${loan.name}`);

  return (
    <div className="min-w-[280px] bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex-shrink-0 flex flex-col justify-between">
      <div>
        <img src="https://static.vecteezy.com/system/resources/previews/024/269/241/non_2x/car-house-personal-money-loan-concept-finance-business-icon-on-wooden-cube-saving-money-for-a-car-money-and-house-wooden-cubes-with-word-loan-copy-space-for-text-loan-payment-car-and-house-photo.jpg"
          className="w-90 h-70 object-cover rounded-t-xl"></img>
        <h2 className="text-3xl font-semibold mb-2">{loan.name}</h2>
        <p className=""><strong>Amount:</strong> ₹{loan.amount.toLocaleString()}</p>
        <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
        <p><strong>Term:</strong> {loan.term}</p>
      </div>
      <button
        onClick={handleSelect}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition rounded-xl outline"
      >
        Select
      </button>
    </div>
  );
}



