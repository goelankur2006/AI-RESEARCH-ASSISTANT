import React, { useState, useEffect } from "react";
import './AllReseachPapers.css';

const AllResearchPapers = () => {
  const [papers, setPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/papers") // 🔁 Adjust if hosted elsewhere
      .then((res) => res.json())
      .then((data) => setPapers(data))
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);

  const categories = ["All", ...new Set(papers.map((p) => p.category))];

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

      {/* Research Papers Grid */}
      <div className="papers-container">
        {filteredPapers.map((paper, index) => (
          <div className="paper-card" key={index}>
            <h3 className="paper-title">{paper.title}</h3>
            <p className="paper-desc">{paper.description}</p>

            {/* Tags */}
            {paper.tags && (
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
              <button className="btn view-btn">View</button>
              <button className="btn contribute-btn">Contribute</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllResearchPapers;
