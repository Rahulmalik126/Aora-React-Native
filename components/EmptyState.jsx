import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

// Empty State Component to show if there are no videos/Posts
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[70px] h-[26px] -mt-4"
        style={{width:150, height:150}}
        resizeMode="contain"
      />

      <Text className="text-sm font-pmedium text-gray-100 mb-3">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2 mb-3">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5 mb-3"
      />
    </View>
  );
};

export default EmptyState;
