import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import data from "../../data.json";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./ProductPage.module.scss";
import { useAddToCart } from "../../hooks/useAddToCart";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductPage() {
  const [product, setProduct] = useState({});
  const [mainImg, setMainImg] = useState("");
  const [openMsg, setOpenMsg] = useState(false);
  const [msgBody, setMsgBody] = useState("");
  const [msgType, setMsgType] = useState("");
  const params = useParams();

  const handleClick = () => {
    setOpenMsg(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMsg(false);
  };

  const showMsg = (message, type) => {
    if (type === "success") {
      setMsgBody(message);
      setMsgType(type);
    } else {
      setMsgBody(message);
      setMsgType(type);
    }
    handleClick();
  };

  let obj = data.filter(
    (product) => product.id === Number(params.productID)
  )[0];
  const addToCart = useAddToCart(
    { ...obj, image: obj.images[0], quantity: 1 },
    showMsg
  );
  const changeImage = (e) => {
    setMainImg(e.target.src);
  };
  useEffect(() => {
    setProduct(() => {
      let ourProduct = data.filter(
        (product) => product.id === Number(params.productID)
      );
      setMainImg("/" + ourProduct[0].images[0]);
      return ourProduct[0];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth="lg">
      {product.images === undefined ? (
        <CircularProgress />
      ) : (
        <div className={styles.product_wrapper}>
          <div className={styles.product_preview}>
            <div className={styles.img_wrapper}>
              <img src={mainImg} alt={mainImg} />
            </div>
            <div className={styles.gallery}>
              {product.images.map((image) => (
                <img
                  key={image}
                  onClick={changeImage}
                  src={`/${image}`}
                  alt={`/${image}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.product_details}>
            <h1>{product.name}</h1>
            <h2>{product.price}EGP</h2>
            <div className={styles.details}>
              <span>
                <strong>Brand: </strong>
              </span>
              <span>{product.brand}</span>
            </div>
            <div>
              <Rating
                name="size-medium"
                defaultValue={Number(product.rating)}
                readOnly
              />
            </div>
            <p>
              <strong>Description: </strong>
              {product.description}
            </p>

            <Button
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
              onClick={addToCart}
            >
              Add To Cart
            </Button>
          </div>
          <Snackbar
            open={openMsg}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={msgType}
              sx={{
                "& .MuiAlert-icon, & .MuiAlert-action": {
                  flexBasis: "10%",
                },
              }}
            >
              {msgBody}
            </Alert>
          </Snackbar>
        </div>
      )}
    </Container>
  );
}

export default ProductPage;
