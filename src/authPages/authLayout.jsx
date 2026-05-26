import {Outlet} from 'react-router-dom';
import bgImg from '../assets/bg.jpg';
function AuthLayout(){
    return(
        <div className='bg-white dark:bg-black h-full min-h-dvh flex justify-between align-items-center relative'>
            <div className=' md:w-1/2 absolute md:relative' style={{backgroundImage:`url(${bgImg})`, backgroundSize:"cover", backgroundPosition:"center center", backgroundRepeat:"no-repeat", minHeight:"100dvh"}}></div>
            <div className="relative flex-1 flex flex-col overflow-hidden">
                {/* blobs — right half only */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="blob-1 absolute top-[4%]   left-[8%]  w-[100px] h-[100px] rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[50px]" />
                    <div className="blob-2 absolute top-[6%]   right-[8%] w-[90px]  h-[90px]  rounded-full bg-pink-400/80 dark:bg-pink-400/55 blur-[45px]" />
                    <div className="blob-3 absolute top-[28%]  left-[5%]  w-[110px] h-[110px] rounded-full bg-pink-400/75 dark:bg-pink-400/50 blur-[55px]" />
                    <div className="blob-1 absolute top-[32%]  right-[6%] w-[95px]  h-[95px]  rounded-full bg-blue-400/75 dark:bg-blue-400/50 blur-[48px]" />
                    <div className="blob-2 absolute top-[55%]  left-[12%] w-[85px]  h-[85px]  rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[42px]" />
                    <div className="blob-3 absolute top-[58%]  right-[4%] w-[105px] h-[105px] rounded-full bg-pink-400/75 dark:bg-pink-400/50 blur-[52px]" />
                    <div className="blob-1 absolute bottom-[6%] left-[5%]  w-[90px]  h-[90px]  rounded-full bg-pink-400/80 dark:bg-pink-400/55 blur-[45px]" />
                    <div className="blob-2 absolute bottom-[4%] right-[7%] w-[100px] h-[100px] rounded-full bg-blue-400/80 dark:bg-blue-400/55 blur-[50px]" />
                </div>
                {/* Connect logo */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-10 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fa-solid fa-circle-nodes fa-shake text-5xl bg-gradient-to-tr from-blue-400 to-pink-400 bg-clip-text text-transparent" />
                        <span className="font-bold text-5xl bg-gradient-to-tr from-blue-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-sm lg:text-base mt-2 text-gray-400 dark:text-gray-500 tracking-wide text-center px-4 sm:px-6 max-w-xs sm:max-w-sm">Connect with people, share your moments, and discover stories that matter to you.</p>
                </div>
                {/* Form */}
                <div className="relative z-10 flex-1 flex">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default AuthLayout;
