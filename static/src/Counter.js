import React from 'react';
import client_api from './client_api';
import './Counter.css';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newval: '0',
      autoRefresh: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // run this only once, when the component is created
  componentDidMount() {
    this.refreshCounter();
  }

  // only update if it actually changed, avoiding a few unnecessary rerenders
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.value !== this.props.value || nextState.newval !== this.state.newval);
  }

  // a way to handle changes in input with react
  handleChange(event) {
    this.setState({newval: event.target.value});
  }

  updatePendingCounter = (value) => {
    this.props.updateCounter({ name: this.props.name, value: value + '...' });
  }

  addToCounter = async () => {
    this.updatePendingCounter("adding");
    const newCounter = await client_api.addToCounter(this.props.name, this.state.newval);
    this.props.updateCounter(newCounter);
  }

  setCounter = async () => {
    this.updatePendingCounter("setting");
    const newCounter = await client_api.setCounter(this.props.name, this.state.newval);
    this.props.updateCounter(newCounter);
  }

  deleteCounter = async () => {
    // once it's getting deleted, no need to refresh anymore
    this.setState({ autoRefresh: false }, this.updatePendingCounter("deleting"));
    const deletedCounter = await client_api.deleteCounter(this.props.name);
    this.props.removeCounter(deletedCounter);
  }

  refreshCounter = async () => {
    // continue refreshing while autorefresh is true
    if (this.state.autoRefresh) {
      console.log("refreshing: ", this.props.name);
      const newCounter = await client_api.fetchCounter(this.props.name);
      this.props.updateCounter(newCounter);
      // refresh 1 second after it finished fetching the last time
      setTimeout(this.refreshCounter, 1000);
    }
  }

  render() {
    return (
      <p className="Counter">
        <span className="samewidth">
        Counter <span className="counter_name">{`"${this.props.name}"` || 'error'}</span>: <span className="counter_value">{this.props.value || 'error'}</span>
        </span>
        <input type="number" className="counter_newval" value={this.state.newval} onChange={this.handleChange} />
        <button className="add" onClick={this.addToCounter}>add</button>
        <button className="set" onClick={this.setCounter}>set</button>
        <button className="delete" onClick={this.deleteCounter}>delete</button>
      </p>
    );
  }
}

export default Counter;
