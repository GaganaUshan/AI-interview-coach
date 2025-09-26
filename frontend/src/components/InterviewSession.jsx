import React, { useEffect, useState } from 'react'
import { fetchQuestions } from '../utils/api'
import { PlayCircle, CheckCircle, XCircle, Mic } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function InterviewSession(){
  const [started,setStarted] = useState(false)
  const [questions,setQuestions] = useState([])
  const [index,setIndex] = useState(0)
  const [answer,setAnswer] = useState('')
  const [submitted,setSubmitted] = useState(false)

  useEffect(()=>{ fetchQuestions().then(qs=>setQuestions(qs)) },[])

  const submit = async ()=>{
    setSubmitted(true)
    toast.success('Answer saved!')
    try{
      await fetch('http://localhost:3001/api/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:questions[index],answer})})
    }catch(e){}
  }

  const next = ()=>{
    setSubmitted(false)
    setAnswer('')
    setIndex(i=>Math.min(i+1,questions.length-1))
  }

  if(!started){
    return <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
      <button className="btn" onClick={()=>setStarted(true)} style={{background:'#2563eb',color:'white'}}><PlayCircle /> Start Interview</button>
      <p style={{color:'#6b7280'}}>Animated & randomized questions using Framer Motion & React libraries.</p>
      <ToastContainer />
    </div>
  }

  const q = questions[index] || {prompt:'No question available'}
  const progressPercent = questions.length? ((index)/questions.length)*100 :0

  return (
    <div className="card">
      <div className="progress mb-2"><div className="progress-bar" style={{width:progressPercent+'%'}}></div></div>
      <AnimatePresence mode="wait">
      <motion.div key={q.id} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{duration:0.4}}>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}><Mic /><strong>Question {index+1}:</strong><div style={{flex:1}}>{q.prompt}</div></div>
        <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here..."/>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:8}}>
          <button className="btn" style={{background:'#16a34a',color:'white'}} onClick={submit}><CheckCircle /> Submit</button>
          <button className="btn" style={{background:'#ef4444',color:'white'}} onClick={next}><XCircle /> Next</button>
        </div>
      </motion.div>
      </AnimatePresence>
      <ToastContainer />
    </div>
  )
}
