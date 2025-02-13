import {
    APPWRITE_ENDPOINT,
    APPWRITE_PLATFORM,
    APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID,
    APPWRITE_VIDEO_COLLECTION_ID,
    APPWRITE_STORAGE_ID,
  } from "@env";
  
  // export the config
  export const appWriteConfig = {
    endpoint: APPWRITE_ENDPOINT,
    platform: APPWRITE_PLATFORM,
    projectId: APPWRITE_PROJECT_ID,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
    videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
    storageId: APPWRITE_STORAGE_ID,
  };