import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchFranchisees } from './features/franchisees/franchiseesSlice'
import Franchisees from './features/franchisees/Franchisees'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFranchisees())
  }, [dispatch])

  // useEffect(() => {

  // }, [dispatch])

  // useEffect(() => {

  // }, [dispatch])
  return (
    <div className="App">
      <header className="App-header">
        <Franchisees />
      </header>
    </div>
  );
}

export default App;
