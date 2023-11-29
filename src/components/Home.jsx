import React, { useState } from 'react'
import axios from 'axios';
import allCountries from '../json/country.json';
function Home () {
  const [name, setName] = useState('')
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState('')

  const search = e => {
    e.preventDefault()
    setLoading(true)
    console.log(name, 'names')

    
    axios.get('https://api.nationalize.io/?name=' + name).then(res => {
        
    const result =[];
    const countries = res.data.country;
        console.log(allCountries,"all")

        countries.forEach(country => {
             let found = false;
           allCountries.forEach(c => {
              if (c.Abbreviation === country.country_id) {
                country.fullName = c["Country Name"];
                result.push(country);
                 found = true;
                return; // Break out of the inner loop once a match is found
              }
              if (!found) {
                console.log(`No match found for country_id: ${country.country_id}`);
              }
            });        
          });
        console.log(result,"oi")
      setResponse(res.data.country || [])
      setLoading(false)
    })
  }

  return (
    <div className='container vh-100 d-flex align-items-center justify-content-center'>
      <div className='card border-0' style={{ width: '18rem' }}>
        {/* header */}
        <nav className='navbar navbar-dark bg-dark'>
          <div className='container-fluid'>
            <form className='d-flex' onSubmit={search}>
              <input
                value={name}
                onChange={e => {
                  setName(e.target.value)
                  if (e.target.value === '') {
                    setResponse(null)
                  }
                }}
                className='form-control me-2'
                type='search'
                placeholder='Enter a Name'
                aria-label='Search'
              />
              <button className='btn btn-outline-light' type='submit'>
                Predict
              </button>
            </form>
          </div>
        </nav>
        {/* header end */}
        {  response?.length === 0 ? 
            <img
          src='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
          className='card-img-top w-50 mx-auto p-3'
          alt='user-profile'
        />
        :
        <img
          src='https://media1.giphy.com/media/ZedVN1A1uQX25J8Oou/200w.webp?cid=ecf05e47px4hh4f6qtfmanojbj3gqzznrrdufbqrgsss3umv&ep=v1_gifs_search&rid=200w.webp&ct=g'
          className='card-img-top w-50 mx-auto p-3 rounded-circle'
          alt='user-profile'
        />
        }
       
       
        <div className='card-body'>
          <h5 className='card-title'>your name is {name}</h5>

          <ul className='list-group'>
            {loading ? (
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : response?.length === 0 ? (
              <div className='alert alert-danger'>no result found</div>
            ) : (
              response &&
              response.map(country => {
                return (
                  <>
                    <li
                      className='list-group-item d-flex justify-content-between align-items-start'
                      key={country.country_id}
                    >
                      <div className='ms-2 me-auto'>
                        <div className='fw-bold'>{country.fullName || country.country_id}</div>
                      </div>
                      <span className='badge bg-primary rounded-pill'>
                        {(country.probability * 100).toFixed(2)}%
                      </span>
                    </li>
                  </>
                )
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
