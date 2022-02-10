import React, { useState, useEffect } from "react";
import queryString from "query-string"
import io from "socket.io-client"
import { useLocation } from 'react-router-dom';
import { Container, Card, Col, Row, Form } from 'react-bootstrap'
import NavbarComponent from './NavbarComponent';
import InfoBar from './InfoBar'
import './Chat.css'

let socket;
const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
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

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    //function sending messages
    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages);
    return (
        <div>
            <NavbarComponent />
            <Container className=" ">
                <Row className="">
                    <Col className=" vh-100 d-flex align-items-center justify-content-center">
                        <Card style={{ width: '25rem' }}
                            className="" >

                            <Card.Body>
                                <Card.Header className="mb-2 text-center"><strong>Chat</strong> </Card.Header>
                                <div className="outerContainer">
                                    <div className="discountainer">
                                        <InfoBar room={room} name={name} />
                                    </div>
                                </div>

                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            value={message}
                                            type="text" placeholder="message" onChange={(event) => setMessage(event.target.value)}
                                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                                        />
                                    </Form.Group>



                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}
export default Chat