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
            <div className="flex flex-col justify-center mx-auto md:w-5/6 w-11/12 align-items-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <i className="fa-solid fa-circle-nodes text-5xl bg-gradient-to-tr  from-blue-400 to-pink-400  dark:from-blue-500 dark:to-pink-500 bg-clip-text text-transparent" />
                        <span className="font-bold text-5xl bg-gradient-to-tr  from-blue-400 to-pink-400  dark:from-blue-500 dark:to-pink-500 bg-clip-text text-transparent">Connect</span>
                         <i className="fa-solid fa-circle-nodes text-5xl bg-gradient-to-tr  from-blue-400 to-pink-400  dark:from-blue-500 dark:to-pink-500 bg-clip-text text-transparent" />

                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-400 dark:text-gray-500 tracking-wide text-center px-4 max-w-sm mx-auto mb-12">Connect with people, share your moments, and discover stories that matter to you.</p>
                    <form onSubmit={handleSubmit(HandleLogin)} className="flex flex-col justify-center align-items-center *:mb-4 w-full mx-auto px-2 md:px-10">
                        <Input size="lg" classNames={{
                            input: "text-gray-800 dark:text-gray-200",
                            inputWrapper: "text-gray-800 dark:text-gray-200"
                        }} isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} label="Email" type="email"  variant="bordered" {...register('email')} />
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message}  label="Password" type="password" variant="bordered" {...register('password')} />
                        <p className="text-blue-500 dark:text-blue-400 text-md">Do not have an account? 
                            <Link className="bg-gradient-to-b from-blue-400 to-pink-400  text-md bg-clip-text  text-center text-transparent fw-bold  hover:from-blue-300 hover:to-pink-300" to={"/register"}> Sign Up</Link>
                        </p>
                          
                        <p className="text-danger mb-2 mx-auto">{error}</p>
                        <Button isLoading={loading} type="submit" className=" cursor-pointer bg-gradient-to-br rounded mx-auto  from-blue-400 to-pink-400  dark:from-blue-500 dark:to-pink-500  text-white w-fit text-[1.2rem] px-9 py-2 transition duration-700 ease-in-out hover:from-blue-600 hover:to-pink-600">Login</Button>



                    </form>
            </div>
        </>
        
    )
    }


export default Login;