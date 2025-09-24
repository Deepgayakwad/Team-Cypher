import { useState } from "react";
import LoanCard from './LoanCard';

export default function LoanForm() {
  const [formData, setFormData] = useState({
    loan_id: "",
    lender_name: "",
    loan_type: "",
    principal_amount: "",
    interest_rate: "",
    tenure: "",
    start_date: "",
  });

  const [submittedLoans, setSubmittedLoans] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedLoans([...submittedLoans, formData]);
    setFormData({
      loan_id: "",
      lender_name: "",
      loan_type: "",
      principal_amount: "",
      interest_rate: "",
      tenure: "",
      start_date: "",
    });
  };

  return (
    <div className="min-h-full w-full bg-white">

      <div className="w-full flex flex-col items-center justify-start p-6" style={{ backgroundColor: "#006642" }}>
        {/* Loan Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Loan Details Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Loan ID</label>
                <input
                  type="text"
                  name="loan_id"
                  value={formData.loan_id}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Lender Name</label>
                <input
                  type="text"
                  name="lender_name"
                  value={formData.lender_name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Loan Type</label>
                <select
                  name="loan_type"
                  value={formData.loan_type}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                >
                  <option value="">Select Loan Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="car">Car Loan</option>
                  <option value="education">Education Loan</option>
                </select>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Principal Amount</label>
                <input
                  type="number"
                  name="principal_amount"
                  value={formData.principal_amount}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  name="interest_rate"
                  value={formData.interest_rate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Tenure (Months)</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Loan Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display Submitted Loans as Cards */}
      <div className="bg-white w-full py-6 px-4 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
          {submittedLoans.map((loan, index) => (
            <LoanCard key={index} loan={loan} />
          ))}
        </div>
      </div>

      {/* Compare Button: Only show if 2 or more loans */}
      {submittedLoans.length >= 2 && (
        <div className="w-full flex justify-center mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
            Compare
          </button>
        </div>
      )}
    </div>
  );
}
