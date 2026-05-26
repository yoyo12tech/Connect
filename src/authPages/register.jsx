import {React,useState} from "react";
import {Input,Select,SelectItem,Button} from "@heroui/react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import regScheme from '../schema/registerSchema';
import { registerApi } from '../services/authServices';



function Register(){
    
    const {handleSubmit,register,formState:{errors}} = useForm({
        defaultValues:{
            name:"",email:"",password:"",rePassword:"",dateOfBirth:"",gender:""
        },
        resolver:zodResolver(regScheme),
        mode:"onChange"//onSubmit-default  onBlurr onChange

    });
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()



    async function HandleRegister(formData){
        console.log(formData);
   
        setloading(true);
        const data = await registerApi(formData);
        setloading(false);
        if(data.error){
            console.log(data.error)
        }
        else{
           navigate('/login')
            }

        }

        
    return(
        <>
            <div className="flex flex-col justify-center mx-auto md:w-5/6 w-11/12 h-full align-items-center my-auto">
                    <form onSubmit={handleSubmit(HandleRegister)} className="flex flex-col justify-center align-items-center *:mb-4 w-full mx-auto px-2 md:px-10">
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message} label="Name" type="text"  variant="bordered" {...register('name')} />
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} label="Email" type="email"  variant="bordered" {...register('email')} />
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message}  label="Password" type="password" variant="bordered" {...register('password')} />
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.rePassword)} errorMessage={errors.rePassword?.message}  label="Confrim Password" type="password" variant="bordered" {...register('rePassword')} />
                        <Input size="lg" className="!text-gray-800 dark:!text-gray-200" isInvalid={Boolean(errors.dateOfBirth)} errorMessage={errors.dateOfBirth?.message}  label="Date" type="date"  variant="bordered" {...register('dateOfBirth')}/>
                        <Select size="lg" isInvalid={Boolean(errors.gender)} errorMessage={errors.gender?.message}  variant='bordered' label="Gender" {...register("gender")}>
                            <SelectItem className="!text-gray-800 dark:!text-gray-200" key={"male"}>Male</SelectItem>
                            <SelectItem className="!text-gray-800 dark:!text-gray-200" key={"female"}>Female</SelectItem>
                        </Select>
                        <p className="text-blue-500 dark:text-blue-400">Already have an account? 
                            <Link className="bg-gradient-to-b from-blue-400 to-pink-400   bg-clip-text  text-center text-transparent fw-bold  hover:from-blue-300 hover:to-pink-300" to={"/login"}> Log In</Link>
                        </p>
                        <Button isLoading={loading} type="submit" className=" cursor-pointer bg-gradient-to-br rounded mx-auto from-blue-400 to-pink-400  text-white w-fit text-[1.2rem] px-9 py-2 transition duration-700 ease-in-out hover:from-blue-600 hover:to-pink-600">Register</Button>

                    </form>
            </div>
        </>
        
    )
}



export default Register;