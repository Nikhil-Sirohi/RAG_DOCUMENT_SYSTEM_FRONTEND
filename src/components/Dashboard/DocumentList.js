// src/components/Dashboard/DocumentList.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/documents/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDocuments(data);
      } else {
        setError("Failed to fetch documents");
      }
    } catch (err) {
      setError("Failed to fetch documents");
    }
  };

  return (
    <div className="document-list">
      <h3>Your Documents</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="documents-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h4>{doc.filename}</h4>
            <p>ID: {doc.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
