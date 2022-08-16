import { useRef, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  MenuItem,
  ListItemText,
  Popover,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";

import Text from "src/components/__elements/Text";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  &:hover {
    background: ${theme.colors.primary.main};
  }
`
);

const UserAvatar = styled(Avatar)(
  ({ theme }) => `
        height: 90%;
        width: 90%;
        border-radius: ${theme.general.borderRadiusLg};
`
);

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const theme = useTheme();
  const router = useRouter();

  const { user, _logout } = useAuth();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await _logout();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        <UserAvatar alt={user.displayName} src={user.photoURL} />
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.displayName} src={user.photoURL} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.displayName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <MenuListWrapperPrimary disablePadding>
          <MenuItem>
            <ListItemText
              primaryTypographyProps={{
                variant: "h5",
              }}
              primary={"My account"}
            />
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8,
              }}
            />
          </MenuItem>
        </MenuListWrapperPrimary>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {"Sign out"}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
