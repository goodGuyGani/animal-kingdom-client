import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Cats() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDogData = async() => {
      try {
        const res = await fetch("https://api.thecatapi.com/v1/breeds")
        const data = await res.json()
        setDogs(data)
      } catch (error) {
        console.error(error)
      }
    }
    setSearched(false)
    fetchDogData()
  }, [])

  const searchForDog = async() => {
    try {
      const res = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${text}`)
        const data = await res.json()
        setDogs(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    searchForDog()
    setSearched(true)
  }

  return (
    <>
    <div style={{height: 70}}></div>
      {!dogs ? (<h1 className='flex items-center justify-center text-slate-800 text-center px-5 text-3xl h-screen font-bold uppercase'>Loading...</h1>
      ) : (<>
        <section className='p-8 max-w-7xl mx-auto'>
          <div className='text-center'>
          <h1 className='flex items-center justify-center text-slate-800 text-center px-5 text-3xl font-bold lg:text-5xl'>Find Kitty</h1>
          <p className='my-8'></p>

          <form onSubmit={handleSubmit} className='max-w-xl mx-auto' autoComplete='off'>
            <input type="text" name='search' id='search' placeholder='Search for Kitty / Breed' 
            className='py-2 px-4 rounded shadow w-full'
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
          </form>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20'>
            {!searched ? dogs.map((dog) => (
              <Link to={`/cats/${dog.name}`} key={dog.id} 
              className='bg-slate-100 p-4 rounded shadow hover:bg-gray-300 transition-all duration-200'>
              <article>
              <img src={`https://cdn2.thecatapi.com/images/${dog.reference_image_id}.jpg`} 
              alt={dog.name} 
              className='rounded md:h-72 w-full object-cover'
              />
                <h3 className='text-lg font-bold mt-4'>{dog.name}</h3>
                <p className='text-slate-700'>Temperament: {dog.temperament}</p>
              </article>
              </Link>
            )) : <>
            {dogs.map((dog) => (
              <Link to={`/cats/${dog.name}`} key={dog.id} 
              className='bg-slate-100 p-4 rounded shadow hover:bg-gray-300 transition-all duration-200'>
              <article>
              <img src={`https://cdn2.thecatapi.com/images/${dog.reference_image_id}.jpg`} 
              alt={dog.name} 
              className='rounded md:h-72 w-full object-cover'
              />
                <h3 className='text-lg font-bold mt-4'>{dog.name}</h3>
                <p className='text-slate-700'>Temperament: {dog.temperament}</p>
              </article>
              </Link>
            ))}
            </>}
          </div>
        </section>
      </>)}
    </>
  )
}

export default Cats