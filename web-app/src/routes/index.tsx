// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Factory,
  Calculator,
  Package,
  BarChart3,
  Network,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const tasks = [
    {
      id: '1',
      title: 'Линейное программирование',
      desc: 'Графический метод',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-600',
      status: 'Готово',
    },
    {
      id: '5',
      title: 'Производство посуды',
      desc: 'Транспортная задача · 3 станка → 3 продукта',
      icon: Factory,
      color: 'from-emerald-500 to-teal-600',
      status: 'Готово',
    },
    {
      id: '15',
      title: 'Модель EOQ',
      desc: 'Оптимальный размер заказа · Минимизация затрат',
      icon: Package,
      color: 'from-amber-500 to-orange-600',
      status: 'Готово',
    },
    {
      id: '7',
      title: 'Распределение инвестиций',
      desc: 'Динамическое программирование',
      icon: Calculator,
      color: 'from-pink-500 to-rose-600',
      status: 'В работе',
    },
    {
      id: '16',
      title: 'Сетевой график',
      desc: 'CPM · Критический путь · Резервы времени',
      icon: Network,
      color: 'from-cyan-500 to-blue-600',
      status: 'В работе',
    },
    {
      id: '9',
      title: 'Симуляция очереди',
      desc: 'Моделирование 30 заданий · СМО',
      icon: Clock,
      color: 'from-violet-500 to-purple-600',
      status: 'В работе',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16 mt-10">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">
            РГР проект по КТвИО
          </h1>
          <p className="text-2xl text-slate-700 max-w-4xl mx-auto">
            Решение задач исследования операций с использованием современных
            методов оптимизации
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Вариант 4
            </Badge>
          </div>
        </div>

        {/* Сетка задач */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <Link key={task.id} to={`/task-${task.id}`} className="group block">
              <Card className="h-full overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                  <div
                    className={`p-4 w-fit rounded-2xl bg-linear-to-br ${task.color} shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <task.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="mt-4 text-2xl flex items-center justify-between">
                    Задача {task.id}
                    <Badge
                      variant={
                        task.status === 'Готово' ? 'default' : 'secondary'
                      }
                    >
                      {task.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {task.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{task.desc}</p>
                  <Button className="w-full group-hover:bg-indigo-600 transition-colors">
                    Перейти к решению →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
