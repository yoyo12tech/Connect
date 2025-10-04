import {useState} from 'react'
import { FaHeart, FaComment, FaShare, FaBookmark,  } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function postStats({post,setShowComments,showComments,commentCount}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [breaker, setBreaker] = useState(true);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 51));
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 11));
  const baseUrl = import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin;
  const postId = post?._id || post?.id;
  const link = `${baseUrl}/post/${postId}`;

  const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    if(breaker){
      setShareCount(shareCount+1);
      setBreaker(false);
    }
    setShared(true);
    try {
      navigator.clipboard.writeText(link);
    } catch(e) {
      console.error('Clipboard failed', e);
    }
    setTimeout(()=>{ setShared(false) },2000)
    };

    
  const handleSave = () => {

      setSaved(!saved);
  };

  return (
    <>
        <div className='bg-gradient-to-r from-blue-400 to bg-pink-500 w-full h-[1px] rounded-4xl mt-6'></div>
        <div className="flex justify-center items-center">
          <div className="flex space-x-4 w-full justify-evenly my-3 ">
              <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-red-400 ${liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-300'}`}
              >
              <FaHeart className='hover:text-red-400 duration-300 text-lg' />
              <span className='text-lg'>{likeCount}</span>
              </motion.button>
              <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={()=>setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-300"
              >
              <FaComment className='hover:text-blue-400 duration-300 text-lg' />
              <span className='text-lg'>{commentCount}</span>
              </motion.button>
              <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-300"
              >
              <FaShare className='hover:text-amber-300 duration-300 text-lg' />
              <span className='text-lg'>{shareCount}</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className={`${saved ? 'text-blue-700' : 'text-gray-500 dark:text-gray-300'}`}
            >
            <FaBookmark />
            </motion.button> 
            {shared ? <p className='text-md mt-1'>Share link ready ✓</p> : ""}

          </div>
          
    </div>
    </>
  )
}
