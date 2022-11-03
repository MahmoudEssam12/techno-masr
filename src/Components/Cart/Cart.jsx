import React from "react";
import { Button, Container } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import { useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import Alert from "@mui/material/Alert";
function Cart() {
  const cartProducts = useSelector((state) => state.cart.products);
  const getTotalCost = () => {
    // create an array of numbers from items array
    // with reduce method accumelate the arr of numbers
    //then return that number to the total cost div
    if (cartProducts.length) {
      let arrayOfPrices = cartProducts.map(
        (item) => Number(item.price) * Number(item.quantity)
      );
      let orderPrice = arrayOfPrices.reduce((prev, current) => prev + current);
      // add the delivery cost on the order price
      return orderPrice;
    }
    return 0;
  };
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <div className={styles.cart}>
        <div className={styles.cart_wrapper}>
          <h1>Cart({cartProducts.length})</h1>

          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartItem key={product.id} {...product} />
            ))
          ) : (
            <div style={{ padding: "2rem" }}>
              <Alert severity="info">Your cart is Empty</Alert>
            </div>
          )}
        </div>
        <div className={styles.checkout_card}>
          <h5>Cart summary</h5>
          <div>
            <span>
              <strong>Total: </strong>
            </span>{" "}
            <span>
              {" "}
              <strong>{getTotalCost()}EGP</strong>
            </span>
          </div>
          <Button variant="contained" sx={{ width: "100%" }}>
            Checkout
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
