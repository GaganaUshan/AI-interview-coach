const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(bodyParser.json())

// questions.json
const qFile = path.join(__dirname,'questions.json')
app.get('/api/questions',(req,res)=>{
  if(fs.existsSync(qFile)){res.json(JSON.parse(fs.readFileSync(qFile,'utf8')))}
  else{res.json({roles:{}})}
})

// save session
const sessionsFile = path.join(__dirname,'sessions.json')
app.post('/api/session',(req,res)=>{
  const entry = {id:Date.now(), timestamp: new Date().toISOString(), payload:req.body}
  let arr = []
  if(fs.existsSync(sessionsFile)){arr=JSON.parse(fs.readFileSync(sessionsFile,'utf8'))}
  arr.push(entry)
  fs.writeFileSync(sessionsFile,JSON.stringify(arr,null,2))
  res.json({ok:true,id:entry.id})
})

app.listen(PORT,()=>console.log('Backend listening on',PORT))
