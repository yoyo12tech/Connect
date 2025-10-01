import {React,useState,useContext} from "react";
import {Input,Button} from "@heroui/react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import logScheme from '../schema/loginSchema';
import { loginApi } from '../services/authServices';
import { authContext } from "../context/authContext";




function Login(){
    
    const {handleSubmit,register,formState:{errors}} = useForm({
        defaultValues:{
            email:"",password:""
        },
        resolver:zodResolver(logScheme),
        mode:"onChange"//onSubmit-default  onBlurr onChange

    });
    const [loading, setloading] = useState(null)
    const navigate = useNavigate()
    const{setIsLoggedIn,refreshUser}=useContext(authContext);
    const [error, setError] = useState(null)




    async function HandleLogin(formData){
        console.log(formData);
        setloading(true);
        const data = await loginApi(formData);
        setloading(false);
        if(data.error){
            console.log(data.error)
            setError(data.error);

        }
        else{
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            await refreshUser();
            navigate('/')
            }

        }




    return(
        <>
            <div className="flex flex-col justify-center mx-auto  md:w-1/2 w-11/12  h-full align-items-center my-auto">
                <h1 className="text-5xl w-full h-21 mb-2 bg-gradient-to-b from-blue-400 to-pink-400   bg-clip-text  text-center text-transparent fw-bold ">Log In</h1>
                    <form onSubmit={handleSubmit(HandleLogin)} className=" flex flex-col justify-center align-items-center *:mb-4 w-full mx-auto px-1 md:px-25">
                        <Input classNames={{
                            input: "text-gray-800 dark:text-gray-200",
                            inputWrapper: "text-gray-800 dark:text-gray-200"
                        }} isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} label="Email" type="email"  variant="bordered" {...register('email')} />
                        <Input className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message}  label="Password" type="password" variant="bordered" {...register('password')} />
                        <p className="text-blue-500 dark:text-blue-400">Do not have an account? 
                            <Link className="bg-gradient-to-b from-blue-400 to-pink-400   bg-clip-text  text-center text-transparent fw-bold  hover:from-blue-300 hover:to-pink-300" to={"/register"}> Sign Up</Link>
                        </p>
                          
                        <p className="text-danger mb-2 mx-auto">{error}</p>
                        <Button isLoading={loading} type="submit" className=" cursor-pointer bg-gradient-to-br rounded mx-auto from-blue-400 to-pink-400  text-white w-fit text-[1.2rem] px-9 py-2 transition duration-700 ease-in-out hover:from-blue-600 hover:to-pink-600">Submit</Button>

                    </form>
            </div>
        </>
        
    )
    }


export default Login;