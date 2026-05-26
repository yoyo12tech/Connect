import axios from "axios";
const baseUrl =  import.meta.env.VITE_API_BASE


export async function registerApi (formData){
    try{
        const {data} = await axios.post(baseUrl+"users/signup",formData);
        return { message: data.success ? "success" : data.message, ...data.data };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message, errors: errData.errors };
    }
}

export async function loginApi (formData){
    try{
        const {data} = await axios.post(baseUrl+"users/signin",formData);
        return { message: data.success ? "success" : data.message, token: data.data?.token, user: data.data?.user };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message, errors: errData.errors };
    }
}

export async function getLoggedUserDataApi(){
    try{
        const { data } = await axios.get(baseUrl+'users/profile-data',{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, user: data.data?.user };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message };
    }
}

export async function uploadProfilePic(formData){
    try{
        const { data } = await axios.put(baseUrl+'users/upload-photo',formData,{
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

export async function getUserPosts(userId){
    try{
        const { data } = await axios.get(baseUrl+'users/'+userId+'/posts',{
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

export async function getMyPosts(userId){
    const { data } = await axios.get(baseUrl+'users/'+userId+'/posts',{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    return { message: data.success ? "success" : data.message, posts: data.data?.posts };
}

export async function changePassword(formData){
    try{
        const { data } = await axios.patch(baseUrl+'users/change-password',formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        return { message: data.success ? "success" : data.message, token: data.data?.token };
    }
    catch(error){
        const errData = error.response?.data || {};
        return { message: errData.message, error: (Array.isArray(errData.errors) ? errData.errors[0] : errData.errors) || errData.message, errors: errData.errors };
    }
}
