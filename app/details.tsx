import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

export default function DetailsScreen() {
  const styles = useDetailsScreenStyles();
  const scale = useScale();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310 * scale} name="information-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Details</ThemedText>
      </ThemedView>
      <ThemedText>This is the details screen.</ThemedText>
    </ParallaxScrollView>
  );
}

const useDetailsScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90 * scale,
      left: -35 * scale,
      position: 'absolute'
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale
    }
  });
};

