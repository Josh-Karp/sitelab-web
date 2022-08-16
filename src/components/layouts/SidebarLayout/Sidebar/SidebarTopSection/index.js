import { Avatar, Box, alpha, Typography, useTheme } from "@mui/material";

import { useAuth } from "src/hooks/useAuth";

function SidebarTopSection() {
  const theme = useTheme();
  const { user } = useAuth();

  console.log(user)

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: 2,
        pt: 1,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: "auto",
        }}
        alt={user.displayName}
        src={user.photoURL}
      />

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`,
        }}
      >
        {user.displayName}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: `${theme.colors.alpha.trueWhite[70]}`,
        }}
      >
        {user.email}
      </Typography>
    </Box>
  );
}

export default SidebarTopSection;
