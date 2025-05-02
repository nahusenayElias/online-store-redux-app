import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decrementQuantity } from '../store/productSlice';
import { Button, Container, Row, Col, Card, Toast, ToastContainer } from 'react-bootstrap';

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  // Toast states
  const [showRemoveToast, setShowRemoveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRemove = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      dispatch(removeFromCart(productId));
      setToastMessage(`${item.name || item.title} removed from cart`);
      setShowRemoveToast(true);
    }
  };

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      const previousQuantity = item.quantity;
      dispatch(decrementQuantity(productId));

      // Show notification if item was removed by decrementing to 0
      if (previousQuantity === 1) {
        setToastMessage(`${item.name || item.title} removed from cart`);
        setShowRemoveToast(true);
      }
    }
  };

  const total = cart.reduce((sum, item) =>
    sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0
  );

  return (
    <Container>
      {/* Removal Notification Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          bg="danger"
          onClose={() => setShowRemoveToast(false)}
          show={showRemoveToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Removed</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

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
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col xs={9} md={10}>
                    <Card.Title>{item.name || item.title}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-3"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>
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