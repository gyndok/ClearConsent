import React from 'react';
import { Box, Typography } from '@mui/material';

interface VideoEmbedProps {
  url: string;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    let videoId = '';

    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      if (urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.startsWith('/embed/')) {
        videoId = urlObj.pathname.split('/')[2];
      }
    }

    if (videoId && videoId.length === 11) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  } catch (error) {
    console.error('Error parsing video URL:', error);
    return null;
  }
};

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <Box sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography color="text.secondary" align="center">
          Video URL not recognized. Please enter a valid YouTube URL.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Box
        sx={{
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
          title="YouTube video player"
        />
      </Box>
    </Box>
  );
}; 