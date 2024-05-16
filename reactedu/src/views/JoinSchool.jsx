import { useState } from "react";
import { useParams } from "react-router-dom";
import Appbar from "../ui/Appbar";
import Drawers from "../ui/Drawers";
import { Outlet } from "react-router-dom";
import Body from "../ui/Body";
import DrawerClass from "../ui/DrawerClass";
import Notification from "../ui/Notification";

function JoinSchool() {
    const drawerWidth = 300;
    const [showdrawer, setShowDrawer] = useState('none');
    const [drawertype, setDrawerType] = useState('permanent');
    const { schoolname, classname } = useParams();

    const funShowDrawer = () => {
        setShowDrawer('block');
        setDrawerType('temporary');
    }

    const funcCloseDrawer = () => {
        setDrawerType('permanent');
        setShowDrawer('none');
    }

    // Check if the current route matches the specific pattern where you don't want to show the drawer
    const shouldHideDrawer = schoolname && classname;

    return (
        <>
            <Appbar  drawerWidth={drawerWidth} funshowdrawer={funShowDrawer}/>
           
            {shouldHideDrawer ? <DrawerClass drawerWidth={drawerWidth} showdrawer={showdrawer} drawertype={drawertype} funclosedrawer={funcCloseDrawer}/>
           : <Drawers drawerWidth={drawerWidth} showdrawer={showdrawer} drawertype={drawertype} funclosedrawer={funcCloseDrawer}/>}
            <Body drawerWidth={drawerWidth} >
                <Outlet />
            </Body>
        </>
    );
}

export default JoinSchool;
