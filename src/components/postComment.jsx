import {useState,useEffect} from 'react'
import { Button } from '@heroui/react';
import {addComment,editComment,getPostComments} from '../services/commentService'


export default function postComment({postId, setComments,setCommentCount,setCommentmode,oldComment,commentmode}) {
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')

    useEffect(() => {
      if(commentmode == "edit"){
        setComment(oldComment?.content)
      }
      
    }, [])
    

    async function handleCommentSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let response=null;

        if(commentmode == "edit"){
            response = await editComment(comment,oldComment._id)
            if(response.message=="success"){
                let res = await getPostComments(postId);
                if(res.message=="success"){
                    setComments(res.comments)
                    console.log(res.comments)
                    setCommentmode("comment")
                    setLoading(false);

                }
                setComment('');

            }
        }
        else{
            response = await addComment(comment, postId);
            if(response.message=="success"){
                setComments(response.comments)
                setCommentCount(prev => prev + 1)
                setComment('');
                setLoading(false);

            }
        }
        
        
            
    };
  return (
    <>

    {commentmode == "edit"? "" : <div className='h-[1px]  w-full bg-gradient-to-r from-blue-500 to-pink-500 my-1 rounded-4xl'></div>}
        <form onSubmit={handleCommentSubmit} className="my-2">
            <div className="flex items-center py-2">
                <textarea
                className="appearance-none resize-none h-10 bg-gray-100 dark:bg-gray-900 rounded border-none w-full mr-3 pt-2.5 px-3 leading-tight focus:outline-none"
                type="text"
                placeholder="Add a comment..."
                aria-label="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <Button
                isLoading={loading}
                className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-pink-500 bold text-md bold text-white text-sm sm:text-md  py-2 px-5 rounded-md"
                type="submit"
                >
                {commentmode == "edit" ? "Edit" : "Comment"}
                </Button>
            </div>
        </form>
    </>
  )
}
