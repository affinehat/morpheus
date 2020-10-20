import React, {useState} from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");

  const [results, setResults] = useState([]);

  const instance = axios.create({
    baseURL: "https://rhymebrain.com/talk?function=getRhymes&word="
  });

  //pulls user's saved List from DB and stores it in listArr
  function fetchList(e) {
    instance
      .get(userInput)
      .then(function(response) {
        setResults(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    e.preventDefault();
  }

  function handleChange(e) {
    const newInput = e.target.value;
    setUserInput(newInput);
  }

  function displayRhymes() {
    return (
      <div>
        {results.map(result => {
          return <p>{result.word}</p>;
        })}
        <br />
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Enter a word to rhyme with:</h2>
      <form>
        <input
          onChange={handleChange}
          type="text"
          name="userInput"
          value={userInput}
        />
        <button onClick={fetchList} type="submit" name="submitButton">
          Go
        </button>
      </form>
      <br />
      {displayRhymes()}
      Rhyme results are provided by{" "}
      <a href="https://rhymebrain.com">RhymeBrain.com</a>
    </div>
  );
}

export default App;
