import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';

import Storage from 'src/utils/storage';
import Preview from 'src/components/preview';
import { COLORS } from 'src/utils/colors';

export default function Page() {
  const [favorites, setFavorites] = useState([] as Array<any>);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const result = await Storage.getFavorites();
    setFavorites(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns={2}
            keyExtractor={(item: any, index: any) => `${item.id}-${index}`}
            renderItem={({ item }) => {
              return (
                <Preview
                  source={{
                    uri: `data:image/png;base64,${item.largeImageURL}`,
                  }}
                  scale={1.5}
                  data={item}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.subtitle}>Nothing in favorites.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: COLORS.white,
  },
});
