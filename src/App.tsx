import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
    const useStorageState = (key, initialState) => {
        const [value, setValue] = useState(localStorage.getItem(key) || initialState);
        useEffect(() => {
            localStorage.setItem(key, value);
        }, [key, value]);
        return [value, setValue];
    }
    const [searchTerm, setSearchTerm] = useStorageState('search', '');

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
        setSearchTerm(e.target.value)
    }

    const filtered = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="center">
                <h1>Hacker Stories</h1>

                <InputWithLabel id="search" onInputChange={handleSearch} value={searchTerm} isFocused>
                    <span style={{ fontWeight: "bold" }}>Search:</span>
                </InputWithLabel>
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


const InputWithLabel = ({ id, value, onInputChange, type = 'text', children, isFocused }) =>
(
    <>
        <label htmlFor={id}>{children}</label>
        <input type={type} id={id} onChange={onInputChange} value={value} autoFocus={isFocused} />
    </>
);

export default App;
