import React, { useState, useContext, useEffect } from "react";
import {
   Image,
   Video,
   Calendar,
   FileText,
   Smile,
   MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avtar";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
// import { useAppSelector, useAppDispatch } from '../../hooks/redux'
// import { addPost } from '../../store/slices/postsSlice'
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/axios.js";

const PostCreation = ({onPostCreated }) => {
   const { user } = useContext(AuthContext);
   const [content, setContent] = useState("");
   const [isExpanded, setIsExpanded] = useState(false);
   const [isImageOrVideo, setIsImageOrVideo] = useState(false);
   const [isImage, setIsImage] = useState(false);
   const [isVideo, setIsVideo] = useState(false);
   const [disablePostButton, setDisablePostButton] = useState(true);
   const [postData, setPostData] = useState({
      userId: "",
      content: "",
      image: "",
      video: "",
   });

   const handlePost = async () => {};

   const handleImageUpload = async (e) => {
      if (!isImageOrVideo) {
         setIsImageOrVideo(true);
         const file = e.target.files[0];
         if (!file) return;

         const reader = new FileReader();

         reader.readAsDataURL(file);

         reader.onload = async () => {
            const base64Image = reader.result;
            setIsImage(true);
            setIsExpanded(true)

            setPostData({ ...postData, image: base64Image });
         };
      }
   };
   const handleVideoUpload = async (e) => {
      if (!isImageOrVideo) {
         setIsImageOrVideo(true);
         const file = e.target.files[0];
         if (!file) return;

         setIsVideo(true);
         setPostData({ ...postData, video: file });
      }
   };

     const cancelFunction = () => {
        setIsExpanded(false);
        setIsImage(false);
        setIsImageOrVideo(false);
        setDisablePostButton(true);
    setPostData({
        userId: "",
        content: "",
        image: ""})
   }

   const refreshFields = () => {
        setIsImage(false);
      setIsImageOrVideo(false)
      setDisablePostButton(true);
       setPostData({
        userId: "",
        content: "",
        image: ""})
   }

   const createPostFunction = async () => {
      try {
         const payload = { ...postData, userId: user._id };
         const res = await api.post("/create-post", payload);
         console.log("Post created:", res.data.post);
         onPostCreated();
         refreshFields()
      } catch (error) {
         console.log("Error creating post:", error.message);
      }
   };
   useEffect(() => {
      if (postData.image || postData.video || postData.content.trim() !== "") {
         setDisablePostButton(false);
      } else {
         setDisablePostButton(true);
      }
   }, [postData]);

 

   const mediaOptions = [
      {
         icon: Image,
         label: "Photo",
         color: "text-blue-600",
         bgColor: "hover:bg-blue-50",
         accept: "image/*",
      },
    //   {
    //      icon: Video,
    //      label: "Video",
    //      color: "text-green-600",
    //      bgColor: "hover:bg-green-50",
    //      accept: "video/*",
    //   },
   ];

   if (!user) return null;

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}>
         <div className="overflow-hidden transition-all duration-500 border shadow-xl glass-elevated rounded-3xl border-white/30 hover:shadow-2xl">
            <div className="relative p-8">
               {/* Gradient overlay */}
               <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
               <div className="relative z-10 flex space-x-5">
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     transition={{ type: "spring", stiffness: 300 }}>
                     <Avatar className="w-16 h-16 transition-all duration-300 shadow-lg ring-3 ring-white/60 hover:ring-blue-400/50">
                        <AvatarImage
                           src={user.profilePic}
                           alt={user.name}
                        />
                        <AvatarFallback className="text-xl font-semibold text-white gradient-primary">
                           {user.name.charAt(0)}
                        </AvatarFallback>
                     </Avatar>
                  </motion.div>
                  <div className="flex-1">
                     <motion.div layout transition={{ duration: 0.2 }}>
                        <Textarea
                           placeholder="Share your thoughts with your network..."
                           value={postData.content}
                           onChange={(e) =>
                              setPostData({
                                 ...postData,
                                 content: e.target.value,
                              })
                           }
                           onFocus={() => setIsExpanded(true)}
                           className={`resize-none border-0 shadow-none p-4 focus-visible:ring-0 text-lg placeholder:text-gray-500 bg-white backdrop-blur-sm rounded-2xl transition-all duration-300 hover:bg-white/70 focus:bg-white/90 ${
                              isExpanded ? "min-h-[140px]" : "min-h-[80px]"
                           }`}
                        />
                     </motion.div>

                     {/* Image n Video  */}

                     <div>
                        {isImage && (
                           <div className="relative mt-4 overflow-hidden rounded-lg shadow-lg">
                              <img
                                 src={postData.image}
                                 alt="Uploaded"
                                 className="object-contain w-full h-64"
                              />
                           </div>
                        )}
                        {/* {isVideo && (
                           <div className="relative mt-4 overflow-hidden rounded-lg shadow-lg">
                              <video
                                 controls
                                 className="object-contain w-full h-64">
                                 <source
                                    src={postData.video}
                                    type="video/mp4"
                                 />
                                 Your browser does not support the video tag.
                              </video>
                           </div>
                        )} */}
                     </div>

                     {/* 
                     {isExpanded && (
                        <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{ duration: 0.2 }}
                           className="mt-4">
                           <div className="flex items-center mb-6 space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEmojiClick}
                        className="px-4 py-2 text-gray-600 transition-all duration-200 rounded-full hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Smile className="w-5 h-5 mr-2" />
                        Add emoji
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMoreOptions}
                        className="px-4 py-2 text-gray-600 transition-all duration-200 rounded-full hover:text-purple-600 hover:bg-purple-50"
                      >
                        <MoreHorizontal className="w-5 h-5 mr-2" />
                        More options
                      </Button>
                    </motion.div>
                  </div>
                        </motion.div>
                     )} */}
                  </div>
               </div>

               <div className="relative z-10 flex items-center justify-between pt-6 mt-8 border-t border-gray-100">
                  {!isImageOrVideo && (
                     <div className="flex space-x-3">
                        {mediaOptions.map((option, index) => {
                           const Icon = option.icon;

                           return (
                              <motion.div
                                 key={option.label}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.05 }}
                                 whileHover={{ scale: 1.05, y: -2 }}
                                 whileTap={{ scale: 0.95 }}>
                                 {/* hidden input */}
                                 <input
                                    type="file"
                                    id={`upload-${option.label}`}
                                    className="hidden"
                                    accept={option.accept}
                                    onChange={
                                       option.accept === "image/*"
                                          ? handleImageUpload
                                          : handleVideoUpload
                                    }
                                 />

                                 {/* button triggers input click */}
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium ${option.color} ${option.bgColor} transition-all duration-200 hover:shadow-md`}
                                    onClick={() =>
                                       document
                                          .getElementById(
                                             `upload-${option.label}`
                                          )
                                          .click()
                                    }>
                                    <Icon className="w-5 h-5" />
                                    <span className="hidden sm:inline">
                                       {option.label}
                                    </span>
                                 </Button>
                              </motion.div>
                           );
                        })}
                     </div>
                  )}

                  <div className="flex items-center space-x-3">
                     {isExpanded && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.2 }}>
                           <Button
                              variant="outline"
                              onClick={cancelFunction}>
                              Cancel
                           </Button>
                        </motion.div>
                     )}
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                           onClick={createPostFunction}
                           disabled={disablePostButton}
                           className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                           Post
                        </Button>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default PostCreation;
