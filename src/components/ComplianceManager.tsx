import React, { useState } from "react";
import "../App.css";

const ComplianceManager: React.FC = () => {
  // These will be used later to hold data from our API
  const [parties, setParties] = useState([
    { id: "1", name: "Bangladesh Awami League" },
  ]);
  const [clauses, setClauses] = useState([
    { id: "c1", title: "Clause 1: Anti-Corruption Pledge" },
  ]);

  return (
    <div>
      <h3>Manage Party Compliance</h3>
      <div className="compliance-form">
        <div className="form-group">
          <label htmlFor="party-select">Select Political Party</label>
          <select id="party-select">
            {parties.map((party) => (
              <option key={party.id} value={party.id}>
                {party.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="clause-select">Select Charter Clause</label>
          <select id="clause-select">
            {clauses.map((clause) => (
              <option key={clause.id} value={clause.id}>
                {clause.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status-select">Set Compliance Status</label>
          <select id="status-select">
            <option>COMPLIANT</option>
            <option>NON_COMPLIANT</option>
            <option>PARTIALLY_COMPLIANT</option>
            <option>UNDER_REVIEW</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="evidence-link">Evidence Link (URL)</label>
          <input
            type="text"
            id="evidence-link"
            placeholder="http://example.com/evidence.pdf"
          />
        </div>

        <button className="login-button">Save Compliance Record</button>
      </div>
    </div>
  );
};

export default ComplianceManager;
