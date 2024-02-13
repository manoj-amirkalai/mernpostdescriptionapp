import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from 'axios'

function PostList() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const deletePost = async (id) => {
    const confirmation = window.confirm("Are you sure to delete");
    if (!confirmation) {
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/deletepost/${id}`);

      if(response.statusText === "OK"){
       await getPosts()
      }else{
        const errResponse=await response.json()
        throw new Error(errResponse.message)
      }
    } catch (error) {

    }
  };
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`);
      setPost(response.data);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <Container className="mt-5">
        
        <Button size="lg" variant="success">
          <Link
            to={"/create"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Create Post <BsPlusCircleFill></BsPlusCircleFill>
          </Link>
        </Button>

        <Row className="mt-3" sm={1} md={3}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && post.length>0 &&
            post.map((post) => (
              <Col key={post._id}>
                <Card className="mb-2">
                  <Card.Body>
                    <Row className="mb-2">
                      <Col xs={8} md={7} lg={8}>
                        <Card.Title>{post.title}</Card.Title>
                      </Col>
                      <Col>
                        <Link to={`/update/${post._id}`}>
                          <AiOutlineEdit
                            className="text-primary"
                            role="button"
                          />
                        </Link>
                      </Col>
                      <Col>
                        <AiFillDelete
                          className="text-danger"
                          role="button"
                          onClick={() => deletePost(post._id)}
                        />
                      </Col>
                    </Row>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))} {!isLoading && post.length===0 && <h1 className="text-center display-6">No post to display</h1> }
        </Row>
      </Container>
    </>
  );
}

export default PostList;
