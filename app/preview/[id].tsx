import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import * as FileSystem from 'expo-file-system';
// import { shareAsync } from 'expo-sharing';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';

import Storage from 'src/utils/storage';
import Toast from 'src/components/toaster';

import { COLORS } from 'src/utils/colors';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : process.env.EXPO_PUBLIC_REWARDED_AD ?? '';

export default function Page() {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [lockView, setLockView] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {
    isLoaded,
    isClosed,
    load,
    show: showAdLoad,
  } = useRewardedAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const navigation = useNavigation();

  const { id } = useGlobalSearchParams();

  const imageData = Storage.getImageData();

  const ToastRef = useRef(null);

  useEffect(() => {
    getData();
    // Start loading the rewarded straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      handleDownload();
    }
  }, [isClosed]);

  const getData = async () => {
    try {
      const favorites = await Storage.getFavorites();
      const result = favorites.find((item) => item.id == id);
      if (result) {
        setFavorite(true);
      }
    } catch (e) {
      console.log('error', e);
      alert('Something went wrong! Try again later.');
    } finally {
      setShow(false);
    }
  };

  const showAd = () => {
    if (!isLoaded) {
      return handleDownload();
    }
    showAdLoad();
  };

  const handleDownload = async () => {
    setDisabled(true);
    let date = new Date().toISOString();
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    try {
      let toSave = '';
      if (!imageData.largeImageURL.includes('http')) {
        await FileSystem.writeAsStringAsync(fileUri, imageData.largeImageURL, {
          encoding: FileSystem.EncodingType.Base64,
        });
        toSave = fileUri;
      } else {
        const { uri } = await FileSystem.downloadAsync(
          imageData.largeImageURL,
          fileUri
        );
        toSave = uri;
      }

      // if (share) {
      //   shareAsync(toSave);
      //   return;
      // }
      const result = await saveFile(toSave);
      if (result) {
        Alert.alert('Congratulations 🎉', 'Wallpaper downloaded successfully!');
        // showToast();
      }
    } catch (err) {
      console.log('FS Err: ', err);
      alert('Something went wrong please try again later!');
    } finally {
      setDisabled(false);
    }
  };

  const handleFavorite = async () => {
    const favorites = await Storage.getFavorites();
    if (favorite) {
      const result = favorites.filter((item) => item.id !== imageData.id);
      Storage.setFavorites(result);
    } else {
      if (favorites.length >= 20) {
        alert('Favorites limit reached!');
        return;
      }
      Storage.setFavorites(favorites, imageData);
    }
    setFavorite(!favorite);
  };

  const saveFile = async (fileUri: string) => {
    let result = null;
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

    const { accessPrivileges } = mediaLibraryPermission;
    if (accessPrivileges === 'all') {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');

        if (album == null) {
          result = await MediaLibrary.createAlbumAsync(
            'Download',
            asset,
            false
          );
        } else {
          result = await MediaLibrary.addAssetsToAlbumAsync(
            [asset],
            album,
            false
          );
        }
      } catch (err: any) {
        console.log('Save err: ', err);
        alert(err.message);
      } finally {
        return result;
      }
    } else {
      Alert.alert('Alert', 'Please allow full access to perform the action.', [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => Linking.openSettings() },
      ]);
      return result;
    }
  };

  const toggleLockView = () => {
    setLockView(!lockView);
  };

  return (
    <View style={styles.container}>
      <Toast ref={ToastRef} message='Hello World!' />
      {show ? (
        <ActivityIndicator size={'large'} style={styles.activityIndicator} />
      ) : (
        <ImageBackground
          source={
            imageData.largeImageURL.includes('http')
              ? {
                  uri: imageData.largeImageURL,
                }
              : {
                  uri: `data:image/png;base64,${imageData.largeImageURL}`,
                }
          }
          style={styles.exploreImage}
          onLoadEnd={() => setLoading(false)}
        >
          {lockView ? (
            <Pressable style={{ flex: 1 }} onPress={toggleLockView}>
              <SafeAreaView style={styles.header}>
                <Ionicons name='ios-lock-closed' size={20} color='white' />
                <Text style={styles.date}>
                  {moment().format('dddd, DD MMMM')}
                </Text>
                <Text style={styles.time}>{moment().format('hh:mm')}</Text>
              </SafeAreaView>
              <View style={styles.footer}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name='flashlight'
                    size={24}
                    color='white'
                  />
                </View>

                <View style={styles.icon}>
                  <Ionicons name='ios-camera' size={24} color='white' />
                </View>
              </View>
            </Pressable>
          ) : (
            <>
              {loading && (
                <ActivityIndicator
                  size={'large'}
                  style={styles.activityIndicator}
                />
              )}
              <SafeAreaView>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Ionicons
                    name={'chevron-down-outline'}
                    color={COLORS.white}
                    size={30}
                  />
                </TouchableOpacity>
              </SafeAreaView>

              <View style={styles.smallContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleFavorite}
                    style={[
                      disabled ? styles.disabledStyle : styles.iconButton,
                    ]}
                    disabled={disabled}
                  >
                    <Ionicons
                      name={favorite ? 'heart' : 'heart-outline'}
                      color={COLORS.white}
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={showAd}
                    style={[
                      disabled ? styles.disabledStyle : styles.iconButton,
                    ]}
                    disabled={disabled}
                  >
                    <Ionicons
                      name={'cloud-download-outline'}
                      color={COLORS.white}
                      size={50}
                    />
                    <Ionicons
                      name={'play-circle'}
                      color={COLORS.white}
                      size={20}
                      style={{
                        position: 'absolute',
                        right: -6,
                        bottom: -2,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleLockView}
                    style={[
                      disabled ? styles.disabledStyle : styles.iconButton,
                    ]}
                    disabled={disabled}
                  >
                    <Ionicons
                      name={'phone-portrait-outline'}
                      color={COLORS.white}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  exploreImage: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    color: COLORS.white,
  },
  smallContainer: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'black',
    marginBottom: 100,
    width: '70%',
    alignItems: 'flex-end',
  },
  iconButton: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
  },
  backButton: {
    marginLeft: 30,
  },
  disabledStyle: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
    opacity: 0.5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  date: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: '#00000050',
    width: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
