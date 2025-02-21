import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import { getSavedPosts } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";

//BookMark Component For Videos saved by the user
const Bookmark = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user, playingVideo, setPlayingVideo } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getSavedPosts(user.$id));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const reloadOnUpdate = async () => {
    await refetch();
  };

  // Refetch on saved video change
  useEffect(() => {
    reloadOnUpdate();
  }, [user]);


  useFocusEffect(
    useCallback(() => {
      return () => {
        setPlayingVideo(null); // Stop the video when navigating away
      };
    },[])
  );

  return (
    <SafeAreaView className="bg-primary h-full border-0">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item}
            user={user}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            playingVideo={playingVideo}
            setPlayingVideo={setPlayingVideo}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <Text className="text-2xl text-white font-psemibold pb-8">
              Saved Videos
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Saved Videos Found"
            subtitle="Your saved videos will show here"
            btnText="Back to Explore"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;