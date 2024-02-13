import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddPost() {
  const navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescrition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!title && !description ) {
      return alert("please enter title and description");
    }
    if (!title) {
      return alert("please enter title");
    }
    if (!description) {
      return alert("please enter dsescription");
    }
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/createpost", {
          title,
          description,
      });
      if(response.data.message ==="Post created"){
        navigate('/')}

    } catch (e) {
    } finally {
      setIsLoading(false);
      setTitle("")
      setDescrition("")
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mt-3">
        <Col
          xs={{ span: 9, offset: 2 }}
          md={{ span: 8 }}
          lg={{ span: 6, offset: 3 }}
        >
          <h1 className="display-6 text-center mb-3">Create Post</h1>

          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="enter description"
                rows={3}
                value={description}
                onChange={(e) => setDescrition(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="button">
              <Link to={"/"} className="text-decoration-none text-white">
                {" "}
                Cancel
              </Link>
            </Button>

            {!isLoading && (
              <Button type="submit" className="mx-2">
                Create
              </Button>
            )}

            {isLoading && (
              <Button variant="primary" className="mx-2" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddPost;
