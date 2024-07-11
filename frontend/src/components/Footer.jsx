import React from 'react'

function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-8'>
     <div className='container mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='mb-4'>
            <h2 className='text- text-xl font-semibold mb-2'>Event Hub</h2>
            <p className='text-md'>Dedicated to creating cool events so that our users can be able to view and register events</p>
        </div>
        <div className='mb-4'>
            <h3 className='text-lg font-bold mb-2'>Useful links</h3>
            <ul>
                <li className='space-y-2'></li>
                <li><a href='/' className='bottom-link text-sm'>Home</a></li>
                <li><a href='/about' className='bottom-link text-sm'>About</a></li>
                <li><a href='/contact' className='bottom-link text-sm'>Contact Us</a></li>
                <li><a href='/' className='bottom-link text-sm'>Logout</a></li>
            </ul>
        </div>
        <div className='mb-4'>
            <h3 className='text-lg font-bold mb-2'>Developers</h3>
            <ul>
                <li>Griffins</li>
                <li>Gichuki</li>
                <li>Ian</li>
                <li>Gideon</li>
            </ul>
        </div>
        <div className='mb-4'>
            <h3 className='text-center mb-2'>Need a service</h3>
            <form className='flex'>
                <input type='text' className='py-2 px-4 rounded-md m-1 focus:outline-none w-40 text-accent' placeholder='Enter your email' required/>
                <button type='submit' className='bg-yellow-700 text-white px-2 px-6 rounded-md hover:bg-green-600 hover:text-black focus:outline-none'>submit</button>
            </form>
        </div>
        </div>
        <div className='border-t border-gray-700 mt-8 pt-4 text-sm text-center'>
        <p>&copy; {new Date().getFullYear()} Event Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
