import React from 'react';

function Home() {
        return (
          <div className="flex flex-col min-h-screen bg-white text-blue-900">
            <main className="flex flex-col items-center justify-center flex-grow px-4 py-12 md:px-6 lg:py-24">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Welcome to CareTakers</h1>
              <p className="mt-4 text-lg text-center md:text-xl lg:text-2xl">
                We provide professional and loving care for your pets
              </p>
              <div className="mt-8">
                <img
                  alt="Graphic representing pet care"
                  className="w-96 h-64 md:w-120 md:h-96 lg:w-[800px] lg:h-[400px] object-cover rounded-full"
                  height="400"
                  src="public/mainpage.webp"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </main>
            <footer className="flex items-center justify-center h-16 px-4 py-2 bg-blue-900 text-white md:px-6">
              <p className="text-sm md:text-base">© CareTakers. All rights reserved.</p>
            </footer>
          </div>
        )
}

export default Home;