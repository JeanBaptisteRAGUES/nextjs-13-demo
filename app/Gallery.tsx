'use client';

import { useState } from 'react';

export default function Gallery() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className=' bg-red-500 h-20 w-20' >
      <button onClick={() => setIsOpen(!isOpen)}>View pictures</button>

      {/* 🟢 Works, since AcmeCarousel is used within a Client Component */}
      {isOpen && <p>Picture</p>}
    </div>
  );
}