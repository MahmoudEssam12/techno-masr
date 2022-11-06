import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import FormLayout from "../../Layout/FormLayout";
import useForms from "../../hooks/useForms";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserState } from "./../../store/slices/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { testRegex } = useForms();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.userState); // user auth state
  const dispatch = useDispatch();
  const [openMsg, setOpenMsg] = useState(false);

  const handleClick = () => {
    setOpenMsg(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMsg(false);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //checking for email validation
    if (name === "email") {
      if (!testRegex(value, "email")) {
        setErrors((prev) => {
          return { ...prev, email: "Enter a valid Email" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, email: "" };
        });
      }
    } else {
      if (!testRegex(value, "password")) {
        setErrors((prev) => {
          return { ...prev, password: "This password cannot be right" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, password: "" };
        });
      }
    }

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = false;
    for (let property in errors) {
      if (!errors[property] && values[property]) {
        valid = true;
      } else {
        valid = false;
      }
    }
    if (valid) {
      let data = JSON.parse(localStorage.getItem("credentials"));
      if (
        data !== null &&
        data.password === values.password &&
        data.email === values.email
      ) {
        let logInUser = JSON.stringify({ ...data, isLoggedIn: true });
        localStorage.setItem("credentials", logInUser);
        navigate("/");
        dispatch(updateUserState());
      } else {
        handleClick();
      }
    } else {
      setErrors((prev) => {
        return {
          email: "Enter a valid Email",
          password: "This password cannot be right",
        };
      });
    }
  };
  return (
    <FormLayout>
      <form onSubmit={handleSubmit}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main", mx: "auto" }}>
          <AccountCircleIcon />
        </Avatar>
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <div className="inputs">
          <TextField
            id="email"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            helperText={errors.email ? errors.email : null}
            error={errors.email ? true : false}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            helperText={errors.password ? errors.password : null}
            error={errors.password ? true : false}
          />

          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            Sign In
          </Button>
          <span>
            Don't have an account?
            <Link to="/register" className="form-link">
              Sign up
            </Link>
          </span>
        </div>

        <Snackbar open={openMsg} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              "& .MuiAlert-icon, & .MuiAlert-action": {
                flexBasis: "10%",
              },
            }}
          >
            make sure you are registered!
          </Alert>
        </Snackbar>
      </form>
    </FormLayout>
  );
}

export default Login;
