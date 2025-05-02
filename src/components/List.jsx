import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addToCart, fetchProducts } from "../store/productSlice";
import { Button, Container, Row, Col, Card, Toast, ToastContainer } from "react-bootstrap";

const List = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // Use whichever property exists in your data (name/title)
    setToastMessage(`${product.name || product.title} added to cart`);
    setShowToast(true);
  };

  return (
    <Container>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h1 className="my-4 text-center">Product List</h1>
      <Row xs={1} sm={2} md={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <Card.Body className="d-flex flex-column">
                {/* Use same property here */}
                <Card.Title>{product.name || product.title}</Card.Title>
                <Card.Text className="text-muted">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <p className="text-success fw-bold">Price: ${product.price}</p>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default List;