import React from 'react'
import { motion } from 'framer-motion'

const Logo = ({ variant = 'default', className = '' }) => {
  return (
    <motion.div 
      className={`flex items-center rounded-xl space-x-3 p-1  ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className="relative group">
        {/* Main logo background with enhanced gradient */}
        <motion.div 
          className="flex items-center justify-center w-12 h-12 border shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl border-white/20 backdrop-blur-sm"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl font-bold tracking-tight text-white">GC</span>
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent group-hover:opacity-100" />
        </motion.div>
        
        {/* Status indicator with pulse animation */}
        <motion.div 
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-sm -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-green-500"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4)",
              "0 0 0 4px rgba(34, 197, 94, 0.1)",
              "0 0 0 0 rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative particles */}
        <div className="absolute w-2 h-2 rounded-full -top-2 -left-2 bg-blue-400/30 animate-pulse" />
        <div className="absolute -bottom-1 -right-2 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse delay-300" />
      </div>
      
      {variant === 'default' && (
        <motion.div 
          className="hidden sm:block"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 , duration: 0.4 }}
        >
          <h1 className="text-xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text">
            Global Connect
          </h1>
          <div className="flex items-center -mt-1 space-x-2">
            <div className="w-5 h-px bg-gradient-to-r from-blue-400 to-purple-400" />
            <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
              Professional Network
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Logo;