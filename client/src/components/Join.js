import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap'
const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div >
            <NavbarComponent />
            <Container className=" ">
                <Row className="">
                    <Col className=" vh-100 d-flex align-items-center justify-content-center">
                        <Card style={{ width: '25rem' }} className="" >
                            <Card.Body>
                                <Card.Header className="mb-2 text-center"><strong>Join</strong> </Card.Header>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Control type="text" placeholder="Room" onChange={(event) => setRoom(event.target.value)} />
                                    </Form.Group>
                                    <Link to={`/chat?name=${name}&room=${room}`} onClick={event => (!name || !room) ? event.preventDefault() : null}>
                                        <Button variant="success">Sign In</Button>
                                    </Link>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

        </div >

    )
}
export default Join