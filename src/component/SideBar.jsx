import React, { useState, useRef, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Avatar,
  Box,
  Grid,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Apps as AppsIcon,
  Mail as MailIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { gsap } from "gsap";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const avatarRef = useRef(null);

  const iconData = [
    { icon: <HomeIcon />, link: "main", text: "Home" },
    { icon: <WorkIcon />, link: "work", text: "Work" },
    { icon: <Diversity3Icon />, link: "projectwork", text: "ProjectWork" },
    { icon: <SchoolIcon />, link: "education", text: "Education" },
    { icon: <AppsIcon />, link: "projects", text: "Project" },
    { icon: <MailIcon />, link: "contact", text: "Contact" },
  ];

  const toggleDrawer = () => setOpen(!open);

  const handleScroll = (id) => {
    setSelectedLink(id);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          repeat: -1,
          yoyo: true,
          repeatDelay: 1.5,
        }
      );
    }
  }, []);

  return (
    <>
      {/* Top Row with Avatar and Icons */}
      <Grid container spacing={0} sx={{ height: 68, p:1, backgroundColor: "#fff"}}>
        {/* Animated Avatar */}
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{display: "flex", alignItems:"left", justifyContent: "left"}}>
          <Avatar
            ref={avatarRef}
            sx={{
              bgcolor: "primary.main",
              fontWeight: "bold",
              cursor: "default",
              width: 50,
              height: 50,
              fontSize: "1.5rem",
            }}
          >
            MM
          </Avatar>
        </Grid>

        {/* Desktop Icon Buttons */}
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7} sx={{ display: { xs: "none", sm: "flex" }, position:"sticky"}}>
          {iconData.map(({ icon, link, text }) => (
              <IconButton key={text}
                onClick={() => handleScroll(link)}
                sx={{
                  color: selectedLink === link ? "#1976d2" : "#00172d",
                  backgroundColor: selectedLink === link ? "#e3f2fd" : "transparent",
                  borderRadius: 2,
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "transform 0.3s, background-color 0.3s",
                }}
                aria-label={text}
              >
                {icon}
              </IconButton>
          ))}
        </Grid>

        {/* Mobile Menu Icon */}
        <Grid item sx={{ display: { sm: "none" } }}>
          <IconButton onClick={toggleDrawer} sx={{ color: "#000" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Drawer for Mobile View */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <IconButton
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 2, color: "#000" }}
          onClick={toggleDrawer}
          aria-label="close drawer"
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ width: 250 }}>
          {iconData.map(({ icon, link, text }) => (
            <IconButton
              key={text}
              onClick={() => handleScroll(link)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
                px: 2,
                py: 1,
                color: selectedLink === link ? "#1976d2" : "inherit",
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 30 }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </IconButton>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
