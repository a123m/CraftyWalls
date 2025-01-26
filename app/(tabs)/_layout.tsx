import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from 'src/utils/colors';

export default () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarStyle: {
          height: 100,
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: COLORS.black,
          position: 'absolute',
          borderTopWidth: 0,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        },
      })}
    >
      <Tabs.Screen
        name='categories'
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='gallery'
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'images' : 'images-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarLabel: 'Settings',
          tabBarIconStyle: { color: 'white' },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};
