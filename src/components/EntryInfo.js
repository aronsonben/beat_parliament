import React from 'react';
import ReactPlayer from 'react-player'
import Grid from '@material-ui/core/Grid';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../App.css';
import '../assets/Entry.css';


class EntryInfo extends React.Component {

  render() {
    let artist = this.props.entry.artist
    let track = this.props.entry.track;
    let embed = this.props.entry.embed;
    return (
      <div className="entryInfo">
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <span><b>{artist}</b> - {track}</span><br/>
            <ReactPlayer 
                url={embed}
                width="auto"
                height="auto"
            />
          </Grid>
          <Grid item xs={3}>
            <span className="voteMePanel">
              {!this.props.chkd ? 
                  <RadioButtonUncheckedOutlinedIcon 
                    style={!this.props.sbmt ? {color: '#282c34'} : {color: '#777777'}} />
                  :
                  <CheckCircleIcon 
                    style={{color: '#282c34'}} />
              }
            </span>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default EntryInfo;
