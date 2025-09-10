import React, {useContext} from 'react'
import { Eye, Bookmark, Users, Calendar, TrendingUp, Award } from 'lucide-react';
import AchievementBadge from '../ui/AchievementBadge';
import { Card, CardContent } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avtar';
import Button from '../ui/Button';
import Separator from '../ui/Separator';
import Badge from '../ui/Badge';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const mockAchievements = [
  {
    id: '1',
    title: 'Network Builder',
    description: 'Connected with 100+ professionals',
    icon: 'users',
    rarity: 'rare',
    unlockedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Content Creator',
    description: 'Published 10 posts this month',
    icon: 'star',
    rarity: 'common',
    unlockedAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Industry Expert',
    description: 'Earn 50+ endorsements',
    icon: 'trophy',
    rarity: 'epic',
    progress: 42,
    maxProgress: 50
  }
]

const LeftSidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null

  return (
    <div className="p-5 space-y-6 w-[360px]">
      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hover-lift rounded-3xl"
      >
        <div className="overflow-hidden border hover:cursor-pointer glass-elevated rounded-3xl border-white/30">
          <div className="relative">
            <div className="relative h-24 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute flex space-x-1 top-2 right-2">
                <div className="w-2 h-2 rounded-full animate-pulse" />
                <div className="w-2 h-2 delay-200 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="absolute hover:cursor-pointer -bottom-10 left-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-20 h-20 border-4 border-white shadow-xl ring-4 ring-blue-400/30">
                  <AvatarImage
                    src={user.profilePic}
                    alt={user.name}
                  />
                  <AvatarFallback className="text-xl font-semibold text-white gradient-primary">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
          <div className="relative px-6 pt-12 pb-6">
            <div className="absolute opacity-50 hover:cursor-pointer bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
            <div className="relative z-10 space-y-4">
              <div className="text-center">
                <h3 className="mb-1 text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="mb-1 text-sm font-medium text-gray-600">{user.title}</p>
                <p className="mb-2 text-sm text-gray-500">{user.company}</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">{user.location}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <Badge className="px-2 py-1 text-xs text-white bg-gradient-to-r from-green-500 to-emerald-500">
                    Online
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  className="p-3 text-center transition-all duration-200 cursor-pointer rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-lg font-bold text-blue-600">127</div>
                  <div className="text-xs font-medium text-blue-700">Viewers</div>
                </motion.div>
                <motion.div
                  className="p-3 text-center transition-all duration-200 cursor-pointer rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-lg font-bold text-green-600">1.8K</div>
                  <div className="text-xs font-medium text-green-700">Impressions</div>
                </motion.div>
                <motion.div
                  className="p-3 text-center transition-all duration-200 cursor-pointer rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-lg font-bold text-purple-600">45</div>
                  <div className="text-xs font-medium text-purple-700">Searches</div>
                </motion.div>
              </div>

              <Separator />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                  <Bookmark className="w-5 h-5 mr-2" />
                  View Profile
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hover-lift rounded-3xl"
      >
        <div className="p-6 bg-white border glass-card rounded-3xl border-white/30">
          <h4 className="flex items-center mb-4 font-bold text-gray-800">
            <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="flex-col w-full h-auto p-4 border rounded-2xl hover:bg-blue-50 border-blue-100/50">
                <Users className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Connections</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="flex-col w-full h-auto p-4 border rounded-2xl hover:bg-green-50 border-green-100/50">
                <Eye className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-xs font-medium text-gray-700">Viewers</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="flex-col w-full h-auto p-4 border rounded-2xl hover:bg-purple-50 border-purple-100/50">
                <Calendar className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-xs font-medium text-gray-700">Events</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="flex-col w-full h-auto p-4 border rounded-2xl hover:bg-orange-50 border-orange-100/50">
                <TrendingUp className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-xs font-medium text-gray-700">Analytics</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='rounded-3xl glass-elevated'
      >
        <Card className='rounded-3xl'>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3 ">
              <h4 className="text-sm font-semibold">Recent Activity</h4>
              <Award className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                <p className="text-xs text-muted-foreground">
                  You appeared in <span className="font-medium text-blue-600">23 searches</span> this week
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 mt-2 bg-green-600 rounded-full"></div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-green-600">5 people</span> viewed your profile
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 mt-2 bg-purple-600 rounded-full"></div>
                <p className="text-xs text-muted-foreground">
                  Your post got <span className="font-medium text-purple-600">47 reactions</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='rounded-3xl glass-elevated'
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="flex items-center mb-3 text-sm font-semibold">
              <Award className="w-4 h-4 mr-2 text-yellow-600" />
              Achievements
            </h4>
            <div className="flex space-x-2">
              {mockAchievements.map(achievement => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  size="sm"
                  showProgress={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Upgrade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-orange-800">Try Premium</h4>
                <p className="mt-1 text-xs text-orange-700">
                  Get exclusive insights and advanced features
                </p>
                <Button size="sm" className="mt-2 text-white bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LeftSidebar;