import { useState } from "react";
import "./App.css";

const App = () => {
    const [search, setSearch] = useState('');
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
        setSearch(e.target.value)
    }

    const filtered = stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className="center">
                <h1>Hacker Stories</h1>
                <Search onSearch={handleSearch} searchEntry={search} />
            </div>
            <hr />
            <Posts list={filtered} />
        </>
    );
};

const Posts = ({ list }) => (
    <ul>
        {list.map((post) => (
            <Post key={post.objectID} singlePost={post} />
        )
        )}
    </ul>
);

const Post = ({ singlePost }) =>
(
    <li>
        <span>
            <a href={singlePost.url} target="_blank">
                {singlePost.title}
            </a>
        </span>
        <span> - {singlePost.author}</span>
        <span> [comments: {singlePost.num_comments}]</span>
        <span> [points: {singlePost.points}]</span>
    </li>
)


const Search = ({ onSearch, searchEntry }) =>
(
    <>
        <label htmlFor="search">Search: </label>
        <input type="text" id="search" onChange={onSearch} value={searchEntry} />
    </>
);

export default App;
