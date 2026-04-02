import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Charts from './components/Charts'
import DashboardCards from './components/DashboardCards'
import Insights from './components/Insights'
import RoleSwitcher from './components/RoleSwitcher'
import Transactions from './components/Transactions'
import { mockTransactions } from './data/mockData'

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('finance-dashboard-transactions')

    if (savedTransactions) {
      try {
        return JSON.parse(savedTransactions)
      } catch {
        return mockTransactions
      }
    }

    return mockTransactions
  })
  const [role, setRole] = useState('viewer')
  const [filter, setFilter] = useState('all')
  const [isDark, setIsDark] = useState(true)

  const pageClass = isDark
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100'
    : 'bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900'

  const glassClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-white/60 bg-white/70 shadow-blue-900/10'

  const headingClass = isDark ? 'text-white' : 'text-slate-900'
  const subtextClass = isDark ? 'text-slate-300' : 'text-slate-600'

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  useEffect(() => {
    localStorage.setItem(
      'finance-dashboard-transactions',
      JSON.stringify(transactions),
    )
  }, [transactions])

  return (
    <main
      className={`animated-gradient-bg relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 ${pageClass}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={`blob absolute -left-16 top-12 h-64 w-64 rounded-full blur-3xl ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-400/20'
          }`}
        />
        <div
          className={`blob-drift absolute right-0 top-24 h-72 w-72 rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-400/20'
          }`}
        />
        <div
          className={`blob absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl ${
            isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/20'
          }`}
        />
        <div className="particle-layer absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-5 sm:space-y-6">
        <header
          className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl sm:p-6 ${glassClass}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold tracking-tight ${headingClass}`}>
                Finance Dashboard
              </h1>
              <p className={`mt-1 text-sm ${subtextClass}`}>
                Track transactions and insights in one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                aria-label="Toggle dark and light mode"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-[1.02] hover:brightness-105 active:scale-95 ${
                  isDark
                    ? 'bg-slate-100 text-slate-900 hover:bg-white'
                    : 'bg-slate-900 text-white hover:bg-slate-700'
                }`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <RoleSwitcher role={role} onRoleChange={setRole} isDark={isDark} />
            </div>
          </div>
        </header>

        <section
          className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl sm:p-6 ${glassClass}`}
        >
          <h2 className={`text-lg font-semibold ${headingClass}`}>
            Dashboard Overview
          </h2>
          <p className={`mt-1 text-sm ${subtextClass}`}>
            A quick snapshot of your current financial position.
          </p>
          <div className="mt-4">
            <DashboardCards transactions={transactions} isDark={isDark} />
          </div>
        </section>

        <Charts transactions={transactions} isDark={isDark} />

        <Transactions
          transactions={transactions}
          filter={filter}
          setFilter={setFilter}
          role={role}
          isDark={isDark}
          onAddTransaction={handleAddTransaction}
        />

        <Insights transactions={transactions} isDark={isDark} />
      </div>
      <Analytics />
    </main>
  )
}

export default App
