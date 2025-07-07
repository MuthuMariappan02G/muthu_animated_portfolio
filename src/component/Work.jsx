import React, { useEffect, useRef } from "react";
import { Box, Typography, Stack, Container } from "@mui/material";
import Workitems from "./WorkItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cmpyDetails = [
  {
    year: "Present",
    role: "Software Engineer",
    name: "Gove Enterprises",
    description: (
      <ul className="list-disc pl-5">
        <li>Analyzed user requirements to design and develop NextJS based software solutions and technical specifications.</li>
        <li>Developed, tested and debugged React components while ensuring comprehensive unit tests and documentation for code accuracy.</li>
        <li>Collaborated with cross functional teams to ensure quality assurance during development, applying deep knowledge of responsive design and CSS frameworks like MUI.</li>
        <li>Contributed to optimizing development processes, mentoring junior developers, and ensuring adherence to best practices in code quality and deployment.</li>
        <li>Gained familiarity with BackEnd technologies such as NodeJS and ExpressJS deployment processed on the cloud platforms like AWS.</li>
      </ul>
    )
  }
];

const workingProjectDetails = [
  {
    year: "2024 - 2025",
    role: "Back-End Developer",
    name: "Vektorr BillPay",
    description: "I contributed to creating the Rest API's. Subsequently, I worked on the Rest Business Layer for Business validation within the API. The technologies utilized encompassed NodeJS, ExpressJS, SQL."
  },
  {
    year: "2023 - 2024",
    role: "Front-End Developer",
    name: "BaaS Accounts",
    description: (
      <ul className="list-disc pl-5">
        <li>Developed a scalable Business as a Service(Baas) application designed to streamline office operation through a suite of integrated tools.</li>
        <li>Spearheaded front-end development using NextJS implementing dynamic and user friendlyinterfaces to enhance productivity and user experience.</li>
        <li>Built and optimized back-end functionalities with NodeJS and ensured efficient data management using PostgresSQL.</li>
        <li>Played a critical role as a key front-end developer contributing to the overall design and functionality of the application.</li>
      </ul>
    )
  },
  {
    year: "2023",
    role: "Front-End Developer",
    name: "DMS - Document Management System",
    description: (
      <ul className="list-disc pl-5">
        <li>DMS is an application designed to reduce manual work for the team by recording data received from clients.</li>
        <li>It streamlines data entry and management, improving efficiency and accuracy in handling client information.</li>
        <li>Utilized ReactJS, NextJS, NodeJS, and ExpressJS with JavaScript and TypeScript for a seamless Front-End to Back-End experience.</li>
      </ul>
    )
  }
];

const educationDetails = [
  {
    year: "2019 - 2023",
    role: "B.E-ECE 8CGPA",
    name: "Francis Xavier Engineering College, Vannarpettai",
    description: "Tirunelveli"
  },
  {
    year: "2018 - 2019",
    role: "HSC-Computer Science 74.1%",
    name: "St.John's Higher Secondary School, Veeravanallur",
    description: "Tirunelveli"
  },
  {
    year: "2016 - 2017",
    role: "SSLC 91.2%",
    name: "St.John's Higher Secondary School, Veeravanallur",
    description: "Tirunelveli"
  }
];

const Work = () => {
  const workHeadingRef = useRef(null);
  const projectHeadingRef = useRef(null);
  const educationHeadingRef = useRef(null);
  const workGroupRef = useRef([]);
  const projectGroupRef = useRef([]);
  const educationGroupRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [workHeadingRef.current, projectHeadingRef.current, educationHeadingRef.current],
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      workGroupRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workGroupRef.current[0],
          start: "top 90%"
        }
      }
    );

    gsap.fromTo(
      projectGroupRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectGroupRef.current[0],
          start: "top 90%"
        }
      }
    );

    gsap.fromTo(
      educationGroupRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: educationGroupRef.current[0],
          start: "top 90%"
        }
      }
    );

    const shapes = bgRef.current.querySelectorAll(".shape");

    shapes.forEach((shape, i) => {
      const delay = i * 0.5;
      gsap.to(shape, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 4 + Math.random() * 3,
        delay
      });
      gsap.to(shape, {
        x: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 6 + Math.random() * 4,
        delay
      });
      gsap.to(shape, {
        rotation: 360,
        repeat: -1,
        ease: "linear",
        duration: 20 + Math.random() * 10,
        delay
      });
    });
  }, []);

  return (
    <>
      {/* Background Shapes */}
      <Box
        ref={bgRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
          pointerEvents: "none",
          background: "linear-gradient(135deg, #a2c4c9 0%, #f2f9f9 100%)"
        }}
      >
        {[...Array(10)].map((_, i) => (
          <Box
            key={i}
            className="shape"
            sx={{
              position: "absolute",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 23, 45, 0.15)",
              width: 100 + Math.random() * 150,
              height: 100 + Math.random() * 150,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(10px)",
              opacity: 0.5 + Math.random() * 0.3
            }}
          />
        ))}
      </Box>

      {/* Work Section */}
      <Container id="work" maxWidth="md" sx={{ py: 3 }}>
        <Typography ref={workHeadingRef} variant="h4" fontWeight="bold" textAlign="center" color="#00172D" py={2}>
          Work
        </Typography>
        <Stack spacing={0}>
          {cmpyDetails.map((item, index) => (
            <Box key={index} ref={(el) => (workGroupRef.current[index] = el)}>
              <Workitems {...item} />
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Projects Section */}
      <Container id="projectwork" maxWidth="md">
        <Typography ref={projectHeadingRef} variant="h4" fontWeight="bold" textAlign="center" color="#00172D" py={4}>
          Work Project
        </Typography>
        <Stack spacing={0}>
          {workingProjectDetails.map((item, index) => (
            <Box key={index} ref={(el) => (projectGroupRef.current[index] = el)}>
              <Workitems {...item} />
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Education Section */}
      <Container id="education" maxWidth="md" sx={{ py: 1.5 }}>
        <Typography ref={educationHeadingRef} variant="h4" fontWeight="bold" textAlign="center" color="#00171D" py={2}>
          Education
        </Typography>
        <Stack spacing={0}>
          {educationDetails.map((item, index) => (
            <Box key={index} ref={(el) => (educationGroupRef.current[index] = el)}>
              <Workitems {...item} />
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Work;

