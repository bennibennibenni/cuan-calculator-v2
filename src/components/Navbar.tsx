import logo from '../images/vite-logo.svg'
import { CiSearch } from 'react-icons/ci'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  // const navigate = useNavigate();

  return (
    <div
      className='px-8 md:px-8 py-1 max-w-[1500px] flex md:mx-auto'
      onClick={(event) => (window.location.href = '/')}
    >
      {/* <img
        src={logo}
        className="h-6 w-8 mt-4"
        // onClick={() => {
        //   navigate("/");
        // }}
      /> */}
      {/* <h1 className="font-bold ml-2 pt-4">benni</h1> */}
      <div className='flex w-full ml-10 justify-between'>
        <div className='space-y-1.5 pt-3 ml-auto md:hidden [&>*]:hover:bg-gray-200'>
          <span className='block w-8 h-0.5 bg-gray-600'></span>
          <span className='block w-8 h-0.5 bg-gray-600'></span>
          <span className='block w-8 h-0.5 bg-gray-600'></span>
        </div>
        <div className='hidden md:flex pt-4 text-[14px] font-bold ml-auto'>
          <div className='hidden xl:block'>
            <ul className='flex space-x-4'>
              <li>
                <svg
                  role='img'
                  viewBox='0 0 24 24'
                  className='h-6 cursor-pointer'
                  fill='#9999A0'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>GitHub</title>
                  <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'></path>
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}