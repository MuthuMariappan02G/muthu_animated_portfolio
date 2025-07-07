import React, { useRef, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Workitems = ({ year, role, name, description }) => {
  const containerRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const blob = blobRef.current;

    // Content scroll animation
    gsap.fromTo(
      container,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Background blob animation
    gsap.to(blob, {
      x: 30,
      y: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 6,
    });
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        p: 4,
        mb: 1.5,
        backgroundColor: "#00172D",
        color: "#fff",
      }}
    >
      {/* Blurred animated blob in the background */}
      <Box
        ref={blobRef}
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          background: "rgba(255, 255, 255, 0.08)",
          filter: "blur(80px)",
          borderRadius: "50%",
          top: -60,
          left: -60,
          zIndex: 0,
        }}
      />

      {/* Foreground content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 0.5,
              fontWeight: "bold",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 1,
            }}
          >
            {year}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {role}
          </Typography>
        </Stack>

        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Workitems;
