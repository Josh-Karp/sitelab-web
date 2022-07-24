import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import { FormGroup, MenuItem } from "@mui/material";

const WEB_DEVELOPMENT = [
  { value: "WordPress", label: "WordPress" },
  { value: "Front-end/HTML", label: "Front-end/HTML" },
  { value: "Shopify", label: "Shopify" },
  { value: "Others", label: "Others" },
];

export const Contact = () => {
  const [checked, setChecked] = useState([{ Web: false }, { Seo: false }]);
  const [child, setChild] = useState([]);

  const handleOptions = (event) => {
    setChild(event.target.value);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      name: data.get("name"),
    });
  };

  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ff4f6e",
      },
    },
    flex: "1 0 240px",
    div: {
      borderRadius: "10px",
      color: "#8993AD",
      fontFamily: "inherit",
      width: "100%",
    },
    label: {
      fontFamily: "inherit",
      color: "#8993AD",
      "&.Mui-focused": { color: "#ff4f6e" },
    },
    input: {
      padding: "8.5px 0px",
    },
  });

  const StyledCheckbox = styled(Checkbox)({
    "&.MuiCheckbox-root": {
      "&.Mui-checked": {
        color: "#ff4f6e",
      },
    },
  });

  const StyledButton = styled(Button)({
    padding: "1em 2em",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "16px",
    backgroundColor: "#ff4f6e",
    marginTop: "2em",
    borderRadius: "14px",
    textTransform: "unset",

    "&:hover": {
      backgroundColor: "#ff4f6e",
      opacity: "0.8",
    },
  });

  const Webchildren = (
    <Box
      sx={{
        textAlign: "start",
        alignItems: "flex-start",
        maxWidth: "15em",
        "& .MuiSelect-select": { width: "12ch", paddingTop: "10px" },
        "> p": { marginBottom: "0.85em", fontSize: "14px" },
        div: { borderRadius: "10px" },
      }}
    >
      <p>What is your preferred web development technology/CMS?</p>
      <TextField
        required
        id="web-development-select"
        select
        value={child}
        onChange={handleOptions}
        size="small"
      >
        {WEB_DEVELOPMENT.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );

  const SEOChildren = (
    <Box
      sx={{
        textAlign: "start",
        alignItems: "flex-start",
        "& .MuiSelect-select": { width: "12ch", paddingTop: "10px" },
        "> p": { marginBottom: "0.85em", fontSize: "14px" },
        div: { borderRadius: "10px", flex: "unset" },
      }}
    >
      <p>Mention the website for which you need SEO</p>
      <StyledTextField
        required
        fullWidth
        id="seo"
        label="Text here"
        name="seo"
        size="small"
        sx={{
          flex: "unset",
        }}
      />
    </Box>
  );

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{
        paddingBlock: "100px",
        background: "var(--theme-light-border)",
        margin: "unset",
      }}
    >
      <CssBaseline />
      <h2>Get In Touch</h2>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box component="div" sx={{ flexFlow: "row wrap", gap: "2em" }}>
            <StyledTextField
              required
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              size="small"
            />
            <StyledTextField
              required
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              size="small"
            />
            <StyledTextField
              required
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone"
              size="small"
            />
          </Box>
          <FormGroup
            sx={{
              flexFlow: "row wrap",
              my: "2em",
              alignItems: "flex-start",
              gap: "2em",
              span: {
                fontFamily: "inherit",
                color: "#8993AD",
              },
              ["@media (max-width:768px)"]: {
                justifyContent: "flex-start",
                flexFlow: "column wrap",
              },
            }}
          >
            <FormControlLabel
              control={<StyledCheckbox />}
              label="Social Media Marketing"
            />
            <div style={{ alignItems: "flex-start" }}>
              <FormControlLabel
                label="SEO Services"
                control={
                  <StyledCheckbox
                    name="Seo"
                    checked={checked["Seo"]}
                    onChange={handleChange}
                  />
                }
              />
              {checked["Seo"] ? SEOChildren : null}
            </div>
            <div style={{ alignItems: "flex-start" }}>
              <FormControlLabel
                label="Web Development Services"
                control={
                  <StyledCheckbox
                    name="Web"
                    checked={checked["Web"]}
                    onChange={handleChange}
                  />
                }
              />
              {checked["Web"] ? Webchildren : null}
            </div>
            <FormControlLabel control={<StyledCheckbox />} label="Other" />
          </FormGroup>
          <Box component="div" sx={{ flexFlow: "row", gap: "2em" }}>
            <StyledTextField
              required
              fullWidth
              name="requirements"
              label="Share your requirements"
              type="text"
              id="requirements"
              size="small"
              placeholder="(You can add links to your shareable materials if any)"
              multiline
            />
          </Box>
          <StyledButton type="submit" variant="contained">
            Submit
          </StyledButton>
        </Box>
      </Box>
    </Container>
  );
};
