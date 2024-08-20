import React, { useContext, useEffect } from "react";
import deleteicon from "../../assets/deleteicon.png";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
import "./cart.scss";
import { BeatLoader } from "react-spinners";


const Carts: React.FC = () => {
  const context = useContext(ShopContext);


  if (!context) {
    return <BeatLoader />;
  }

  const {
    getTotalCartAmount,
    cartItems,
    productData,
    addToCart,
    removeFromCart,
  } = context;

const cartProducts =
  productData?.filter((product) => cartItems[product.id] > 0) || [];
  console.log(cartProducts.length);


//scroll effect to take the page back to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="cartFlex">
        <div className="cartItemsContainer">
          <th className="cartHeader">
            <p className="cartHeaderText">Product</p>
            <p className="cartHeaderText">Price</p>
            <p className="cartHeaderText">Quantity</p>
            <p className="cartHeaderText">Subtotal</p>
          </th>
          {cartProducts.map((product) => (
            <tr className="productsDisplay" key={product.id}>
              <div className="productFlex divPercentage">
                <div className="cartImageDiv">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    id="cartImage"
                  />
                </div>
                <div className="">
                  <p className="cartProductTitle">{product.title}</p>
                </div>
              </div>
              <div className="divPercentage">
                <p className="cartProductPrice">
                  Rs {product.price.toFixed(2)}
                </p>
              </div>
              <div className="divPercentage">
                <div className="quantityControl divPercentage">
                
                  <button
                    className="cartBtn"
                  >
                    <span onClick={() => removeFromCart(product.id)}>-</span>
                    <span>{cartItems[product.id]}</span>
                    <span onClick={() => addToCart(product.id, 1)}>+</span>
                  </button>
                </div>
              </div>
              <div className="divPercentage">
                <p className="cartProductTotal">
                  Rs {(product.price * cartItems[product.id]).toFixed(2)}
                </p>
              </div>
              <div className="divPercentage">
                <img
                  src={deleteicon}
                  alt="delete icon"
                  className="deleteIcon"
                  onClick={() => context.deleteFromCart(product.id)}
                />
              </div>
            </tr>
          ))}
        </div>
        <div className="cartTotalsDiv">
          <th className="cartTotalsText">Cart Totals</th>
          <tr className="cartTotals">
            <p className="cartPercentage">Subtotal</p>
            <p className="cartPercentage">
              Rs {getTotalCartAmount().toFixed(2)}
            </p>
          </tr>
          <tr className="cartTotals">
            <p className="cartPercentage">Total</p>
            <p className="totalCartAmt cartPercentage">
              Rs {getTotalCartAmount().toFixed(2)}
            </p>
          </tr>
          <Link to="/checkout">
            <button className="checkoutBtn">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Carts;
