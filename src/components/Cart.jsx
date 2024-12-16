import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decrementQuantity } from '../store/productSlice';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import '../assets/cart.css'

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <h1 className="my-4 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col xs={3} md={2}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                  </Col>
                  <Col xs={9} md={10}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm" onClick={() => handleDecrement(item.id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleIncrement(item)}>+</Button>
                      <Button variant="danger" size="sm" className="ms-3" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <Card>
            <Card.Body>
              <Card.Title className="text-end">Total: ${total.toFixed(2)}</Card.Title>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Cart;
