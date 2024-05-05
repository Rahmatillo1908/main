import { useEffect, useState } from "react"

const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("https://for-it-center-system.000webhostapp.com/models/display.php")
      .then(res => res.json())
      .then(res => { console.log(res); setData(res) })
  }, [])
  return (
    <div>
      {data.map(item =>
        <div>
          <h1>{item.guruh}</h1>
          <p>{item.surname}</p>
          <p>{item.name}</p>
          <p>{item.teacher}</p>
        </div>
      )}
    </div>
  )
}

export default Home