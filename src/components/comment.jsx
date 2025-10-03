import { useContext,useState,useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import DropDownComponent from './commentDropDown';
import AddComment from '../components/postComment'
import {authContext} from '../context/authContext'
import userPhoto from '../assets/user3.png'

export default function Comment({comment,postId,post,setComments,setCommentCount}) {
  const {userId,profilePicture} = useContext(authContext);
  const [profilePicSrc, setProfilePicSrc] = useState(false)
  useEffect(() => {
      if(userId == comment.commentCreator._id){
        setProfilePicSrc(profilePicture)
      }
      else{
        setProfilePicSrc(comment.commentCreator.photo)
      }

    
  }, [])
  



  const [commentmode, setCommentmode] = useState('comment')
  
  return (

      commentmode == "comment" ? 

        <div className=' rounded-xl p-2 mb-3 relative'>
            <div className="flex justify-between">
                <div className="flex">
                      <img onError={(e) => e.target.src = userPhoto} className=" rounded-full w-10 h-10 mr-3 border-1 border-purple-400" src={profilePicSrc}  />
                      <div>
                          <h3 className="text-md font-semibold ">{comment.commentCreator.name}</h3>
                          <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                      </div>
                </div>
                
                {userId == comment.commentCreator._id && 
                        <div className="postdetails pointer  absolute top-[-6px] right-0">
                          <DropDownComponent setCommentMode ={setCommentmode} postId={postId} post={post} setComments={setComments} setCommentCount={setCommentCount}  comment={comment}/>
                        </div>
                }
            </div>
            <p className='mt-4  w-5/6 ms-13 rounded-xl  '>{comment.content}</p>
        </div>

        :
          <AddComment postId={postId} oldComment={comment} setComments={setComments} setCommentmode={setCommentmode} commentmode={commentmode} setCommentCount={setCommentCount} />

  

    
  )
}
