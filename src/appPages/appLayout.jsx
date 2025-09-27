import {Outlet} from 'react-router-dom'
import Header from '../components/header'

function AppLayout(){
    return(
        <div className=" min-h-dvh bg-white dark:bg-black">
            <Header/>
            <Outlet/>
        </div>
    )
}
export default AppLayout;