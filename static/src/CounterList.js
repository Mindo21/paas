import Counter from './Counter';
import './CounterList.css';

function CounterList(props) {
  const counters = props.counters.map((counter) =>
    <li key={counter.name}>
      <Counter
        name={counter.name}
        value={counter.value}
        updateCounter={props.updateCounter}
        removeCounter={props.removeCounter}
      />
    </li>
  );
  return (
    <ul>{counters}</ul>
  );
}

export default CounterList;
