import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function SingleDog() {
  const [dog, setDog] = useState([])
  const {name} = useParams()

  useEffect(() => {
    const fetchSingleDogData = async() => {
      try {
        const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        const data = await res.json()
        setDog(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSingleDogData()
  }, [name])

  return (
    <>
    <div style={{height: 100}}></div>
      <section className='max-w-5xl mx-auto flex items-center justify-center h-screen'>
        {dog.map((item) => (
          <div key={item.id} className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
            <article>
              <img src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg` } 
              alt={item.name} 
              />
              
              
            </article>
            <article>
              <h1 className='text-3xl font-bold mb-8 lg:text-5xl'>{item.name}</h1>
              {item.description && <p className='text-slate-700 mb-8 text-sm lg:text-base leading-loose lg:leading-relax'>{item.description}</p>}
              <ul className='text-sm text-slate-700 leading-loose lg:text-base lg:leading-relax'>
                <li><span className="font-bold">Bred for:</span> {item.bred_for}</li>
                <li><span className="font-bold">Height:</span> {item.height.metric} cm</li>
                <li><span className="font-bold">Weight:</span> {item.weight.metric} kgs</li>
                <li><span className="font-bold">Breed Group:</span> {item.breed_group}</li>
                <li><span className="font-bold">Lifespan:</span> {item.life_span}</li>
                <li><span className="font-bold">Temperament:</span> {item.temperament}</li>
              </ul>

              <Link to="/dogs" className='inline-block bg-slate-400 py-2 px-6 rounded mt-8 hover:bg-slate-500 
              transistion-all duration-200'>&larr; Back</Link>
            </article>
          </div>
        ))}
      </section>
    </>
  )
}

export default SingleDog