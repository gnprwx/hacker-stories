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
    const handleSearch = (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <div className="center">
                <h1>Hacker Stories</h1>
                <Search onSearch={handleSearch} />
            </div>
            <hr />
            <Posts list={stories} />
        </>
    );
};

const Posts = (props) => (
    <ul>
        {props.list.map((post) => (
            <Post key={post.objectID} postItem={post} />
        )
        )}
    </ul>
);

const Post = ({ postItem }) => (
    <li>
        <span>
            <a href={postItem.url} target="_blank">
                {postItem.title}
            </a>
        </span>
        <span> - {postItem.author}</span>
        <span> [comments: {postItem.num_comments}]</span>
        <span> [points: {postItem.points}]</span>
    </li>
)

const Search = (props) => {
    const [search, setSearch] = useState('');
    const handleChange = (e): void => {
        setSearch(e.target.value);
        props.onSearch(e);
    }

    return (
        <>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onChange={handleChange} />
            <p>Searching for: {search}</p>
        </>
    );
};

export default App;
