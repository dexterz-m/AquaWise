import React from 'react'

const Footer = () => {
  return (
    <footer className="footer footer-center bg-shuttle-gray-800 text-black-haze-100 rounded p-10">
        <nav className="grid grid-flow-col gap-4">
            <a className="hover:cursor-pointer hover:text-black-haze-200">About us</a>
            <a className="hover:cursor-pointer hover:text-black-haze-200">Contact</a>
        </nav>
        <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by AquaWise Ltd.</p>
        </aside>
    </footer>
  )
}

export default Footer