import React, { useState, useEffect, useContext } from 'react'
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, ThumbsUp, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avtar'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
// import { toggleLike, incrementComments, incrementShares } from '../../store/slices/postsSlice'
// import { ImageWithFallback } from '../figma/ImageWithFallback'
import { motion } from 'framer-motion'
import { api } from '../../utils/axios.js';
import { AuthContext } from '../../context/AuthContext'

const Post = ({ id, userId, content, image, video, createdAt, updatedAt, likes = [], comments = [] }) => {
  const { user } = useContext(AuthContext)
  const [isHovered, setIsHovered] = useState(false);
  const [authorOfPost, setAuthorOfPost] = useState(null);

 const updatePost = () => {
    try {
        
    } catch (error) {
        console.log('Error updating post:', error.message);
    }
 }

 const handleComment = () => {
    try {
        
    } catch (error) {
        console.log('Error updating post:', error.message);
    }
 }

 const likeAndCommentOnPost = async () => {
        try {
            const res = await api.put(`add-likes-on-post/${id}`, { userId: user._id});
        } catch (error) {
            console.log("Error liking/commenting on post:", error.message);
        }
 }

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data for:", userId);
      try {
        const res = await api.get(`user/${userId}`);
        console.log('Fetched user data at post:', res.data.user);
        setAuthorOfPost(res.data.user);
      } catch (error) {
        console.log('Error fetching user data at post:', error.message);
      }
    }
    if (userId) {
      fetchUserData();
    }
  }, [userId])

  console.log('Author of post:', authorOfPost);
const formatCreatedAt = (createdAt, updatedAt) => {
    const validDate = updatedAt ? updatedAt : createdAt;
  const date = new Date(validDate);
  console.log('Parsed date:', date);
  if (isNaN(date.getTime())) return 'Invalid Date'; // check for invalid date

  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes <= 0 ? 'Just now' : `${diffInMinutes}m`;
  }
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
};


  const profileImages = [
    "https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTY5MjE5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1676694047732-768cea5b66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlb3BsZSUyMGRpdmVyc2V8ZW58MXx8fHwxNzU2OTAxNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1NjkxMjcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ]


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="overflow-hidden transition-all duration-500 border glass-elevated rounded-3xl hover:shadow-2xl hover:shadow-blue-500/10 border-white/30 hover:border-white/50">
        <div className="relative p-8">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-white/5 to-blue-50/10 group-hover:opacity-100" />
          
          {/* Post Header */}
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Avatar className="transition-all duration-300 shadow-lg w-14 h-14 ring-3 ring-white/50 hover:ring-blue-400/50">
                  <AvatarImage src={authorOfPost?.profilePic || '/src/assets/react.svg'}  alt={authorOfPost?.name || "user"} />
                  <AvatarFallback className="font-semibold text-white gradient-primary">
                    {authorOfPost?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center mb-1 space-x-3">
                  <motion.h4 
                    className="font-semibold text-gray-800 transition-colors cursor-pointer hover:text-blue-600"
                    whileHover={{ scale: 1.02 }}
                  >
                    {authorOfPost?.name || "Unknown User"}
                  </motion.h4>
                  {/* <Badge className="text-white border-0 shadow-sm bg-gradient-to-r from-blue-500 to-purple-500">
                    2nd
                  </Badge>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> */}
                </div>

                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-full">{formatCreatedAt(createdAt)}</span>
                  <span className="text-blue-500">🌐</span>
                  <span className="text-green-500">•</span>
                  <span className="text-gray-400">Public</span>
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="sm" className="p-3 rounded-full hover:bg-white/60 backdrop-blur-sm">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </Button>
            </motion.div>
          </div>

          {/* Post Content */}
          <div className="relative z-10 space-y-6">
            <div className="text-base leading-relaxed text-gray-800">
              {content.split(' ').map((word, index) =>
                word.startsWith('#') ? (
                  <motion.span
                    key={index}
                    className="font-medium text-blue-600 transition-colors cursor-pointer hover:text-blue-700"
                    whileHover={{ scale: 1.05 }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}{' '}
                  </motion.span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </div>

            {image && (
              <motion.div 
                className="relative overflow-hidden shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group"
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
              >
                <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
                {/* Replace with your ImageWithFallback if needed */}
                <img
                  src={image}
                  alt="Post image"
                  className="object-contain w-full transition-transform duration-500 h-72 group-hover:scale-105"
                />
              </motion.div>
            )}
          </div>

          {/* Engagement Stats */}
          {(likes.length > 0 || comments.length > 0 ) && (
            <div className="relative z-10 flex items-center justify-between py-4 mt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm">
                {likes.length > 0 && (
                  <motion.div className="flex items-center space-x-2 transition-colors cursor-pointer hover:text-blue-600 group" whileHover={{ scale: 1.05 }}>
                    <div className="flex -space-x-1">
                      <motion.div className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full shadow-sm bg-gradient-to-r from-blue-500 to-blue-600" whileHover={{ scale: 1.1, rotate: 15 }}>
                        <ThumbsUp className="w-3 h-3 text-white fill-current" />
                      </motion.div>
                      {/* <motion.div className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full shadow-sm bg-gradient-to-r from-red-500 to-pink-500" whileHover={{ scale: 1.1, rotate: -15 }}>
                        <Heart className="w-3 h-3 text-white fill-current" />
                      </motion.div>
                      <motion.div className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-emerald-500" whileHover={{ scale: 1.1, rotate: 15 }}>
                        <span className="text-xs text-white">👏</span>
                      </motion.div> */}
                    </div>
                    <span className="font-medium text-gray-600 group-hover:text-blue-600">{likes.length}</span>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                {comments.length > 0 && (
                  <motion.span className="font-medium transition-colors cursor-pointer hover:text-blue-600" whileHover={{ scale: 1.05 }}>
                    {comments.length} comments
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="relative z-10 flex items-center justify-start gap-5 pt-4 border-t border-gray-50">
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-200 ${
                  likes.includes(user?._id) 
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={likeAndCommentOnPost}
              >
                <motion.div
                  animate={likes.includes(user?._id) ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ThumbsUp className={`w-5 h-5 ${likes.includes(user?._id) ? 'fill-current' : ''}`} />
                </motion.div>
                <span>Like</span>
              </Button>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center px-4 py-3 space-x-2 font-medium text-gray-600 transition-all duration-200 rounded-full hover:text-green-600 hover:bg-green-50"
                onClick={handleComment}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comment</span>
              </Button>
            </motion.div>

                  {/* <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center px-4 py-3 space-x-2 font-medium text-gray-600 transition-all duration-200 rounded-full hover:text-yellow-600 hover:bg-yellow-50"
                onClick={handleShare}
              >
                <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                  <Repeat2 className="w-5 h-5" />
                </motion.div>
                <span>Repost</span>
              </Button>
            </motion.div> */}
            
            {/* <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center px-4 py-3 space-x-2 font-medium text-gray-600 transition-all duration-200 rounded-full hover:text-purple-600 hover:bg-purple-50"
              >
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Send className="w-5 h-5" />
                </motion.div>
                <span>Send</span>
              </Button>
            </motion.div> */}

            {/* <motion.div 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.7, scale: isHovered ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="p-3 text-gray-500 transition-all duration-200 rounded-full hover:text-orange-600 hover:bg-orange-50"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
            </motion.div> */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Post;
