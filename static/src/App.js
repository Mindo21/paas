import React from 'react';
import './App.css';
import AddNewCounter from './AddNewCounter';
import CounterList from './CounterList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counters: []
    };
  }

  render(){
    const updateCounter = (newCounter) => {
      // find the index of the existing counter in the array
      const existingCounterIndex = this.state.counters.findIndex(counter => counter.name === newCounter.name);
      // if the index is not -1 then there already is a counter with that name,
      // so just refresh that counter
      if (existingCounterIndex !== -1) {
        const counters = this.state.counters;
        // replace that counter with the new one
        counters.splice(existingCounterIndex, 1, newCounter);
        this.setState({ counters });
      }
      // if the index is -1 then it's a new counter
      else {
        // add the counter to the array
        const counters = this.state.counters.concat(newCounter);
        this.setState({ counters });
      }
    }

    const removeCounter = (deletedCounter) => {
      // find the index of the existing counter in the array
      const existingCounterIndex = this.state.counters.findIndex(counter => counter.name === deletedCounter.name);
      // check if there is such counter in the array
      if (existingCounterIndex !== -1) {
        const counters = this.state.counters;
        // delete that counter
        counters.splice(existingCounterIndex, 1);
        this.setState({ counters });
      }
    }

    return (
      <div className="App">
        <AddNewCounter addNewCounter={updateCounter}/>
        <CounterList counters={this.state.counters} updateCounter={updateCounter} removeCounter={removeCounter}/>
      </div>
    );
  }
}

export default App;