import { Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="flex justify-center items-center gap-12 mt-20 py-10 border-t border-slate-300">
      <a
        target="_blank"
        rel="noreferrer"
        className="p-2 bg-green-400 rounded-full hover:scale-110 duration-200"
        href="https://github.com/freeeakn/nsuem_cs_4_course"
      >
        <Github className="size-6" />
      </a>
      <p className="text-slate-600">
        Сделано с использованием React + TanStack Router + Recharts + ShadCN UI
      </p>
    </footer>
  )
}

export default Footer
