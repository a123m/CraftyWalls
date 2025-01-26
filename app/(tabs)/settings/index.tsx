import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from 'src/utils/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `mailto:${process.env.EXPO_PUBLIC_CONTACT_US}?subject=Support`;
const privacyPolicyUrl = `https://www.privacypolicies.com/live/8f3d7f7e-3d74-44e3-9754-5b5a52406609`;
const rateAppURL = `https://apps.apple.com/app/id6468800036?action=write-review`;

export default function Settings() {
  const [allowNotification, setAllowNotification] = useState(true);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.containerStyle}>
        <View style={styles.smallContainer}>
          <Text style={styles.textStyle}>Notification</Text>
          <Switch
            value={allowNotification}
            onValueChange={() => {
              setAllowNotification(!allowNotification);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.smallContainer}
          onPress={() =>
            AsyncStorage.clear().then(() => alert('Favorites cleared'))
          }
        >
          <Text style={styles.textStyle}>Clear Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallContainer}
          onPress={() =>
            Linking.canOpenURL(url)
              .then((supported) => {
                if (!supported) {
                  alert('No application found for mail!');
                } else {
                  Linking.openURL(url);
                }
              })
              .catch((err) => console.log('unexpected err', err))
          }
        >
          <Text style={styles.textStyle}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallContainer}
          onPress={() =>
            Linking.canOpenURL(privacyPolicyUrl)
              .then((supported) => {
                if (!supported) {
                  alert('No application found for mail!');
                } else {
                  Linking.openURL(privacyPolicyUrl);
                }
              })
              .catch((err) => console.log('unexpected err', err))
          }
        >
          <Text style={styles.textStyle}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallContainer}
          onPress={() =>
            Linking.canOpenURL(rateAppURL)
              .then((supported) => {
                if (!supported) {
                  alert('No application found for mail!');
                } else {
                  Linking.openURL(rateAppURL);
                }
              })
              .catch((err) => console.log('unexpected err', err))
          }
        >
          <Text style={styles.textStyle}>Rate Our App</Text>
        </TouchableOpacity>
        <View style={styles.smallContainer}>
          <Text style={styles.textStyle}>App Version</Text>
          <Text style={[styles.textStyle]}>1.0.4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 10,
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
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
    color: '#38434D',
  },
});
