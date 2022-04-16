import React from "react";
import { View } from "react-native";



const Head = ({size , position}) => {




    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: "red",
                position: "absolute",
                left: position[0] * size,
                top: position[1] * size,
            }}
        ></View>
    )
}

export default Head
