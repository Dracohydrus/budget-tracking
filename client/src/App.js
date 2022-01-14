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
        <h1>{apiResponse}</h1>
    </div>
  );
}

export default App;
