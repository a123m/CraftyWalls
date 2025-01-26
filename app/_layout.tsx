import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen
        name='preview/[id]'
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
    </Stack>
  );
};
