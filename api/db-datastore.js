const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'paas' });

const kind = 'registers';

function key(id) {
  return ds.key([kind, id]);
}

// module.exports.list = async () => {
//   // asynchronously get a list of entities with names
//   let [data] = await ds.createQuery(kind).select('name').order('name').run();
//   // extract only the names
//   data = data.map((val) => val.name);
//   return data;
// };

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
  console.log("before entity: ", entity);
  await ds.save(entity);
  console.log("just saved entity: ", entity);
  return val.toString();
};

module.exports.post = async (id, val) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) {
    const entity = {
      key: key(id),
      data: { name: id, val: data.val + val },
    }
    await ds.save(entity);
    return (data.val + val);
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
