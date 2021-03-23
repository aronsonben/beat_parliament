import React from 'react';
import '../App.css';
import '../assets/adminDashboard.css';
import MaterialTable from "material-table";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import adminService from '../services/adminService';


class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Lift this entryList state up, most likely
    this.state = {
      entryId: '',
      entryList: []
    };

    this.fetchEntryList = this.fetchEntryList.bind(this);
    this.handleEntryIdChange = this.handleEntryIdChange.bind(this);
    this.addEntryToContest = this.addEntryToContest.bind(this);
  }

  /**
   * TODO: This function is currently run off a button-press. It should eventually be run upon App load and sent down via props
   * (OR saved in Redux global state).
   */
  async fetchEntryList() {
    console.log("-- Trying to fetch entry list --");
    let res = await adminService.fetchEntryList();
    this.setState({entryList: res.data});
    console.log(res);
    console.log(this.state.entryList);
    return res;
  }

  async addEntryToContest(entry) {
    let res = await adminService.addEntryToContest(entry);
    console.log(res);
  }

  handleEntryIdChange(evt) {
    this.setState({entryId: evt.target.value});
  }

  render() {
    return(
      <div className="adminDashboard">
        <h2>Admin Dashboard</h2>
        <button onClick={this.fetchEntryList}>Fetch EntryList</button>
        <div className="adminDash-entryList">
          <h3>Entry List</h3>
          <div style={{ maxWidth: "100%" }}>
          </div>
          {this.state.entryList !== undefined && this.state.entryList.length > 0 ? 
            this.state.entryList.map(entry => 
              <div className="adminDash-entry" key={entry._id}>
                <p>Id: {entry._id}</p>
                <p>Artist: {entry.artist.name}</p>
                <p>Entry Name: {entry.name}</p>
                <p>Date submitted: {entry.date_submitted}</p>
                <Button onClick={() => this.addEntryToContest(entry)} variant="contained" color="primary">Add Entry to Contest</Button>
              </div>
            )
            : null
          }
        </div>
      </div>
    )
  }
}

export default AdminDashboard;
