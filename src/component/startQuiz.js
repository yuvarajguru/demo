import React, { useState, useEffect } from "react";
import './style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import HandleQuiz from "./handleQuiz";
function StartQuiz () {
    const navigate = useNavigate();
    const [questionData,setQuestionData] = useState([]);
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleSubmit = () =>{
        if(username && email && startDate != ''){
            localStorage.setItem('Username', username);
            localStorage.setItem('Email',email);
            localStorage.setItem('DOB',startDate);
            handleShow();
        }
        
    }
    const handleClose = () => {
        setShow(false)
        navigate('/startquiz')
    };
    const handleShow = () => setShow(true);
    useEffect(() =>{
        fetch("http://localhost:3030/posts")
        .then((response) => response.json())
        .then((response) => setQuestionData(response))
        .catch((error) => console.log("error", error));
    },[])
    console.log(questionData)
    return (
        <div className="main">
              <div className="form">
                <div className="form-body"> 
                <h2>Add Question</h2>
                            <label className="form__label">UserName</label>
                            <input className="form_input"  style={{paddingLeft:'15px'}}type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} /><br/>
                            <label className="form__label">Email</label>
                            <input className="form_input" style={{paddingLeft:'15px'}} type="email" name="email" onChange={(e) => {setEmail(e.target.value)}} /><br/>
                            <label style={{marginRight: '193px',color:'darkblue',fontSize:20}}>DOB</label>
                            <DatePicker 
                            showIcon 
                            isClearable
                               
                                className="form_input" 
                                selected={startDate} 
                                style={{    marginLeft: '140px',
                                    marginTop: '-8px'}}
                                onChange={(date) => setStartDate(date)} />
                            <button className="submitBtn" onClick={handleSubmit}>Submit</button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Thank you for sharing details</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                
                                </Modal.Footer>
                            </Modal>
                            

                </div>
            </div>         
           
            

        </div>
    )
}

export default StartQuiz;