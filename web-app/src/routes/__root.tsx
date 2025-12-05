import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '@/shared/ui/Header'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from '@tanstack/react-router'
import Footer from '@/shared/ui/Footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{
            opacity: 0,
            y: -20,
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
          }}
          transition={{
            duration: 0.15,
            ease: 'easeInOut',
          }}
          className="p-6"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
