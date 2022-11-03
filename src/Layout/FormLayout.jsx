import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "./FormLayout.scss";
function FormLayout({ children }) {
  return (
    <div className="form-layout">
      <div className="layout-aside">
        <img src="/images/logo.webp" alt="technomasr" />
      </div>
      <Box component={Paper} className="form-wrapper">
        <div className="forms-body">{children}</div>
      </Box>
    </div>
  );
}

export default FormLayout;
