import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from 'src/utils/colors';

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Gallery',
          headerStyle: {
            backgroundColor: COLORS.black,
            // shadowColor: 'transparent', // this covers iOS
            // elevation: 0, // this covers Android
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerLeft: () => (
            <Link href={'gallery/favorites'}>
              <Ionicons
                name='heart-outline'
                color={COLORS.white}
                size={25}
                style={{ paddingLeft: 10 }}
              />
            </Link>
          ),
          headerRight: () => (
            <Link href={'gallery/search'}>
              <Ionicons name='search-outline' color={COLORS.white} size={25} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='search'
        options={{
          headerTitle: 'Search',
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerTintColor: COLORS.white,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='favorites'
        options={{
          headerTitle: 'Favorites',
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 25,
          },
          // presentation: 'modal',
          animation: 'fade_from_bottom',
          headerTintColor: COLORS.white,
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};
