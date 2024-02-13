import "./App.css";
import AddPost from "./components/AddPost";
import NotFound from "./components/NotFound";
import PostList from "./components/PostList";
import UpdatePost from "./components/UpdatePost";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    { index: true, element: <PostList /> },
    { path: "/create", element: <AddPost /> },
    { path: "/update/:postid", element: <UpdatePost /> },
    { path: "*", element: <NotFound /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
