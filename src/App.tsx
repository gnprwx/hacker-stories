import { useState } from "react";
import "./App.css";

const App = () => {
    const stories = [
        {
            title: "React",
            url: "https://reactjs.org/",
            author: "Jordan Walke",
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: "Redux",
            url: "https://redux.js.org/",
            author: "Dan Abramov, Andrew Clark",
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ];
    return (
        <>
            <div className="center">
                <h1>Hacker Stories</h1>
                <Search />
            </div>
            <hr />
            <Posts list={stories} />
        </>
    );
};

const Posts = (props) => (
    <ul>
        {props.list.map((post) => (
            <Post key={post.objectID} post={post} />
        )
        )}
    </ul>
);

const Post = ({ post }) => (
    <li>
        <span>
            <a href={post.url} target="_blank">
                {post.title}
            </a>
        </span>
        <span> - {post.author}</span>
        <span> [comments: {post.num_comments}]</span>
        <span> [points: {post.points}]</span>
    </li>
)

const Search = () => {
    const [search, setSearch] = useState('');
    const handleChange = (e): void => {
        setSearch(e.target.value);
    }
    const handleBlur = (e): void => {
        console.log('lost focus');
    }

    return (
        <>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onBlur={handleBlur} onChange={handleChange} />
            <p>Searching for: {search}</p>
        </>
    );
};

export default App;
