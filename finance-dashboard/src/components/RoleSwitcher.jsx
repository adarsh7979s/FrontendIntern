function RoleSwitcher({ role, onRoleChange, isDark }) {
  const labelClass = isDark ? 'text-slate-200' : 'text-slate-700'
  const selectClass = isDark
    ? 'border-white/20 bg-white/10 text-slate-100 shadow-blue-500/10 focus:border-white/40'
    : 'border-slate-300 bg-white text-slate-800 shadow-slate-300/50 focus:border-slate-500'
  const optionClass = isDark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="role" className={`text-sm font-medium ${labelClass}`}>
        Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(event) => onRoleChange(event.target.value)}
        className={`rounded-lg border px-3 py-2 text-sm shadow-lg outline-none backdrop-blur-lg transition-all duration-300 ${selectClass}`}
      >
        <option value="viewer" className={optionClass}>
          Viewer
        </option>
        <option value="admin" className={optionClass}>
          Admin
        </option>
      </select>
    </div>
  )
}

export default RoleSwitcher
