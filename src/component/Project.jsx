import React, { useRef, useEffect } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projectdetails from "./ProjectDetails";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleCharsRef = useRef([]);
  const descRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleCharsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Description animation
      gsap.fromTo(
        descRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards animation (each with a small delay)
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: index * 0.2 + 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "Projects";
  // const splitTitle = title.split("");

  const projects = [
    { img: "/images/Project4.jpg", url: "https://your-project-link.com" },
    { img: "/images/Project2.jpg", url: "https://your-project-link.com" },
    { img: "/images/Project3.jpg", url: "https://your-project-link.com" },
  ];

  return (
    <Box
      id="projects"
      ref={sectionRef}
      sx={{
        py: 10,
        mt: 5,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#2F2F2F",
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            mb: 4,
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          {/* {splitTitle.map((char, index) => (
            <Box
              key={index}
              ref={(el) => (titleCharsRef.current[index] = el)}
              component="span"
              sx={{ display: "inline-block",  }}
            >
              {char}
            </Box>
          ))} */}
          {title}
        </Typography>

        <Typography
          ref={descRef}
          align="center"
          sx={{
            mb: 6,
            color: "#E0E0E0",
            fontSize: "1.05rem",
            lineHeight: 1.8,
          }}
        >
          The front-end web development project utilized a powerful combination of HTML, CSS,
          JavaScript, React.js, and MUI (Material UI) to create a dynamic and visually appealing
          user interface. By leveraging React.js, the project achieved an efficient component-based
          architecture, while MUI enabled rapid styling and customization.
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <Projectdetails img={project.img} title="" url={project.url} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
