import Button from 'react-bootstrap/Button';
import { React, useState } from 'react';
import { Link } from "react-router-dom";
import './main.css';


export default function Login() {
    const [tunnus, setTunnus] = useState("");

    const handleTunnus = (input) => {
        setTunnus(input.target.value);
    }
  
    
    return (
        <div>
            <div id="loginDiv">
            <form>
               
                <input autoComplete="off" placeholder="Tunnus" id="tunnusInput" onChange={handleTunnus} />
                <br></br>
                <br></br>
                <Link to="/Main" state={{user:tunnus}}>
                    <Button variant="primary" id="formBtn">Hae tiketit</Button>
                </Link>
            </form>
          
        </div>
        </div>
    
        );
}