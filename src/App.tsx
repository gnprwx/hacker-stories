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
                <Search searchEntry={search} onSearch={handleSearch} />
            </div>
            <hr />
            <Posts list={filtered} />
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
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onChange={props.onSearch} value={props.searchEntry}/>
        </>
    );
};

export default App;
