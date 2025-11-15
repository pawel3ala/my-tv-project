import { StyleSheet, FlatList, View, ListRenderItem, ActivityIndicator, Text } from 'react-native';

import { useScale } from '@/hooks/useScale';
import { Item } from '@/assets/mockedData';
import ListItemComponent from '@/components/list-item/list-item.component';
import useGetData from '@/hooks/use-get-data.hook';
import { useCallback } from 'react';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  const renderItem: ListRenderItem<Item> = useCallback(({ item }) => <ListItemComponent item={item} />, []);
  const { data, loading, error } = useGetData();

  if (loading) {
    return <ActivityIndicator testID="loading-indicator" size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text testID="error-message">Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container} testID="home-screen-container">
      <FlatList testID="flat-list" data={data} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 8 * scale
    }
  });
};
