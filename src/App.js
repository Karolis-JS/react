import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    link
} from "react-router-dom";

import React, {useState, useEffect} from "react"
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>This is home page</div>
                </Route>

                <Route path="/upload">
                    <Upload/>
                </Route>
            </Switch>

        </Router>
    </div>
  );
}

export default App;
