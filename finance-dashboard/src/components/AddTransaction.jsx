import { useState } from 'react'

function AddTransaction({ onAddTransaction, isDark = true }) {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('expense')

  const fieldClass = isDark
    ? 'border-white/20 bg-white/10 text-slate-100 placeholder:text-slate-400'
    : 'border-slate-300 bg-white text-slate-800 placeholder:text-slate-400'
  const labelClass = isDark ? 'text-slate-200' : 'text-slate-700'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!date || !amount || !category.trim() || !type) return

    const newTransaction = {
      id: Date.now(),
      date,
      amount: Number(amount),
      category: category.trim(),
      type,
    }

    onAddTransaction(newTransaction)

    setDate('')
    setAmount('')
    setCategory('')
    setType('expense')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-xl border border-white/20 bg-white/5 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="date" className={`text-sm font-medium ${labelClass}`}>
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-cyan-400 ${fieldClass}`}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="amount" className={`text-sm font-medium ${labelClass}`}>
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-cyan-400 ${fieldClass}`}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="category" className={`text-sm font-medium ${labelClass}`}>
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. Groceries"
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-cyan-400 ${fieldClass}`}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="type" className={`text-sm font-medium ${labelClass}`}>
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-cyan-400 ${fieldClass}`}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-blue-700 hover:brightness-105 active:scale-95"
      >
        Add Transaction
      </button>
    </form>
  )
}

export default AddTransaction
