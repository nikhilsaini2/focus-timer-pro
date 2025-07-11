'use client'

import React, { useEffect, useRef, useState } from "react"

// Provided SVG data URL for the custom cursor
const cursorSVG = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="%23FFF" stroke="%23000" stroke-width="2" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"></path></svg>')`;

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Hide cursor for reduced motion or screen readers
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) setShowCursor(false)
    // Optionally, add more checks for screen readers if needed
  }, [])

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Use left/top for instant update, avoid transform for lag-free movement
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  useEffect(() => {
    // Detect hover on interactive elements
    const addHover = () => setHovered(true)
    const removeHover = () => setHovered(false)
    const selectors = ["button", "a", "input", "textarea", "[role=button]", ".cursor-interactive"]
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener("mouseenter", addHover)
        el.addEventListener("mouseleave", removeHover)
      })
    })
    return () => {
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.removeEventListener("mouseenter", addHover)
          el.removeEventListener("mouseleave", removeHover)
        })
      })
    }
  }, [])

  if (!showCursor) return null

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed z-[9999] pointer-events-none svg-cursor ${hovered ? "svg-cursor-hover" : ""}`}
        style={{ width: 32, height: 32, marginLeft: 0, marginTop: 0, left: 0, top: 0 }}
      />
      <style jsx global>{`
        html, body, button, a, input, textarea, * { cursor: none !important; }
        .svg-cursor {
          position: fixed;
          background: ${cursorSVG} no-repeat center center;
          background-size: 32px 32px;
          filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 2px #fff8);
        }
        .svg-cursor-hover {
          transform: scale(1.18);
          filter: drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff8);
        }
      `}</style>
    </>
  )
} 