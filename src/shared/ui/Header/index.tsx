import { Link, useLocation } from '@tanstack/react-router'
import { Home, Brain, Factory, BarChart3, Package } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const tasks = [
    {
      id: '1',
      title: 'Задача 1',
      desc: 'Графический метод + двойственная задача',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-600',
      status: 'В работе',
    },
    {
      id: '5',
      title: 'Задача 5',
      desc: 'Транспортная задача · 3 станка → 3 продукта',
      icon: Factory,
      color: 'from-emerald-500 to-teal-600',
      status: 'Готово',
    },
    {
      id: '15',
      title: 'Задача 15',
      desc: 'Оптимальный размер заказа · Минимизация затрат',
      icon: Package,
      color: 'from-amber-500 to-orange-600',
      status: 'Готово',
    },
  ]
  return (
    <header className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                КТвИО РГР
              </h1>
              <p className="text-xs text-slate-400">
                Вариант 4 • Исследование операций
              </p>
            </div>
          </Link>

          {/* Навигация */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-slate-700">
            <NavLink
              to="/"
              icon={<Home className="w-4 h-4" />}
              label="Главная"
              active={isActive('/')}
            />
            {tasks.map((task) => (
              <NavLink
                key={task.id}
                to={`/task-${task.id}`}
                icon={<task.icon className="w-4 h-4" />}
                label={task.title}
                active={isActive(`/task-${task.id}`)}
              />
            ))}
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Печёнкин Артур ФИ202</p>
            <p className="text-sm font-medium text-indigo-400">
              Оптимизация принятия решений
            </p>
          </div>
        </nav>
      </div>
    </header>
  )
}

function NavLink({
  to,
  icon,
  label,
  active,
}: {
  to: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 font-medium ${
        active
          ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
          : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
