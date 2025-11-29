import axios from "axios";
const baseUrl =  import.meta.env.VITE_API_BASE


export async function registerApi (formData){
    try{
        const {data} = await axios.post(baseUrl+"users/signup",formData);
        console.log(data);
        return data;

    }
    catch(error){
        console.log(error);
        return error.response.data;


    }
}

export async function loginApi (formData){
    try{
        const {data} = await axios.post(baseUrl+"users/signin",formData);
        console.log(data);
        return data;

    }
    catch(error){
        console.log(error);
        return error.response.data;
    }
}

export async function getLoggedUserDataApi(){
    try{
        const { data } = await axios.get(baseUrl+'users/profile-data',{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data);
        return data;
    }
    catch(error){
        return error.response.data
    }

} 
export async function uploadProfilePic(formData){
    try{
        const { data } = await axios.put(baseUrl+'users/upload-photo',formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data);
        return data;
    }
    catch(error){
        return error.response.data
    }

} 
export async function getUserPosts(userId){
    try{
        const { data } = await axios.get(baseUrl+'users/'+userId+'/posts',{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data);
        return data;
    }
    catch(error){
        return error.response.data
    }

} 

export async function getMyPosts(userId){
    const { data } = await axios.get(baseUrl+'users/'+userId+'/posts',{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    console.log(data);
    return data;

} 
export async function changePassword(formData){
    try{
        const { data } = await axios.patch(baseUrl+'users/change-password',formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data);
        return data;
    }
    catch(error){
        return error.response.data
    }

} 