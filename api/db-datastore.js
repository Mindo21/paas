// Get the gcloud Datastore with namespace 'paas'
const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore({ namespace: 'paas' });

// Let's name the entity kind as 'registers'
const kind = 'registers';
function key(id) {
  return ds.key([kind, id]);
}

// GET by id
module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  // return the value, if not found then return 0 as string
  if (data && data.val) return data.val;
  return '0';
};

// PUT - create a new entity and save/rewrite it
module.exports.put = async (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return val;
};

// POST
module.exports.post = async (id, val) => {
  // get by id
  const [data] = await ds.get(key(id));
  if (data && data.val) {
    // if found then add the new value and rewrite the register,
    // then return the new value
    const newVal = (parseInt(data.val) + parseInt(val)).toString();
    const entity = {
      key: key(id),
      data: { name: id, val: newVal },
    }
    await ds.save(entity);
    return newVal;
  } else {
    // if not found then create a new entity with the value from parameter
    const entity = {
      key: key(id),
      data: { name: id, val },
    }
    await ds.save(entity);
    return val;
  }
};

// DELETE
module.exports.delete = async (id) => {
  // delete the entity
  await ds.delete(key(id));
};
