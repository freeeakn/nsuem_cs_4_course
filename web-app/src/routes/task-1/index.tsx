import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Target } from 'lucide-react'
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'

export const Route = createFileRoute('/task-1/')({
  component: Task1,
})

function Task1() {
  // Вершины допустимой области
  const feasibleRegion = [
    { x: 0, y: 0 }, // A
    { x: 2, y: 0 }, // B
    { x: 3, y: 1.5 }, // C
    { x: 2, y: 3 }, // D
    { x: 0, y: 2 }, // E
    { x: 0, y: 0 }, // замыкаем многоугольник
  ]

  // Данные для линий ограничений
  const constraint1 = [
    { x: 2, y: 0 },
    { x: 5, y: 4.5 },
  ]

  const constraint2 = [
    { x: 0, y: 2 },
    { x: 4, y: 4 },
    { x: 5, y: 4.5 },
  ]

  const constraint3 = [
    { x: 0, y: 6 },
    { x: 4, y: 0 },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Задача 1. Графический метод
          </h1>
          <p className="text-2xl text-gray-700">z = x₁ + x₂ → max</p>
          <p className="text-xl text-gray-600 mt-2">при ограничениях:</p>
          <div className="mt-4 text-lg text-gray-700">
            <p>3x₁ - 2x₂ ≤ 6</p>
            <p>-x₁ + 2x₂ ≤ 4</p>
            <p>3x₁ + 2x₂ ≤ 12</p>
            <p>x₁ ≥ 0, x₂ ≥ 0</p>
          </div>
        </div>

        <Alert className="border-4 border-green-600 bg-green-50 shadow-2xl">
          <Target className="h-12 w-12 text-green-700" />
          <AlertTitle className="text-4xl font-bold text-green-900">
            ОПТИМУМ: x₁ = 2, x₂ = 3 → z = 5
          </AlertTitle>
          <AlertDescription className="text-2xl text-green-800 mt-4">
            Точка пересечения: −x₁ + 2x₂ = 4 и 3x₁ + 2x₂ = 12
          </AlertDescription>
        </Alert>

        <Card className="shadow-3xl overflow-hidden">
          <CardHeader className="text-center bg-linear-to-r from-blue-700 to-indigo-800 text-white">
            <CardTitle className="text-3xl">Графический метод</CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <ResponsiveContainer width="100%" height={700}>
              <ComposedChart
                margin={{ top: 40, right: 60, left: 60, bottom: 80 }}
                data={[]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis
                  type="number"
                  dataKey="x" // Ключ данных для оси X
                  domain={[0, 5]}
                  label={{
                    value: 'x₁',
                    position: 'insideBottom',
                    offset: -15,
                    style: { fontSize: 22, fontWeight: 'bold' },
                  }}
                  ticks={[0, 1, 2, 3, 4, 5]}
                />
                <YAxis
                  type="number"
                  dataKey="y" // Ключ данных для оси Y
                  domain={[0, 6]}
                  label={{
                    value: 'x₂',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 22, fontWeight: 'bold' },
                  }}
                  ticks={[0, 1, 2, 3, 4, 5, 6]}
                />

                {/* Допустимая область — закрашенная */}
                <Area
                  type="linear"
                  data={feasibleRegion}
                  dataKey="y"
                  stroke="#2563eb"
                  strokeWidth={6}
                  fill="#93c5fd"
                  fillOpacity={0.75}
                  name="Допустимая область"
                />

                {/* 1) 3x₁ − 2x₂ = 6 */}
                <Line
                  type="monotone"
                  data={constraint1}
                  dataKey="y"
                  stroke="#f97316"
                  strokeWidth={5}
                  dot={false}
                  name="3x₁ − 2x₂ = 6"
                />

                {/* 2) −x₁ + 2x₂ = 4 */}
                <Line
                  type="monotone"
                  data={constraint2}
                  dataKey="y"
                  stroke="#22c55e"
                  strokeWidth={5}
                  dot={false}
                  name="−x₁ + 2x₂ = 4"
                />

                {/* 3) 3x₁ + 2x₂ = 12 */}
                <Line
                  type="monotone"
                  data={constraint3}
                  dataKey="y"
                  stroke="#a855f7"
                  strokeWidth={5}
                  dot={false}
                  name="3x₁ + 2x₂ = 12"
                />

                {/* Отметки всех вершин */}
                {feasibleRegion.slice(0, 5).map((point, index) => (
                  <ReferenceDot
                    key={index}
                    x={point.x}
                    y={point.y}
                    r={8}
                    fill={
                      point.x === 2 && point.y === 3 ? '#dc2626' : '#3b82f6'
                    }
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}

                {/* Оптимальная точка (2, 3) - выделенная */}
                <ReferenceDot
                  x={2}
                  y={3}
                  r={20}
                  fill="#dc2626"
                  stroke="#fff"
                  strokeWidth={5}
                />
                <ReferenceDot
                  x={2}
                  y={3}
                  r={30}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={4}
                  strokeDasharray="5 5"
                />

                <Tooltip
                  formatter={(value: number, name: string) => [
                    value.toFixed(2),
                    name,
                  ]}
                  labelFormatter={(label) => {
                    // Для ReferenceDot label может быть объектом
                    if (typeof label === 'object' && label.x !== undefined) {
                      return `x₁ = ${label.x.toFixed(2)}, x₂ = ${label.y.toFixed(2)}`
                    }
                    return `x₁ = ${label}`
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Легенда */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-orange-500 rounded"></div>
                <span>3x₁ − 2x₂ = 6</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-green-500 rounded"></div>
                <span>−x₁ + 2x₂ = 4</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-purple-500 rounded"></div>
                <span>3x₁ + 2x₂ = 12</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-blue-600 rounded"></div>
                <span>Допустимая область</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-6 border-4 border-dashed border-red-600 rounded"></div>
                <span className="text-red-600 font-bold">
                  z = x₁ + x₂ = 5 (оптимум)
                </span>
              </div>
            </div>

            {/* Таблица значений в вершинах */}
            <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Значения целевой функции в вершинах:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-lg">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3">Вершина</th>
                      <th className="p-3">x₁</th>
                      <th className="p-3">x₂</th>
                      <th className="p-3">z = x₁ + x₂</th>
                      <th className="p-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 text-center">A</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center">B</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center">C</td>
                      <td className="p-3 text-center">3</td>
                      <td className="p-3 text-center">1.5</td>
                      <td className="p-3 text-center">4.5</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr className="bg-green-50 font-bold">
                      <td className="p-3 text-center">D</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center">3</td>
                      <td className="p-3 text-center text-green-700">5</td>
                      <td className="p-3 text-center text-green-700">
                        ОПТИМУМ
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center">E</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-12 px-8 bg-linear-to-r from-green-600 to-emerald-600 rounded-3xl shadow-3xl text-white">
          <h2 className="text-6xl font-black mb-6">
            ГОТОВО. ОПТИМУМ ДОСТИГНУТ.
          </h2>
          <div className="text-7xl font-black flex justify-center gap-16">
            <span>x₁ = 2</span>
            <span>x₂ = 3</span>
            <span className="text-yellow-300">z = 5</span>
          </div>
          <div className="mt-8 text-2xl">
            Проверка ограничений:
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                3·2 - 2·3 = 6 - 6 = 0 ≤ 6 ✓
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                -2 + 2·3 = -2 + 6 = 4 ≤ 4 ✓
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                3·2 + 2·3 = 6 + 6 = 12 ≤ 12 ✓
              </div>
            </div>
          </div>
          <Badge className="mt-8 text-3xl px-16 py-6 bg-white text-green-700 font-bold hover:bg-gray-100">
            МАКСИМУМ ПОЛЧУЧЕН
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default Task1
