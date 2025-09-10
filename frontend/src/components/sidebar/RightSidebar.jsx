import React, {useState, useContext, useEffect} from 'react'
import {Link} from "react-router-dom"
import { Plus, X, TrendingUp, Users, Briefcase, Calendar, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avtar'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Separator from '../ui/Separator'
import { motion } from 'framer-motion'
import { api } from '../../utils/axios.js';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext.jsx'


const RightSidebar = () => {
const { user } = useContext(AuthContext);
const [usersArray, setUsersArray] = useState([]);
const [jobsArray, setJobsArray] = useState([]);

const{requests, getConnectionRequests, respondToRequest, requestResponded, sendConnectionRequest, requestSent} = useContext(SocketContext);
  
const [connections, setConnections] = useState([]);

    const handleConnect = (personId) => {
        sendConnectionRequest(personId);
    }

 
  


  useEffect(() => {
      const fetchAllUsers = async () => {
        try {
            const res = await api.get(`/people-to-connect/${user._id}`);;
            setUsersArray(res.data.users.slice(0,3));
            console.log("Fetched users:", res.data.users);
        } catch (error) {
            console.log("Error fetching users:", error.message)
        }
    }

    const fetchAllJobs = async () => {
        try {
            const res = await api.get('/all-jobs');
            setJobsArray(res.data.jobs.slice(0,3));
            console.log("Fetched jobs:", res.data.jobs);
        } catch (error) {
            console.log("Error fetching jobs:", error.message)
        }
    }

    fetchAllUsers();
    fetchAllJobs();
  }, [requestSent])

 
  

 const formatCreatedAt = (createdAt) => {
    //   const validDate = updatedAt ? updatedAt : createdAt;
      const date = new Date(createdAt);
      // console.log('Parsed date:', date);
      if (isNaN(date.getTime())) return "Invalid Date"; // check for invalid date

      const now = new Date();
      const diffInMs = now - date;
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

      if (diffInHours < 1) {
         const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
         return diffInMinutes <= 0 ? "Just now" : `${diffInMinutes}m`;
      }
      if (diffInHours < 24) return `${diffInHours}h`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
   };
  const profileImages = [
    "https://images.unsplash.com/photo-1676694047732-768cea5b66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlb3BsZSUyMGRpdmVyc2V8ZW58MXx8fHwxNzU2OTAxNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTY5MjE5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ]

  return (
    <div className="space-y-6 w-80">
      {/* People You May Know */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center font-semibold">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                People you may know
              </h4>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {usersArray.map((person, index) => (
              <motion.div
                key={person._id}
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-start p-3 space-x-3 transition-colors rounded-lg group-hover:bg-accent">
                  <Avatar className="w-12 h-12 ring-2 ring-blue-600/10">
                    <AvatarImage
                      src={person.profilePic }
                      alt={person.name}
                    />
                    <AvatarFallback className="text-white bg-gradient-to-br from-blue-500 to-purple-600">
                      {person.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{person.name}</p>
                    {/* <p className="text-xs truncate text-muted-foreground">{person.title}</p>
                    <p className="text-xs truncate text-muted-foreground">{person.company}</p> */}
                    <div className="flex items-center mt-1 space-x-1">
                      {/* <div className="w-1 h-1 bg-blue-600 rounded-full"></div> */}
                      {/* <p className="text-xs text-blue-600">
                        {person.mutualConnections} mutual connections
                      </p> */}
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 text-xs h-7 hove:cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleConnect(person._id)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
                 <Separator />
              </motion.div>
            ))}
            <Link to="/network">
            
            <Button variant="outline" className="w-full">
              Show all
            </Button></Link>
          </CardContent>
        </Card>

        
      </motion.div>

      {/* Trending News */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <h4 className="flex items-center font-semibold">
              <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
              Trending in Tech
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium transition-colors group-hover:text-blue-600">
                    AI Revolution in 2024
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    2 hours ago • 12,543 readers
                  </p>
                </div>
                <Badge className="text-xs text-red-700 bg-red-100">Hot</Badge>
              </div>
            </div>

            <Separator />

            <div className="cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium transition-colors group-hover:text-blue-600">
                    Remote Work Evolution
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    5 hours ago • 8,921 readers
                  </p>
                </div>
                <Badge className="text-xs text-blue-700 bg-blue-100">Trending</Badge>
              </div>
            </div>

            <Separator />

            <div className="cursor-pointer group">
              <p className="text-sm font-medium transition-colors group-hover:text-blue-600">
                Startup Funding Reaches New Heights
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1 day ago • 15,678 readers
              </p>
            </div>

            <Separator />

            <div className="cursor-pointer group">
              <p className="text-sm font-medium transition-colors group-hover:text-blue-600">
                Tech Skills in High Demand
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                2 days ago • 6,234 readers
              </p>
            </div>

            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View all news
            </Button>
          </CardContent>
        </Card>
      </motion.div> */}

      {/* Jobs for You */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <h4 className="flex items-center font-semibold">
              <Briefcase className="w-4 h-4 mr-2 text-green-600" />
              Jobs for you
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobsArray.map((job, index) => (
            <div key={job._id} className="p-3 transition-colors rounded-lg cursor-pointer bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 group hover:bg-accent">
                     <div className="flex items-center justify-between ">
                    <p className="text-sm font-medium">{job.title}</p>
                <span className="text-xs text-muted-foreground">{formatCreatedAt(job.createdAt)}</span>
              </div>
                <div className='flex items-center '>
                <span className="text-sm text-muted-foreground">{job.skills[0]}&nbsp;</span>
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-muted-foreground"> &nbsp;{job.skills[1]} &nbsp;</span>
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-muted-foreground"> &nbsp;{job.skills[2]}&nbsp;</span>
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-muted-foreground"> &nbsp; ...</span>
                </div>


             
              <div className="flex items-center justify-start ">
                  {/* <Button
                      size="sm"
                      className="mt-2 text-xs h-7 hove:cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleConnect(person)}
                    >
                     
                      View
                    </Button> */}
              </div>
            </div>
            ))}

            <Separator />

            <Link to="/jobs">
            <Button variant="outline" className="w-full">
              <Briefcase className="w-4 h-4 mr-2" />
              Show all jobs
            </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="pb-3">
            <h4 className="flex items-center font-semibold text-purple-800">
              <Calendar className="w-4 h-4 mr-2" />
              Continue Learning
            </h4>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-900">Advanced React Patterns</p>
              <div className="w-full h-2 bg-purple-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <p className="text-xs text-purple-700">65% complete</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-900">Leadership in Tech</p>
              <p className="text-xs text-purple-700">Based on your profile</p>
            </div>

            <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default RightSidebar
