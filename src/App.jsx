import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [quoteType, setQuoteType] = useState('got')
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);



  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (quoteType === 'got') {
        response = await axios.get('https://api.gameofthronesquotes.xyz/v1/random')
        
      const data = response.data;
      setQuote(data.sentence ? data.sentence : 'Unable to generate the quote');
      setAuthor(data.character ? data.character.name : '');

      } else if (quoteType === 'brb') {
        response = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes')

        const data = response.data[0];
        setQuote(data.quote || 'Unable to generate the quote')
        setAuthor(data.author || '')

      } else if (quoteType === 'strt') {
        response = await axios.get('https://strangerthings-quotes.vercel.app/api/quotes')

        const data = response.data[0];
        setQuote(data.quote || 'Unable to generate the quote')
        setAuthor(data.author || '')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
  fetchQuote()
}, []);

function handleProperQuote() {
  fetchQuote();
}

  return (
    <div className='app'>
      <Select setQuoteType={setQuoteType}/>
      <div className='container'>
        {loading ? (<p className='quote'>Loading quote..</p>) : (<Quote quote={quote} author={author} />) }
        <button onClick={handleProperQuote} disabled={loading}>Generate</button>
      </div>
    </div>
  )
}

function Select({ setQuoteType }) {
  return (
    <div>
      <select className='select1' onChange={(e) => setQuoteType(e.target.value)}>
        <option value='got'>Game of thrones</option>
        <option value='brb'>Breaking Bad</option>
        <option value='strt'>Stranger things</option>
      </select>
    </div>
  )
}

function Quote({ quote, author }) {
  return (
    <div>
      <p className='quote'>{quote}</p>
      <span className='author'>{author}</span>
    </div>

  )
}

export default App
