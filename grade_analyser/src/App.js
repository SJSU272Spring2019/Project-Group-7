

import React, { Component } from 'react';
import './App.css';
import Main from './components/Main/main';
import {BrowserRouter} from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'


//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default DragDropContext(HTML5Backend)(App);

