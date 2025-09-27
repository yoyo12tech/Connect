import { formatDistanceToNow } from "date-fns";
import DropDownComponent from './dropDown';
import { useContext } from 'react';
import {authContext} from '../context/authContext'

export default function postHeader({post,setmode,getPosts,onDelete}) {
  const {userId} = useContext(authContext)
  return (

    <div className="flex items-center relative justify-between">
      <div className="post-user flex items-center mb-5">
        <img
            className="h-12 w-12 rounded-full object-cover border-2 border-purple-400"
            src={post.user.photo}
            alt="User profile"
        />
        <div className="ml-4 ">
            <h2 className="font-bold text-xl">{post.user.name}</h2>
            <p className="text-sm"> {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        </div>
      
      </div>
      
      {userId == post.user._id &&
        <div className="postdetails absolute top-[-17px] right-0 pointer">
          <DropDownComponent setmode ={setmode} post={post} getPosts={getPosts} onDelete={onDelete}/>
        </div>
      }
      

    </div>
        
  )
}
