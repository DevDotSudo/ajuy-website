"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export function HomeVideoBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      modalVideoRef.current?.pause();
    };
  }, [isOpen]);

  const openVideo = () => {
    flushSync(() => setIsOpen(true));
    const video = modalVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    void video.play().catch(() => undefined);
  };

  return (
    <>
      <section className="home-video-section" aria-labelledby="home-video-title">
        <div className="container">
          <div className="home-video-banner">
            <video
              className="home-video-preview"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/ajuy-video-poster.jpg"
              aria-hidden="true"
            >
              <source src="/videos/ajuy-home.mp4" type="video/mp4" />
            </video>
            <div className="home-video-shade" />
            <div className="home-video-copy">
              <span>Ajuy in motion</span>
              <h2 id="home-video-title">See the places, people, and progress that shape Ajuy.</h2>
              <p>The banner preview is muted. Open the full municipal feature to watch with sound.</p>
            </div>
            <button
              className="home-video-play"
              type="button"
              onClick={openVideo}
              aria-label="Play the full Ajuy video with sound"
              aria-haspopup="dialog"
            >
              <span className="home-video-play-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M8.2 5.8v12.4L18 12 8.2 5.8Z" fill="currentColor" />
                </svg>
              </span>
              <span>
                <strong>Watch full video</strong>
                <small>Full feature · with sound</small>
              </span>
            </button>
          </div>
        </div>
      </section>

      {isOpen ? (
        <div
          className="video-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="video-modal-header">
              <div>
                <span>Municipality of Ajuy</span>
                <h2 id="video-modal-title">Ajuy municipal feature</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="video-modal-close"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="video-modal-player">
              <video
                ref={modalVideoRef}
                controls
                playsInline
                preload="none"
                poster="/videos/ajuy-video-poster.jpg"
              >
                <source src="/videos/ajuy-home.mp4" type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
