interface VideoInfo {
  type: 'youtube' | 'vimeo' | null;
  embedUrl: string | null;
}

export const getVideoInfo = (url: string): VideoInfo => {
  if (!url) {
    return { type: null, embedUrl: null };
  }

  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = '';
      
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
      
      if (videoId) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      if (videoId) {
        return {
          type: 'vimeo',
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }
  } catch (error) {
    console.error('Error parsing video URL:', error);
  }

  return { type: null, embedUrl: null };
}; 