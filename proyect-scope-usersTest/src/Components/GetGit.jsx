import React, { useEffect, useState } from 'react';

export const GetGit = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const repoOwner = 'kevinvilchez'; // cámbialo si usas otro usuario
  const repoName = 'mi-repo';       // cámbialo por tu repositorio real

  useEffect(() => {
    const fetchRepoContents = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        console.error('Error al obtener los archivos:', err);
        setError(err.message);
      }
    };

    fetchRepoContents();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Archivos del repositorio: <code>{repoOwner}/{repoName}</code></h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : files.length === 0 ? (
        <p>Cargando archivos...</p>
      ) : (
        <ul>
          {files.map((item) => (
            <li key={item.path}>
              <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                {item.name} {item.type === 'dir' ? '(carpeta)' : ''}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

