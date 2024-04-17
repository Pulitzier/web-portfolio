// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectForm from "./components/ProjectForm";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ChatBot />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
          <Route path="/project-form" component={ProjectForm} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
