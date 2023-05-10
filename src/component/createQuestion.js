import React, { useState, useEffect } from "react";
import './style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import HandleQuiz from "./handleQuiz";
import Modal from 'react-bootstrap/Modal';
function CreatQuestion () {
    const navigate = useNavigate();
    const [inputFiled, setInputFiled] = useState([{name:''}]);
    const [answerText,setAnswerText] = useState();
    const [questionText,setQuestionText] = useState();
    const [show, setShow] = useState(false);
    const totalQuestions = 5;
    const perQuestionScore = 5;
    const [posts, setPosts] = useState([]);
    const handleChange = (e,i) =>{
        const { name, value } = e.target;
        const list = [...inputFiled];
        list[i][name] = value;
        setInputFiled(list);
    }
const addfiled = () =>{
    console.log("hit")
    
    setInputFiled([...inputFiled,{
        name:''
    }])
}



const removefiled = (i) =>{
    let data = [...inputFiled];
    data.splice(i)
    setInputFiled(data);
}
console.log(questionText);

const data={questionText,inputFiled,answerText,totalQuestions,perQuestionScore}
const onClick = () =>{
    if(posts == '' ){
        alert("please fill details")
    }
    else{
        navigate('/quiz')
    }
}
const handleSubmit = () =>{
    const init = {name : ''};
    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
       
      };
      if(questionText&&inputFiled&&answerText != ''){ 
    fetch("http://localhost:3030/posts", requestOptions)
    .then((response) => response.json())
     .then((result) => setPosts(result))
    .catch((error) => console.log("error", error));
    
   
}

}


    return (
        <div className="question-header">
            
            
           
                    
                    <div className="form-body">  
                    <div style={{flexDirection:'column'}}>
                    <h2>Add Question</h2>
                    <button className="regBtn" onClick={onClick}>Resgister Now</button> 
                    </div>
                    
                        <Form>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={4}  onChange={(e) => setQuestionText(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {inputFiled.map((item,i) => (
                                <div style={{flexDirection:'column'}}>
                                    <label>Options{i+1}</label> <hr/>
                                <input
                                className="inputText1"  
                                    name='name'
                                    placeholder='name'
                                    value={item.name}
                                    onChange={(e) => handleChange(e,i)}
                                />
                                <button className="removeBtn" onClick={() => removefiled(i)}>x</button>
                                </div>
                            ) )}
                      
                        <Button style={{  background: 'linear-gradient(90.04deg, #800080 0.03%, #ffc0cb 99.96%', borderRadius: '20px',margin: '9px' }}  onClick={addfiled}>Add more</Button><br/>
                        <hr/>
                        <label>Answer:</label> 
                        <input
                                    className="inputText"    
                                    name='name'
                                    placeholder='answer'
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                /> <br/>
                        <Button style={{  background: 'linear-gradient(90.04deg, #800080 0.03%, #ffc0cb 99.96%',borderRadius: '20px',margin: '9px' }} onClick={handleSubmit}>Submit</Button><br/>
                       
                         

                        </Form.Group>
                        </Form>
                        </div>
                    
            
        </div>
    )
}

export default CreatQuestion;