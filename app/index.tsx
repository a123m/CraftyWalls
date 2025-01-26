import { Redirect } from 'expo-router';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Storage from 'src/utils/storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const notificationList = [
  {
    title: 'Daily Wallpaper Inspiration',
    body: "Start your day with a fresh look. Today's daily wallpaper is ready for you!",
    sound: 'default',
  },
  {
    title: 'New Wallpaper Alert!',
    body: 'Check out the stunning additions we just added to our collection.',
    sound: 'default',
  },
  {
    title: 'Category Update!',
    body: "Explore new wallpapers in the 'Nature' category. Find the beauty of the great outdoors.",
    sound: 'default',
  },
  {
    title: 'Wallpaper Reminders',
    body: "Don't forget to change your wallpaper! Set a reminder to update your screen's style.",
    sound: 'default',
  },
  {
    title: 'Personalized Recommendations',
    body: 'Based on your interests, we recommend these wallpapers just for you. Check them out!',
    sound: 'default',
  },
];

export default function App() {
  useEffect(() => {
    scheduleNotification();
  }, []);

  const scheduleNotification = async () => {
    const token = await registerForPushNotificationsAsync();
    Storage.setNotificationToken(token);

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: notificationList[Math.floor(Math.random() * 5) + 1],
      trigger: {
        seconds: 10 * 60 * 60,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: notificationList[Math.floor(Math.random() * 5) + 1],
      trigger: {
        seconds: 30 * 60 * 60,
      },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href={'gallery'} />
    </GestureHandlerRootView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push access for push notification!');
    return;
  }
  token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PUBLIC_EXPO_NOTIFICATION_KEY,
    })
  ).data;

  return token;
}
