import { Stack } from 'expo-router';
import { COLORS } from 'src/utils/colors';

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Categories',
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name='[name]'
        options={{
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
    </Stack>
  );
};
