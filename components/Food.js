import React from "react";
import { View } from "react-native";

const Food = ({ position, size }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: "green",
                position: "absolute",
                left: position[0] * size,
                top: position[1] * size,
                borderRadius: 50
            }}
        ></View>
    )
}

export default Food
