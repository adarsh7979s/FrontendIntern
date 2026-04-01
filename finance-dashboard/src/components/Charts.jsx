import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const PIE_COLORS = ['#60a5fa', '#a78bfa', '#22d3ee', '#38bdf8', '#818cf8', '#2dd4bf']

function Charts({ transactions, isDark = true }) {
  const formatDate = (value) => {
    const [year, month, day] = value.split('-')
    return `${day}-${month}-${year}`
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  )

  const lineData = sortedTransactions.reduce((accumulator, transaction) => {
    const previousBalance =
      accumulator.length > 0 ? accumulator[accumulator.length - 1].balance : 0
    const nextBalance =
      previousBalance +
      (transaction.type === 'income' ? transaction.amount : -transaction.amount)

    accumulator.push({
      date: transaction.date,
      balance: nextBalance,
    })

    return accumulator
  }, [])

  const expenseByCategory = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] =
        (accumulator[transaction.category] || 0) + transaction.amount
      return accumulator
    }, {})

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  const totalExpenses = pieData.reduce((sum, item) => sum + item.value, 0)

  const sectionClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-white/60 bg-white/70 shadow-blue-900/10'
  const headingClass = isDark ? 'text-white' : 'text-slate-900'
  const subtextClass = isDark ? 'text-slate-300' : 'text-slate-600'
  const chartText = isDark ? '#cbd5e1' : '#475569'
  const tooltipStyle = isDark
    ? {
        backgroundColor: '#0f172acc',
        border: '1px solid #334155',
        color: '#e2e8f0',
      }
    : {
        backgroundColor: '#ffffffee',
        border: '1px solid #cbd5e1',
        color: '#0f172a',
      }

  return (
    <section
      className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] sm:p-6 ${sectionClass}`}
    >
      <h2 className={`text-xl font-semibold ${headingClass}`}>Charts Section</h2>
      <p className={`mt-1 text-sm ${subtextClass}`}>
        Visual overview of balance trend and expense distribution.
      </p>

      {transactions.length === 0 ? (
        <p className={`mt-6 rounded-xl border p-10 text-center text-sm ${subtextClass} ${sectionClass}`}>
          No transactions yet. Add your first transaction.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className={`rounded-xl border p-4 ${sectionClass} backdrop-blur-lg`}>
            <h3 className={`mb-4 text-base font-semibold ${headingClass}`}>
              Balance Trend
            </h3>
            {lineData.length === 0 ? (
              <div className={`flex h-72 items-center justify-center text-sm ${subtextClass}`}>
                No transaction trend available
              </div>
            ) : (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: chartText, fontSize: 12 }}
                      tickFormatter={formatDate}
                      axisLine={{ stroke: chartText, opacity: 0.25 }}
                      tickLine={{ stroke: chartText, opacity: 0.25 }}
                    />
                    <YAxis
                      tick={{ fill: chartText, fontSize: 12 }}
                      axisLine={{ stroke: chartText, opacity: 0.25 }}
                      tickLine={{ stroke: chartText, opacity: 0.25 }}
                    />
                    <Tooltip contentStyle={tooltipStyle} labelFormatter={formatDate} />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={{ r: 3, fill: '#22d3ee' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className={`rounded-xl border p-4 ${sectionClass} backdrop-blur-lg`}>
            <h3 className={`mb-4 text-base font-semibold ${headingClass}`}>
              Spending by Category
            </h3>
            <div className="h-72 w-full">
              {pieData.length === 0 ? (
                <div
                  className={`flex h-full items-center justify-center text-sm ${subtextClass}`}
                >
                  No expense data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      label={({ name, value }) =>
                        `${name} ${Math.round((value / totalExpenses) * 100)}%`
                      }
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: chartText, fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Charts
