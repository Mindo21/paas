const data = {};

module.exports.list = () => {
  return Object.keys(data);
};

module.exports.get = (id) => {
  if (data[id] == null) return '0';
  return `${data[id]}`;
};

module.exports.put = (id, val) => {
  data[id] = val;
  return `${data[id]}`;
};

module.exports.post = (id, val) => {
  if (data[id])
    data[id] = parseInt(data[id]) + parseInt(val);
  else {
    data[id] = '0';
    data[id] = parseInt(data[id]) + parseInt(val);
  }
  return `${data[id]}`;
};

module.exports.delete = (id) => {
  data[id] = null;
};