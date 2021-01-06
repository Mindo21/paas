const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'paas' });

const kind = 'registers';

function key(id) {
  return ds.key([kind, id]);
}

module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return data.val;
  return '0';
};

module.exports.put = async (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return val;
};

module.exports.post = async (id, val) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) {
    const newVal = (parseInt(data.val) + parseInt(val)).toString();
    const entity = {
      key: key(id),
      data: { name: id, val: newVal },
    }
    await ds.save(entity);
    return newVal;
  } else {
    const entity = {
      key: key(id),
      data: { name: id, val },
    }
    await ds.save(entity);
    return val;
  }
};

module.exports.delete = async (id) => {
  // asynchronously delete the entity
  await ds.delete(key(id));
};
