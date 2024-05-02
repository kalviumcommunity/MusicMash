import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Create } from './Create';
import { Update } from './Update.tsx';
import { set } from 'zod';

const Post = ({ link, image, song, singer, genre, onClick, id }: any) => (
  <div className='flex flex-col border w-fit gap-x-3 p-3 rounded-2xl  z-0'>
    <Link to={link}>
      <img src={image} alt="" className='bg-slate-300 h-44  rounded-2xl object-contain ' />
    </Link>

    <div className='flex items-center justify-between pt-3'>
      <div className='flex-col'>
        <p className='text-[15px]'>{song}</p>
        <div>
          <p className='text-[12px]'>{singer}</p>
          <p className='text-[12px]'>{genre}</p>
        </div>
      </div>
      <button onClick={onClick} className='bg-purple-200 px-3 py-2 rounded-lg text-[12px]'>delete</button>
      <Update id={id} />
    </div>
  </div>
);

const Home = () => {
  const [data, setData] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/song/songs');
        const shuffledata = [...response.data.songs].sort(() => Math.random() - 0.5);
        setData(shuffledata);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchInput]);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/song/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const filteredData = data.filter(song => {
    const searchText = searchInput.toLowerCase();
    return (
      (song.song?.toLowerCase().includes(searchText) || false) ||
      (song.singer?.toLowerCase().includes(searchText) || false) ||
      (song.genre?.toLowerCase().includes(searchText) || false)
    );
  });


  const Navbar = () => {
    return (
      <div className='w-full flex justify-center items-center p-2 gap-x-6 text-[15px] fixed bg-purple-50'>
        <Create />
        <Input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search..." />
      </div>
    );
  };

  return (
    <div className='w-full h-fit p-1'>
      <Navbar />
      <div className='w-full h-full pt-20 flex flex-wrap justify-center gap-y-3 gap-x-3'>
        {filteredData.map(song => (
          <Post key={song._id} link={song._id} image={song.image} song={song.song} singer={song.singer} genre={song.genre} onClick={() => { handleDelete(song._id) }} id={song._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
