import {Outlet} from 'react-router-dom';
import bgImg from '../assets/wp2.jpg';
function AuthLayout(){
    return(
        <div className='bg-white dark:bg-black h-full min-h-dvh flex justify-between align-items-center relative'>
            <div className=' md:w-1/2 absolute md:relative' style={{backgroundImage:`url(${bgImg})`, backgroundSize:"cover", backgroundPosition:"center center", backgroundRepeat:"no-repeat", minHeight:"100dvh"}}></div>
            <div className="relative flex-1 flex flex-col justify-center overflow-hidden py-10">
                {/* blobs — small screens only */}
                <div className="md:hidden absolute inset-0 pointer-events-none z-0">
                    <div className="blob-1 absolute top-[4%]   left-[8%]  w-[100px] h-[100px] rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[50px]" />
                    <div className="blob-2 absolute top-[6%]   right-[8%] w-[90px]  h-[90px]  rounded-full bg-pink-400/80 dark:bg-pink-400/55 blur-[45px]" />
                    <div className="blob-3 absolute top-[28%]  left-[5%]  w-[110px] h-[110px] rounded-full bg-pink-400/75 dark:bg-pink-400/50 blur-[55px]" />
                    <div className="blob-1 absolute top-[32%]  right-[6%] w-[95px]  h-[95px]  rounded-full bg-blue-400/75 dark:bg-blue-400/50 blur-[48px]" />
                    <div className="blob-2 absolute top-[55%]  left-[12%] w-[85px]  h-[85px]  rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[42px]" />
                    <div className="blob-3 absolute top-[58%]  right-[4%] w-[105px] h-[105px] rounded-full bg-pink-400/75 dark:bg-pink-400/50 blur-[52px]" />
                    <div className="blob-1 absolute bottom-[6%] left-[5%]  w-[90px]  h-[90px]  rounded-full bg-pink-400/80 dark:bg-pink-400/55 blur-[45px]" />
                    <div className="blob-2 absolute bottom-[4%] right-[7%] w-[100px] h-[100px] rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[50px]" />
                </div>
                {/* Form with logo naturally above it */}
                <div className="relative z-10 w-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default AuthLayout;
