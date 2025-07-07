import React, { useRef, useEffect } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { gsap } from "gsap";

const PARTICLE_COUNT = 50;
const PARTICLE_SIZE = 3;
const CONNECT_DISTANCE = 120;

export default function Home() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    particles.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    }

    animate();
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.4 }
    );

    // Image animation
    // if (isDesktop && imageRef.current) {
    //   gsap.fromTo(
    //     imageRef.current,
    //     { opacity: 0, x: 100 },
    //     { opacity: 1, x: 0, duration: 1.5, delay: 0.8 }
    //   );
    // }
    const tl = gsap.timeline();
      tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.4 }
    );
    if (isDesktop && imageRef.current) {
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: 120,
          scale: 0.85,
          rotate: 4,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1"
      );

      tl.to(
        imageRef.current,
        {
          boxShadow: "0 0 40px rgba(255,255,255,0.4)",
          duration: 0.8,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=1.2"
      );
    }

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDesktop]);

  return (
    <section id="main"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
          color: "white",
        }}
      >
        <div
          ref={textRef}
          style={{
            flex: 1,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 1,
              fontSize: {
                xs: "1.4rem",
                sm: "2rem",
                md: "2rem",
                lg: "2.3rem",
                xl: "2.3rem",
              },
            }}
          >
            Hi,I'm Muthumariappan
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.8,
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
                md: "1.25rem",
                lg: "1.25rem",
              },
            }}
          >
            A passionate Front-End Developer
          </Typography>
        </div>

        {isDesktop && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
              // height: "100%",
            }}
          >
            <img
              ref={imageRef}
              src="/images/person.jpg"
              alt="Animated Male"
              style={{
                width: "400px",
                maxHeight: "50%",
                borderRadius: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
