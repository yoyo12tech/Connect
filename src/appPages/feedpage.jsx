import { useState,useEffect, use } from 'react';
import { getAllPosts,getDaPosts } from '../services/postServices';
import Loading from '../components/loading'
import Post from '../components/post';
import CreatePost from '../components/createPost';
import {useQuery} from '@tanstack/react-query'


const Feedback = () => {

  const {data,isLoading,error,refetch} = useQuery({
    queryKey:["posts"],
    queryFn:getDaPosts,
    onError: err=> console.log("failed to fetch posts:",err)
    
  })

  return (
    <>
        {error? <h1>error</h1>:""}
        {isLoading ? 
            <div className='mt-56'>
                <Loading/>
            </div>

            :
            <>

              <CreatePost getAllPosts={refetch}/>
              <div className='h-[2px] w-11/12 sm:w-3/4 md:w-5/12 2xl:w-4/12   mx-auto bg-gradient-to-t from-blue-400 to-pink-400 rounded-4xl'></div>
              <div className="pb-12">
                  {data?.posts.map((post) =>
                      (
                          <Post key={post._id} getPosts={refetch} post={post}/>
                      )
                    )
                  }
              </div>

            </>
            }
           
    </>
    
    
    
  );
};

export default Feedback;
