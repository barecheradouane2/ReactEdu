import { Link, Navigate,Outlet } from "react-router-dom"
import {useStateContext} from "../context/ContextProvider";
function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login"/>
      }
    return (
      <main>
          <Outlet/>
     </main>
    )
}

export default DefaultLayout


// <div id="defaultLayout">
// <aside>
//   <Link to="/dashboard">Dashboard</Link>
//   <Link to="/users">Users</Link>
// </aside>
// <div className="content">
//   <header>
//     <div>
//       Header
//     </div>

//     <div>
//         user name 
     
//     </div>
//   </header>
//   <main>
//     <Outlet/>
//   </main>
//   {/* {notification &&
//     <div className="notification">
//       {notification}
//     </div>
//   } */}
// </div>
// </div>


