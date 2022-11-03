import React, { useState } from "react";
import useForms from "../../hooks/useForms";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import FormLayout from "../../Layout/FormLayout";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
function Register() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    isLoggedIn: false,
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [existingUser, setExistingUser] = useState(false);
  const { testRegex } = useForms();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    /**** validations for form data */
    if (name === "firstname") {
      if (!value) {
        setErrors((prev) => {
          return { ...prev, [name]: "firstname is required!" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, [name]: "" };
        });
      }
    }
    if (name === "lastname") {
      if (!value) {
        setErrors((prev) => {
          return { ...prev, [name]: "lastname is required!" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, [name]: "" };
        });
      }
    }

    //checking for email and password validation
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
    }
    if (name === "password") {
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
    /**** validations for form data */

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = false;

    // checking if the data is valid and no errors
    for (let property in errors) {
      if (!errors[property] && values[property]) {
        valid = true;
      } else {
        valid = false;
      }
    }
    if (valid) {
      let checkForDuplicate = JSON.parse(localStorage.getItem("credentials"));
      if (
        checkForDuplicate !== null &&
        checkForDuplicate.email === values.email
      ) {
        // check if that email is already registerd
        setExistingUser(true);
      } else {
        setExistingUser(false);
        let credentials = JSON.stringify(values);
        localStorage.setItem("credentials", credentials);
        navigate("/login");
      }
    } else {
      setErrors(() => {
        return {
          firstname: "firstname is required",
          lastname: "lastname is required",
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
          <div className="register-inputs">
            <TextField
              className="flex-input"
              id="firstname"
              label="Firstname"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              helperText={errors.firstname ? errors.firstname : null}
              error={errors.firstname ? true : false}
            />
            <TextField
              className="flex-input"
              id="lastname"
              label="Lastname"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              helperText={errors.lastname ? errors.lastname : null}
              error={errors.lastname ? true : false}
            />
          </div>
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
            Already have an account?
            <Link to="/login" className="form-link">
              Sign in
            </Link>
          </span>
          {existingUser && (
            <Alert severity="error">
              Your Email already exists! - Try to login
            </Alert>
          )}
        </div>
      </form>
    </FormLayout>
  );
}

export default Register;
