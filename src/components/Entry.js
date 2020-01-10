import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EntryInfo from './EntryInfo';
import '../App.css';
import '../assets/Entry.css';

/* According to the Material UI docs ("Customizing Components") the only way that I can 
  customize Material UI components without using Hooks is to use this method. */
const StyledFCL = withStyles({
  root: {
    'cursor': 'pointer',
    'display': 'inline-block',
    'float': 'left',
    'width': '100%',
    'align-items': 'center',
    'margin-left': '0',
    'margin-right': '0',
    'vertical-align': 'middle',
    '-webkit-tap-highlight-color': 'transparent'
  }
})(FormControlLabel)

const StyledRadio = withStyles({
  root: {
    'display': 'none'
  }
})(Radio)

class Entry extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectedVoteChange = this.handleSelectedVoteChange.bind(this);
  }

  handleSelectedVoteChange(e) {
    console.log(e.target.value)
    this.props.handleSelectedVoteChange(e.target.value)
  }
  
  render() {
    let inputValue = this.props.entry.artist + " - " + this.props.entry.track;
    let checked = this.props.selectedVote===inputValue;
    let checkedAndSubmitted = checked && this.props.submitted;
    return (
      <div>
        <StyledFCL
          name="entry"
          value={inputValue}
          checked={checked}
          className={
            checkedAndSubmitted ? "entry entryCheckedSubmitted" : 
            (checked ? "entry entryChecked" : 
            (this.props.submitted ? "entry entryNotCheckedAndSubmitted" : "entry"))
          }
          control={<StyledRadio checkedIcon={<CheckCircleIcon style={{color: '#282c34'}}/>} />}
          label={<EntryInfo entry={this.props.entry} chkd={checked} sbmt={this.props.submitted}/>}
          disabled={this.props.submitted}
          onChange={this.handleSelectedVoteChange}
          labelPlacement="start"
        />
      </div>
    )
  }
}

export default Entry;
