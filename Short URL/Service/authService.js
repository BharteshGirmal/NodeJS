const sessionIdtoMap = new Map();

const setUser = (id, user) => {
  sessionIdtoMap.set(id, user);
};

const getUser = (id) => {
  return sessionIdtoMap.get(id);
};

module.exports = { setUser, getUser };
