// REACT NATIVE
import { GameEngine } from "react-native-game-engine";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";



// CUSTOM COMPONENTS
import Constants from "./Constants";
import Head from "./components/Head";
import Food from "./components/Food";
import Tail from "./components/Tail";
import GameLoop from "./systems/GameLoop";




export default function App() {

  // INIT CONSTANTS
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);

  // RANDOM NUMBER GENERATION
  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // GAME STATE
  const [isGameRunning, setIsGameRunning] = useState(true);


  return (
    <View style={styles.canvas}>

      {/* GAME ENGINE COMPONENT */}
      <GameEngine
        ref={engine}

        style={{
          width: BoardSize,
          height: BoardSize,
          flex: false,
          backgroundColor: "white",
        }}

        // GAME OBJECTS
        entities={{
          head: {
            position: [ Constants.GRID_SIZE/2 , Constants.GRID_SIZE/2],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: Constants.SNAKE_SPEED,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            position: [Constants.GRID_SIZE, Constants.GRID_SIZE],
            renderer: <Tail />,
          }
        }}

        // main loop
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case "game-over":
              alert("Game over!");
              setIsGameRunning(false);
              return;
          }
        }}
      />



      {/* CONTROLLER VIEW (placed into three rows as <views>) */}
      <View style={styles.controlContainer}>

        <View style={styles.controllerRow}> {/* row 1 */}
          {/* UP BUTTON */}
          <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>


        <View style={styles.controllerRow}>  {/* row 2 */}
          {/* LEFT BUTTON */}
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-left")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>

          {/* CENTER DEAD SPACE */}
          <View style={[styles.controlBtn, { backgroundColor: null }]} />

          {/* RIGHT BUTTON */}
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-right")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>


        <View style={styles.controllerRow}>  {/* row 3 */}
          {/* DOWN BUTTON */}
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-down")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>



      </View>



    </View>
  );
}





const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "yellow",
    width: 100,
    height: 100,
  },
});