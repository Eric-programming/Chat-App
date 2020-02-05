const users = [];

exports.addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  let checkIfUserExistsInSameRoom = false;
  users.forEach(user => {
    if (user.name === name && user.room === room) {
      checkIfUserExistsInSameRoom = true;
    }
  });
  if (checkIfUserExistsInSameRoom) {
    return { error: "Duplicate User!" };
  }
  const user = { id, name, room };
  users.push(user);
  return user;
};

exports.removeUser = id => {
  const index = users.findIndex(e => e.id === id);
  return users.splice(index);
};

exports.getAllUsersFromARoom = room => users.map(user => user.room === room);
exports.getUser = id => users.find(user => user.id === id);
