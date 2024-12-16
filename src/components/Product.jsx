import { Card, Col } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={product.image}
          className="card-img-top img-fluid rounded"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title as="h5">{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <small className="text-success">
              Price: ${product.price}
            </small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
