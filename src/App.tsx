import { useState } from "react";
import "./App.css";

const list = [
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
const App = () => {
    return (
        <>
            <div className="center">
                <h1>Hacker Stories</h1>
                <Search />
            </div>
            <hr />
            <List />
        </>
    );
};
const List = () => {
    return (
        <ul>
            {list.length !== 0 ? (
                list.map((post) => {
                    return (
                        <li key={post.objectID}>
                            <span>
                                <a href={post.url} target="_blank">
                                    {post.title}
                                </a>
                            </span>
                            <span> - {post.author}</span>
                            <span> [comments: {post.num_comments}]</span>
                            <span> [points: {post.points}]</span>
                        </li>
                    );
                })
            ) : (
                <h1>There's nothing to see here.</h1>
            )}
        </ul>
    );
};

const Search = () => {
    const handleChange = (e): void => {
        console.log(e.target.value);
    }
    const handleBlur = (e): void => {
        console.log('lost focus');
    }

    return (
        <>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onBlur={handleBlur} onChange={handleChange} />
        </>
    );
};

export default App;
