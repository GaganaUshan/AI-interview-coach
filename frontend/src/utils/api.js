export async function fetchQuestions(){
  const res = await fetch('http://localhost:3001/api/questions')
  const data = await res.json()
  let allQuestions = []
  const roles = data.roles || {}
  Object.values(roles).forEach(role => {
    Object.values(role).forEach(arr => {
      allQuestions.push(...arr)
    })
  })
  return allQuestions.sort(()=>Math.random()-0.5) // shuffle randomly
}
