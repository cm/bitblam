import React, { useState } from 'react'

const Home = () => {
  const [magnet, setMagnet] = useState('')

  handleChange = e => setMagnet(e.target.value)

  handleSubmit = e => {
    
  }
  
  return (
    <main className='home'>
      <div className='home__center'>
        <form onSubmit={handleSubmit}>
          <label for='magnet'>Magent Link:</label>
          <input id='magnet' type='text' value={magnet} onChange={handleChange} />
          <button type='submit'>Stream Now</button>
        </form>
      </div>
    </main>
  )
}

export default Home