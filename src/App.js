import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import CreatQuestion from './component/createQuestion';
import StartQuiz from './component/startQuiz';
import HandleQuiz from './component/handleQuiz';
import ResultPage from './component/ResultPage';
function App() {
  const [posts, setPosts] = useState([]);
  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow", 
    };

    fetch("http://localhost:3030/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
console.log(posts);
  return (
    <div className="App">
      {/* {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <span>{post.id}</span> {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))} */}
      <Router>
        <Routes>
          <Route path='/' element={<CreatQuestion/>}/>
          <Route path='/quiz' element={<StartQuiz/>}/>
          <Route path='/startquiz' element={<HandleQuiz/>} />
          <Route path='/Result' element={<ResultPage/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
