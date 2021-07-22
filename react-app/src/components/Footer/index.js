import React from 'react'
import {Navbar} from 'react-bootstrap'
export default function Footer(){
    return (
        <Navbar fixed='bottom' className='footer' style={{justifyContent:'flex-end'}}>
            <a href='https://www.linkedin.com/in/kevin-tran-059926124/'><button className='footer-item'>LinkedIn</button></a>
            <a href='https://github.com/kevin-tran12'><button className='footer-item'>Github</button></a>
            <a href='https://github.com/kevin-tran12/friend-up'><button className='footer-item'>Repo</button></a>
        </Navbar>
    )
}