"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const rooms = [
    {
      id: 1,
      title: "Cozy Room near KU Gate",
      price: 4500,
      distance: "5 min walk",
      area: "Dhulikhel Bazaar",
      amenities: ["WiFi", "Attached Bathroom", "Furnished"],
    },
    {
      id: 2,
      title: "Spacious Room in Quiet Area",
      price: 3500,
      distance: "10 min walk",
      area: "Nasikasthan",
      amenities: ["WiFi", "Common Bathroom", "Kitchen"],
    },
    {
      id: 3,
      title: "Budget Friendly Single Room",
      price: 2500,
      distance: "15 min walk",
      area: "Sanga Road",
      amenities: ["Common Bathroom", "Parking"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDF6EC]">

      {/* NAVBAR */}
      <nav className="px-8 py-4 flex justify-between items-center backdrop-blur-md bg-white/40 sticky top-0 z-50 shadow-md">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
  src="/sthaankhoj.jpeg"
  alt="Logo"
  width={150}
  height={150}
  className="object-contain rounded-full hover:scale-110 transition"
/>
        
        </div>

        {/* NAV LINKS */}
        <div className="flex gap-4 items-center">
          <Link
            href="/login"
            className="text-red-900 font-medium hover:text-orange-500 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 rounded-full font-bold bg-orange-400 text-red-900 hover:scale-105 hover:shadow-lg transition"
          >
            Post Room
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-24 text-center bg-gradient-to-br from-red-900 to-red-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Find Your Perfect Room
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl text-orange-400 mb-6"
        >
          Near Kathmandu University
        </motion.h2>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto flex bg-white rounded-full p-2 shadow-xl hover:shadow-2xl transition"
        >
          <input
            placeholder="Search rooms..."
            className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
          />
          <button className="bg-red-900 text-white px-6 rounded-full hover:scale-105 transition">
            Search
          </button>
        </motion.div>
      </section>

      {/* ROOMS */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-red-900 mb-8">
          Available Rooms
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="h-48 bg-orange-400 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition">
                  🏠
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h4 className="font-bold text-lg mb-2">{room.title}</h4>

                <p className="text-2xl font-bold text-red-900">
                  Rs {room.price}
                </p>

                <div className="text-sm text-gray-500 mb-3">
                  📍 {room.area} • 🚶 {room.distance}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs px-2 py-1 bg-orange-100 text-red-900 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-red-900 text-white py-2 rounded-full hover:scale-105 hover:shadow-lg transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-red-900 text-center py-6 text-white/70">
        © 2026 Sthaan Khoj
      </footer>
    </main>
  );
}