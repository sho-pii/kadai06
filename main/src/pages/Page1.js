import React from 'react';
import { Link } from 'react-router-dom';

const Page1 = () => {
  return (
    <div>
      <h1>Page 1</h1>
      <p>This is Page 1 content.</p>
      <Link to="/Page2">Go to Page 2</Link>
    </div>
  );
}

export default Page1;