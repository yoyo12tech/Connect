import {useState,useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Post from '../components/post';
import LoadingScreen from '../components/loading';
import {getSinglePost} from '../services/postServices';

export default function postDetails() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate(); 

    async function getPostById(postId){
        setLoading(true);
        const response = await getSinglePost(postId);
        setLoading(false);
        
        if(response.message === "success"){
            setPost(response.post);
        }
        else{
            console.log("Post not found");
            navigate('/');
        }
    }

    async function handlePostUpdate() {
        await getPostById(id);
    }

    function handlePostDelete() {
        navigate('/');
    }

    useEffect(() => {
        if(id) {
            getPostById(id);
        }
    }, [id]);

    if(loading || !post) {
        return (
            <div className="mt-48">
                <LoadingScreen/> 
            </div>
        );
    }
    
    return (
        <div className='flex justify-center align-items-center'>
            <Post 
                post={post} 
                getPosts={handlePostUpdate} // so basically the trick here is that we give it our handlePostUpdate that it will use as if it is the getPosts. it will chnage setPosts which will cause rerender because here i defined posts and setposts use state here so when function sets it there on create post it will cause rerender 
                onDelete={handlePostDelete} // when i used to delete it it gave error. because ID doesnt exist anymore. so what i did is i gave this function. if it is delted it redirects to home page
                postDetails={true}
            />
        </div>
    );
}
