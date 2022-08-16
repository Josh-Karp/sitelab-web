import PropTypes from 'prop-types';
import { Box, CircularProgress } from "@mui/material";
import { LOADER_SIZE } from "src/constants";

function Loader({ size }) {
  return (
    <Box
      sx={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={LOADER_SIZE[size]} disableShrink thickness={3} />
    </Box>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

Loader.defaultProps = {
  size: "lg",
};

export default Loader;
