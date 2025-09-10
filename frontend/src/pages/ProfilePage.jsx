import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit3, Camera, MapPin, Building, Calendar, Mail, Phone, Link as LinkIcon, Award, Users, Eye, MessageCircle, Share } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avtar'
import Badge from '../components/ui/Badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
// import { useAppSelector } from '../hooks/redux'
import AchievementBadge from '../components/ui/AchievementBadge'
// import { ProfileEditModal } from '../components/profile/ProfileEditModal'
import { toast } from 'sonner'

export function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth)
  const [profileViews] = useState(1247)
  const [connectionRequests] = useState(23)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [profileData, setProfileData] = useState(user)

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'Next.js'
  ]

  const achievements = [
    { id: '1', title: 'Top Contributor', description: 'Most helpful posts this month', icon: '🏆', rarity: 'gold' },
    { id: '2', title: 'Network Builder', description: 'Connected with 500+ professionals', icon: '🤝', rarity: 'silver' },
    { id: '3', title: 'Knowledge Sharer', description: 'Published 10+ articles', icon: '📚', rarity: 'bronze' },
    { id: '4', title: 'Early Adopter', description: 'Joined Global Connect Beta', icon: '🚀', rarity: 'gold' }
  ]

  const experience = [
    {
      company: 'TechCorp Inc.',
      title: 'Senior Software Engineer',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of next-generation web applications using React and Node.js'
    },
    {
      company: 'StartupXYZ',
      title: 'Full Stack Developer',
      duration: '2020 - 2022',
      location: 'Remote',
      description: 'Built scalable web applications and APIs for growing startup'
    }
  ]

  const education = [
    {
      school: 'Stanford University',
      degree: 'MS Computer Science',
      duration: '2018 - 2020',
      location: 'Stanford, CA'
    },
    {
      school: 'UC Berkeley',
      degree: 'BS Computer Science',
      duration: '2014 - 2018',
      location: 'Berkeley, CA'
    }
  ]

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = (newProfileData: any) => {
    setProfileData(newProfileData)
    // Here you would normally dispatch to Redux store
    toast.success('Profile updated successfully!')
  }

  const handleShare = () => {
    toast.success('Profile link copied to clipboard!')
  }

  const handleMessage = () => {
    toast.info('Messaging feature coming soon!')
  }

  return (
    <div className="container max-w-6xl px-4 py-6 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <Card className="overflow-hidden glass-elevated">
          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <Button
              variant="ghost"
              size="sm"
              className="absolute text-white top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Edit Cover
            </Button>
          </div>

          <div className="px-8 pb-8">
            {/* Profile Info */}
            <div className="relative z-10 flex flex-col items-start gap-6 -mt-16 md:flex-row md:items-end">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1NjkxMjcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt={user?.name} 
                  />
                  <AvatarFallback className="text-3xl font-bold text-white gradient-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute p-2 bg-white rounded-full shadow-lg bottom-2 right-2 hover:bg-gray-50"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold gradient-text">{profileData?.name || user?.name}</h1>
                    <Badge className="text-white gradient-primary">Premium</Badge>
                  </div>
                  <p className="mb-2 text-xl text-muted-foreground">{profileData?.title || user?.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {profileData?.company || user?.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData?.location || user?.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{user?.connections}</span>
                    <span className="text-muted-foreground">connections</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{profileViews}</span>
                    <span className="text-muted-foreground">profile views</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleMessage} className="gradient-primary hover-lift">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" onClick={handleShare} className="border-0 glass-card hover-lift">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleEditProfile} className="border-0 glass-card hover-lift">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
              <Card className="p-4 text-center glass-card hover-lift">
                <div className="text-2xl font-bold gradient-text">{connectionRequests}</div>
                <div className="text-sm text-muted-foreground">Pending Requests</div>
              </Card>
              <Card className="p-4 text-center glass-card hover-lift">
                <div className="text-2xl font-bold gradient-text">8.4k</div>
                <div className="text-sm text-muted-foreground">Profile Impressions</div>
              </Card>
              <Card className="p-4 text-center glass-card hover-lift">
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-sm text-muted-foreground">Profile Completion</div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 border-0 glass-card">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="p-6 glass-elevated">
              <h3 className="mb-4 text-xl font-semibold">About</h3>
              <p className="leading-relaxed text-muted-foreground">
                Passionate software engineer with 5+ years of experience building scalable web applications. 
                I specialize in React, Node.js, and cloud technologies. Currently leading a team of developers 
                at TechCorp Inc., where we're building the next generation of enterprise software solutions.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-muted-foreground" />
                  <a href="#" className="text-blue-600 hover:underline">linkedin.com/in/sarah-johnson</a>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card className="p-6 glass-elevated">
              <h3 className="mb-6 text-xl font-semibold">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-blue-200"
                  >
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-2"></div>
                    <div>
                      <h4 className="text-lg font-semibold">{exp.title}</h4>
                      <p className="font-medium text-blue-600">{exp.company}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                      <p className="mt-3 text-muted-foreground">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6 glass-elevated">
              <h3 className="mb-6 text-xl font-semibold">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-green-200"
                  >
                    <div className="absolute w-3 h-3 bg-green-600 rounded-full -left-2 top-2"></div>
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="font-medium text-green-600">{edu.school}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6 glass-elevated">
              <h3 className="mb-6 text-xl font-semibold">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm cursor-pointer glass-card hover-lift"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <Button className="mt-6 gradient-primary hover-lift">
                <Award className="w-4 h-4 mr-2" />
                Get Skill Endorsements
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="p-6 glass-elevated">
              <h3 className="mb-6 text-xl font-semibold">Achievements & Badges</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SimpleAchievementBadge
                      title={achievement.title}
                      description={achievement.description}
                      icon={achievement.icon}
                      rarity={achievement.rarity as 'bronze' | 'silver' | 'gold'}
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Edit Modal */}
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={profileData || user}
          onSave={handleSaveProfile}
        />
      </motion.div>
    </div>
  )
}