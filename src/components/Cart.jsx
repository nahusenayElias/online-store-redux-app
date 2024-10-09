import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  console.log(cart);
  return (
    <section className="cart-component" >
      {cart.map((product) => (
        <article className="cart-card" key={product.id}>
          <div style="width: 18rem;">
            <img src={product.image} alt="" />
            <button>REMOVE</button>
          </div>
          <div>
            <p>{product.title}</p>
            <div className="button-in-cart">
              <button>-</button>
              <span>{product.quantity}</span>
              <button>+</button>
            </div>
            <p>$:{product.price}</p>
          </div>
        </article>
      ))}
      ;
    </section>
  );
};

export default Cart;
