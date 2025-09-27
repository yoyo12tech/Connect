import {Outlet} from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

function AccountLayout(){
    return(
        <div className=" min-h-dvh bg-white dark:bg-black">
            <Header/>
            <Sidebar/>
            <div className="">
                <Outlet/>
            </div>
            
        </div>
    )
}
export default AccountLayout;