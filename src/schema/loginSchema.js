import * as zod from "zod"

const scheme = zod.object({
    email:zod.string().nonempty("Email is required").regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email in invalid")
    ,
    password: zod.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character")
    
})

export default scheme;