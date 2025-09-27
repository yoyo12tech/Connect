import {Outlet} from 'react-router-dom';
import bgImg from '../assets/bg.jpg'
function AuthLayout(){
    return(
        <div className='bg-white dark:bg-black h-full min-h-dvh flex justify-between align-items-center relative'>
            <div className=' md:w-1/2  bg-center object-contain absolute md:relative' style={{backgroundImage:`url(${bgImg})`, backgroundSize:"cover",backgroundAttachment:"fixed"}}></div>
            <Outlet/>
        </div>
    )
}
export default AuthLayout;