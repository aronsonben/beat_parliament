import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import Entry from './Entry'

const SpacedButton = withStyles({
  root: {
    'margin': '10px 24px',
    'padding': '10px 0'
  }
})(Button)

class VotingForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleVoteSubmit = this.handleVoteSubmit.bind(this)
  }

  handleVoteSubmit(evt) {
    evt.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    let rows = [];

    this.props.entries.forEach((entry) => {
      let key = entry.artist + "-" + entry.track;
      // Can do filtering logic here later
      rows.push(
        <Entry
          key={key}
          entry={entry}
          submitted={this.props.submitted}
          selectedVote={this.props.selectedVote}
          handleSelectedVoteChange={this.props.handleSelectedVoteChange} />
      )
    });

    return (
      <Container className="App votingFormContainer" maxWidth='md' disableGutters={true}>
        <form className="App" onSubmit={this.handleVoteSubmit}>
          <FormControl className="votingFormControl" fullWidth={true}>
            <h2 className="voteLabel bpHeader">Vote</h2>
            <RadioGroup 
              aria-label="entry" 
              name="entryGroup" 
              className="votingRadios"
              children={rows} />
            <SpacedButton 
              type="submit" 
              color="primary" 
              variant="contained" 
              disabled={this.props.selectedVote === '' || this.props.submitted}>Submit
            </SpacedButton>
          </FormControl>
        </form>
      </Container>
    )
  }
}

export default VotingForm;
