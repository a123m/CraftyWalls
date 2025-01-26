import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

async function getImageToBase64(imageURL: string) {
  let image;

  try {
    const { uri } = await FileSystem.downloadAsync(
      imageURL,
      FileSystem.documentDirectory + 'bufferimg.png'
    );
    image = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    });
  } catch (err) {
    console.log(err);
    alert('Something went wrong! Try again later.');
  }

  return image;
}

const storage = {
  notificationToken: '',
  imageData: { id: '', largeImageURL: '' },

  setNotificationToken(token: string | undefined) {
    this.notificationToken = token || '';
  },

  getNotificationToken() {
    return this.notificationToken;
  },

  setImageData(data: any) {
    this.imageData = { ...data };
  },

  getImageData() {
    return this.imageData;
  },

  async setFavorites(data: Array<any>, imageData?: any) {
    let favorites = data;

    if (imageData) {
      const base64 = await getImageToBase64(imageData.largeImageURL);
      const fav = { id: imageData.id, largeImageURL: base64 };
      favorites = [...data, fav];
    }

    const result = JSON.stringify(favorites);
    AsyncStorage.setItem('favorites', result);
  },

  async getFavorites(): Promise<any[]> {
    const favorites = await AsyncStorage.getItem('favorites');
    if (!favorites) {
      return [];
    }
    const result = await JSON.parse(favorites);
    return result;
  },
};

export default storage;
