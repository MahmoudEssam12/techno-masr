import { useDispatch, useSelector } from "react-redux";
import { setCartItem, selectCartItem } from "../store/slices/cart";
import { userState } from "../store/slices/auth"
export function useAddToCart(product, showMessage) {
    const dispatch = useDispatch();
    const cart = useSelector(selectCartItem)
    const auth = useSelector(userState);

    const addToCart = (product) => {
        if (!auth) {
            showMessage("You need to login first to be able to add to cart", "error");
            return;
        }
        // validations if the user added the same product to the cart
        // show him a message that the product already exists in the cart
        const duplicate = cart.find((cartItem) => cartItem.id === product.id);
        if (!duplicate) {
            dispatch(setCartItem(product));
            showMessage("added to cart", "success");
        }
        else {
            showMessage(
                "This item already exists in cart. \nif you want to increase quantity do it from cart",
                "info");
        }
    };
    const handleAdding = () => {
        addToCart(product);
    };

    return handleAdding;
}