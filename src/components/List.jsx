import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addToCart, fetchProducts } from "../store/productSlice";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const List = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      <h1 className="my-4 text-center">Product List</h1>
      <Row xs={1} sm={2} md={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              {/* Product Image */}
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "200px", objectFit: "contain" }}
              />
              {/* Card Body */}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <p className="text-success fw-bold">Price: ${product.price}</p>
                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => dispatch(addToCart(product))}
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
