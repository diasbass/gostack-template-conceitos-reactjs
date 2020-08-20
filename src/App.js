import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
    title: `New Repository - Created on: ${Date.now()}`,
    url: 'https://google.com',
    techs: ['JS', 'Node', 'React']
  })

    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(response)
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/" + id);
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {
          repositories.map(repository =>          
            <li key={repository.id}>
              <h1>{repository.title}</h1>              
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>          
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
