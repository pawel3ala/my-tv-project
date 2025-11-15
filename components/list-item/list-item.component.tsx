import { View, Text, Pressable, StyleSheet, ImageErrorEventData } from 'react-native';
import { useScale } from '@/hooks/useScale';
import { useRouter } from 'expo-router';
import { Item } from '@/assets/mockedData';
import { Image } from 'expo-image';
import { useCallback } from 'react';

const ListItemComponent = ({ item: { id, title, thumbnail } }: { item: Item }) => {
  const styles = useHomeScreenStyles();
  const router = useRouter();
  const scale = useScale();

  const handleOnPress = useCallback(() => {
    router.navigate({ pathname: '/details', params: { itemId: id } });
  }, [id, router]);

  const handleOnError = useCallback((error: ImageErrorEventData) => {
    console.log('error', error);
    // TODO: send error to Sentry/Crashlitics
  }, []);

  return (
    <Pressable onPress={handleOnPress} style={styles.container} testID="list-item-container">
      {({ focused }) => (
        <View style={styles.subContainer}>
          <Image
            source={thumbnail}
            style={[styles.thumbnail, focused && { transform: [{ scale: 1.1 }] }]}
            onError={handleOnError}
            contentFit="fill"
          />
          <Text style={[styles.title, focused && { fontWeight: 'bold', fontSize: 21 * scale }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ListItemComponent;

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      gap: 8 * scale,
      padding: 8 * scale
    },
    thumbnail: {
      width: 100 * scale,
      height: 100 * scale,
      borderRadius: 10 * scale,
      overflow: 'hidden'
    },
    subContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
      width: '100%'
    },
    title: {
      fontSize: 16 * scale,
      lineHeight: 24 * scale
    }
  });
};
