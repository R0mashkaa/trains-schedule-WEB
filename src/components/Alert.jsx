import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function ErrorAlert({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <AnimatePresence>
      {message && visible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3"
        >
          <FaExclamationTriangle className="text-2xl" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
