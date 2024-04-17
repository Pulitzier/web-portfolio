// ProjectForm.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    frontendTech: "",
    backendTech: "",
    designTool: "",
    title: "",
    description: "",
    goal: "",
    domain: "",
    meetingTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email confirmation
      const response = await axios.post("/send-email", formData);
      console.log("Email confirmation response:", response.data);

      // Reset form after submission
      setFormData({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Let's Plan Your Next Project</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="frontendTech">Front-end Technology</InputLabel>
          <Select
            id="frontendTech"
            name="frontendTech"
            value={formData.frontendTech}
            onChange={handleChange}
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Vue.js">Vue.js</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="backendTech">Back-end Technology</InputLabel>
          <Select
            id="backendTech"
            name="backendTech"
            value={formData.backendTech}
            onChange={handleChange}
          >
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="Django">Django</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="designTool">Design Tool</InputLabel>
          <Select
            id="designTool"
            name="designTool"
            value={formData.designTool}
            onChange={handleChange}
          >
            <MenuItem value="Figma">Figma</MenuItem>
            <MenuItem value="Sketch">Sketch</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="goal"
          name="goal"
          label="Goal"
          multiline
          rows={4}
          value={formData.goal}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="domain">Project Domain</InputLabel>
          <Select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          >
            <MenuItem value="E-commerce">E-commerce</MenuItem>
            <MenuItem value="Social Network">Social Network</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          id="meetingTime"
          name="meetingTime"
          label="Meeting Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.meetingTime}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
