import { useState, useEffect } from "react";
import { useFetch } from "./hook/useFetch";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const [url, setUrl] = useState(API_URL);
  const [method, setMethod] = useState("GET");
  const [postData, setPostData] = useState(null);
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const { data, isPending, error } = useFetch(url, method, postData);

  useEffect(() => {
    if (postData) setUrl(API_URL);
  }, [postData]);

  useEffect(() => {
    if (error) {
      setMessage("Xatolik yuz berdi!");
      setStatus("error");
    } else if (data) {
      setMessage("A'lo darajada!");
      setStatus("success");
    }
  }, [data, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (["POST", "PUT", "PATCH"].includes(method)) {
      setPostData({ title, body });
    }
    if (method === "DELETE" && postId) {
      setUrl(`${API_URL}/${postId}`);
    } else if (method === "GET" && postId) {
      setUrl(`${API_URL}/${postId}`);
    } else {
      setUrl(API_URL);
    }
  };

  return (
    <div className="container">
      {message && (
        <div className={`alert ${status}`}>
          {status === "error" ? "❌ " : "✅ "} {message}
        </div>
      )}
      <div className="glass-box">
        <h2>Post Manager</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            type="text"
            placeholder="Post ID  "
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <div className="btn-group">
            <button
              type="submit"
              onClick={() => setMethod("POST")}
              className="btn primary"
            >
              Add
            </button>
            <button
              type="submit"
              onClick={() => setMethod("PUT")}
              className="btn secondary"
            >
              Update
            </button>
            <button
              type="submit"
              onClick={() => setMethod("PATCH")}
              className="btn secondary"
            >
              Patch
            </button>
            <button
              type="submit"
              onClick={() => setMethod("GET")}
              className="btn info"
            >
              Get
            </button>
            <button
              type="submit"
              onClick={() => setMethod("DELETE")}
              className="btn danger"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      {isPending && <p className="loading">Yuklanmoqda...</p>}
      <div className="posts-container">
        {data &&
          (Array.isArray(data) ? (
            data.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <div className="post-card">
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
