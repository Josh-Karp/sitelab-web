import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  alpha,
  tooltipClasses,
  styled,
  useTheme,
} from "@mui/material";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import PowerSettingsNewTwoToneIcon from "@mui/icons-material/PowerSettingsNewTwoTone";
import SmsTwoToneIcon from "@mui/icons-material/SmsTwoTone";
import Link from "src/components/__elements/Link";
import { useAuth } from "src/hooks/useAuth";
import { useRouter } from "next/router";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    boxShadow: theme.shadows[24],
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(12),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

function SidebarFooter() {
  const theme = useTheme();
  const { _logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await _logout();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: 60,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LightTooltip placement="top" arrow title={"Logout"}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(["all"])}`,

            "&:hover": {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
          }}
          onClick={handleLogout}
        >
          <PowerSettingsNewTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
    </Box>
  );
}

export default SidebarFooter;
