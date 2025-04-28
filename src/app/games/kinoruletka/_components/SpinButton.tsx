import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface SpinButtonProps {
  onClick: () => void
}

export default function SpinButton({ onClick }: SpinButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button onClick={onClick}>Крутить!</Button>
    </motion.div>
  )
}
