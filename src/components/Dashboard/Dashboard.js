// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DocumentList from "./DocumentList";
import DocumentUpload from "./DocumentUpload";
import QueryInterface from "./QueryInterface";

export default function Dashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">RAG System</div>
        <div className="nav-items">
          <button
            className={`nav-item ${activeTab === "documents" ? "active" : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button
            className={`nav-item ${activeTab === "query" ? "active" : ""}`}
            onClick={() => setActiveTab("query")}
          >
            Query
          </button>
          <button className="nav-item" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <main className="dashboard-content">
        {activeTab === "documents" ? (
          <div>
            <DocumentUpload />
            <DocumentList />
          </div>
        ) : (
          <QueryInterface />
        )}
      </main>
    </div>
  );
}
