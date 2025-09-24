export function generateEmiSchedule({ principal, annualRatePercent, tenureMonths, startMonthIndex = 0 }) {
  const r = (annualRatePercent / 12) / 100
  const n = tenureMonths
  const p = principal
  if (n <= 0) return []
  const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  let balance = p
  const rows = []
  for (let i = 1; i <= n; i++) {
    const interest = r * balance
    const principalComponent = Math.min(emi - interest, balance)
    balance = Math.max(0, balance - principalComponent)
    rows.push({
      installment: i,
      payment: emi,
      principal: principalComponent,
      interest,
      balance,
      monthIndex: startMonthIndex + i - 1,
    })
  }
  return rows
}


