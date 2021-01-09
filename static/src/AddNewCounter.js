import './AddNewCounter.css';
import client_api from './client_api';

function AddNewCounter(props) {
  const addNewCounter = async () => {
    // if the countername is not valid, focus the input and don't do anything
    if (!window.add_name.validity.valid || window.add_name.value.trim() === '') {
      window.add_name.focus();
      return;
    }
    // set the counters value to "loading", while waiting for the response
    props.addNewCounter({ name: window.add_name.value, value: "loading..." });
    // fetch the counter from client_api
    const newCounter = await client_api.fetchCounter(window.add_name.value);
    props.addNewCounter(newCounter);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewCounter();
    }
  }

  return (
    <div className="AddNewCounter">
      <p>Add counter:
        <input autoFocus id="add_name" title="only accepts digits and letters a-z"
          pattern="[a-zA-Z0-9_]+" placeholder="enter name" onKeyDown={handleKeyDown} />
        <button id="add_btn" onClick={addNewCounter}>add</button>
      </p>
    </div>
  );
}

export default AddNewCounter;
