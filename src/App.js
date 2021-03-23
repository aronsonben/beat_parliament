import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import VotingSystem from './components/VotingSystem';
import SubmitEntryForm from './components/SubmitEntryForm';
import AdminDashboard from './components/AdminDashboard';

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <CssBaseline />
        <header className="topBottomNav App-header">
          Header
          <Link to="/">home</Link>
          <Link to="/submitEntry">Submit Entry</Link>
          <Link to="/adminDashboard">Admin</Link>
        </header>
        <Switch>
          <Route path="/adminDashboard">
            <AdminDashboard />
          </Route>
          <Route path="/submitEntry">
            <SubmitEntryForm />
          </Route>
          <Route path="/">
            <div className="votingSystem">
              <VotingSystem entries={this.props.entries} />
            </div>
          </Route>
        </Switch>
        <footer className="topBottomNav App-footer">Footer</footer>
      </div>
    )
  }
}

export default App;
