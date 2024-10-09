import { Card, Col, Image, Row } from "react-bootstrap";

const Product = ({ product }) => {
  console.log("product", product);

  return (
    // <Container style={{ display: "flex", flexDirection: "row" }}>
      <Row xs={1} md={2} lg={4} className="g-4">
          {Array.from({ length: 1 }).map((_, idx) => (
        <Col key={idx}>
          <Card >
            <Card.Img variant="top" src={product.image}className="card-img-top  img-fluid rounded"
                style={{ height: "250px" }}/>
            <Card.Body>
            <Card.Title>

              <h1 className="card-text">{product.name}</h1>
            </Card.Title>
            <Card.Text>

                <p className="card-text"> {product.description}</p>
                <div>
                <small className="text-success text-danger">
                  Price: ${product.price}
                </small>
              </div>
            </Card.Text>




            </Card.Body>
          </Card>
        </Col>
          ))

          }
  </Row>
  )
};
export default Product;




