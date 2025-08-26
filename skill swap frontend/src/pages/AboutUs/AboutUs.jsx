import React from 'react'
import { Header } from '../../components/Navbar/Navbar';

function AboutUs() {
  return (
    <>
      <Header />
      <div className='min-h-[100vh] bg-[#4CAF50] flex flex-col md:flex-row  p-4'>
        <div className='w-full md:w-[50vw] flex items-center justify-center flex-col text-white text-center md:text-left'>
          <div className="text-center md:text-left w-full px-4">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
          </div>

          <div className='font-bold text-lg px-4 space-y-4'>
            <ul style={{ listStyleType: "disc" }} className="text-left">
              <li>
                <p>Skill Swap is a community-driven platform where people exchange services based on their talents — no money involved. Whether you're a web developer who needs photography, a graphic designer who wants guitar lessons, or a language tutor looking for help with a website, Skill Swap lets you trade skills directly.

                  We believe everyone has something valuable to offer — and collaboration is the new currency.</p></li>
              <li> <p>You can always show your worth as a human being and help others fellow mates in exchange of some new set of skills.</p></li>
              <li><p>Whether you're a coder seeking design help, a musician wanting to learn photography, or simply someone passionate about sharing knowledge, Skill Swap is the space where collaboration replaces currency. It's not just about services — it's about building a community where talent, time, and passion are the new economy.</p></li>
            </ul>
          </div>

        </div>
        <div className='w-full md:w-[50vw] text-center flex items-center justify-center mt-8 md:mt-0'>
          <img src="/images/about1.png" className='rounded-lg max-w-full h-auto' style={{ maxHeight: "50vh" }} alt="" />
        </div>

      </div>
    </>
  )
}

export default AboutUs
