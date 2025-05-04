import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHeart className="text-primary-500 text-2xl" />
          </motion.div>
          <motion.h1 
            className="text-2xl md:text-3xl font-serif font-medium text-complement-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            花便り
          </motion.h1>
        </Link>
        
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-complement-500 hidden md:block italic font-serif">
            Send flowers with love, digitally
          </p>
        </motion.div>
      </div>
    </header>
  )
}

export default Header