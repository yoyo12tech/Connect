import axios from 'axios'

const baseUrl = "https://linked-posts.routemisr.com/"

export async function getPostComments(postId){
    try{
        const{data}=await axios.get(baseUrl + 'posts/' + postId + "/comments",{
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

export async function addComment(commentContent, postId){
    try{
        const {data} = await axios.post(baseUrl + 'comments',{
            content:commentContent,
            post:postId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return data
    }
    catch(error){
        return error.response.data
    }
}
export async function editComment(commentContent, commentId){
    try{
        const{data}=await axios.put(baseUrl + 'comments/' + commentId,{
            content:commentContent
        },{
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
export async function deleteComment(commentId){
    try{
        const token = localStorage.getItem("token");
        const url = baseUrl + 'comments/' + commentId;
        
        // ✅ Debug the request
        console.log("🗑️ Attempting to delete:");
        console.log("URL:", url);
        console.log("Comment ID:", commentId);
        console.log("Token exists:", !!token);
        console.log("Token length:", token?.length);
        
        const{data}=await axios.delete(url, {
            headers:{
                token: token
            }
        });
        
        console.log("✅ Delete successful:", data);
        return data;
    }
    catch(error){
        console.error("❌ Delete failed:");
        console.error("Status:", error.response?.status);
        console.error("Error message:", error.response?.data?.message);
        console.error("Full error:", error.response?.data);
        
        return error.response?.data || { message: "error", error: "Request failed" };
    }
}

