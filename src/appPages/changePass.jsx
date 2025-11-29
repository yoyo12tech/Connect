import {useState,useContext} from "react";
import {Input,Button} from "@heroui/react";
import { useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import changePassSchema from '../schema/changePassSchema';
import { changePassword } from "../services/authServices";
import { authContext } from "../context/authContext";





function ChangePass(){
    
    const {handleSubmit,register,formState:{errors}} = useForm({
        defaultValues:{
            password:"",newPassword:""
        },
        resolver:zodResolver(changePassSchema),
        mode:"onChange"//onSubmit-default  onBlurr onChange

    });
    const [loading, setloading] = useState(null)
    const navigate = useNavigate()
    const{setIsLoggedIn}=useContext(authContext);
    const [error, setError] = useState(null)





    async function HandleChangePass(formData){
        console.log(formData);
        setloading(true);
        const data = await changePassword(formData);
        setloading(false);
        if(data.error){
            console.log(data.error);
            setError("Old Password Incorrect");
        }
        else{
            localStorage.setItem("token", data.token);
            setError(null);
            setIsLoggedIn(false);
            navigate('/login')
            }

        }




    return(
        <>
            <div className="flex flex-col justify-center mx-auto  md:w-1/2 w-11/12  h-full align-items-center align-center my-auto mt-[18dvh] lg:ml-60 ">
                <h1 className="md:text-5xl text-4xl w-full h-21 md:mb-2 bg-gradient-to-b from-blue-500 to-pink-500 lg:ml-60   bg-clip-text  text-center text-transparent fw-bold ">Reset Password</h1>
                    <form onSubmit={handleSubmit(HandleChangePass)} className=" flex flex-col justify-center align-items-center *:mb-4 lg:ml-60  w-full mx-auto px-1 md:px-25">
                        
                        <Input className="!text-gray-800 dark:!text-gray-200  " isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message}  label="Old Password" type="password" variant="bordered" {...register('password')} />
                        <Input classNames={{ 
                            input: "text-gray-800 dark:text-gray-200  ",
                            inputWrapper: "text-gray-800 dark:text-gray-200"
                        }} isInvalid={Boolean(errors.newPassword)} errorMessage={errors.newPassword?.message} label="New Password" type="password"  variant="bordered" {...register('newPassword')} />
                        
                         <p className="text-danger mb-2 mx-auto">{error}</p>
                        <Button isLoading={loading} type="submit" className=" cursor-pointer  bg-gradient-to-br rounded-xl mx-auto from-blue-400 to-pink-400  text-white w-full  text-[1.2rem] px-9 py-2 transition duration-700 ease-in-out  hover:from-blue-600 hover:to-pink-600">Reset Password</Button>
                    </form>
            </div>
        </>
        
    )
    }


export default ChangePass;