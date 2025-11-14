import { StyleSheet, FlatList, View, ListRenderItem } from 'react-native';

import { useScale } from '@/hooks/useScale';
import mockedData, { Item } from '@/assets/mockedData';
import ListItemComponent from '@/components/list-item/list-item.component';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  const renderItem: ListRenderItem<Item> = ({ item }: { item: Item }) => <ListItemComponent item={item} />;

  return (
    <View style={styles.container}>
      <FlatList data={mockedData.items} renderItem={renderItem} keyExtractor={item => item.id} />
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
