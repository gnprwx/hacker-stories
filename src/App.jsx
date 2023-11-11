import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useReducer } from "react";

const App = () => {
	const useStorageState = (key, initialState) => {
		const [value, setValue] = useState(
			localStorage.getItem(key) || initialState
		);
		useEffect(() => {
			localStorage.setItem(key, value);
		}, [key, value]);
		return [value, setValue];
	};
	const [searchTerm, setSearchTerm] = useStorageState("search", "");
	const initialStories = [
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

	const storyReducer = (state, action) => {
		switch (action.type) {
			case "STORIES_FETCH_INIT":
				return {
					...state,
					isLoading: true,
					isError: false,
				};
			case "STORIES_FETCH_SUCCESS":
				return {
					...state,
					isLoading: false,
					isError: false,
					data: action.payload,
				};
			case "STORIES_FETCH_FAILURE":
				return {
					...state,
					isLoading: false,
					isError: true,
				};
			case "REMOVE_STORY":
				return {
					...state,
					data: state.data.filter(
						(story) => action.payload.objectID !== story.objectID
					),
				};
			default:
				throw new Error();
		}
	};
	const [stories, dispatchStories] = useReducer(storyReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});
	useEffect(() => {
		dispatchStories({ type: "STORIES_FETCH_INIT" });
		getAsyncStories()
			.then((result) => {
				dispatchStories({
					type: "STORIES_FETCH_SUCCESS",
					payload: result.data.stories,
				});
			})
			.catch(() => dispatchStories({ type: "STORIES.FETCH.FAILURE" }));
	}, []);
	const getAsyncStories = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ data: { stories: initialStories } });
			}, 2000);
		});
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};
	const handleRemoveStory = (post) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: post,
		});
	};

	const filtered = stories.data.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className="center">
				<h1>Hacker Stories</h1>

				<InputWithLabel
					id="search"
					onInputChange={handleSearch}
					value={searchTerm}
					isFocused
				>
					<span style={{ fontWeight: "bold" }}>Search: </span>
				</InputWithLabel>
			</div>
			<hr />
			{stories.isLoading ? (
				<p>Fetching data...</p>
			) : (
				<Posts list={filtered} onRemovePost={handleRemoveStory} />
			)}
			{stories.isError && "Something went wrong!"}
		</>
	);
};

const Posts = ({ list, onRemovePost }) => (
	<ul>
		{list.map((post) => (
			<Post key={post.objectID} singlePost={post} onRemovePost={onRemovePost} />
		))}
	</ul>
);

const Post = ({ singlePost, onRemovePost }) => (
	<>
		<li>
			<span>
				<a href={singlePost.url} target="_blank">
					{singlePost.title}
				</a>
			</span>
			<span> - {singlePost.author}</span>
			<span> [comments: {singlePost.num_comments}]</span>
			<span> [points: {singlePost.points}]</span>
			<button type="button" onClick={() => onRemovePost(singlePost)}>
				Delete
			</button>
		</li>
	</>
);

const InputWithLabel = ({
	id,
	value,
	onInputChange,
	type = "text",
	children,
	isFocused,
}) => (
	<>
		<label htmlFor={id}>{children}</label>
		<input
			type={type}
			id={id}
			onChange={onInputChange}
			value={value}
			autoFocus={isFocused}
		/>
	</>
);

export default App;
