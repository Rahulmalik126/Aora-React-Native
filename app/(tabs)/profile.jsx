import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { icons } from "../../constants";
import useAppWrite from "../../lib/useAppWrite";
import { getUserPosts, signOut } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

//Profile Component Tab
const Profile = () => {
  const { user, setUser, setIsLogged,playingVideo,setPlayingVideo } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));
  //Function to Sign Out for the app
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  useFocusEffect(
    useCallback(() => {
      // Reset the playing video when leaving the screen
      return () => {
        setPlayingVideo(null); // Stop the video when navigating away
      };
    }, [setPlayingVideo])
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            playingVideo={playingVideo}
            setPlayingVideo={setPlayingVideo}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
