import axios from "axios"

const baseUrl = "https://linked-posts.routemisr.com/"

export async function getAllPosts()
{
    try{
        const{data} = await axios.get(baseUrl + "posts?sort=-createdAt",{
            headers:{
                token:localStorage.getItem("token")
            }
        })

        return data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function getSinglePost(postId)
{
    try{
        const{data} = await axios.get(baseUrl + "posts/"+ postId,{
            headers:{
                token:localStorage.getItem("token")
            }
        })

        return data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function addPost(formData){
    try{
        const{data}=await axios.post(baseUrl+'posts',formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function editPost(formData , postId){
    try{
        const{data}=await axios.put(baseUrl + 'posts/' + postId,formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function deletePost(postId){
    try{
        const{data}=await axios.delete(baseUrl + 'posts/' + postId,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data;
    }
    catch(error){
        return error.response.data;
    }
}

