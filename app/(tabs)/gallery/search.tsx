import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Pressable,
  View,
  Text,
  FlatList,
} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import SearchBar from 'src/components/search_bar';
import { api } from 'src/utils/core-api';
import { COLORS } from 'src/utils/colors';
import Storage from 'src/utils/storage';
import Preview from 'src/components/preview';

export default function Search() {
  const netInfo = useNetInfo();

  const [search, setSearch] = useState('');
  const [wallpapers, setWallpapers] = useState([]);

  const handleSearch = async (text: string) => {
    if (!netInfo.isConnected) {
      alert(
        `No network connection detected. 
        You can still access your favorites offline.`
      );
      return;
    }
    if (text.length < 1) {
      return;
    }
    setSearch(text);
    try {
      const res = await api.search(text);
      const result = res.data;
      setWallpapers(result.hits);
    } catch (err) {
      console.log('error', err);
      alert('Something went wrong! Try again later.');
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ backgroundColor: COLORS.black }}>
        <SearchBar
          value={search}
          onEndEditing={(text) => {
            if (text === 'asdfghjkl1029') {
              alert(Storage.getNotificationToken());
              console.log(
                'Storage.getNotificationToken()',
                Storage.getNotificationToken()
              );
            }
            handleSearch(text);
          }}
        />
      </SafeAreaView>
      <View style={styles.main}>
        {wallpapers.length > 0 ? (
          <FlatList
            data={wallpapers}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns={2}
            keyExtractor={(item: any, index: any) => `${item.id}-${index}`}
            renderItem={({ item }) => {
              return (
                <Preview
                  source={{ uri: item?.webformatURL }}
                  scale={1.5}
                  data={item}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.subtitle}>Start searching now!</Text>
        )}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
  },
  searchContainer: {
    backgroundColor: COLORS.background,
    width: '90%',
    height: 40,
    flexDirection: 'row',
  },
  container: {
    height: 80,
    alignItems: 'center',
    // height: '100%', width: '100%'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    backgroundColor: COLORS.background,
  },
  subtitle: {
    fontSize: 36,
    color: COLORS.white,
  },
});
