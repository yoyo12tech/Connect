import {useState,useEffect} from 'react'
import { Button } from '@heroui/react';
import PostHeader from '../components/postHeader'
import PostBody from '../components/postBody'
import PostImage from '../components/postImage'
import PostStat from '../components/postStats'
import AddComment from '../components/postComment'
import Comment from '../components/comment'
import CreatePost from './createPost';


export default function Post({post,getPosts,onDelete,postDetails}) {
    const [showComments, setShowComments] = useState(false);
    const [mode, setmode] = useState('post');
    const [commentCount, setCommentCount] = useState(post.comments?.length);
    const [visibleComments, setVisibleComments] = useState(1);
    const [comments, setComments] = useState(post.comments);

    function moreComments(){
        if(visibleComments +3 <= commentCount){
            setVisibleComments(visibleComments+3)
        }
        else{
            setVisibleComments(commentCount)
        }
    }

    useEffect(() => {
      if (postDetails){
        setVisibleComments(post.comments?.length);
        setShowComments(true);
      }
    }, [])
    


    

    return(
            mode == 'edit' ? 

            (<CreatePost getAllPosts={getPosts} mode={mode} setmode={setmode} post={post} />)

            :

            (
            <div className=' my-12 bg-gradient-to-r  from-blue-400 to-pink-400 w-11/12 sm:w-3/4 md:w-116 lg:w-4/12 2xl:w-122 shadow-lg dark:shadow-gray-800 pt-1 p-0 mx-auto rounded-xl grid-cols-2'>
                <div className="w-full bg-white dark:bg-gray-950 mx-auto rounded-lg text-gray-900 dark:text-gray-100  overflow-hidden">
                    <div className="p-4 pb-0">
                        <PostHeader post ={post} setmode={setmode} getPosts={getPosts} onDelete={onDelete}/>
                        <PostBody post ={post}/>
                        <PostImage post ={post}/>
                        <PostStat post={post} showComments={showComments} commentCount={commentCount} setShowComments ={setShowComments} />
                    
                    {showComments && (
                        <>

                            <AddComment postId={post._id} setComments={setComments} commentmode={'post'} setCommentCount={setCommentCount} />


                            {commentCount > 0 && (
                            <>
                                <div className='h-[0.8px]  w-full bg-gradient-to-r from-blue-500 to-pink-500 my-1 rounded-4xl'></div>
                                <h1 className='text-gray-500 dark:text-gray-400 my-3 text-lg'>comments</h1>
                                {comments.slice(0, visibleComments).map((comment, index) => (
                                    <Comment key={index} postId={post._id} post={post}  setComments={setComments} setCommentCount={setCommentCount} comment={comment}  />
                                ))}

                                {visibleComments < commentCount && (
                                <Button 
                                    onPress={moreComments} 
                                    className="bg-transparent py-1 hover:bg-gray-100 hover:dark:bg-gray-900 text-gray-500 mt-8 mb-4"
                                >
                                    <i className="fa-solid fa-arrow-down fa-bounce"></i>
                                    load more comments..
                                </Button>
                                )}
                            </>
                            )}
                        </>
)}

                    </div>
                </div>
            </div>   
            )
            
    )
}
