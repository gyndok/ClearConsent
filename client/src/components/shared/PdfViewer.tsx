import React from 'react';
import { Box, Paper } from '@mui/material';

interface PdfViewerProps {
  url: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  return (
    <Paper elevation={0} variant="outlined">
      <Box
        component="iframe"
        src={`${url}#toolbar=0&navpanes=0`}
        sx={{
          width: '100%',
          height: '600px',
          border: 'none',
        }}
      />
    </Paper>
  );
}; 