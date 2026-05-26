import axios from "axios"
const baseUrl =  import.meta.env.VITE_API_BASE

export async function getAllPosts()
{
    try{
        const{data} = await axios.get(baseUrl + "posts",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, posts: data.data?.posts };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function getDaPosts({ pageParam = 1 }) {
  const { data } = await axios.get(
    baseUrl + `posts?page=${pageParam}`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  return { posts: data.data?.posts, paginationInfo: data.meta?.pagination };
}

export async function getSinglePost(postId)
{
    try{
        const{data} = await axios.get(baseUrl + "posts/"+ postId,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, post: data.data?.post };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function addPost(formData){
    try{
        const{data}=await axios.post(baseUrl+'posts',formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, ...data.data };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function editPost(formData , postId){
    try{
        const{data}=await axios.put(baseUrl + 'posts/' + postId,formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, ...data.data };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function deletePost(postId){
    try{
        const{data}=await axios.delete(baseUrl + 'posts/' + postId,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}
