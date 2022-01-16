import { useEffect, useState } from 'react';

function App() {
  const [apiResponse, setApiReponse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => setApiReponse(res))
  }, [])

  return (
    <div>
        <h1>Test React App</h1>
        <p>{apiResponse}</p>
    </div>
  );
}

export default App;
