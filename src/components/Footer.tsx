import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-complement-500 text-sm flex items-center justify-center">
          Made with <FaHeart className="text-primary-500 mx-1" /> using 
          <a 
            href="https://www.pexels.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 ml-1 underline underline-offset-2"
          >
            Pexels API
          </a>
        </p>
        <p className="text-complement-400 text-xs mt-2">
          &copy; {new Date().getFullYear()} Blooming Messages. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer