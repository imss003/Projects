import React from 'react'
import countryList from '../Resources/codes';
import DisplayFlag from '../DisplayFlag';

const InputBox = ({text, amount, setAmount, options = [], currency, setCurrency, selectedfield, def, place, onAmountChange}) => {
    const value = 0;
    return (
        <div 
            className='flex flex-row '
        >
            <div
                className='w-38 flex flex-col h-24 border-gray-400 border-2 border-r-0 rounded-lg rounded-tr-none rounded-br-none bg-white'
            >
                <label 
                    htmlFor="#from_curr"
                    className='pl-2 sm:text-sm'
                >
                    {text}
                </label>
                <input 
                    type="Number" 
                    id="from_curr" 
                    className=' w-full focus:outline-none pl-2 grow rounded-lg '
                    placeholder={place}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div
                className='w-48 h-24 border-gray-400 border-2 border-l-0 flex items-end rounded-tr-lg rounded-br-lg flex-col bg-white'
            >
                <label
                    className='pr-2'
                >
                    Currency Type
                </label>
                <div
                    className='flex items-center w-3/4 justify-center h-16'
                >
                    <DisplayFlag 
                        code={countryList[currency]}
                    />
                    <select 
                        className='ml-2 mr-2 border-0 border-black h-8 border-r-0 bg-transparent rounded-md mt-2'
                        value={selectedfield}
                        onChange={(e) => {
                            setCurrency(e.target.value.toLowerCase());
                        }}
                    >
                        
                        {options.map((c) => (
                            <option 
                                key={c}
                                value={c}
                            >
                                
                                {c}
                            </option>
                        ))}

                    </select>
                </div>
            </div>
            
        </div>
    )
}

export default InputBox