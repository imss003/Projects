import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div
        style={{backgroundImage: `URL('../public/loginPageImage.jpg')`,
            backgroundSize: 'cover'
        }}
        className='w-full h-screen flex items-center justify-center'
    >
        <div
            className='w-[80%] h-[50%] flex justify-around items-center bg-gray-300/75 rounded-lg shadow-lg'
        >
            <div
                className='flex pt-4 pb-4 items-center justify-around w-full'
            >
                <div
                    className='flex flex-col items-center hidden md:block'
                >
                    <h1 className='text-5xl font-bold text-gray-900 '>Welcome</h1>
                    <h1 className='text-5xl font-bold text-gray-900 '>Back</h1>
                </div>
                <div
                    className='flex flex-col items-center w-[40vw] h-fit text-sm md:text-lg'
                >
                    <div
                        className='w-full flex justify-between mb-2 items-center'
                    >
                        <label 
                            htmlFor="username"
                            className="mr-2 w-[35%]"
                        >
                            Username
                        </label>
                        <input 
                            id='username'
                            type="text"
                            className='border-2 border-black p-2 w-[65%]' 
                        />
                    </div>
                    
                    <div
                        className='w-full flex justify-between items-center'
                    >
                        <label
                            htmlFor="password"
                            className="mr-2 w-[35%]"
                        >
                            Password
                        </label>
                        <input 
                            id='password'
                            type="text"
                            className='border-2 border-black p-2 w-[65%]' 
                        />
                    </div>
                    <div>
                        <button
                            className='bg-white h-10 w-16 rounded-md mt-2 hover:bg-gray-100 hover:shadow-md'
                        >
                            Login
                        </button>
                    </div>
                    <div
                        className='mt-2 flex flex-col items-center md:flex-row'
                    >
                        <p>
                            Don't have an account? 
                            
                        </p>
                        <Link
                            to = '/signup'
                            className='ml-2 text-blue-600 hover:underline font-medium '
                        >
                            Sign up
                        </Link>
                    </div>
                    <div
                        className='mt-2 mb-4'
                    >
                        <p>Or</p>
                    </div>
                    <div>
                        <button
                            className='bg-white rounded-md h-8 w-56 flex justify-center items-center hover:bg-gray-100 hover:shadow-lg'
                        >
                            <p
                                className='flex items-center justify-center'
                            >
                            Continue with 
                            <img 
                                src="../public/googleIcon.png" 
                                className='w-6 h-6'    
                            />
                            Google
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage