import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import '../App.css';
import PreviousWinner from './PreviousWinner'
import VotingForm from './VotingForm'
import SubmitConfirmation from './SubmitConfirmation';
import votingService from '../services/votingService';

class MHHVotingSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVote: '',
      submittedVote: '',
      submitted: false
    };

    this.handleSelectedVoteChange = this.handleSelectedVoteChange.bind(this);
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      selectedVote: '',
      submittedVote: '',
      submitted: false
    });
    console.log("reset state")
  }

  handleSelectedVoteChange(entry) {
    this.setState({
      selectedVote: entry
    });
  }

  async handleVoteSubmit() {
    if(this.state.selectedVote === '') {
      console.log("Must select entry to vote")
      // Eventually set something to true in order to render failed form submit
    } else {
      this.setState({
        submittedVote: this.state.selectedVote,
        submitted: true
      });
    }
    let res = await votingService.submitVote();
    console.log(res);
  }



  render() {
    return (
      <Box className="App mhhVotingSystem">
        <Container maxWidth='md'>
          <div>
            <PreviousWinner/>
          </div>
          <div className="voteForm">
            <VotingForm 
              entries={this.props.entries} 
              submitted={this.state.submitted}
              selectedVote={this.state.selectedVote}
              handleSelectedVoteChange={this.handleSelectedVoteChange}
              handleSubmit={this.handleVoteSubmit}
            />
          </div>
          <button onClick={() => console.log(this.state)}>Print state</button>
          <button onClick={this.resetState}>Reset state</button>
          <SubmitConfirmation
            submittedVote={this.state.submittedVote}
            submitted={this.state.submitted}
          />
        </Container>
      </Box>
    )
  }
}

export default MHHVotingSystem;
