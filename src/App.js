import logo from './logo.svg';
import './App.css';
 import Movies from './Pages/Movies/Movies';
// import Series from './Pages/Series/Series';
// import Search from './Pages/Search/Search';
import YearSort from './YearSort/YearSort';
import Trending from './Pages/Trending/Trending';
import RatingSort from "./RatingSort/RatingSort";

import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Header/Header';
import SimpleBottomNavigation from './MainNav';
import SearchMov from './SearchMov/SearchMov';
import SingleMov from './SingleMov/SingleMov';
function App() {
  return (
    <BrowserRouter>
    <Header />
    <div className="app">
      <Container>
        <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/searchmov" element={<SearchMov/>} />
       
        <Route path="/movies" element={<Movies />}/>
        <Route path="/ratesort" element={<RatingSort/>}/>
      
          
            <Route path="/yearsort_series" element={<YearSort/>} />
            <Route path="/singlemov" element={<SingleMov/>} />
            
           
            {/* <Route path="/movie/:id" element={<SingleMov />} /> */}
            {/* <Route path="/search" component={Search} />
          */}
        
         
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation />
  </BrowserRouter>
    
   
  );
}

export default App;
