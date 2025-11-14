import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Item } from '@/assets/mockedData';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import useGetData from '@/hooks/use-get-data.hook';

export default function DetailsScreen() {
  const styles = useDetailsScreenStyles();
  const { itemId } = useLocalSearchParams<{ itemId: Item['id'] }>();
  const { getDataFromId, loading, error } = useGetData();
  const item = getDataFromId(itemId);

  const player = useVideoPlayer(item?.streamUrl ?? '', player => {
    player.loop = true;
    if (streamUrl) {
      player.play();
    }
  });

  const { error: playerError } = useEvent(player, 'statusChange', { status: player.status });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!item) {
    return <Text>Item not found</Text>;
  }

  const { description, duration, streamUrl, title } = item;

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title || 'Details'}</ThemedText>
      </ThemedView>
      <ThemedText>{description}</ThemedText>
      <ThemedText>Duration: {duration}s</ThemedText>
      {playerError && <ThemedText>Error: {playerError.message}</ThemedText>}
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
