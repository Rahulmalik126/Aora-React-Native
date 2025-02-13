import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// Custom Button Component
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#FF9001',
        color:'#161622',
        borderRadius: 10, 
        height: 62,
        display: 'flex',
        // width:"90%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
