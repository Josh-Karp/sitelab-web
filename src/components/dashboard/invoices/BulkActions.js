import { useState, useRef } from "react";

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  styled,
} from "@mui/material";

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef(null);

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {"Select all"}
          </Typography>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{
            ml: 2,
            p: 1,
          }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <List
          sx={{
            p: 0.5,
          }}
          component="nav"
        >
          <ListItem button>
            <ListItemText primary={"Download All"} />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
