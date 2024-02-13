import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function UpdatePost({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescrition] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { postid } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title && !description) {
      return alert("please enter title and description");
    }
    if (!title) {
      return alert("please enter title");
    }
    if (!description) {
      return alert("please enter dsescription");
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/updatepost/${postid}`,
        {
          title,
          description,
        }
      );
      if (response.statusText === "OK") {
        navigate("/");
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };
  const getSinglePost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/post/${postid}`
      );
      const { post } = response.data;
      setTitle(post.title);
      setDescrition(post.description);
    } catch (e) {}
  };
  useEffect(() => {
    getSinglePost();
  }, []);
  return (
    <div>
      <Container className="mt-5">
        <Row className="mt-3">
          <Col
            xs={{ span: 9, offset: 2 }}
            md={{ span: 8 }}
            lg={{ span: 6, offset: 3 }}
          >
            <h1 className="display-6 text-center mb-3">Create Post</h1>

            <Form onSubmit={submitHandler}>
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

              {!loading && (
                <Button variant="success" type="submit" className="mx-2">
                  Update
                </Button>
              )}
              {loading && (
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
    </div>
  );
}

export default UpdatePost;
