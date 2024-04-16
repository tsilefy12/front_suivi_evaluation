import { Box, LinearProgress } from '@mui/material';
import React from 'react'

const TableLoading = () => {
  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <LinearProgress />
    </Box>
  );
}

export default TableLoading