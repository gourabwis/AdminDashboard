import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:4000/')
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <div>
      <h1>Home</h1>
    {console.log(data)}
    </div>
  )
}

export default Home