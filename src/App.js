import React, { Component } from "react";
import NameTagList from "./NameTagList.js";
import UserInput from "./UserInput.js";

class App extends Component {
  state = {
    names: []
  };
  //spread syntax
  addName = name => {
    var newNames = [name, ...this.state.names];
    this.setState({ names: newNames });
  };

  removeName = clickedIndex => {
    //.filter method
    var filterCallback = (_, index) => index !== clickedIndex;
    var newNames = this.state.names.filter(filterCallback);
    this.setState({ names: newNames });
  };
  /* Below I'm using the browser's local storage with
    the updateComponent and componentDidMount lifecycle methods that
    makes sure the user's data is saved across different sessions of the app! */
  componentDidMount() {
    var savedNamesString = localStorage.getItem("savedNames");
    if (savedNamesString) {
      var savedNames = JSON.parse(savedNamesString);
      this.setState({ names: savedNames });
    }
  }
  componentDidUpdate() {
    var savedNamesString = JSON.stringify(this.state.names);
    localStorage.setItem("savedNames", savedNamesString);
  }

  render() {
    return (
      <div className="App">
        <h1>Name Tag Generator</h1>
        <UserInput addName={this.addName} />
        <NameTagList names={this.state.names} removeName={this.removeName} />
      </div>
    );
  }
}

export default App;
