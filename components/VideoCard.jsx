import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

import { icons } from "../constants";
import { getVideoSavedStatus } from "../lib/check";
import { toggleSaveVideo } from "../lib/appWrite";
import { useGlobalContext } from "../context/GlobalProvider";

// VideoCard Component to show the required videos
const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const { user, setUser } = useGlobalContext();
  const [isSaved, setIsSaved] = useState(
    getVideoSavedStatus(user?.savedVideos, video?.$id)
  );
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleSaveVideo = async () => {
    setIsToggling(true);
    try {
      const result = await toggleSaveVideo(user.$id, video);
      setIsSaved(result);
      if (result) {
        Alert.alert("Success", "The video added to your bookmark");
      } else {
        Alert.alert(
          "Success",
          "The video has been removed from your bookmarks"
        );
      }
      updateSavedVideos();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsToggling(false);
    }
  };

  const updateSavedVideos = () => {
    if (!video || !video?.$id) {
      return;
    }
    let newSavedVideos = [...user.savedVideos];
    const videoIndex = newSavedVideos?.findIndex(
      (vid) => vid.$id === video?.$id
    );
    if (videoIndex === -1) {
      newSavedVideos.push(video);
    } else {
      newSavedVideos.splice(videoIndex, 1);
    }
    setUser((prev) => ({ ...prev, savedVideos: newSavedVideos }));
  };

  const handleFullScreen = (isFullScreen) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else {
      ScreenOrientation.unlockAsync();
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <View className="w-full h-60 rounded-[33px] mt-3 bg-white/10">
          <Video
            source={{ uri: video.video }}
            style={{ width: "100%", height: "100%", borderRadius: 33 }}
            resizeMode="cover"
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
            onFullscreenUpdate={({ fullscreenUpdate }) => {
              if (
                fullscreenUpdate ===
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
              ) {
                handleFullScreen(true);
              } else {
                handleFullScreen(false);
              }
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleToggleSaveVideo}
            className={`pt-2 ${isToggling ? "opacity-40" : ""}`}
            disabled={isToggling}
          >
            <Image
              source={icons.bookmark}
              className="w-7 h-7 absolute"
              style={{ bottom: 25, left: 130 }}
              tintColor={`${isSaved ? "orange" : "white"}`}
              resizeMode="contain"
              pointerEvents="auto"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
