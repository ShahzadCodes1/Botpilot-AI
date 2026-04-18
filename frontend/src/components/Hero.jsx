// Hero.jsx (modified)
import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="bp2-hero bp2-hero--below-header">   {/* ← added class */}
      <div className="bp2-hero__bg">
        <video
          ref={videoRef}
          className="bp2-hero__video"
          src="/team/Snapchat-46066889.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="bp2-corner bp2-corner--tl" />
      <div className="bp2-corner bp2-corner--br" />
    </section>
  );
}