import React, { useState, useEffect } from "react";
import queryString from "query-string"
import io from "socket.io-client"
import { useLocation } from 'react-router-dom';
let socket;

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    let { search } = useLocation()
    const endPoint = "localhost:5000"
    useEffect(() => {
        const { name, room } = queryString.parse(search)

        socket = io(endPoint)
        setName(name)
        setRoom(room)

        //socket emit harus sama dengan yang di backend
        socket.emit('join', { name, room }, () => {

        })

        //disconnect socket
        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [endPoint, search])//panggil useEffect jika terjadi perubahan pada param array[endpoint,search]
    return (
        <h1>Chat</h1>
    )
}
export default Chat