import { StyleSheet, View, ScrollView } from 'react-native';

import { Category } from 'src/components/category';

import { COLORS } from 'src/utils/colors';

const arr = [
  {
    title: 'Depth',
    source: require('CraftyWalls/assets/backgrounds.jpeg'),
  },
  {
    title: 'Fashion',
    source: require('CraftyWalls/assets/fashion.jpg'),
  },
  {
    title: 'Nature',
    source: require('CraftyWalls/assets/nature.jpg'),
  },
  {
    title: 'Science',
    source: require('CraftyWalls/assets/science.jpg'),
  },
  {
    title: 'Education',
    source: require('CraftyWalls/assets/education.jpg'),
  },
  {
    title: 'Feelings',
    source: require('CraftyWalls/assets/feelings.jpg'),
  },
  {
    title: 'Health',
    source: require('CraftyWalls/assets/health.jpg'),
  },
  {
    title: 'People',
    source: require('CraftyWalls/assets/people.jpg'),
  },
  {
    title: 'Religion',
    source: require('CraftyWalls/assets/religion.jpg'),
  },
  {
    title: 'Places',
    source: require('CraftyWalls/assets/places.jpg'),
  },
  {
    title: 'Animal',
    source: require('CraftyWalls/assets/animal.jpg'),
  },
  {
    title: 'Industry',
    source: require('CraftyWalls/assets/industry.jpg'),
  },
  {
    title: 'Computer',
    source: require('CraftyWalls/assets/computer.jpg'),
  },
];

export default function Categories() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {arr.map((item, index) => (
          <Category key={index} source={item.source} title={item.title} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
