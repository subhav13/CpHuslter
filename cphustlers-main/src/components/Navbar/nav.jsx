import {
  AppBar,
  Avatar,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box, height } from "@mui/system";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const Nav = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    setValue(newValue);
  };
  return (
    <AppBar
      sx={{
        height: "60px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography component="div" ml={6} sx={{ color: "#000000" }}>
        CpHustlers
      </Typography>
      <Box>
        <Tabs indicatorColor={blue[50]} value={value} onChange={handleChange}>
          <Tab label="Contest" />
          <Tab label="Learning" />
          <Tab label="Profile" />
        </Tabs>
      </Box>
      <Box>
        <Tippy
          animation="rubberBand"
          animateFill={true}
          arrow={true}
          content={<div style={{ height: "100px", width: "120px" }}></div>}
          allowHTML={true}
          interactive={true}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 50, height: 50, marginRight: 3 }}
          />
        </Tippy>
      </Box>
    </AppBar>
  );
};

export default Nav;
