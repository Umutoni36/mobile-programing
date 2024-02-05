import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const App = () => {
  const Header = () => {
    return (
      <View style={styles.header}>
        <Text>Layout</Text>
      </View>
    );
  };

  const Boxes = () => {
    const [columnCount, setColumnCount] = useState(2);

    useEffect(() => {
      const screenWidth = Dimensions.get('window').width;

      if (screenWidth >= 768) {
        setColumnCount(3); // 3 columns for larger screens
      } else {
        setColumnCount(2); // 2 columns for smaller screens
      }
    }, []);

    const renderBoxes = () => {
      const boxes = Array.from({ length: 6 }, (_, index) => index + 1); // Array of box data

      return boxes.map((box) => (
        <View key={box} style={[styles.box, { width: `${100 / columnCount}%` }]}>
          <View style={styles.inner}>
            <Text>Box {box}</Text>
          </View>
        </View>
      ));
    };

    return <View style={styles.boxContainer}>{renderBoxes()}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Boxes />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    width: '100%',
    height: '90%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    padding: 5,
    
  },
  inner: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
