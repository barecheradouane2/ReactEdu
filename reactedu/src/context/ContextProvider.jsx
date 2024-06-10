import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
 // notification: null,
  setUser: () => {},
  setToken: () => {},
  _setUser: () => {},
  //setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('UserInfo')));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [profileinfo,setprofileinfo]=useState(JSON.parse(localStorage.getItem('profileinfo')));
  //const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const _setUser = (user) => {
    setUser(user)
    if (user) {
      localStorage.setItem('UserInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('UserInfo');
    }
  }

  const _setprofileinfo = (userinfo) => {
    setprofileinfo(userinfo);
    if (userinfo) {
      localStorage.setItem('profileinfo', JSON.stringify(userinfo));
    } else {
      localStorage.removeItem('profileinfo');
    }
  }

//   const setNotification = message => {
//     _setNotification(message);

//     setTimeout(() => {
//       _setNotification('')
//     }, 5000)
//   }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      _setUser,
      token,
      setToken,
      profileinfo,
      setprofileinfo,
      _setprofileinfo
     
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);