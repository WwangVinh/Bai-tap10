import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Tạo các giá trị Animated để điều khiển độ mờ của ba dấu chấm
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hiệu ứng nhấp nháy cho các dấu chấm
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot1Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(dot2Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(dot3Opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();
    };

    animateDots();

    // Chuyển sang màn hình Login sau vài giây (tùy chọn)
    const timeout = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/splash-image.png')}  // Đảm bảo đường dẫn đúng đến ảnh của bạn
          style={styles.image} 
        />
      </View>
      <Text style={styles.title}>Scan, Pay & Enjoy!</Text>
      <Text style={styles.description}>
        Scan products you want to buy at your favorite store and pay by your phone & enjoy happy, friendly Shopping!
      </Text>

      {/* Ba dấu chấm với hiệu ứng */}
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1Opacity, backgroundColor: '#f0f0f0' }]} />
        <Animated.View style={[styles.dot, { opacity: dot2Opacity, backgroundColor: '#f0f0f0' }]} />
        <Animated.View style={[styles.dot, { opacity: dot3Opacity, backgroundColor: '#3498db' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default SplashScreen;
