import React from "react";
import { Pressable, Avatar } from "./core";

const ProfileAvatar: React.FC = () => {
  return (
    <Pressable onPress={() => console.log("hello")}>
      <Avatar bgColor="#194E8B" size="sm" borderRadius="$full">
        <Avatar.FallbackText></Avatar.FallbackText>
        <Avatar.Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          }}
        />
      </Avatar>
    </Pressable>
  );
};

export default ProfileAvatar;
