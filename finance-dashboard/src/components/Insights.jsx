function Insights({ transactions, isDark = true }) {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense')
  const income = transactions.filter((transaction) => transaction.type === 'income')

  const expenseByCategory = expenses.reduce((accumulator, transaction) => {
    accumulator[transaction.category] =
      (accumulator[transaction.category] || 0) + transaction.amount
    return accumulator
  }, {})

  const highestSpendingEntry =
    Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0] || null

  const latestDate =
    transactions.length > 0
      ? new Date(
          Math.max(...transactions.map((transaction) => new Date(transaction.date).getTime())),
        )
      : new Date()

  const currentMonth = latestDate.getMonth()
  const currentYear = latestDate.getFullYear()
  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1)
  const previousMonth = previousMonthDate.getMonth()
  const previousYear = previousMonthDate.getFullYear()

  const currentMonthExpenses = expenses
    .filter((transaction) => {
      const date = new Date(transaction.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const previousMonthExpenses = expenses
    .filter((transaction) => {
      const date = new Date(transaction.date)
      return date.getMonth() === previousMonth && date.getFullYear() === previousYear
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expenseChange = currentMonthExpenses - previousMonthExpenses
  const expenseDirection =
    expenseChange > 0 ? 'Increased' : expenseChange < 0 ? 'Decreased' : 'No Change'

  const expenseChangePercent =
    previousMonthExpenses === 0
      ? currentMonthExpenses === 0
        ? 0
        : 100
      : Math.abs((expenseChange / previousMonthExpenses) * 100)

  const totalExpenses = expenses.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0)
  const financeInsight =
    totalExpenses > totalIncome
      ? 'You are spending more than you earn'
      : 'Your finances are balanced'

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  const sectionClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-white/60 bg-white/70 shadow-blue-900/10'
  const headingClass = isDark ? 'text-white' : 'text-slate-900'
  const subtextClass = isDark ? 'text-slate-300' : 'text-slate-600'
  const valueClass = isDark ? 'text-cyan-300' : 'text-cyan-700'
  const warningClass = isDark ? 'text-amber-300' : 'text-amber-700'
  const positiveClass = isDark ? 'text-emerald-300' : 'text-emerald-700'

  return (
    <section
      className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl sm:p-6 ${sectionClass}`}
    >
      <h2 className={`text-xl font-semibold ${headingClass}`}>Insights</h2>
      <p className={`mt-1 text-sm ${subtextClass}`}>
        Key observations from your transaction activity.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className={`rounded-xl border p-4 ${sectionClass}`}>
          <p className={`text-sm ${subtextClass}`}>Highest Spending Category</p>
          <p className={`mt-2 text-base font-semibold ${valueClass}`}>
            {highestSpendingEntry ? highestSpendingEntry[0] : 'No expense data'}
          </p>
          {highestSpendingEntry && (
            <p className={`mt-1 text-sm ${subtextClass}`}>
              Total: <span className="font-semibold">{formatCurrency(highestSpendingEntry[1])}</span>
            </p>
          )}
        </div>

        <div className={`rounded-xl border p-4 ${sectionClass}`}>
          <p className={`text-sm ${subtextClass}`}>Monthly Expense Comparison</p>
          <p
            className={`mt-2 text-base font-semibold ${
              expenseDirection === 'Decreased' ? positiveClass : warningClass
            }`}
          >
            {expenseDirection}
          </p>
          <p className={`mt-1 text-sm ${subtextClass}`}>
            {expenseChangePercent.toFixed(1)}% vs previous month
          </p>
        </div>

        <div className={`rounded-xl border p-4 ${sectionClass}`}>
          <p className={`text-sm ${subtextClass}`}>Simple Insight</p>
          <p
            className={`mt-2 text-base font-semibold ${
              totalExpenses > totalIncome ? warningClass : positiveClass
            }`}
          >
            {financeInsight}
          </p>
          <p className={`mt-1 text-sm ${subtextClass}`}>
            Income: <span className="font-semibold">{formatCurrency(totalIncome)}</span> | Expenses:{' '}
            <span className="font-semibold">{formatCurrency(totalExpenses)}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Insights
