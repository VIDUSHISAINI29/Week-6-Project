import React from 'react'
import { Trophy, Star, Zap, Award, Target, Crown, Users } from 'lucide-react'
import Badge from './Badge'
import { motion } from 'framer-motion'

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  target: Target,
  crown: Crown,
  users: Users
}

const rarityStyles = {
  common: 'bg-gray-100 text-gray-700 border-gray-200',
  rare: 'bg-blue-100 text-blue-700 border-blue-200',
  epic: 'bg-purple-100 text-purple-700 border-purple-200',
  legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300'
}

const AchievementBadge = ({ achievement, size = 'md', showProgress = false }) => {
  const Icon = iconMap[achievement.icon]
  const isUnlocked = !!achievement.unlockedAt
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      title={`${achievement.title} - ${achievement.description} ${achievement.rarity}`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full border-2 flex items-center justify-center ${
          isUnlocked 
            ? rarityStyles[achievement.rarity]
            : 'bg-gray-50 text-gray-400 border-gray-200 opacity-60'
        } transition-all duration-200`}
      >
        <Icon className={iconSizes[size]} />
      </div>
      
      {showProgress && achievement.progress !== undefined && achievement.maxProgress && !isUnlocked && (
        <div className="mt-1">
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div 
              className="h-1 transition-all duration-300 bg-blue-600 rounded-full"
              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-center text-muted-foreground">
            {achievement.progress}/{achievement.maxProgress}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default AchievementBadge;
