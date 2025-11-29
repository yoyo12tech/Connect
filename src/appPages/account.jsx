import {useEffect,useContext} from "react";
import { getUserPosts,getMyPosts } from '../services/authServices';
import {authContext} from '../context/authContext'
import Loading from '../components/loading'
import Post from '../components/post';
import {useQuery} from '@tanstack/react-query'


function Account(){
    const{userId,profilePicture}=useContext(authContext);

    const {data,isLoading,error,refetch} = useQuery({
        queryKey:["myPosts",userId],
        queryFn: () => getMyPosts(userId),
        enabled: !!(userId && profilePicture),
        onError: err => console.log("error",err)
    })
    
    useEffect(() => {
    if(profilePicture){
        refetch();
        console.log("i ran")
    }
    }, [profilePicture])


    return(
        isLoading ?
            <div className="mt-60">
                <Loading/>
            </div>
        :
        <div className="pb-12">
            {data?.posts?.map((post) =>
                (
                    <Post key={post._id} getPosts={refetch} post={post}/>
                )
            )
            }
        </div>
    )
}

export default Account;