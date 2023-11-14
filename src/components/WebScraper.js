import React, { useState } from 'react';
import axios from 'axios';

const WebScraper = () => {
  const [url, setUrl] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrape = async () => {
    if (url) {
      try {
        const response = await axios.post('http://localhost:8000/scrape', { url: url }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Handle the response as needed
        console.log('Images scraped successfully:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error scraping images:', error);
      }
    } else {
      // Handle case where no URL is entered
      console.error('No URL entered for scraping.');
    }
  };

  return (
    <div>
      <h3>Web Image Scraper</h3>
      <input type='text' value={url} onChange={handleUrlChange} placeholder='Enter a URL' />
      <button onClick={handleScrape}>Scrape Images</button>
    </div>
  );
};

export default WebScraper;
