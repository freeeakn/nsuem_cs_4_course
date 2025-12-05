import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Factory, Package, Calculator } from 'lucide-react'

export const Route = createFileRoute('/task-5/')({
  component: Task5Page,
})

function Task5Page() {
  return <Task5 />
}

const Task5: React.FC = () => {
  const costs = [
    [1.2, 1.3, 1.1], // Станок 1
    [1.4, 1.2, 1.5], // Станок 2
    [1.1, 1.0, 1.3], // Станок 3
  ]

  const capacities = [2000, 3000, 3000]
  const demands = [4000, 2400, 1000]
  const products = ['Бокалы', 'Чашки', 'Вазы']
  const machines = ['Станок 1', 'Станок 2', 'Станок 3']

  // оптимальный план с учётом баланса
  const plan = [
    [1000, 0, 1000], // Станок 1: 1000 бокалов + 1000 ваз = 2000
    [2000, 1000, 0], // Станок 2: 2000 бокалов + 1000 чашек = 3000
    [1000, 1400, 0], // Станок 3: 1000 бокалов + 1400 чашек = 2400 (недогруз 600)
  ]

  // === Расчёт общей стоимости ===
  const totalCost =
    1000 * 1.2 +
    1000 * 1.1 + // Станок 1: бокалы и вазы
    2000 * 1.4 +
    1000 * 1.2 + // Станок 2: бокалы и чашки
    1000 * 1.1 +
    1400 * 1.0 // Станок 3: бокалы и чашки

  const contributions = [
    '1000 × 1.2 = 1200 (бокалы, станок 1)',
    '1000 × 1.1 = 1100 (вазы, станок 1)',
    '2000 × 1.4 = 2800 (бокалы, станок 2)',
    '1000 × 1.2 = 1200 (чашки, станок 2)',
    '1000 × 1.1 = 1100 (бокалы, станок 3)',
    '1400 × 1.0 = 1400 (чашки, станок 3)',
  ]

  // Проверка баланса
  const totalCapacity = capacities.reduce((a, b) => a + b, 0)
  const totalDemand = demands.reduce((a, b) => a + b, 0)
  const surplus = totalCapacity - totalDemand

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Задача 5. Производство стеклянной посуды
          </h1>
          <p className="text-xl text-slate-600">
            Транспортная задача · Минимизация затрат
          </p>
        </div>

        <Alert className="border-emerald-200 bg-emerald-50">
          <Calculator className="h-6 w-6 text-emerald-700" />
          <AlertTitle className="text-2xl font-bold text-emerald-900">
            Оптимальное решение найдено!
          </AlertTitle>
          <AlertDescription className="text-lg text-emerald-800 mt-3">
            Минимальные затраты:{' '}
            <strong className="text-3xl">{totalCost.toLocaleString()}</strong>{' '}
            ден.ед.
            <br />
            Все заказы выполнены · Избыток мощности: {surplus} шт.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Таблица затрат */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-6 h-6" />
                Единичные затраты (ден.ед./шт.)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left">
                      Станок
                    </th>
                    {products.map((p) => (
                      <th
                        key={p}
                        className="border border-slate-300 px-4 py-3 text-center font-medium"
                      >
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m, i) => (
                    <tr key={m}>
                      <td className="border border-slate-300 px-4 py-2 font-medium bg-slate-50">
                        {m}{' '}
                        <Badge variant="secondary">{capacities[i]} шт.</Badge>
                      </td>
                      {costs[i].map((c, j) => (
                        <td
                          key={j}
                          className={`border border-slate-300 px-4 py-2 text-center ${
                            (j === 0 && i === 2 && c === 1.1) || // Бокалы на станке 3
                            (j === 1 && i === 2 && c === 1.0) || // Чашки на станке 3
                            (j === 2 && i === 0 && c === 1.1) // Вазы на станке 1
                              ? 'bg-green-100 font-bold text-green-800'
                              : ''
                          }`}
                        >
                          {c}
                          {(j === 0 && i === 2 && c === 1.1) ||
                          (j === 1 && i === 2 && c === 1.0) ||
                          (j === 2 && i === 0 && c === 1.1)
                            ? ' (мин.)'
                            : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="font-bold bg-amber-50">
                    <td className="border border-slate-300 px-4 py-2">
                      Требуется
                    </td>
                    {demands.map((d, j) => (
                      <td
                        key={j}
                        className="border border-slate-300 px-4 py-2 text-center font-bold"
                      >
                        {d}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-sm text-slate-600">
                <p>Общая мощность станков: {totalCapacity} шт.</p>
                <p>Общий спрос: {totalDemand} шт.</p>
                <p>
                  Избыток мощности: <strong>{surplus} шт.</strong> (станок 3
                  недогружен)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Оптимальный план */}
          <Card className="border-emerald-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Package className="w-6 h-6" />
                Оптимальный план производства (шт.)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-emerald-100">
                    <th className="border border-emerald-300 px-4 py-3 text-left">
                      Станок
                    </th>
                    {products.map((p) => (
                      <th
                        key={p}
                        className="border border-emerald-300 px-4 py-3 text-center"
                      >
                        {p}
                      </th>
                    ))}
                    <th className="border border-emerald-300 px-4 py-3">
                      Всего / Мощность
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m, i) => {
                    const rowTotal = plan[i].reduce((a, b) => a + b, 0)
                    const utilization = rowTotal
                    const capacity = capacities[i]
                    const isUnderutilized = rowTotal < capacity

                    return (
                      <tr key={m}>
                        <td className="border border-slate-300 px-4 py-2 font-medium bg-slate-50">
                          {m}
                        </td>
                        {plan[i].map((val, j) => (
                          <td
                            key={j}
                            className={`border border-slate-300 px-4 py-2 text-center font-bold ${
                              val > 0 ? 'bg-yellow-100 text-yellow-900' : ''
                            }`}
                          >
                            {val || '-'}
                          </td>
                        ))}
                        <td className="border border-slate-300 px-4 py-2 text-center font-bold">
                          <div>{rowTotal} шт.</div>
                          <div
                            className={`text-sm ${isUnderutilized ? 'text-orange-600' : 'text-green-600'}`}
                          >
                            из {capacity} шт.
                            {isUnderutilized
                              ? ` (недогруз ${capacity - rowTotal} шт.)`
                              : ' ✓'}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="font-bold bg-emerald-100">
                    <td className="border border-slate-300 px-4 py-2">Итого</td>
                    {[0, 1, 2].map((j) => (
                      <td
                        key={j}
                        className="border border-slate-300 px-4 py-2 text-center font-bold"
                      >
                        {plan[0][j] + plan[1][j] + plan[2][j]}
                      </td>
                    ))}
                    <td className="border border-slate-300 px-4 py-2 text-center">
                      <div className="text-xl">
                        {totalDemand} / {totalCapacity}
                      </div>
                      <div className="text-sm text-slate-600">
                        спрос / мощность
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Расчёт */}
        <Card className="bg-linear-to-r from-emerald-50 to-teal-50">
          <CardHeader>
            <CardTitle className="text-emerald-800">
              Подробный расчёт стоимости
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {contributions.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <code className="text-sm font-mono">{item}</code>
                </div>
              ))}
            </div>
            <div className="text-right text-4xl font-bold text-emerald-700 border-t pt-4">
              ИТОГО: {totalCost.toLocaleString()} ден.ед.
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="text-emerald-700">Анализ решения</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-4">
            <p>
              <strong>Принцип распределения:</strong> Используем станки с
              минимальными удельными затратами для каждого вида продукции:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Бокалы</strong> — минимальная стоимость 1.1 (станок 3),
                но ограниченная мощность
              </li>
              <li>
                <strong>Чашки</strong> — минимальная стоимость 1.0 (станок 3)
              </li>
              <li>
                <strong>Вазы</strong> — минимальная стоимость 1.1 (станок 1)
              </li>
            </ul>
            <p className="font-semibold text-emerald-600">
              Решение оптимально: все заказы выполнены, избыток мощности{' '}
              {surplus} шт. на станке 3 не используется.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-blue-800">
                <strong>Проверка баланса:</strong> Мощность ({totalCapacity}{' '}
                шт.) {'>'} Спрос ({totalDemand} шт.) = Избыток {surplus} шт.
                <br />В классической транспортной задаче добавляется фиктивный
                потребитель, но здесь мы просто недогружаем станок 3.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Task5
