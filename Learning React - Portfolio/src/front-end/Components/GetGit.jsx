import React, { useEffect, useState } from 'react';
import { FaFolder, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/DevCodeSection.css";

export const GetGit = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [viewingFile, setViewingFile] = useState(false);

  const repoOwner = 'bakk20';
  const repoName = 'Proyectos-practicos';

  const fetchContents = async (path = '') => {
    try {
      setError(null);
      setFileContent(null);
      setViewingFile(false);
      const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchFileContent = async (path) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      const content = atob(data.content);
      setFileContent(content);
      setViewingFile(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchContents(currentPath);
  }, [currentPath]);

  const handleFolderClick = (path) => setCurrentPath(path);
  const handleFileClick = (path) => fetchFileContent(path);
  const goBack = () => {
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/'));
  };

  return (
    <div className="get-git">
      <div className="git-header">
        <strong>Ruta:</strong>&nbsp;
        <span className="breadcrumb" onClick={() => setCurrentPath('')}>
          {repoOwner}
        </span>
        <span> / </span>
        <span className="breadcrumb" onClick={() => setCurrentPath('')}>
          {repoName}
        </span>
        {currentPath &&
          currentPath.split('/').map((segment, index, arr) => {
            const fullPath = arr.slice(0, index + 1).join('/');
            const isLast = index === arr.length - 1;
            return (
              <span key={index}>
                <span> / </span>
                {isLast && viewingFile ? (
                  <span className="breadcrumb-active">{segment}</span>
                ) : (
                  <span
                    className="breadcrumb"
                    onClick={() => setCurrentPath(fullPath)}
                  >
                    {segment}
                  </span>
                )}
              </span>
            );
          })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewingFile ? `file-${currentPath}` : `folder-${currentPath}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {/* Botón */}
          {viewingFile ? (
            <motion.button
              className="git-button"
              onClick={() => {
                setViewingFile(false);
                setFileContent(null);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FaArrowLeft /> Cerrar archivo
            </motion.button>
          ) : (
            currentPath && (
              <motion.button
                className="git-button"
                onClick={goBack}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <FaArrowLeft /> Volver
              </motion.button>
            )
          )}

          {/* Contenido */}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {viewingFile && fileContent !== null ? (
            <div className="git-file-view">
              <h3>📄 Viendo archivo: <code>{currentPath}</code></h3>
              {currentPath.endsWith('.md') ? (
                <ReactMarkdown>{fileContent}</ReactMarkdown>
              ) : (
                <pre>{fileContent}</pre>
              )}
            </div>
          ) : (
            <table className="git-table">
              <thead>
                <tr>
                  <th>📄 Ítem</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {files.map((item) => (
                  <tr
                    key={item.path}
                    onClick={() =>
                      item.type === 'dir'
                        ? handleFolderClick(item.path)
                        : handleFileClick(item.path)
                    }
                  >
                    <td>
                      {item.type === 'dir' ? <FaFolder /> : <FaFileAlt />} {item.name}
                    </td>
                    <td>{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
