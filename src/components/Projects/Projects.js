// Projects.js
import React from "react";
import projectsData from "../../data/projects.json";
import ProjectItem from "./ProjectItem.js";

function Projects() {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projectsData.map((project) => (
          <ProjectItem />
        ))}
      </ul>
    </div>
  );
}

export default Projects;
