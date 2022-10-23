import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { React, useState, useEffect } from 'react';
import './main.css';
import axios from 'axios';
import md5 from "md5";
import LataaTiketit from "./lataaTiketit";
export default function LuoTiketti(props) {

    const [ToDoOtsikko, setToDoOtsikko] = useState("");
    const [status, setStatus] = useState(false);


    const [Otsikko, setOtsikko] = useState("");
    const [rivi1, setRivi1] = useState("");
    const [rivi2, setRivi2] = useState("");
    const [rivi3, setRivi3] = useState("");
    const [rivi4, setRivi4] = useState("");
    const [rivi5, setRivi5] = useState("");
  
    const luoTiketti = () => {
        axios.post('http://localhost:3005/luoTiketti', {
            tunnus: md5(props.tunnus),
            ToDoOtsikko: ToDoOtsikko,
            Otsikko,Otsikko,
            rivi1: rivi1,
            rivi2: rivi2,
            rivi3: rivi3,
            rivi4: rivi4,
            rivi5: rivi5,

        }).catch(error => {
            // setAlertMessage(error);

        }).then(response => {
            if (response.data.data) {
             
                console.log(props.tunnus);
               
                setStatus(true);
            }

        });
    }
 

    return (
        <div>

            {!status && (
                <div id="luoTikettiDiv">
                    <LataaTiketit tunnus={md5(props.tunnus)} />

                    <h1 style={{ color: 'white' }}>Luo Todo tiketti</h1>

                    <form>
                        <Card bg="primary" style={{ width: '20rem', margin: 'auto' }}>
                            <Card.Header>
                                <InputGroup className="mb-3"><InputGroup.Text>Tiketin Otsikko</InputGroup.Text>
                                    <Form.Control aria-label="Otsikko" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setToDoOtsikko(val.target.value)} />
                                </InputGroup>
                            </Card.Header>

                            <Card.Body>
                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Otsikko</InputGroup.Text>
                                        <Form.Control aria-label="Otsikko" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setOtsikko(val.target.value)} />
                                    </InputGroup>
                                </Card.Text>

                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Rivi 1</InputGroup.Text>
                                        <Form.Control aria-label="Rivi 1" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setRivi1(val.target.value)} />
                                    </InputGroup>
                                </Card.Text>

                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Rivi 2</InputGroup.Text>
                                        <Form.Control aria-label="Rivi 2" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setRivi2(val.target.value)} />
                                    </InputGroup>

                                </Card.Text>
                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Rivi 3</InputGroup.Text>
                                        <Form.Control aria-label="Rivi 3" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setRivi3(val.target.value)} />
                                    </InputGroup>
                                </Card.Text>

                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Rivi 4</InputGroup.Text>
                                        <Form.Control aria-label="Rivi 4" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setRivi4(val.target.value)} />
                                    </InputGroup>
                                </Card.Text>

                                <Card.Text>
                                    <InputGroup className="mb-3"><InputGroup.Text>Rivi 5</InputGroup.Text>
                                        <Form.Control aria-label="Rivi 5" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setRivi5(val.target.value)} />
                                    </InputGroup>
                                </Card.Text>

                                <Button variant="danger">Peruuta</Button>
                                <Button variant="success" onClick={luoTiketti}>Luo</Button>
                            </Card.Body>

                        </Card>
                    </form>
                </div>
            )}
         </div>
        
    );
}