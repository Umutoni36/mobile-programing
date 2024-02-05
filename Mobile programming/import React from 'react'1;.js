import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const images = [
  { id: 1, source: require('./assets/imageone.jpg') },
  { id: 2, source: require('./assets/imagetwo.jpg') },
  // Add more images as needed
];

const App = () => {
  const screenWidth = Dimensions.get('window').width;

  const renderGrid = () => {
    return images.map((image) => (
      <View key={image.id} style={styles.gridItem}>
        <Image source={image.source} style={styles.image} resizeMode="cover" />
      </View>
    ));
  };

  const renderCarousel = () => {
    return (
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.source} style={styles.image} resizeMode="cover" />
          </View>
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        layout="default"
        loop
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {screenWidth >= 768 ? (
        <ScrollView contentContainerStyle={styles.gridContainer}>{renderGrid()}</ScrollView>
      ) : (
        <View style={styles.carouselContainer}>{renderCarousel()}</View>
      )}
    </SafeAreaView>
  );
};

App.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '50%',
    aspectRatio: 1,
    padding: 5,
  },
  carouselContainer: {
    flex: 1,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
