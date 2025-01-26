import { useEffect, useState, useCallback } from 'react';
import {
  useLocalSearchParams,
  useGlobalSearchParams,
  Stack,
} from 'expo-router';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import NetInfo from '@react-native-community/netinfo';

import Preview from 'src/components/preview';

import { COLORS } from 'src/utils/colors';
import { api } from 'src/utils/core-api';

const { width } = Dimensions.get('window');

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : process.env.EXPO_PUBLIC_INTERSTITIAL_AD ?? '';

export default function Gallery() {
  const [isBusy, setIsBusy] = useState(true);
  const [exploreItems, setExploreItems] = useState([] as Array<any>);
  const [page, setPage] = useState(1);
  const [noInternet, setNoInternet] = useState(false);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const { name } = useGlobalSearchParams();
  const params: { name?: string; category?: any } = useLocalSearchParams();

  let counter = 0;

  useEffect(() => {
    fetchExploreItems();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
  }, [isLoaded]);

  useFocusEffect(
    useCallback(() => {
      counter = counter + 1;
      if (counter % 4 === 0) {
        load();
      }
    }, [load])
  );

  const depthApiCall = () => {
    api
      .search('depth', page, 200)
      .then((res: any) => {
        const data = res.data;
        setExploreItems([...exploreItems, ...data.hits]);
        setPage(page + 1);
      })
      .catch((e) => {
        console.log('error', e.message);
        alert('Something went wrong! Try again later.');
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const fetchExploreItems = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setNoInternet(true);
      alert(
        `No network connection detected. 
        You can still access your favorites offline.`
      );
      return;
    }

    if (params.category.toLowerCase() === 'depth') {
      return depthApiCall();
    }

    api
      .getImages(
        {
          safesearch: true,
          order: 'latest',
          category: params.category,
          orientation: 'vertical',
        },
        page,
        200
      )
      .then((res: any) => {
        const data = res.data;
        setExploreItems([...exploreItems, ...data.hits]);
        setPage(page + 1);
      })
      .catch((e) => {
        console.log('error', e.message);
        alert('Something went wrong! Try again later.');
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  if (noInternet) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: `${params.name}`,
          }}
        />
        <View style={styles.main}>
          <Text style={styles.subtitle}>No Internet!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${params.name}`,
        }}
      />
      {isBusy ? (
        <ActivityIndicator size='large' style={styles.loader} />
      ) : (
        <FlatList
          data={exploreItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          numColumns={3}
          keyExtractor={(item, index) => `${item.id}${index}`}
          onEndReached={fetchExploreItems}
          onEndReachedThreshold={2}
          renderItem={({ item, index }) => {
            return <Preview source={{ uri: item?.webformatURL }} data={item} />;
            const myIndex = index * 3;
            return (
              <View style={{ flexDirection: 'row' }}>
                {index % 2 !== 0 && (
                  <Preview
                    scale={2}
                    source={{ uri: exploreItems[myIndex + 2]?.largeImageURL }}
                    data={exploreItems[myIndex + 2]}
                  />
                )}
                <View>
                  <Preview
                    source={{ uri: exploreItems[myIndex]?.previewURL }}
                    data={exploreItems[myIndex]}
                  />
                  <Preview
                    source={{ uri: exploreItems[myIndex + 1]?.previewURL }}
                    data={exploreItems[myIndex + 1]}
                  />
                </View>
                {index % 2 === 0 && (
                  <Preview
                    scale={2}
                    source={{ uri: exploreItems[myIndex + 2]?.largeImageURL }}
                    data={exploreItems[myIndex + 2]}
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // padding: 24,
    backgroundColor: COLORS.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexWrap: 'wrap',
    backgroundColor: '#f9c2ff',
    padding: 20,
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
  },

  item2: {
    flexWrap: 'wrap',
    backgroundColor: '#f9c2ff',
    padding: 20,
    width: width / 2,
    height: width / 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  subtitle: {
    fontSize: 36,
    color: COLORS.white,
  },
});
