// src/components/Dashboard/QueryInterface.js

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function QueryInterface() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Query cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const response = await fetch("http://localhost:8000/api/rag/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        if (typeof data.answer === "string") {
          setAnswer(data.answer);
        } else if (Array.isArray(data.answer)) {
          setAnswer(data.answer.join(", "));
        } else {
          setAnswer(JSON.stringify(data.answer, null, 2));
        }
      } else {
        setError(data.detail || "Failed to get an answer.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-interface">
      <h3>Ask Questions About Your Documents</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question..."
            rows="4"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Getting Answer..." : "Ask Question"}
        </button>
      </form>
      {answer && (
        <div className="answer-box">
          <h4>Answer:</h4>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}

/*
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function QueryInterface() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/rag/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging line

      if (response.ok) {
        // Handle different types of response
        if (typeof data.answer === "string") {
          setAnswer(data.answer);
        } else if (Array.isArray(data.answer)) {
          setAnswer(data.answer.join(", "));
        } else {
          setAnswer(JSON.stringify(data.answer, null, 2)); // Convert object to readable JSON
        }
      } else {
        setError(data.detail || "Failed to get answer");
      }
    } catch (err) {
      console.error("Error:", err); // Debugging line
      setError("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-interface">
      <h3>Ask Questions About Your Documents</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question..."
            rows="4"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Getting Answer..." : "Ask Question"}
        </button>
      </form>
      {answer && (
        <div className="answer-box">
          <h4>Answer:</h4>
          <pre>
            {typeof answer === "string"
              ? answer
              : JSON.stringify(answer, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
*/

/*
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function QueryInterface() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/rag/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        if (typeof data.answer === "string") {
          setAnswer(data.answer);
        } else if (Array.isArray(data.answer)) {
          setAnswer(data.answer.join(", "));
        } else {
          setAnswer(JSON.stringify(data.answer, null, 2));
        }
      } else {
        setError(data.detail || "Failed to get answer");
      }
    } catch (err) {
      setError("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-interface">
      <h3>Ask Questions About Your Documents</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question..."
            rows="4"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Getting Answer..." : "Ask Question"}
        </button>
      </form>
      {answer && (
        <div className="answer-box">
          <h4>Answer:</h4>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}
*/
/*import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function QueryInterface() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/rag/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.detail || "Failed to get answer");
      }
    } catch (err) {
      setError("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-interface">
      <h3>Ask Questions About Your Documents</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question..."
            rows="4"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Getting Answer..." : "Ask Question"}
        </button>
      </form>
      {answer && (
        <div className="answer-box">
          <h4>Answer:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
*/
