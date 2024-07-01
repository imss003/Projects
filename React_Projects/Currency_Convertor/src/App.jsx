import { useEffect, useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'
import InputBox from './Components/InputBox'
import countryList from './Resources/codes.js';
function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState("");
  const currencies = useCurrencyInfo(from.toLowerCase());
  // const options = [];
  const options = Object.keys(countryList);
  function convert(){
    const fact = currencies[to.toLowerCase()];
    // console.log(fact);
    // console.log(amount);
    setConvertedAmount(fact * amount);
  }
  function swapCurrency(){
    console.log("pressed")
    setFrom(to);
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
    console.log(`amount: ${amount}`)
    console.log(`converted amount: ${convertedAmount}`)
  }
  return (
    <div
      className=' min-h-screen flex items-center justify-center bg-cover'
      style={{backgroundImage: 'url(https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}
    >
      <div
        className=' h-96 w-2/5 flex flex-col items-center justify-center bg-white/60 rounded-lg'
      >
        <form
          className='flex flex-col items-center justify-center rounded-lg w-4/5'
        >
          <InputBox
            text={'From'}
            amount={amount}
            setAmount={setAmount}
            options={options}
            currency={from.toUpperCase()}
            setCurrency={setFrom}
            selectedfield={from.toUpperCase()}
            place={"Enter Amount"}
            onAmountChange={(a) => setAmount(a)}
          />
          <div>
            <button
              type='button'
              className='rounded-lg w-16 bg-blue-600 text-white'
              onClick={swapCurrency}
            >
              Swap
            </button>
          </div>
          <InputBox
            text={'To'}
            amount={convertedAmount}
            options={options}
            currency={to.toUpperCase()}
            setCurrency={setTo}
            selectedfield={to.toUpperCase()}
            place={"Converted Amount"}
            
          />
          <button 
            type="submit"
            className=' w-40 bg-blue-700 text-white h-12 mt-2 rounded-md '
            onClick={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
