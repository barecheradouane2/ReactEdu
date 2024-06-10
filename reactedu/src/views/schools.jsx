
import Header from "../ui/Header"
import Body from "../ui/Body"
import SchoolCards from "../ui/SchoolCards"
import {Outlet} from "react-router-dom"
import Appbar from "../ui/Appbar"

import {useState} from "react"
import HomeDrawer from "../ui/HomeDrawer"


function Schools() {
    const [showdrawer, setShowDrawer] = useState('none');
    const [drawertype, setDrawerType] = useState('permanent');
    const drawerWidth = 300;
    const funshowdrawer = () => {
        return;
    }

    const funShowDrawer = () => {
        setShowDrawer('block');
        setDrawerType('temporary');
    }

    const funcCloseDrawer = () => {
        setDrawerType('permanent');
        setShowDrawer('none');
    }
    
    return (
        <div>
            <HomeDrawer drawerWidth={drawerWidth} showdrawer={showdrawer} drawertype={drawertype} funclosedrawer={funcCloseDrawer}/>
             <Appbar drawerWidth={drawerWidth}  funshowdrawer={funshowdrawer}/>
                <SchoolCards  drawerWidth={drawerWidth}/>
             
            
    
        </div>
    )
}

export default Schools
