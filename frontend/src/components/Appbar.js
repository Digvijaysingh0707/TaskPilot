import { Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../App";

const Appbar = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(TaskContext)
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname)
  const [loginUrl, setLoginUrl] = useState(false)


  const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
    setUserDetails({})
  };

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  useEffect(() => {
    let checkLoginUrl = currentUrl.includes("login")
    setLoginUrl(checkLoginUrl)
  }, [currentUrl])


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 4,
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      {(userDetails?.name || localStorage.getItem("userName")) ? (
        <Typography variant="h6">{`Hi ${userDetails?.name ?? localStorage.getItem("userName")}`}</Typography>
      ) : null}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
      }}>
        {!(userDetails?.name || localStorage.getItem("token")) ? (
          <>
            {loginUrl ?
              <Button style={{ marginRight: 10 }} variant="contained" onClick={() => navigate("/signup")}>Sign up</Button>
              :
              <Button variant="contained" onClick={() => navigate("/login")}>Sign in</Button>
            }
          </>
        ) : (
          <Button variant="contained" onClick={handleLogout}>Log out</Button>
        )}
      </div>
    </div>
  );

}

export default Appbar;
