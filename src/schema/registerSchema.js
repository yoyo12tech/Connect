import * as zod from "zod"

const scheme = zod.object({
    name:zod.string().nonempty("Name is required") .min(3,"Name must be at least 3 characters") .max(20,"Name must be at most 30 characters")
    ,
    email:zod.string().nonempty("Email is required").regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email in invalid")
    ,
    password: zod.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character")
    ,
    rePassword: zod.string().nonempty('Confirm Password is required')
    ,
    dateOfBirth:zod.coerce.date().refine((date)=>{
        const birthDate = date.getFullYear();
        const now = new Date().getFullYear();
        const age = now - birthDate;
        return age >= 18;
    },{message:"You must be at least 18 years old"})
    ,
    gender:zod.string().nonempty("Gender is required").regex(/^(male|female)$/,"Enter Valid gender")
}).refine((data)=>{
    return (data.password === data.rePassword)
},{message:"Passwords do not match"})

export default scheme;