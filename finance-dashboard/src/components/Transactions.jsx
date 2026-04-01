import { useState } from 'react'
import AddTransaction from './AddTransaction'

function Transactions({ transactions, filter, setFilter, role, isDark, onAddTransaction }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  const searchedTransactions = filteredTransactions.filter((transaction) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true

    return (
      transaction.category.toLowerCase().includes(query) ||
      transaction.type.toLowerCase().includes(query) ||
      transaction.date.includes(query)
    )
  })

  const sortedTransactions = [...searchedTransactions].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date)
    }
    if (sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date)
    }
    if (sortBy === 'amount-asc') {
      return a.amount - b.amount
    }
    if (sortBy === 'amount-desc') {
      return b.amount - a.amount
    }
    return 0
  })

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  const formatDate = (value) => {
    const [year, month, day] = value.split('-')
    return `${day}-${month}-${year}`
  }

  const sectionClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-white/60 bg-white/70 shadow-blue-900/10'
  const headingClass = isDark ? 'text-white' : 'text-slate-900'
  const subtextClass = isDark ? 'text-slate-300' : 'text-slate-600'
  const labelClass = isDark ? 'text-slate-200' : 'text-slate-700'
  const selectClass = isDark
    ? 'border-white/20 bg-white/10 text-slate-100 shadow-blue-500/10 focus:border-white/40'
    : 'border-slate-300 bg-white text-slate-800 shadow-slate-300/50 focus:border-slate-500'
  const optionClass = isDark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
  const emptyClass = isDark
    ? 'border-white/20 bg-white/5 text-slate-300'
    : 'border-slate-200 bg-slate-50 text-slate-500'
  const tableWrapClass = isDark
    ? 'border-white/20 bg-white/10 shadow-blue-500/10'
    : 'border-slate-200 bg-white shadow-slate-300/50'
  const headRowClass = isDark ? 'bg-white/10 text-slate-200' : 'bg-slate-50 text-slate-700'
  const bodyClass = isDark ? 'divide-white/10' : 'divide-slate-100'
  const rowClass = isDark ? 'text-slate-100 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-50'
  const incomeClass = isDark ? 'text-green-300' : 'text-green-700'
  const expenseClass = isDark ? 'text-red-300' : 'text-red-700'

  const handleAdd = (newTransaction) => {
    onAddTransaction(newTransaction)
    setShowAddForm(false)
  }

  return (
    <section
      className={`rounded-xl border p-5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl sm:p-6 ${sectionClass}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className={`text-xl font-semibold ${headingClass}`}>
            Transactions Section
          </h2>
          <p className={`mt-1 text-sm ${subtextClass}`}>
            Review and filter your latest income and expense activity.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
          <div className="flex items-center gap-2">
            <label htmlFor="transaction-filter" className={`text-sm font-medium ${labelClass}`}>
              Filter
            </label>
            <select
              id="transaction-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className={`rounded-lg border px-3 py-2 text-sm shadow-lg outline-none backdrop-blur-lg transition-all duration-300 ease-in-out ${selectClass}`}
            >
              <option value="all" className={optionClass}>
                All
              </option>
              <option value="income" className={optionClass}>
                Income
              </option>
              <option value="expense" className={optionClass}>
                Expense
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="transaction-sort" className={`text-sm font-medium ${labelClass}`}>
              Sort
            </label>
            <select
              id="transaction-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={`rounded-lg border px-3 py-2 text-sm shadow-lg outline-none backdrop-blur-lg transition-all duration-300 ease-in-out ${selectClass}`}
            >
              <option value="date-desc" className={optionClass}>
                Latest
              </option>
              <option value="date-asc" className={optionClass}>
                Oldest
              </option>
              <option value="amount-desc" className={optionClass}>
                Amount High-Low
              </option>
              <option value="amount-asc" className={optionClass}>
                Amount Low-High
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <label htmlFor="transaction-search" className={`text-sm font-medium ${labelClass}`}>
              Search
            </label>
            <input
              id="transaction-search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Category or type"
              className={`w-full rounded-lg border px-3 py-2 text-sm shadow-lg outline-none backdrop-blur-lg transition-all duration-300 ease-in-out ${selectClass}`}
            />
          </div>
        </div>
      </div>

      {role === 'admin' && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-blue-700 hover:brightness-105 active:scale-95"
          >
            {showAddForm ? 'Close Form' : 'Add Transaction'}
          </button>

          {showAddForm && (
            <AddTransaction onAddTransaction={handleAdd} isDark={isDark} />
          )}
        </div>
      )}

      {sortedTransactions.length === 0 ? (
        <p className={`mt-6 rounded-xl border p-10 text-center text-sm ${emptyClass}`}>
          {transactions.length === 0
            ? 'No transactions yet. Add your first transaction.'
            : 'No matching transactions found. Try another search or filter.'}
        </p>
      ) : (
        <div
          className={`mt-6 overflow-x-auto rounded-xl border p-2 shadow-lg backdrop-blur-lg ${tableWrapClass}`}
        >
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className={headRowClass}>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Amount</th>
                <th className="px-3 py-3 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${bodyClass}`}>
              {sortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`transition-all duration-300 ease-in-out ${rowClass}`}
                >
                  <td className="px-3 py-3.5">{formatDate(transaction.date)}</td>
                  <td className="px-3 py-3.5">{transaction.category}</td>
                  <td
                    className={`px-3 py-3.5 font-semibold ${
                      transaction.type === 'income'
                        ? incomeClass
                        : expenseClass
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Transactions
