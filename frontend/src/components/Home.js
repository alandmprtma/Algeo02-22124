import React, { useState, useRef } from 'react';
import axios from 'axios';

function Home(){
    return (
        <nav>
          <button>
            <Link to="/upload">Image Upload</Link>
          </button>
          <button>
            <Link to="/camera">Camera Upload</Link>
          </button>
        </nav>
    );
}