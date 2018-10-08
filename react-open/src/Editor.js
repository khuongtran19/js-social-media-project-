import React from "react";
class Editor extends React.Component {
  state = {
    inputText: ""
  };
  render() {
    return <div>You typed: {this.state.inputText}</div>;
  }
}

export default Editor;
