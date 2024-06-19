import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [characters, setCharacters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  function Generator () {
    let str = "";
    let pass = "";
    str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers){
      str += "0123456789";
    }
    if(characters){
      str += "!@#$%^&*()_+";
    }
    for( let i = 0; i < length; i++ ){
      let rand = Math.floor((Math.random() * str.length));
      pass += str[rand];
    }
    setPassword(pass);
  }
  function copytoclipboard(){
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    Generator();
  }, [length, characters, numbers])
  useEffect(() => {
    passwordGenerator();
  }, [length, characters, numbers]);
  return (
    <>
    <div className=' flex items-center justify-center flex-col'>
    <h1 className='text-4xl text-center text-white mb-4'>Password Generator</h1>
      <div className=' bg-gray-700 w-4/6 h-auto flex flex-col items-center rounded-xl' >
        <div className='w-full flex justify-center mt-4'>
          <input 
            type="text" 
            value={password}
            placeholder='Password'
            className=' text-xl items-center justify-center mb-4 w-2/3 pl-2 rounded-l-xl border-0'
            ref={passRef}
            readOnly
          />
          <button 
            className=' bg-blue-600 rounded-r-xl h-7 w-14 text-white '
            onClick={copytoclipboard}
            >
            Copy
          </button>
        </div>

        <div className='flex flex-row justify-evenly w-full mb-4'>
          <input 
            type="range" 
            min={6}
            max={50}
            defaultValue={6}
            className='w-28'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <span className='text-white '>
            Length: {length}
          </span>
          <div>
            <input 
              type="checkbox" 
              id='characters'
              defaultChecked= {characters}
              onChange={() => {
                setCharacters((prev) => !prev)
              }}
            />
            <label htmlFor="#characters" className='text-white'>Characters</label>
          </div>
          <div>
            <input 
              type="checkbox" 
              id='num'
              defaultChecked= {numbers}
              onChange={() => {
                setNumbers((prev) => !prev)
              }}
            />
            <label htmlFor="#num" className='text-white'>Numbers</label>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
