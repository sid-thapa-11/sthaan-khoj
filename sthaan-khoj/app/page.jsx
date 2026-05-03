"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ALL_ROOMS = [
  { id: 1, title: "Cozy Room near KU Gate", price: 4500, distance: "5 min walk", area: "Dhulikhel Bazaar", amenities: ["WiFi", "Attached Bathroom", "Furnished"], rating: 4.8, reviews: 24, tag: "Popular" },
  { id: 2, title: "Spacious Room in Quiet Area", price: 3500, distance: "10 min walk", area: "Nasikasthan", amenities: ["WiFi", "Common Bathroom", "Kitchen"], rating: 4.6, reviews: 18, tag: null },
  { id: 3, title: "Budget Friendly Single Room", price: 2500, distance: "15 min walk", area: "Sanga Road", amenities: ["Common Bathroom", "Parking"], rating: 4.3, reviews: 12, tag: "Best Value" },
  { id: 4, title: "Modern Room with Mountain View", price: 6000, distance: "8 min walk", area: "Dhulikhel Height", amenities: ["WiFi", "Attached Bathroom", "Furnished", "View"], rating: 4.9, reviews: 31, tag: "Premium" },
  { id: 5, title: "Affordable Room for Students", price: 3000, distance: "12 min walk", area: "Panauti Road", amenities: ["WiFi", "Common Bathroom"], rating: 4.4, reviews: 9, tag: null },
  { id: 6, title: "Semi-Furnished Room near Campus", price: 5000, distance: "3 min walk", area: "Dhulikhel Bazaar", amenities: ["WiFi", "Attached Bathroom", "Semi-Furnished"], rating: 4.7, reviews: 20, tag: "Nearest" },
];

const FILTERS = ["All", "Under Rs 3000", "Under Rs 5000", "WiFi", "Furnished", "Near KU Gate"];
const EMOJIS = ["🏠", "🛏️", "🏡", "🌄", "🏘️", "🏠"];
const TAG_COLORS = { Popular: "#8B1A1A", Premium: "#6B21A8", "Best Value": "#15803D", Nearest: "#1D4ED8" };

function StarRating({ rating }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      <span style={{ color: "#F4A623", fontSize: "13px" }}>★</span>
      <span style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>{rating}</span>
    </span>
  );
}

