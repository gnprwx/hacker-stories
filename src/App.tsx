import "./App.css";

function getTitle(title: string): string {
    return title;
}
const numArr: number[] = [1, 2, 3, 4, 5, 6];
const App = () => {
    return (
        <>
            <h1>{getTitle("Gregory")}</h1>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" />
            <h3>
                {numArr.map((num) => {
                    return num;
                })}
            </h3>
        </>
    );
};

export default App;
