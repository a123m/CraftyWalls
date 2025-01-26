import { Link } from 'expo-router';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
  View,
} from 'react-native';
import { COLORS } from 'src/utils/colors';
import { Image } from 'expo-image';

import { blur_hash } from 'src/utils/constants';

const { width } = Dimensions.get('window');

export const Category = ({
  title,
  source,
}: {
  title: string;
  source: ImageSourcePropType;
}) => {
  return (
    <Link
      asChild
      href={{
        pathname: `categories/${title}`,
        params: { category: title.toLowerCase() },
      }}
      // href={`categories/backgrounds`}
      // onPress={() => console.log('hello', props.title)}
    >
      <TouchableOpacity style={styles.main}>
        <Image
          placeholder={blur_hash}
          source={source}
          style={styles.exploreImage}
        />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 120,
    width: width - 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
  title: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLORS.white,
  },
  exploreImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 10,
  },
});
