const users = []
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.name === name && user.room === room)
    if (existingUser) {
        return { error: 'User already exists' }
    }
    const user = { id, name, room }
    users.push(user)
    return { user }//return last user input
}
const getUser = (id) => {
    return users.find((user) => user.id === id)
}
const removeUser = () => {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

}
const getUserInRoom = (room) => {
    return users.filter(user => user.room === room)
}
module.exports = { getUserInRoom, getUser, removeUser, addUser }