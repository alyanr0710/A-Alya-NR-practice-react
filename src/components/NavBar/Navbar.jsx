import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='grid grid-cols-3 justify-between px-24 py-4 bg-black items-center'>
      <ul className='flex items-center'>
        <li className='text-white text-xl font-bold mr-6'>Ascherio</li>
        <li className='flex items-center justify-center'>
          <Link to='/' className='text-white hover:text-gray-400 active:text-gray-600'>Home</Link>
        </li>
        <li className='relative ml-6'>
          <button onClick={toggleDropdown} className='text-white hover:text-gray-400 active:text-gray-600'>
            Category
          </button>
          {isDropdownOpen && (
            <ul className='absolute left-0 mt-2 w-48 bg-white text-black shadow-lg'>
              <li className='px-4 py-2 hover:bg-gray-200'>
                <Link to='/category/album'>Album</Link>
              </li>
              <li className='px-4 py-2 hover:bg-gray-200'>
                <Link to='/category/lightstick'>Lightstick</Link>
              </li>
              <li className='px-4 py-2 hover:bg-gray-200'>
                <Link to='/category/merchandise'>Merchandise</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <ul className='flex justify-center items-center'>
        <li className='w-full'>
          <form onSubmit={handleSearch} className='flex'>
            <input
              type="text"
              className='text-black active:text-black focus:text-black px-4 py-2 w-full'
              name="search"
              id={inputId}
              placeholder='Search product...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className='bg-white text-black px-4 py-2 hover:bg-gray-200 active:bg-gray-400'>Search</button>
          </form>
        </li>
      </ul>
      {!isLoggedIn ? (
        <ul className='flex gap-2 justify-end items-center'>
          <li>
            <button onClick={login} className='bg-white text-black px-4 py-2 hover:bg-gray-200 active:bg-gray-400'>Sign in</button>
          </li>
          <li>
            <Link to="/signup" className='bg-white text-black px-4 py-2 hover:bg-gray-200 active:bg-gray-400'>Sign up</Link>
          </li>
        </ul>
      ) : (
        <ul className='flex justify-end gap-2 items-center'>
          <li>
            <Link className='text-white hover:text-gray-400 active:text-gray-600' to="/cart">
              Cart
            </Link>
          </li>
          <li className='text-white'>|</li>
          <li>
            <Link to='/orders' className='text-white hover:text-gray-400 active:text-gray-600'>My Orders</Link>
          </li>
          <li className='ml-4'>
            <button onClick={logout} className='bg-white text-black px-4 py-2 hover:bg-gray-200 active:bg-gray-400'>Sign out</button>
          </li>
        </ul>
      )}
    </nav>
  );
}
