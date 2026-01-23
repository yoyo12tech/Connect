import  { useState,useContext,useRef,useEffect } from "react";
import {authContext} from '../context/authContext'
import { FiEdit , FiBell, FiLock, FiBarChart2  } from "react-icons/fi";
import userPhoto from '../assets/user3.png'
import { uploadProfilePic } from "../services/authServices";
import { useNavigate,useLocation } from "react-router-dom";



const UserProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [laoding, setLaoding] = useState(false)
  const [error, seterror] = useState(false)
  const imgRef = useRef(null)
  const {user,profilePicture,setProfilePicture} = useContext(authContext) ;
  const [img, setImg] = useState(user?.photo)
  const [activeLink, setActiveLink] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();;



  let User = {
      name: user?.name,
      email:user?.email,
      dob:user?.dateOfBirth.slice(0,10).split("-").reverse().join("/") ,
      
    };

  let navigationLinks = [
      { id: "dashboard", icon: <FiEdit  />, label: " My Posts",dest:'account' },
      { id: "notifications", icon: <FiBarChart2  />, label: "Insights",dest:'user/stats' },
      { id: "settings", icon: <FiLock />, label: "Password",dest:'user/password' }
    ];


  async function handleImageUpload (e) {
    let file = null;
    if (e.target.files.length != 0) {
        file=e.target.files[0]
    }
    const formData = new FormData();
  
    formData.append("photo",file);
    setLaoding(true)
    const res = await uploadProfilePic(formData)
    setLaoding(false);
    if(res.message == "success"){
      setImg(URL.createObjectURL(file))
      setProfilePicture(URL.createObjectURL(file))
      seterror(false)


    }
    else{
      seterror(true)
    }


  }
  useEffect(() => {
  if (profilePicture) {
    setImg(profilePicture);
  }
}, [profilePicture]);
  

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
        <div className={`2xl:mt-3 z-60 rounded-r-xl transition-transform duration-100 ease-in-out  fixed -left-0.5 top-18.5 ${isOpen ? "translate-x-52.5 2xl:translate-x-61.5 rotate-180" : " translate-x-0" }  p-[2px] bg-gradient-to-r from-blue-400 to-pink-400 `}>
            <button
                onClick={toggleSidebar}
                className="  rounded-r-xl flex items-center justify-center w-4 h-4 2xl:w-4 2xl:h-4 p-3.5 2xl:p-4 group  bg-white group text-gray-800 dark:text-gray-200 dark:bg-black "
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              
                <span className={`text-sm pr-0.5 transition-colors duration-100 ${isOpen? "group-hover:text-blue-400" : "group-hover:text-pink-400" }`}>
                  <i className={"fa-solid fa-arrow-left fa-arrow-right"}></i>
                </span>
              
            </button>
        </div>
      
      <aside
        className={`${
          isOpen ? "translate-x-0 border-blue-400 shadow-blue-500 " : " -translate-x-[calc(100%-3.6px)] border-pink-400 shadow-pink-500 "
        } fixed  top-0  left-0 h-screen  w-60 2xl:w-70 pt-24 dark:bg-black bg-white text-black dark:text-white border-r-4  rounded-tr-sm shadow-xl   transition-transform duration-100 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="flex flex-col h-full p-4 pb-1 2xl:p-1">  
          <div className="flex flex-col m-6 items-center top-0 *:ms-center  pb-2 pt-0 2xl:pt-7 ">
            <div className="relative group">
                <div className="rounded-full relative bg-gradient-to-r  from-blue-500 to-pink-500 p-[2px]">
                    <img
                        onError={(e) => e.target.src = userPhoto}
                        src={img?.startsWith("blob:") || img?.startsWith("http") ? img : `https://${img}`}
                        ref={imgRef}
                        alt="Profile"
                        className="w-24 h-24 2xl:w-27 2xl:h-27 rounded-full object-cover  transition-all duration-300"
                    />
                </div>
              
              <div className="absolute inset-0 rounded-full m-[1px] bg-white dark:bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <input className="hidden" type="file" name="img" id="img" onChange={handleImageUpload} />
                <label htmlFor="img" className="w-full h-full flex items-center justify-center">
                  <FiEdit className="text-black dark:text-white text-xl" />
                </label>
              </div>

            </div>
              
            {laoding && <span className="loading mx-auto mt-2 loading-dots loading-sm "></span>}
            {error && <span className="text-sm text-center text-danger">Failed to upload. Try again</span>}


            <div className="text-center">
              <div className="flex items-center justify-center gradient-color space-x-2 mt-3 mb-1.5 2xl:mb-3">
                <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-900 dark:text-gray-100">{User.name}</h2>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-1.5 2xl:mb-2">
                <i className="fa-regular fa-envelope gradient-color text-md 2xl:text-lg"></i>
                <p className="text-sm 2xl:text-lg  text-gray-900 dark:text-gray-100">{User.email}</p>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <i className="fa-regular fa-calendar gradient-color text-md 2xl:text-lg "></i>
                <p className="text-sm 2xl:text-lg text-gray-900 dark:text-gray-100">{User.dob}</p>
              </div>
            </div>
          </div>

        <div className="bg-gradient-to-r from-blue-500 to-pink-500 h-0.5 "></div>

          <nav className="flex-1 mt-6 2xl:mt-8">
            <ul className="space-y-2 2xl:space-y-4 2xl:px-2.5">
              {navigationLinks.map((link) => {
                  const isActive = location.pathname.includes(link.dest); // or use === if exact match is needed

                  return (
                    <li key={link.id}>
                      <button
                          onClick={() => navigate(`/${link.dest}`)}
                          className={`w-full 2xl:text-xl flex items-center px-4 py-2 2xl:px-4 2xl:py-3  rounded-md transition-colors duration-200 ${
                            isActive
                              ? "bg-gray-200 dark:bg-gray-900 text-black dark:text-white"
                              : "text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900"
                          }`}
                          aria-label={link.label}
                      >
                        <span className="text-xl mr-3">{link.icon}</span>
                        {link.label}
                      </button>
                    </li>
                  );
                  })}
            </ul>
          </nav>

          <div className="mt-4 mb-0" >
            <p className="text-[15px] 2xl:text-lg text-gray-800 dark:text-gray-300 text-start ml-3">
              ©2025 <a className="  transition-all duration-300 ease-in-out hover:dark:text-purple-400 hover:text-blue-400" href="https://github.com/yoyo12tech">yoyo12tech</a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default UserProfileSidebar;
