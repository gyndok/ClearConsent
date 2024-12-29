import React from 'react';
import { Box, Typography } from '@mui/material';
import { getVideoInfo } from '../../utils/videoUtils';

interface VideoEmbedProps {
  url: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
  const { embedUrl, type } = getVideoInfo(url);

  if (!embedUrl) {
    return url ? (
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography color="text.secondary">
          Video URL not recognized. Please enter a valid YouTube or Vimeo URL.
        </Typography>
      </Box>
    ) : null;
  }

  return (
    <Box
      sx={{
        mt: 2,
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        bgcolor: 'black',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={embedUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`${type} video player`}
      />
    </Box>
  );
}; 