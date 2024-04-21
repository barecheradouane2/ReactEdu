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
// Import ClassComponent or replace with your actual component
import Home from "./views/Home.jsx";
import School from "./views/School.jsx";
import Addchild from "./views/Addchild.jsx";
import BookMarks from "./views/BookMarks.jsx";
import Calender from "./views/Calender.jsx";
import Children from "./views/Children.jsx";
import Classes from "./views/Classes.jsx";
import Events from "./views/Events.jsx";
import Friends from "./views/Friends.jsx";
import Settings from "./views/Settings.jsx";



const router = createBrowserRouter([
  {
    path: "/", // Handle the root path
    element: <DefaultLayout />,
    children: [
      {
        path: "/", // Redirect to "/schools"
        element: <Navigate to="/schools" />,
      },
      
      {
        path: "/schools",
        element: <Home />,
        children: [
          {
            path: "/schools", // Redirect to "/schools"
            element: <Schools />,
          },
          {
            path: ":schoolname", // Dynamic parameter for school name
            element: <JoinSchool />,
            children: [
              {
                path: "/schools/:schoolname", // Redirect to first class
                element: <School />,

              },
              {
                path: ":classname", // Route for class name
                element: <ClassComponent />,
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
                path: "calender",
                element: <Calender />,
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
                path: "events",
                element: <Events />,
              },
              {
                path: "friends",
                element: <Friends />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/", // Handle routes not matched above
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*", // Handle not found page
    element: <NotFound />,
  },
]);

export default router;
