
import Header from "../ui/Header"
import Body from "../ui/Body"
import SchoolCards from "../ui/SchoolCards"
import {Outlet} from "react-router-dom"
import Appbar from "../ui/Appbar"

function Schools() {
    const drawerWidth = 0;
    const funshowdrawer = () => {
        return;
    }
    return (
        <div>
             <Appbar drawerWidth={drawerWidth}  funshowdrawer={funshowdrawer}/>
                <SchoolCards/>
             
            
    
        </div>
    )
}

export default Schools
