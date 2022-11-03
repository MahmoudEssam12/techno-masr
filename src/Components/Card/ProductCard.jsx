import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { useAddToCart } from "../../hooks/useAddToCart";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductCard({
  image,
  title,
  price,
  description,
  id,
  brand,
  color,
  rating,
  inStock,
}) {
  const [openMsg, setOpenMsg] = useState(false);
  const [msgBody, setMsgBody] = useState("");
  const [msgType, setMsgType] = useState("");
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

  const handleAdding = useAddToCart(
    {
      image,
      name: title,
      price,
      description,
      id,
      brand,
      color,
      rating,
      inStock,
      quantity: 1,
    },
    showMsg
  );

  return (
    <>
      <Card sx={{ maxWidth: 345, maxHeight: 360 }}>
        <CardMedia component="img" alt={title} height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/categories/${id}`}>{title}</Link>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {price}EGP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.substring(0, 100)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAdding}>
            <AddShoppingCartIcon />
          </Button>
          <Link to={`/categories/${id}`}>
            <Button size="small">Details</Button>
          </Link>
        </CardActions>
      </Card>

      <Snackbar open={openMsg} autoHideDuration={3000} onClose={handleClose}>
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
    </>
  );
}

export default ProductCard;
