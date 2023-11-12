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
	const ENDPOINT_API = "https://hn.algolia.com/api/v1/search?query=";

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
		const getAsyncStories = async () => {
			try {
				const response = await fetch(ENDPOINT_API + "react");
				const data = await response.json();
				dispatchStories({
					type: "STORIES_FETCH_SUCCESS",
					payload: data.hits,
				});
			} catch (error) {
				dispatchStories({ type: "STORIES_FETCH_FAILURE" });
			}
		};
		getAsyncStories();
	}, []);

	const handleRemoveStory = (post) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: post,
		});
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const searchFilter = stories.data.filter((story) =>
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
			{stories.isError && <p>Something went wrong!</p>}
			{stories.isLoading ? (
				<p>Fetching data...</p>
			) : (
				<Posts list={searchFilter} onRemovePost={handleRemoveStory} />
			)}
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
