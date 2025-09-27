import { useState,useEffect } from 'react';
import { getAllPosts } from '../services/postServices';
import Loading from '../components/loading'
import Post from '../components/post';
import CreatePost from '../components/createPost';


const Feedback = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)


  async function getPosts() {
    const data= await getAllPosts();
    setLoading(false);
    if(data.message =="success"){
        setPosts(data.posts);
        console.log(data)
    }
    else{
        console.log(data);
    }

  }



  useEffect(() => {
    getPosts();
  }, [])
  

  return (
    <>
        {loading ? 
            <div className='mt-56'>
                <Loading/>
            </div>

            :
            <>

              <CreatePost getAllPosts={getPosts}/>
              <div className='h-[2px] w-11/12 sm:w-3/4 md:w-5/12 2xl:w-4/12   mx-auto bg-gradient-to-t from-blue-400 to-pink-400 rounded-4xl'></div>
              <div className="pb-12">
                  {posts.map((post) =>
                      (
                          <Post key={post._id} getPosts={getPosts} post={post}/>
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
