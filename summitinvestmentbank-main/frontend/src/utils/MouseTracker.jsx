// MouseTracker.jsx
import { useEffect } from "react";

export default function MouseTracker() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "mouse-dot";
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const checkHover = () => {
      const hovered = document.querySelector(":hover");
      if (hovered && hovered.tagName !== "BODY") {
        cursor.classList.add("hover-dot");
      } else {
        cursor.classList.remove("hover-dot");
      }
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.1;
      dotY += (mouseY - dotY) * 0.1;
      cursor.style.left = `${dotX}px`;
      cursor.style.top = `${dotY}px`;
      checkHover();
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", mouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      cursor.remove();
    };
  }, []);

  return null;
}
