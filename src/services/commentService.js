import axios from 'axios'
const baseUrl =  import.meta.env.VITE_API_BASE

export async function getPostComments(postId){
    try{
        const{data}=await axios.get(baseUrl + 'posts/' + postId + "/comments",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, comments: data.data?.comments };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function addComment(commentContent, postId){
    try{
        const {data} = await axios.post(baseUrl + 'posts/' + postId + '/comments',{
            content: commentContent,
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, comment: data.data?.comment }
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function editComment(commentContent, commentId, postId){
    try{
        const{data}=await axios.put(baseUrl + 'posts/' + postId + '/comments/' + commentId,{
            content: commentContent
        },{
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

export async function deleteComment(commentId, postId){
    try{
        const{data}=await axios.delete(baseUrl + 'posts/' + postId + '/comments/' + commentId,{
            headers:{
                token: localStorage.getItem("token")
            }
        });
        return { message: data.success ? "success" : data.message };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}
