
import React from "react";
import { View } from "react-native";


const Tail = ({ elements, position, size }) => {

    // ENUMERATE ALL TAIL OBJECTS
    const tailList = elements.map((el, idx) => (
        <View
            key={idx}
            style={{
                width: size,
                height: size,
                position: "absolute",
                left: el[0] * size,
                top: el[1] * size,
                backgroundColor: "red",
            }}
        />
    ));



    // RETURN ENUMERATED LIST OF TAIL OBJECTS
    return (
        <View
            style={{
                width: position[0] * size,
                height: position[1] * size,
            }}
        >
            {tailList}
        </View>
    )
}

export default Tail
