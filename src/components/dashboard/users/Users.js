import { useState, forwardRef, useCallback, useRef, useEffect } from "react";

import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
  DialogTitle,
} from "@mui/material";
import Link from "src/components/__elements/Link";

import CloseIcon from "@mui/icons-material/Close";
import Label from "src/components/__elements/Label";

import clsx from "clsx";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import BulkActions from "./BulkActions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import SetClaimsForm from "./actions/SetClaims";
import { wait } from "src/utils/wait";
import { firebaseAuth } from "src/utils/firebase/firebaseApp";
import { applyFilters } from "src/utils/applyFilters";
import { USER_ROLES } from "src/constants";

import axiosFirebase from "src/utils/firebase/axiosFirebase";
import { useRouter } from "next/router";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(["box-shadow"])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getUserRoleLabel = (userRole) => {
  const { text, color } = USER_ROLES[userRole];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};

const Users = ({ users }) => {
  const [selectedItems, setSelectedUsers] = useState([]);
  const router = useRouter();
  const userId = useRef(false);

  const tabs = [
    {
      value: "all",
      label: "All users",
    },
    {
      value: "customer",
      label: "Customers",
    },
    {
      value: "admin",
      label: "Administrators",
    },
    {
      value: "viewers",
      label: "Viewers",
    },
  ];

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    role: null,
  });
  const handleTabsChange = (_event, tabsValue) => {
    let value = null;

    if (tabsValue !== "all") {
      value = tabsValue;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value,
    }));

    setSelectedUsers([]);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.uid) : []);
  };

  const handleSelectUser = (_event, userId) => {
    if (!selectedItems.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(
    users,
    query,
    filters,
    "customClaims.roles",
    ["email", "name", "role"]
  );
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUsers =
    selectedItems.length > 0 && selectedItems.length < users.length;
  const selectedAllUsers = selectedItems.length === users.length;

  const [toggleView, setToggleView] = useState("table_view");

  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openSetClaims, setOpenSetClaims] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = async (uid) => {
    setOpenConfirmDelete(false);
  };

  const handleSetClaimsOpen = (_event, uid) => {
    userId.current = uid;
    setOpenSetClaims(true);
  };

  const handleSetClaimsClose = () => {
    setOpenSetClaims(false);
  };

  const submitClaimsForm = useCallback(
    async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
      try {
        await axiosFirebase.put(`/user/claims?uid=${userId.current}`, values);

        resetForm();
        setStatus({ success: true });
        setSubmitting(false);
        handleSetClaimsClose();

        router.replace(router.asPath);
      } catch (err) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
        handleSetClaimsClose();
      }
    },
    [users]
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        pb={3}
      >
        <TabsWrapper
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={filters.role || "all"}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabsWrapper>
        <ToggleButtonGroup
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
          value={toggleView}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="table_view">
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="grid_view">
            <GridViewTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {toggleView === "table_view" && (
        <Card>
          <Box p={2}>
            {!selectedBulkActions && (
              <TextField
                sx={{
                  m: 0,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleQueryChange}
                placeholder={"Search by name, email or username..."}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
            {selectedBulkActions && <BulkActions />}
          </Box>

          <Divider />

          {paginatedUsers.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10,
                }}
                variant="h3"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {"We couldn't find any users matching your search criteria"}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllUsers}
                          indeterminate={selectedSomeUsers}
                          onChange={handleSelectAllUsers}
                        />
                      </TableCell>
                      <TableCell>{"Photo"}</TableCell>
                      <TableCell>{"Name"}</TableCell>
                      <TableCell>{"Email"}</TableCell>
                      <TableCell>{"Date Created"}</TableCell>
                      <TableCell>{"Verified"}</TableCell>
                      <TableCell>{"Company"}</TableCell>
                      <TableCell>{"Role"}</TableCell>
                      <TableCell align="center">{"Actions"}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.map((user) => {
                      const isUserSelected = selectedItems.includes(user.uid);
                      return (
                        <TableRow
                          hover
                          key={user.uid}
                          selected={isUserSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isUserSelected}
                              onChange={(event) =>
                                handleSelectUser(event, user.uid)
                              }
                              value={isUserSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                sx={{
                                  mr: 1,
                                }}
                                src={user.photoURL}
                              />
                              <Box>
                                <Link
                                  variant="h5"
                                  href={`/dashboard/users/${user.uid}`}
                                >
                                  {user.name}
                                </Link>
                                <Typography noWrap variant="subtitle2">
                                  {user.jobtitle}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              {user.displayName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{user.email}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {user.metadata.creationTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">
                              {user.emailVerified ? "Verified" : ""}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">
                              {user.customClaims?.company?.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getUserRoleLabel(user.customClaims?.role)}
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title={"View"} arrow>
                                <IconButton
                                  href={`/dashboard/users/${user.uid}`}
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={"Delete"} arrow>
                                <IconButton
                                  onClick={handleConfirmDelete}
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={"Set Claims"} arrow>
                                <IconButton
                                  onClick={(event) =>
                                    handleSetClaimsOpen(event, user.uid)
                                  }
                                  color="primary"
                                >
                                  <SettingsIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredUsers.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </Card>
      )}
      {toggleView === "grid_view" && (
        <>
          <Card
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {paginatedUsers.length !== 0 && (
                <>
                  <Box display="flex" alignItems="center">
                    <Tooltip arrow placement="top" title={"Select all users"}>
                      <Checkbox
                        checked={selectedAllUsers}
                        indeterminate={selectedSomeUsers}
                        onChange={handleSelectAllUsers}
                      />
                    </Tooltip>
                  </Box>
                  {selectedBulkActions && (
                    <Box flex={1} pl={2}>
                      <BulkActions />
                    </Box>
                  )}
                </>
              )}
              {!selectedBulkActions && (
                <TextField
                  sx={{
                    my: 0,
                    ml: paginatedUsers.length !== 0 ? 2 : 0,
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleQueryChange}
                  placeholder={"Search by name, email or username..."}
                  value={query}
                  size="small"
                  margin="normal"
                  variant="outlined"
                />
              )}
            </Box>
          </Card>
          {paginatedUsers.length === 0 ? (
            <Typography
              sx={{
                py: 10,
              }}
              variant="h3"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              {"We couldn't find any users matching your search criteria"}
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedUsers.map((user) => {
                  const isUserSelected = selectedItems.includes(user.uid);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={user.uid}>
                      <CardWrapper
                        className={clsx({
                          "Mui-selected": isUserSelected,
                        })}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: "2",
                          }}
                        >
                          <Box
                            px={2}
                            pt={2}
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="space-between"
                          >
                            {getUserRoleLabel(user.customClaims?.role)}
                            <IconButton
                              color="primary"
                              sx={{
                                p: 0.5,
                              }}
                            >
                              <MoreVertTwoToneIcon />
                            </IconButton>
                          </Box>
                          <Box p={2} display="flex" alignItems="flex-start">
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                              }}
                              src={user.avatar}
                            />
                            <Box>
                              <Box>
                                <Link
                                  variant="h5"
                                  href={"/dashboard/users/" + user.uid}
                                >
                                  {user.displayName}
                                </Link>{" "}
                                {user.customClaims.company ? (
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    ({user.customClaims?.company?.name})
                                  </Typography>
                                ) : null}
                              </Box>
                              <Typography
                                sx={{
                                  pt: 0.3,
                                }}
                                variant="subtitle2"
                              >
                                {user.jobtitle}
                              </Typography>
                              <Typography
                                sx={{
                                  pt: 1,
                                }}
                                variant="h6"
                              >
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider />
                          <Box
                            pl={2}
                            py={1}
                            pr={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Checkbox
                              checked={isUserSelected}
                              onChange={(event) =>
                                handleSelectUser(event, user.uid)
                              }
                              value={isUserSelected}
                            />
                          </Box>
                        </Box>
                      </CardWrapper>
                    </Grid>
                  );
                })}
              </Grid>
              <Card
                sx={{
                  p: 2,
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography component="span" variant="subtitle1">
                    {"Showing"}
                  </Typography>{" "}
                  <b>{limit}</b> {"of"} <b>{filteredUsers.length}</b>{" "}
                  <b>{"users"}</b>
                </Box>
                <TablePagination
                  component="div"
                  count={filteredUsers.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  labelRowsPerPage=""
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Card>
            </>
          )}
        </>
      )}
      {!toggleView && (
        <Card
          sx={{
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              my: 5,
            }}
            gutterBottom
          >
            {
              "Choose between table or grid views for displaying the users list."
            }
          </Typography>
        </Card>
      )}

      <Dialog
        fullWidth
        maxWidth="md"
        open={openSetClaims}
        onClose={handleSetClaimsClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {"Set user claims"}
          </Typography>
          <Typography variant="subtitle2">
            {"Fill in the fields below to set the users role & company"}
          </Typography>
        </DialogTitle>
        <SetClaimsForm
          onSubmit={submitClaimsForm}
          handleClose={handleSetClaimsClose}
        />
      </Dialog>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            {"Are you sure you want to permanently delete this user account"}?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              {"Cancel"}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {"Delete"}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

Users.defaultProps = {
  users: [],
};

export default Users;
