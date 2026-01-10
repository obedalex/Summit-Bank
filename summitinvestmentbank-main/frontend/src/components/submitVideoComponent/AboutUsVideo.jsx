import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsVideo() {
  const [open, setOpen] = useState(false);
  const videoWrapperRef = useRef(null);

  // SCROLL ANIMATION
  useEffect(() => {
    gsap.fromTo(
        videoWrapperRef.current, 
        {opacity:0,y:80},
        {
      opacity: 1,
      scale: 0.92,
      y: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: videoWrapperRef.current,
        start: "top 80%",
        
      },
    });
  }, []);

  return (
    <div className="min-h-[50vh] w-full  flex items-center justify-center px-6 md:px-14 py-4">

      {/* VIDEO CONTAINER */}
      <div
        ref={videoWrapperRef}
        className="relative w-full max-w-5xl  rounded-full overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.4)]
        border-white border-2 backdrop-blur-3xl"
      >
        {/* Thumbnail */}
        {!open && (
          <motion.img
            initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            src="https://images.unsplash.com/photo-1758691031073-3af2082797fd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-[260px] md:h-[420px] object-cover"
            alt="Summit Video"
          />
        )}

        {/* PLAY BUTTON */}
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center
            backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Play size={36} className="text-white group-hover:scale-110 transition-transform duration-200"/>
            </div>
          </motion.button>
        )}

        {/* VIDEO PLAYER */}
        <AnimatePresence>
          {open && (
            <motion.video
              src="https://www.pexels.com/download/video/4873123/"
              autoPlay={true}
              controls
              className="w-full h-[260px] md:h-[540px] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
