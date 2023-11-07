import "./App.css";

function getTitle(title: string): string {
    return title;
}
const App = () => {
    return (
        <>
            <h1>{getTitle("Gregory")}</h1>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" />
        </>
    );
};

export default App;
