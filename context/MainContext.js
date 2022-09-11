import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  // TODO: create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [formToggle, setFormToggle] = useState();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const [update, setUpdate] = useState(0);
  return (
    <MainContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser,
      avatar, setAvatar, formToggle, setFormToggle, update, setUpdate}}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
