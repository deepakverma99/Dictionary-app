import { useState } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import  Axios  from 'axios';

function App() {
  const [data, setData] = useState("")
  const [searchWord, setSearchWord] = useState("")

    // Function to fetch information on button 
  // click, and set the data accordingly

  function getMeaning(){
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`).then((response) => {setData(response.data[0]);});
  }


   // Function to play and listen the 
  // phonetics of the searched word

  function playAudio(){
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return as is if not a string or empty
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <div className="App">
      <h1> Free Dictionary</h1>
      <div className="searchBox">
        <input type="text" placeholder='What are looking for...' onChange={(e) => {setSearchWord(e.target.value)}} />
        <button className='Btn' onClick={() => {getMeaning();}}><FaSearch size="20px" /> </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>{capitalizeFirstLetter(data.word)}{" "}
            <button onClick={() => (speechSynthesis.speak(new SpeechSynthesisUtterance(text.innerText)))}><FcSpeaker size="26px" /></button>
          </h2>

          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfspeech}</p>
          <h4>Definitions:</h4>
          <p id='text'>{capitalizeFirstLetter(data.word)}{" "}{data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>{data.meanings[0].definitions[0].example ||  "Examples are not available!"}</p>
        </div>

      )}
    </div>
  )
}

export default App
