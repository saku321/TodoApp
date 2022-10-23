import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { React, useState, useEffect } from 'react';
import './main.css';
import axios from 'axios';
import md5 from "md5";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useLocation,Link } from 'react-router-dom';
function Main() {
    const location = useLocation();

    const [user, setUser] = useState(location.state.user);
    const [tickets, setTickets]= useState([]);
    const [alertMessage, setAlertMessage] = useState("");

    const [createTicketStatus, setCreateTicketStatus] = useState(false);

    const [ticketTitle, setTicketTitle] = useState("");
    const [Title, setTitle] = useState("");
    const [rivi1, setRivi1] = useState("");
    const [rivi2, setRivi2] = useState("");
    const [rivi3, setRivi3] = useState("");
    const [rivi4, setRivi4] = useState("");
    const [rivi5, setRivi5] = useState("");

  
    //hakee tiketit databasesta ja jos löytyy niin luo uudet cardit näistä
    const getTickets = () => {
   

        axios.post('http://localhost:3005/getTickets', {
           user: md5(user),
        }).catch(error => {
            setAlertMessage(error);

        }).then(response => {
            if (!response.data.status) {


                setAlertMessage(response.data.msg);

            }
            else {
                setAlertMessage("");

                setTickets(response.data.data);
            }
        });
    }
    useEffect(() => {
        getTickets();
    }, []);
    const createTicket = () => {
        axios.post('http://localhost:3005/createTicket', {
            user: md5(user),
            ticketTitle: ticketTitle,
            Title, Title,
            rivi1: rivi1,
            rivi2: rivi2,
            rivi3: rivi3,
            rivi4: rivi4,
            rivi5: rivi5,

        }).catch(error => {
            setAlertMessage(error);


        }).then(response => {

            if (response.data.data) {

                setAlertMessage("");

                setCreateTicketStatus(false);
                getTickets();
            } else {
                setAlertMessage(response.msg);

            }
            
        });
    }
    const todoDone = (value) => {
        axios.post('http://localhost:3005/todoDone', {
            user: md5(user),
            todoId: value,
        }).catch(err => {
            setAlertMessage(err);
        }).then(response => {

            if (response.data.status) {
                getTickets();
                setAlertMessage("");
            } else {
                setAlertMessage(response.data.msg);
            }
        });
        
    }
  return (
      <div>
          {/*Jos on kirjautunut niin näytä menu*/}
          
              <div id="TodoMenu">
                  <h1>Tervetuloa: {user}</h1>
                <Button variant="success" onClick={() => { setCreateTicketStatus(true); setAlertMessage(""); }}>Luo Tiketti</Button>
                <Button variant="primary" onClick={getTickets}>Hae uudet tiketit</Button>
                <Link to="/">
                  <Button variant="danger">Kirjaudu ulos</Button>
                  </Link>

              </div>
          
         
         
          {alertMessage != "" && (
              <Alert variant="danger" style={{ textAlign:"center" }}>{alertMessage}</Alert>
           )}
              
          {/*Tulostaa kaikki todo listat*/}
      
          <ul id="tikettiCarditUl">

              {tickets && !createTicketStatus && tickets.map((ticket) =>

                  <Card className="tikettiCardit" bg="primary" key={ticket.id}>
                      <Card.Header>
                          {ticket.TodoOtsikko}
                      </Card.Header>

                      <Card.Body>
                          <Card.Title>{ticket.Otsikko}</Card.Title>
                          <Card.Text>{ticket.Rivi1}</Card.Text>
                          <Card.Text>{ticket.Rivi2}</Card.Text>
                          <Card.Text>{ticket.Rivi3}</Card.Text>
                          <Card.Text>{ticket.Rivi4}</Card.Text>
                          <Card.Text>{ticket.Rivi5}</Card.Text>
                          <Button variant="success" style={{ float: "right" }} onClick={() => todoDone(ticket.id)}>✔</Button>
                      </Card.Body>
                  </Card>
              )
              }
          </ul>
          

          {/*Avaa tiketti luonti lomakkeen*/}

          {createTicketStatus && (
              <div id="luoTikettiDiv">
                 

                  <h1 style={{ color: 'white' }}>Luo ToDo tiketti</h1>

                  <form>
                      <Card bg="primary" style={{ width: '20rem', margin: 'auto' }}>
                          <Card.Header>
                              <InputGroup className="mb-3"><InputGroup.Text>Tiketin Otsikko</InputGroup.Text>
                                  <Form.Control aria-label="Otsikko" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setTicketTitle(val.target.value)} />
                              </InputGroup>
                          </Card.Header>

                          <Card.Body>
                              <Card.Text>
                                  <InputGroup className="mb-3"><InputGroup.Text>Otsikko</InputGroup.Text>
                                      <Form.Control aria-label="Otsikko" aria-describedby="inputGroup-sizing-sm" onChange={(val) => setTitle(val.target.value)} />
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

                              <Button variant="danger" onClick={() => { setCreateTicketStatus(false); }}>Peruuta</Button>
                              <Button variant="success" onClick={createTicket}>Luo</Button>
                          </Card.Body>

                      </Card>
                  </form>
              </div>
          )}

        
    </div>
  );
}

export default Main;
