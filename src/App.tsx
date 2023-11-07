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

function List() {
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
                <h1>Oops.</h1>
            )}
        </ul>
    );
}

function Search() {
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" />
        </>
    );
}

export default App;
