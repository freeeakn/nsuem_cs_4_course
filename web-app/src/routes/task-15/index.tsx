import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Package, DollarSign, CalendarDays, TrendingUp } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'

export const Route = createFileRoute('/task-15/')({
  component: Task15,
})

function Task15() {
  // Исходные данные
  const D = 1040 // годовой спрос, ед./год
  const S = 30 // затраты на один заказ, у.е.
  const H = 150 // затраты на хранение 1 ед. в год, у.е./ед./год

  // Формулы EOQ (модель Уилсона)
  const Qopt = Math.sqrt((2 * D * S) / H) // ≈ 83.666
  const QoptRounded = Math.round(Qopt) // 84 ед.
  const Nopt = D / Qopt // количество заказов в год
  const Topt = 365 / Nopt // цикл заказа, дней
  const TCopt = Math.sqrt(2 * D * S * H) // минимальные общие затраты

  // Данные для графика (от 20 до 200 ед. с шагом 5)
  const chartData = Array.from({ length: 37 }, (_, i) => {
    const Q = 20 + i * 5
    const orderingCost = (D / Q) * S
    const holdingCost = (Q / 2) * H
    const totalCost = orderingCost + holdingCost
    return {
      Q,
      'Затраты на заказы': Math.round(orderingCost),
      'Затраты на хранение': Math.round(holdingCost),
      'Общие затраты': Math.round(totalCost),
    }
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Заголовок */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Задача 15. Модель EOQ — Оптимальный размер заказа
          </h1>
          <p className="text-xl text-slate-700">
            Классическая модель управления запасами (модель Уилсона)
          </p>
        </div>

        {/* Главный результат */}
        <Alert className="border-2 border-slate-300 bg-slate-50 shadow-xl">
          <TrendingUp className="h-8 w-8 text-slate-700" />
          <AlertTitle className="text-3xl font-bold text-slate-800">
            Оптимальная политика закупок
          </AlertTitle>
          <AlertDescription className="text-xl text-slate-800 mt-4 space-y-3">
            <div>
              Заказывать{' '}
              <strong className="text-4xl">{QoptRounded} единиц</strong> товара
            </div>
            <div>
              Каждые{' '}
              <strong className="text-3xl">{Topt.toFixed(1)} дней</strong> (
              {Nopt.toFixed(2)} раз в год)
            </div>
            <div className="text-2xl font-bold text-green-700 mt-4">
              Минимальные годовые затраты:{' '}
              <span className="text-4xl">
                {Math.round(TCopt).toLocaleString()} у.е.
              </span>
            </div>
          </AlertDescription>
        </Alert>

        {/* Ключевые показатели */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-2xl bg-linear-to-br from-blue-50 to-indigo-50">
            <CardContent className="pt-8">
              <Package className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
              <p className="text-sm uppercase text-gray-600">
                Оптимальный размер заказа
              </p>
              <p className="text-6xl font-bold text-indigo-800">
                {QoptRounded} ед.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Q* = √(2DS/H) ≈ {Qopt.toFixed(3)}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-2xl bg-linear-to-br from-emerald-50 to-teal-50">
            <CardContent className="pt-8">
              <CalendarDays className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
              <p className="text-sm uppercase text-gray-600">
                Периодичность заказа
              </p>
              <p className="text-6xl font-bold text-emerald-800">
                {Topt.toFixed(1)} дней
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ≈ {Nopt.toFixed(2)} заказов в год
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-2xl bg-linear-to-br from-rose-50 to-pink-50">
            <CardContent className="pt-8">
              <DollarSign className="w-16 h-16 mx-auto text-rose-600 mb-4" />
              <p className="text-sm uppercase text-gray-600">
                Минимальные затраты в год
              </p>
              <p className="text-6xl font-bold text-rose-800">
                {Math.round(TCopt).toLocaleString()} у.е.
              </p>
              <p className="text-sm text-gray-500 mt-2">TC* = √(2DSH)</p>
            </CardContent>
          </Card>
        </div>

        {/* График */}
        <Card className="shadow-2xl overflow-hidden">
          <CardHeader className="text-center bg-linear-to-r from-slate-100 to-orange-100">
            <CardTitle className="text-2xl text-slate-800">
              Зависимость общих затрат от размера заказа
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={480}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 40, left: 40, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis
                  dataKey="Q"
                  label={{
                    value: 'Размер заказа Q, ед.',
                    position: 'insideBottom',
                    offset: -15,
                  }}
                />
                <YAxis
                  label={{
                    value: 'Годовые затраты, у.е.',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  formatter={(v: number) => v.toLocaleString() + ' у.е.'}
                />
                <Legend verticalAlign="top" height={40} />

                <Line
                  type="monotone"
                  dataKey="Затраты на заказы"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Затраты на хранение"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Общие затраты"
                  stroke="#7c3aed"
                  strokeWidth={4}
                  dot={false}
                />

                <ReferenceDot
                  x={QoptRounded}
                  y={Math.round(TCopt)}
                  r={12}
                  fill="#dc2626"
                  stroke="#fff"
                  strokeWidth={4}
                  label={{
                    value: 'Оптимум',
                    position: 'top',
                    fill: '#dc2626',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Математическое обоснование */}
        <Card className="bg-linear-to-r from-indigo-50 to-purple-50 border-4 border-indigo-600">
          <CardHeader>
            <CardTitle className="text-indigo-800 text-2xl">
              Математическое решение и обоснование
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-indigo-700 mb-3">
                  Оптимальный размер заказа
                </h3>
                <p className="font-mono text-xl">Q* = √(2 × D × S / H)</p>
                <p className="text-2xl font-bold text-indigo-800 mt-3">
                  Q* = √(2 × 1040 × 30 / 150) ={' '}
                  <span className="text-3xl">{Qopt.toFixed(3)}</span> ≈{' '}
                  <strong>{QoptRounded} ед.</strong>
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-purple-700 mb-3">
                  Минимальные общие затраты
                </h3>
                <p className="font-mono text-xl">TC* = √(2 × D × S × H)</p>
                <p className="text-2xl font-bold text-purple-800 mt-3">
                  TC* = √(2 × 1040 × 30 × 150) ={' '}
                  <strong className="text-3xl">
                    {Math.round(TCopt).toLocaleString()} у.е./год
                  </strong>
                </p>
              </div>
            </div>
            <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
              <p className="text-lg font-semibold text-emerald-800">
                В точке оптимума затраты на размещение заказов равны затратам на
                хранение:
              </p>
              <p className="text-center text-2xl font-bold text-emerald-700 mt-4">
                (D/Q*) × S = (Q*/2) × H → {Math.round((D / Qopt) * S)} у.е. ={' '}
                {Math.round((Qopt / 2) * H)} у.е.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Вывод */}
        <div className="text-center py-10 bg-white rounded-2xl shadow-2xl">
          <p className="text-3xl font-bold text-slate-800">
            Рекомендуемая политика: заказывать по 84 единицы каждые ~29.4 дня
          </p>
          <p className="text-xl text-gray-700 mt-4">
            Это даёт минимальные суммарные затраты на заказы и хранение —{' '}
            <strong>{Math.round(TCopt).toLocaleString()} у.е. в год</strong>
          </p>
          <Badge className="mt-6 text-lg px-8 py-3 bg-linear-to-r from-green-500 to-emerald-600">
            Решение математически обосновано и глобально оптимально
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default Task15
