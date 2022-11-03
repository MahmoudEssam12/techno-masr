import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_bg}>
      <h1>Techno Masr</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
        similique odio, alias nihil et doloribus minima dolorem velit suscipit
        eveniet sit illo exercitationem adipisci. Recusandae hic facilis quaerat
        repellat provident.
      </p>
      <Button
        variant="contained"
        onClick={() => navigate("/categories")}
        color="warning"
        sx={{ color: "#fff" }}
      >
        Shop Now
      </Button>
    </div>
  );
}

export default Home;
