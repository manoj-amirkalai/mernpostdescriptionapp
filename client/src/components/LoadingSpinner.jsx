import { Col, Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <Col
      className="mt-5"
      xs={{ span: 3, offset: 6 }}
      md={{ span: 3, offset: 6 }}
      lg={{ span: 3, offset: 6 }}
    >
        <Spinner animation="border" className="text-center" />
    </Col>
  );
}

export default LoadingSpinner;