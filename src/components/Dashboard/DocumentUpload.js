//   src/components/Dashboard/DocumentUpload.js

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8000/api/documents/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Document uploaded successfully!");
        setFile(null);
        setError("");
      } else {
        setError(data.detail || "Failed to upload document");
      }
    } catch (err) {
      setError("Failed to upload document");
    }
  };

  return (
    <div className="document-upload">
      <h3>Upload Document</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn-primary" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}
