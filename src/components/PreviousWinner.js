import React from 'react';
import Container from '@material-ui/core/Container';
import '../App.css';

class PreviousWinner extends React.Component {
  
  render() {
    return (
      <Container className="App previousWinner" maxWidth='md' disableGutters={true}>
        <h3 className="bpHeader">Previous Winner</h3>
        <p>tío</p>
      </Container>
    )
  }
}

export default PreviousWinner;
