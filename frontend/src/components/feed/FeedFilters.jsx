import React, { useState } from 'react'
import { Filter, TrendingUp, Clock, Users, Star } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { Card, CardContent } from '../ui/Card'
import { motion } from 'framer-motion'

const FeedFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Posts', icon: Filter, count: 0 },
    { id: 'connections', label: 'Connections', icon: Users, count: 8 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Feed Filters</h3>
           
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              const isActive = activeFilter === filter.id

              return (
                <motion.div
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`relative ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'hover:bg-blue-50 hover:border-blue-200'
                    }`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                    {filter.count > 0 && (
                      <Badge
                        className={`ml-2 h-5 px-1.5 text-xs ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {filter.count}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeedFilters
