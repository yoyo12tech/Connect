import {useState,useEffect,useContext} from "react";
import {authContext} from '../context/authContext'
import Loading from '../components/loading'


export default function stats(){
    const [loading, setLoading] = useState(true)
    const{profilePicture}=useContext(authContext);
    useEffect(() => {
      setTimeout(()=>{
        setLoading(false);
      },1000)
    
      
    }, [])
    

    return(
        loading ?
            <div className='mt-[35dvh]'>
                <Loading/> 
            </div>
        :
        <>
            <div className="flex justify-center pt-6 items-center mt-[13dvh] lg:mt-[31dvh] lg:w-calc(100% - 15rem) lg:ml-60 flex-col">
                <div className="stats shadow-lg dark:shadow-gray-900 shadow-gray-200 stats-vertical lg:stats-horizontal">
                    <div className="stat !gap-0">
                        <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                        </div>
                        <div className="text-gray-800 dark:text-gray-300 stat-title mb-1">Total Likes</div>
                        <div className="stat-value text-primary mb-1">25.6K</div>
                        <div className="text-gray-800 dark:text-gray-300 stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat !gap-0">
                        <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                        </div>
                        <div className=" text-gray-800 dark:text-gray-300 stat-title mb-1">Page Views</div>
                        <div className="stat-value text-secondary mb-1">2.6M</div>
                        <div className="  text-gray-800 dark:text-gray-300 stat-desc">21% more than last month</div>
                    </div>

                   <div className="stat !gap-0">
                        <div className="stat-figure text-secondary">
                            <div className="avatar avatar-online">
                                <div className="w-16 rounded-full  bg-gradient-to-r  from-blue-500 to-pink-500 p-[2px] flex justify-center items-center">
                                    <img className="w-full rounded-full  " src={profilePicture} />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value text-secondary mb-1">+12</div>
                        <div className="stat-title text-gray-800 dark:text-gray-300 mb-1 mr-4">New Followers</div>
                        <div className="stat-desc text-secondary ">This month</div>
                    </div>

                </div>
            </div>
        </>
    )
}


