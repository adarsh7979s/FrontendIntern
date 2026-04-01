function DashboardCards({ transactions, isDark }) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  const cardClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-white/60 bg-white/70 shadow-blue-900/10'
  const labelClass = isDark ? 'text-slate-300' : 'text-slate-600'
  const balanceClass = isDark ? 'text-blue-200' : 'text-blue-700'
  const incomeClass = isDark ? 'text-green-300' : 'text-green-700'
  const expenseClass = isDark ? 'text-red-300' : 'text-red-700'

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div
        className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${cardClass}`}
      >
        <p className={`text-sm font-medium ${labelClass}`}>Total Balance</p>
        <p className={`mt-2 text-2xl font-bold ${balanceClass}`}>
          {formatCurrency(totalBalance)}
        </p>
      </div>

      <div
        className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${cardClass}`}
      >
        <p className={`text-sm font-medium ${labelClass}`}>Total Income</p>
        <p className={`mt-2 text-2xl font-bold ${incomeClass}`}>
          {formatCurrency(totalIncome)}
        </p>
      </div>

      <div
        className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${cardClass}`}
      >
        <p className={`text-sm font-medium ${labelClass}`}>Total Expenses</p>
        <p className={`mt-2 text-2xl font-bold ${expenseClass}`}>
          {formatCurrency(totalExpenses)}
        </p>
      </div>
    </div>
  )
}

export default DashboardCards
