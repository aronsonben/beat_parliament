import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import MHHVotingSystem from './components/MHHVotingSystem';
import SubmitEntryForm from './components/SubmitEntryForm';

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <CssBaseline />
        <header className="topBottomNav App-header">
          Header
          <Link to="/submitEntry">Submit Entry</Link>
        </header>
        <Switch>
          <Route path="/submitEntry">
            <SubmitEntryForm />
          </Route>
          <Route path="/">
            <div className="votingSystem">
              <MHHVotingSystem entries={this.props.entries} />
            </div>
          </Route>
        </Switch>
        <footer className="topBottomNav App-footer">Footer</footer>
      </div>
    )
  }
}

export default App;
