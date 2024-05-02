import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blue = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    const data = async () => {
      const data = await axios.get(`http://localhost:3000/song/songs/${id}`)
      setData(data.data)
    }
    data()
  }, [])
  return (
    <div className=' w-full h-screen p-5'>
      <img src={data.image} alt="" className=' w-full h-[50%] bg-slate-200 rounded object-cover' />
      <p className=' text-[64px]'>{data.artist}</p>
      <p className=' text-[34px]'>{data.song}</p>
      <p className=' text-[20px]'>{data.genre}</p>
    </div>
  )
}

export default Blue