function RoomCard({ room, index }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.14)" }}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", background: "linear-gradient(135deg, #8B1A1A 0%, #8B1A1A 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "64px" }}>{EMOJIS[index % EMOJIS.length]}</span>
        <button
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
          style={{ position: "absolute", top: "12px", right: "12px", background: "#fff", border: "none", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", fontSize: "16px" }}
        >{liked ? "❤️" : "🤍"}</button>
        {room.tag && (
          <span style={{ position: "absolute", top: "12px", left: "12px", background: TAG_COLORS[room.tag] || "#8B1A1A", color: "#fff", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "999px" }}>{room.tag}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
          <h4 style={{ fontWeight: "700", fontSize: "15px", color: "#222", lineHeight: 1.3, flex: 1, marginRight: "8px" }}>{room.title}</h4>
          <StarRating rating={room.rating} />
        </div>
        <p style={{ fontSize: "13px", color: "#777", marginBottom: "10px" }}>
          📍 {room.area} &nbsp;·&nbsp; 🚶 {room.distance} &nbsp;·&nbsp; {room.reviews} reviews
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {room.amenities.map(a => (
            <span key={a} style={{ fontSize: "11px", padding: "3px 9px", background: "#FDF6EC", color: "#8B1A1A", borderRadius: "999px", border: "1px solid #f0c070", fontWeight: "500" }}>{a}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontWeight: "800", fontSize: "18px", color: "#8B1A1A" }}>Rs {room.price.toLocaleString()}</span>
            <span style={{ color: "#999", fontSize: "13px" }}> /month</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ background: "#8B1A1A", color: "#fff", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
          >View →</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filteredRooms = ALL_ROOMS.filter(r => {
    if (activeFilter === "Under Rs 3000") return r.price < 3000;
    if (activeFilter === "Under Rs 5000") return r.price < 5000;
    if (activeFilter === "WiFi") return r.amenities.includes("WiFi");
    if (activeFilter === "Furnished") return r.amenities.some(a => a.includes("Furnished"));
    if (activeFilter === "Near KU Gate") return parseInt(r.distance) <= 5;
    return true;
  }).filter(r =>
    search === "" ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ background: "#f7f7f7", minHeight: "100vh", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        padding: "0 40px", height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        <Image src="/sthaankhoj.jpeg" alt="Sthaan Khoj Logo" width={120} height={60} loading="eager" style={{ objectFit: "contain", borderRadius: "8px", width: "auto", height: "60px" }} />
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/login" style={{ color: "#333", fontSize: "14px", fontWeight: "600", textDecoration: "none", padding: "9px 18px", borderRadius: "8px", border: "1px solid #ddd" }}>Login</Link>
          <Link href="/signup" style={{ background: "#F4A623", color: "#8B1A1A", fontSize: "14px", fontWeight: "700", padding: "9px 20px", borderRadius: "8px", textDecoration: "none" }}>Post a Room</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#8B1A1A", padding: "72px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(244,166,35,0.07) 0%, transparent 50%)", pointerEvents: "none" }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", letterSpacing: "0.1em", fontWeight: "600", marginBottom: "14px", position: "relative" }}>
          🎓 FOR KU DHULIKHEL STUDENTS
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            color: "#fff",
            fontSize: "clamp(36px, 6vw, 68px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "8px", lineHeight: 1.1,
            position: "relative",
            textShadow: "0px 1px 0px rgba(255,255,255,0.15), 0px 3px 0px rgba(0,0,0,0.25), 0px 6px 16px rgba(0,0,0,0.35)",
          }}>
          Find your next stay
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            color: "#F4A623", fontSize: "20px", fontWeight: "600", marginBottom: "40px", position: "relative",
            textShadow: "0px 2px 4px rgba(0,0,0,0.3), 0px 4px 12px rgba(0,0,0,0.2)",
          }}>
          Search rooms near Kathmandu University, Dhulikhel
        </motion.p>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ maxWidth: "680px", margin: "0 auto", background: "#fff", borderRadius: "12px", padding: "6px", display: "flex", gap: "2px", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", border: "2px solid #F4A623" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 14px", gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>🏠</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Where are you looking? Area, price..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: "15px", color: "#333", background: "transparent", padding: "10px 0" }} />
          </div>
          <button style={{ background: "#8B1A1A", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>Search</button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "36px", flexWrap: "wrap" }}>
          {[["6+", "Rooms listed"], ["Rs 2,500", "Lowest price"], ["3 min", "Closest to KU"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontWeight: "800", fontSize: "22px" }}>{num}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FILTER BAR — Airbnb style */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "0 40px", display: "flex", gap: "0", overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: "16px 20px", border: "none",
            borderBottom: activeFilter === f ? "2px solid #8B1A1A" : "2px solid transparent",
            background: "transparent",
            color: activeFilter === f ? "#8B1A1A" : "#666",
            fontWeight: activeFilter === f ? "700" : "400",
            fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{f}</button>
        ))}
      </div>

      {/* ROOMS */}
      <section style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#222" }}>
            {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""} near KU Dhulikhel
          </h2>
          <p style={{ color: "#888", fontSize: "14px" }}>Sorted by: Nearest first</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "20px" }}>
            {filteredRooms.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {filteredRooms.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p style={{ fontSize: "18px", fontWeight: "600" }}>No rooms found</p>
            <p style={{ fontSize: "14px", marginTop: "6px" }}>Try a different filter or search term</p>
          </div>
        )}
      </section>

      {/* WHY STHAAN KHOJ */}
      <section style={{ background: "#fff", padding: "60px 40px", borderTop: "1px solid #e8e8e8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#222", marginBottom: "32px" }}>Why Sthaan Khoj?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              ["🎓", "Made for KU Students", "Rooms verified and curated specifically for Kathmandu University students."],
              ["💰", "Transparent Pricing", "No hidden fees. What you see is what you pay."],
              ["📍", "Real Distances", "Walk times calculated from KU main gate — no guessing."],
              ["⚡", "Fast & Simple", "Find and contact a room owner in under 2 minutes."],
            ].map(([icon, title, desc]) => (
              <motion.div key={title} whileHover={{ y: -4 }} style={{ background: "#FDF6EC", borderRadius: "12px", padding: "24px", border: "1px solid #f0e0c0" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>
                <h3 style={{ fontWeight: "700", fontSize: "15px", color: "#222", marginBottom: "6px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#8B1A1A", padding: "56px 40px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>Have a room to rent?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", marginBottom: "28px" }}>List your room for free and reach hundreds of KU students instantly.</p>
        <Link href="/signup" style={{ display: "inline-block", background: "#F4A623", color: "#8B1A1A", padding: "14px 36px", borderRadius: "8px", fontWeight: "800", fontSize: "15px", textDecoration: "none" }}>List Your Room →</Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#8B1A1A", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <Image src="/sthaankhoj.jpeg" alt="Logo" width={80} height={40} style={{ objectFit: "contain", borderRadius: "6px", width: "auto", height: "40px" }} />
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>© 2026 Sthaan Khoj · Made for KU Students ❤️</p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["About", "Contact", "Privacy"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #aaa; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}
