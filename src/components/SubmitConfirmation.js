import React from 'react';
import '../App.css';

class SubmitConfirmation extends React.Component {

  componentDidUpdate() {
    const element = document.getElementById("submit-confirm");

    element.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    return (
      <div id="submit-confirm">
        <div className={this.props.submitted ? "submitConfirmation" : "submitConfirmationEmpty"}>
        <h3>SUBMITTED VOTE</h3>
        <p className="submittedVoteDisplay">{this.props.submittedVote}</p>
        </div>
      </div>
    )
  }
}

export default SubmitConfirmation;
