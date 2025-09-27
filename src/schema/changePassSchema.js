import * as zod from "zod"

const scheme = zod.object({

    password: zod.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be Minimum eight characters, at least one letter, one number and one special character"),
    newPassword: zod.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Re-Password must be Minimum eight characters, at least one letter, one number and one special character")

    
})

export default scheme;