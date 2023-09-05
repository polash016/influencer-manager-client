import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import AddInfluencer from './AddInfluencer'
import './App.css'
import { useEffect, useState } from 'react';
import InfluencersList from './InfluencersList';

function App() {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetch('https://influencer-manager-server.vercel.app/influencer')
    .then(res => res.json())
    .then(data => setInfluencers(data))
  }, [])

  const handleChange = (e) => {
    const sortValue = e.target.value;
    fetch(`https://influencer-manager-server.vercel.app/sorted/${sortValue}`)
    .then(res => res.json())
    .then(data => setInfluencers(data))
  }
  const handleSearch = e => {
    e.preventDefault();
    const search = e.target.search.value;
    fetch(`https://influencer-manager-server.vercel.app/influencer/${search}`)
    .then(res => res.json())
    .then(data => setInfluencers(data))
  }
  return (
    <div className='w-[95%] mx-auto'>
     <h1 className='text-6xl text-center my-6'>Influencer Manager</h1>
     <div className='flex justify-between'>
     <AddInfluencer></AddInfluencer>
     <div>
      <form onSubmit={handleSearch}>
      <TextField type='search' name="search" />
      <Button type='submit'>Search</Button>
      </form>
     </div>
     <div>
     <FormControl className='w-20'>
  <InputLabel className='px-8' id="demo-simple-select-label">Sort</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={''}
    label="Search"
    onChange={handleChange}
  >
    <MenuItem value={'name'}>Name</MenuItem>
    <MenuItem value={'follower'}>Follower</MenuItem>
  </Select>
</FormControl>
     </div>
     </div>
     {/* list of all influencer */}
    <InfluencersList influencers={influencers}></InfluencersList>
    </div>
  )
}

export default App
