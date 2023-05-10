import React, { useEffect, useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

function HandleQuiz (){
    const navigate = useNavigate();
    const questions = [
        {
          text: "What is the capital of America?",
          options: [
            { id: 0, text: "New York City", isCorrect: false },
            { id: 1, text: "Boston", isCorrect: false },
            { id: 2, text: "Santa Fe", isCorrect: false },
            { id: 3, text: "Washington DC", isCorrect: true },
          ],
        },
        {
          text: "What year was the Constitution of America written?",
          options: [
            { id: 0, text: "1787", isCorrect: true },
            { id: 1, text: "1776", isCorrect: false },
            { id: 2, text: "1774", isCorrect: false },
            { id: 3, text: "1826", isCorrect: false },
          ],
        },
    ]
    const [questionData,setQuestionData] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnwser] = useState()
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      })
// console.log('loggled')
console.log("loggled", questionData)
   
   const handleClick = () =>{
    fetch("http://localhost:3030/posts")
    .then((response) => response.json())
    .then((response) => setQuestionData(response))
    .catch((error) => console.log("error", error));
   }
   const answer = questionData[activeQuestion]?.answerText
   const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questionData.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }
    
  const onAnswerSelected = (item1, index) => {
    setSelectedAnswerIndex(index)
    console.log(answer)
    console.log(item1.name)
if(item1.name === answer){
    setSelectedAnwser(true)
    console.log('crt')
}
    else{
        setSelectedAnwser(false)
        console.log("wrg")
    }
   
    
  }
   
     console.log(selectedAnswerIndex);
// const {questionText,inputFiled} = questionData[activeQuestion]
const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
return (
    <div className="quiz-container">
       {!showResult ? ( 
       <div> 
 <h1>Question 1</h1>
 <div>
     <span className="active-question-no">
       {addLeadingZero(activeQuestion + 1)}
     </span>
     <span className="total-question">
       /{addLeadingZero(questionData.length)}
     </span>
   </div>
 <button onClick={handleClick} className="quizBtn">start quiz</button>
<h1>{questionData[activeQuestion]?.questionText}</h1>

{/* <p>{result1.questionText}</p> */}
  <ul>
     {questionData[activeQuestion]?.inputFiled.map((item,index) => ( 
         <li 
         onClick={() => onAnswerSelected(item, index)}
        
         className={
           selectedAnswerIndex === index ? 'selected-answer' : null
         }>{item.name}</li>
     ))}
     
 </ul> 

 <button 
 onClick={onClickNext} 
 className="quizBtn" 
 disabled={selectedAnswerIndex === null} 
 style={{marginLeft:'15rem'}}>{activeQuestion === questionData.length - 1 ? 'Finish' : 'Next'}</button>

 </div>
       ) : ( 
        <div className="result">
        <h3>Result</h3>
        <p>
          Total Question: <span>{questionData.length}</span>
        </p>
        <p>
          Total Score:<span> {result.score}</span>
        </p>
        <p>
          Correct Answers:<span> {result.correctAnswers}</span>
        </p>
        <p>
          Wrong Answers:<span> {result.wrongAnswers}</span>
        </p>
        <button className="regBtn" onClick={() => navigate('./Result')}>Result</button> 
      </div>

       )}
       
       
    
    </div>
)

}

export default HandleQuiz;