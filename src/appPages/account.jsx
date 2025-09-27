import {useState,useEffect,useContext} from "react";
import { getUserPosts } from '../services/authServices';
import {authContext} from '../context/authContext'
import Loading from '../components/loading'
import Post from '../components/post';


function Account(){
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const{userId,profilePicture}=useContext(authContext);

    
    async function getPosts(id) {
        const data= await getUserPosts(id);
        setLoading(false);
        if(data.message =="success"){
            setPosts(data.posts.reverse());
            console.log(data)
        }
        else{
            console.log(data);
        }
    }
    async function handleUserPosts(){
        
        if(userId){
            await getPosts(userId);
        }
    }
    
    
    
      useEffect(() => {
        if(userId){
            getPosts(userId);
        }
      }, [userId,profilePicture])
    return(
        loading ?
        <div className="mt-60">
            <Loading/>
        </div>
        :
        <div className="pb-12">
            {posts.map((post) =>
                (
                    <Post key={post._id} getPosts={handleUserPosts} post={post}/>
                )
            )
            }
        </div>
    



    )
}

export default Account;