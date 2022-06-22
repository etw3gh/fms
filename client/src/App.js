import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchFranchisees } from './features/franchisees/franchiseesSlice'
import { fetchLocations } from './features/locations/locationsSlice'
import { fetchSales } from './features/sales/salesSlice'
import Franchisees from './features/franchisees/Franchisees'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFranchisees())
    dispatch(fetchLocations())
    dispatch(fetchSales())
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <Franchisees />
      </header>
    </div>
  );
}

export default App;
