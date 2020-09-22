import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";





function App() {

    const [coin, setCoins] = useState([]);
    const [search, setSearch] = useState('');


   useEffect(() => {
       

   axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=falses')
   .then(res => {
       setCoins(res.data);
   }).catch(error => console.log(error));
} ,[]);



   const handleChange = e => {
       setSearch(e.target.value)
   }

   const filteredCoins = coin.filter(coin =>
 coin.name.toLowerCase().includes(search.toLocaleLowerCase())
 )
    return(
        <div className="coin-app">
            <div className="coin-search">
            <h1 className="coin-text">Search a currency</h1>
            <form >
<input type="text" placeholder="Search" className="coin-input"
onChange={handleChange}/>
            </form>
            </div>
            {filteredCoins.map(coin => {
                return (
<Coin
 key={coin.id}
 name={coin.name}
 image={coin.image}
 symbol={coin.symbol}
 marketcap={coin.market_cap}
 price={coin.current_price}
 priceChange={coin.price_change_percentage_24h}
 volume={coin.total_volume}
  />
                )
            })}
        </div>
    );
}

export default App;