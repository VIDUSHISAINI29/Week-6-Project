import React, {useState, useEffect, useContext} from 'react'
import PostCreation from './PostCreation'
import Post from './Post'
import FeedFilters from './FeedFilters'
// import LivePoll from '../interactive/LivePoll'
// import { useAppSelector } from '../../hooks/redux'
import Skeleton from '../ui/Skeleton';
import { motion } from 'framer-motion'
import { api } from '../../utils/axios.js';
import {AuthContext} from '../../context/AuthContext';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
          const fetchPosts = async () => {
        try {
            const res = await api.get('/all-posts'); 
            console.log('Fetched posts:', res.data.posts);
            setPosts(res.data.posts);
        } catch (error) {
            console.log('Error fetching posts:', error.message);
        }
    }
    fetchPosts();
    }, [posts.length])

//   const { posts, loading } = useAppSelector((state) => state.posts)
 const loading = false;
  if (loading) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 glass-card rounded-3xl"
        >
          <Skeleton className="h-32 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100" />
        </motion.div>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 glass-card rounded-3xl"
          >
            <div className="flex items-center mb-4 space-x-4">
              <Skeleton className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-200 to-purple-200" />
              <div className="space-y-2">
                <Skeleton className="w-32 h-4 bg-gradient-to-r from-blue-100 to-purple-100" />
                <Skeleton className="w-24 h-3 bg-gradient-to-r from-gray-100 to-blue-100" />
              </div>
            </div>
            <Skeleton className="h-32 rounded-2xl bg-gradient-to-r from-indigo-100 to-pink-100" />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border glass-elevated rounded-3xl border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 gradient-text">Welcome back, {user.name}!</h2>
            <p className="text-gray-600">Here's what's happening in your network today</p>
          </div>
          <div className="hidden space-x-2 md:flex">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse" />
            <div className="w-6 h-6 delay-300 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-20 animate-pulse" />
            <div className="w-4 h-4 delay-700 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <PostCreation />
      <FeedFilters />
      
      {/* Featured Live Poll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="hover-lift"
      >
        {/* <LivePoll
          id="poll-1"
          question="What's the most important skill for career growth in 2024?"
          options={[
            { id: '1', text: 'AI & Machine Learning', votes: 45, voters: [] },
            { id: '2', text: 'Leadership & Communication', votes: 32, voters: [] },
            { id: '3', text: 'Data Analysis', votes: 28, voters: [] },
            { id: '4', text: 'Remote Collaboration', votes: 19, voters: [] }
          ]}
          totalVotes={124}
          endsAt={new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()}
          createdBy={{
            id: '1',
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1NjkxMjcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            title: 'Senior Product Manager at Google'
          }}
          onVote={(pollId, optionId) => console.log('Voted:', pollId, optionId)}
        /> */}
      </motion.div>
      
      {/* Posts Feed */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.4,
              ease: [0.25, 0.25, 0, 1]
            }}
            className="hover-lift"
          >
            <Post
              id={post.id}
              userId={post.userId}
              content={post.content}
              image={post.image}
              video={post.video}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              likes={post.likes}
              comments={post.comments}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* End of feed message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-12 text-center"
      >
        <div className="max-w-md p-8 mx-auto glass-card rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-400">
            <span className="text-2xl">🎉</span>
          </div>
          <h3 className="mb-2 font-semibold text-gray-800">You're all caught up!</h3>
          <p className="text-sm text-gray-600">You've seen all the latest posts from your network.</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Feed
