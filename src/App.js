import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import MHHVotingSystem from './components/MHHVotingSystem'

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <CssBaseline />
        <header className="topBottomNav App-header">Header</header>
        <div className="votingSystem">
          <MHHVotingSystem entries={this.props.entries} />
        </div>
        <footer className="topBottomNav App-footer">Footer</footer>
      </div>
    )
  }
}

export default App;
