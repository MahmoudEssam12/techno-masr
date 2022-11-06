import React from "react";
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Rating from "@mui/material/Rating";
import styles from "./CartItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { quantityHandler, removeCartItem } from "../../store/slices/cart";
function CartItem(props) {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeCartItem(props.id));
  };

  const increaseQty = () => {
    dispatch(quantityHandler({ type: "add", id: props.id }));
  };
  const decreaseQty = () => {
    if (props.quantity <= 1) {
      removeItem();
    } else {
      dispatch(quantityHandler({ type: "remove", id: props.id }));
    }
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.product_details}>
        <div className={styles.info}>
          <img src={`/${props.image}`} alt={props.image} />
          <div>
            <h3>{props.name}</h3>
            <span className={styles.product_detail}>
              <strong>Brand: </strong>
              {props.brand}
            </span>
            <div className={styles.product_detail}>
              <span>
                <strong>Color: </strong>{" "}
                <strong
                  style={{
                    color: props.color,
                    backgroundColor: props.color === "white" ? "black" : "#fff",
                  }}
                >
                  {props.color}
                </strong>
              </span>
            </div>
            <span className={styles.product_detail}>
              <Rating name="read-only" value={Number(props.rating)} readOnly />
            </span>
          </div>
        </div>
        <div className={styles.price}>
          <h2>{props.price}EGP</h2>
          <span style={{ color: "grey" }}>
            ({props.price * props.quantity}EGP)
          </span>
        </div>
      </div>
      <div className={styles.controls}>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={removeItem}
        >
          Remove
        </Button>
        <div className={styles.qty}>
          <Button variant="contained" onClick={decreaseQty}>
            <RemoveIcon />
          </Button>
          <span>{props.quantity}</span>
          <Button variant="contained" onClick={increaseQty}>
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
