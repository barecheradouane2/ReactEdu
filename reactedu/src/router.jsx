import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Schools from "./views/schools.jsx";
import JoinSchool from "./views/JoinSchool.jsx";
import ClassComponent from "./views/ClassComponent.jsx";
import AllSchools from "./views/AllSchools.jsx";
import School from "./views/School.jsx";
import Addchild from "./views/Addchild.jsx";
import BookMarks from "./views/BookMarks.jsx";
import Calender from "./views/Calender.jsx";
import Children from "./views/Children.jsx";
import Classes from "./views/Classes.jsx";
import Settings from "./views/Settings.jsx";
import Members from "./views/Members.jsx";
import JoinRequests from "./views/JoinRequests.jsx";
import Home from "./views/Home.jsx";
import Explore from "./views/Explore.jsx";
import Associate from "./views/Associate.jsx";
import ClassInfo from "./views/ClassInfo.jsx";
import ClassMembers from "./views/ClassMembers.jsx";
import ClassAssociate from "./views/ClassAssociate.jsx";
import ClassJoinRequests from "./views/ClassJoinRequests.jsx";
import Forgotpassword from "./views/Forgotpassword.jsx";
import ClassList from "./views/ClassList.jsx";
import SchoolList from "./views/SchoolList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home/explore" />,
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "explore",
            element: <Explore />,
          },
          {
            path: "schools",
            element: <AllSchools />,
            children: [
              {
                path: "",
                element: <Schools />,
              },
              {
                path: ":schoolname",
                element: <JoinSchool />,
                children: [
                  {
                    path: "",
                    element: <School />,
                  },
                  {
                    path: "addchild",
                    element: <Addchild />,
                  },
                  {
                    path: "bookmarks",
                    element: <BookMarks />,
                  },
                  {
                    path: "calendar",
                    element: <Calender />,
                  },
                  {
                    path: "associate",
                    element: <Associate />,
                  },
                  {
                    path: "classes",
                    element: <Classes />,
                  },
                  {
                    path: "joinrequests",
                    element: <JoinRequests />,
                  },
                  {
                    path: "members",
                    element: <Members />,
                  },
                  {
                    path: "settings",
                    element: <Settings />,
                  },
                  {
                    path: "classes/:classname",
                    element: <ClassComponent />,
                    children: [
                      {
                        path: "",
                        element: <ClassInfo />,
                      },
                      {
                        path: "members",
                        element: <ClassMembers />,
                      },
                      {
                        path: "associate",
                        element: <ClassAssociate />,
                      },
                      {
                        path: "joinrequests",
                        element: <ClassJoinRequests />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "bookmarks",
            element: <BookMarks />,
          },
          {
            path: "children",
            element: <Children />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path:"classlist",
            element:<ClassList/>
          },
          {
            path:"schoollist",
            element:<SchoolList/>
          }
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },{
        path: "Forgotpassword",
        element: <Forgotpassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
