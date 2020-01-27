import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import votingService from '../services/votingService';

class SubmitEntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entryArtist: '',
      entryTrack: '',
      entryLink: '',
      entryLinkError: false
    };

    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleEntrySubmission = this.handleEntrySubmission.bind(this);
  }

  async handleEntrySubmission(evt) {
    evt.preventDefault();
    let entryObj = {
      "artist": this.state.entryArtist,
      "track": this.state.entryTrack,
      "link": this.state.entryLink
    };
    let res = await votingService.submitEntry(entryObj);
    console.log(res);
  }

  handleArtistChange(evt) {
    this.setState({entryArtist: evt.target.value});
  }

  handleTrackChange(evt) {
    this.setState({entryTrack: evt.target.value});
  }

  handleLinkChange(evt) {
    this.setState({entryLink: evt.target.value});
    if(this.state.entryLink !== "" && !this.state.entryLink.includes("soundcloud.com")) {
      this.setState({entryLinkError: true});
    } else if(this.state.entryLink.includes("soundcloud.com")) {
      this.setState({entryLinkError: false})
    }
  }

  render() {
    return(
      <div>
        <h2>Submit Entry</h2>
        <form className="App" onSubmit={this.handleEntrySubmission}>
          <FormControl className="entrySubmissionControl" fullWidth={false}>
            <label htmlFor="artist">Artist</label>
            <TextField required name="artist" label="Artist" value={this.state.entryArtist} 
              onChange={this.handleArtistChange} variant="outlined" />
            <label htmlFor="artist">Track</label>
            <TextField required label="Track" value={this.state.entryTrack} 
              onChange={this.handleTrackChange} variant="outlined" />
            <label htmlFor="artist">Link</label>
            <TextField required label="Link" value={this.state.entrylink} 
              onChange={this.handleLinkChange} variant="outlined" 
              helperText="Must be a SoundCloud link" error={this.state.entryLinkError} />
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
        <button onClick={() => console.log(this.state)}>print state</button>
      </div>
    )
  }
}

export default SubmitEntryForm;
