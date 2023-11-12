import { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./App.css";

// Begin Types
type Post = {
	objectID: string;
	url: string;
	title: string;
	author: string;
	num_comments: number;
	points: number;
}
type Posts = Post[];

type PostsState = {
	data: Posts;
	isLoading: boolean;
	isError: boolean;
}

type SearchFormProps = {
	searchTerm: string;
	onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
	onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

type PostsProps = {
	list: Posts;
	onRemovePost: (list: Post) => void;
}

type PostProps = {
	singlePost: Post;
	onRemovePost: (singlePost: Post) => void
}

type InputWithLabelProps = {
	id: string;
	value: string;
	type?: string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	isFocused?: boolean;
	children: ReactNode;
}

type StoriesFetchInitAction = {
	type: 'STORIES_FETCH_INIT';
}

type StoriesFetchSuccessAction = {
	type: 'STORIES_FETCH_SUCCESS';
	payload: Posts;
}

type StoriesFetchFailureAction = {
	type: 'STORIES_FETCH_FAILURE';
}

type StoriesRemoveAction = {
	type: 'REMOVE_STORY';
	payload: Post;
}

type PostsAction =
	StoriesFetchInitAction
	| StoriesFetchSuccessAction
	| StoriesFetchFailureAction
	| StoriesRemoveAction;
// End Types

const App = () => {
	const useStorageState = (key: string, initialState: string)
		: [string, (newValue: string) => void] => {
		const [value, setValue] = useState(
			localStorage.getItem(key) || initialState
		);
		useEffect(() => {
			localStorage.setItem(key, value);
		}, [key, value]);
		return [value, setValue];
	};

	const ENDPOINT_API = "https://hn.algolia.com/api/v1/search?query=";

	const [searchTerm, setSearchTerm] = useStorageState("search", "");
	const [url, setUrl] = useState(ENDPOINT_API + searchTerm);

	const postsReducer = (state: PostsState, action: PostsAction) => {
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

	const [stories, dispatchStories] = useReducer(postsReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});

	const getAsyncStories = useCallback(async () => {
		dispatchStories({ type: "STORIES_FETCH_INIT" });
		try {
			const result = await axios.get(url);
			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: result.data.hits,
			});
		} catch (error) {
			dispatchStories({ type: "STORIES_FETCH_FAILURE" });
		}
	}, [url]);

	useEffect(() => {
		getAsyncStories();
	}, [getAsyncStories]);

	const handleRemoveStory = (post: Post) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: post,
		});
	};

	const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
		setUrl(ENDPOINT_API + searchTerm);
		e.preventDefault();
	};

	return (
		<>
			<div className="center">
				<h1>Hacker Stories</h1>
				<SearchForm
					onSearchSubmit={handleSearchSubmit}
					onSearchInput={handleSearchInput}
					searchTerm={searchTerm}
				/>
			</div>
			<hr />
			{stories.isError && <p>Something went wrong!</p>}
			{stories.isLoading ? (
				<p>Fetching data...</p>
			) : (
				<Posts list={stories.data} onRemovePost={handleRemoveStory} />
			)}
		</>
	);
};

const SearchForm = ({ onSearchSubmit, onSearchInput, searchTerm }: SearchFormProps) => (
	<form onSubmit={onSearchSubmit}>
		<InputWithLabel
			id="search"
			onInputChange={onSearchInput}
			value={searchTerm}
			isFocused
		>
			<span style={{ fontWeight: "bold" }}>Search: </span>
		</InputWithLabel>
		<button type="submit" disabled={!searchTerm}>
			Submit
		</button>
	</form>
);

const Posts = ({ list, onRemovePost }: PostsProps) => (
	<ul id="postList">
		{list.map((post) => (
			<Post key={post.objectID} singlePost={post} onRemovePost={onRemovePost} />
		))}
	</ul>
);

const Post = ({ singlePost, onRemovePost }: PostProps) => (
	<>
		<li className="postEntry">
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
}: InputWithLabelProps) => (
	<>
		<span>{children}</span>
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
