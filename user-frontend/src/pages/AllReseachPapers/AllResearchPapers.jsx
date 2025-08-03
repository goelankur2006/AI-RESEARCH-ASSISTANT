import React, { useState, useEffect } from "react";
import './AllReseachPapers.css';

const AllResearchPapers = () => {
  const [papers, setPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setPapers(data))
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);

  const categories = ["All", ...new Set(papers.map((p) => p.category || "Uncategorized"))];

  const filteredPapers =
    selectedCategory === "All"
      ? papers
      : papers.filter((paper) => paper.category === selectedCategory);

  return (
    <div className="all-research">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Categories</h3>
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`category-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Paper Cards */}
      <div className="papers-container">
        {filteredPapers.map((paper, index) => (
          <div className="paper-card" key={index}>
            <h3 className="paper-title">{paper.title}</h3>
            <p className="paper-desc">{paper.description}</p>

            {/* Tags */}
            {paper.tags && Array.isArray(paper.tags) && (
              <div className="paper-tags">
                {paper.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="paper-buttons">
              <a
                href={`http://localhost:5000/api/projects/${paper._id}/document`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn view-btn"
              >
                View
              </a>
              <button className="btn contribute-btn">Contribute</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllResearchPapers;
