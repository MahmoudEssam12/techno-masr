import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";

function MainLayout({ children }) {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("credentials"))
  );
  const auth = useSelector((state) => state.auth.userState); // user auth state

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    data ? (data.isLoggedIn ? true : false) : null
  );
  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Toolbar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
