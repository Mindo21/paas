// const apiURL = 'https://paas-dot-sse2020-297213.ew.r.appspot.com/api/';
const apiURL = '/api/';

function jsonCounter(name, value) {
  return { name, value };
}

async function handleResponse(id, fetchOptions) {
  try {
    const response = await fetch(apiURL + encodeURIComponent(id), fetchOptions);
    if (response.ok) {
      // if it doesn't return any value, just return the value of '0'
      const value = await response.text() || '0';
      return jsonCounter(id, value);
    } else {
      console.log(response);
      return jsonCounter(id, 'ERROR');
    }
  } catch (e) {
    console.log(e);
    return jsonCounter(id, 'ERROR');
  }
}

const client_api = {
  fetchCounter: async (id) => {
    return await handleResponse(id);
  },

  addToCounter: async (id, newval) => {
    return await handleResponse(id, { method: 'POST', body: newval });
  },

  setCounter: async (id, newval) => {
    return await handleResponse(id, { method: 'PUT', body: newval });
  },

  deleteCounter: async (id) => {
    return await handleResponse(id, { method: 'DELETE' });
  }
}

export default client_api;