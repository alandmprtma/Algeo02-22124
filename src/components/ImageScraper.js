import React, { useState } from 'react';
import axios from 'axios';

const ImageScraper = () => {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/scrape', { url: input });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
        <label>
          Input:
          <input type="text" value={input} onChange={handleChange} />
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Submit</button>
      </form>
    </div>
  );
};

export default ImageScraper;
