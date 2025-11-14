import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import mockedData from '@/assets/mockedData';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function DetailsScreen() {
  const styles = useDetailsScreenStyles();
  const params = useLocalSearchParams();

  const itemId = params.itemId as string;
  const item = mockedData.items.find(i => i.id === itemId)!;

  const player = useVideoPlayer(item?.streamUrl || '', player => {
    player.loop = true;
    if (item?.streamUrl) {
      player.play();
    }
  });

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  // const { status, error } = useEvent(player, 'statusChange', { status: player.status });

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{item?.title || 'Details'}</ThemedText>
      </ThemedView>
      <ThemedText>{item.description}</ThemedText>
      <ThemedText>Duration: {item.duration}s</ThemedText>
      <VideoView style={styles.video} player={player} tvFocusable={true} />
    </View>
  );
}

const useDetailsScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * scale
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale
    },
    video: {
      width: '100%',
      height: 300 * scale,
      flex: 1
    }
  });
};
