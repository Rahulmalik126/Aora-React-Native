export const getVideoSavedStatus = (savedVideos, currentVideoId) => {
    if (!Array.isArray(savedVideos) || savedVideos.length === 0) {
      return false;
    }
    return savedVideos.some((video) => video.$id === currentVideoId);
  };
  
  