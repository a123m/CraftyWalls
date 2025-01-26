import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';

import { blur_hash } from 'src/utils/constants';
import Storage from 'src/utils/storage';

const { width } = Dimensions.get('window');

const GRID_PADDING = 5;
const IMAGE_SIZE = (width - GRID_PADDING * 2) / 3;

type ItemProps = { source: ImageSourcePropType; scale?: number; data: any };

const ExplorePageImage = ({ source, scale = 1, data }: ItemProps) => {
  const size = IMAGE_SIZE * scale;
  return (
    <Link
      asChild
      // href={{
      //   pathname: 'preview/[id]',
      //   params: { id: data.id },
      // }}
      onPress={() => Storage.setImageData(data)}
      href={`preview/${data?.id}`}
    >
      <TouchableOpacity
        style={{ height: size * 1.5, width: size, padding: GRID_PADDING }}
      >
        <Image
          placeholder={blur_hash}
          source={source}
          style={styles.exploreImage}
          contentFit='cover'
          transition={1000}
        />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  exploreImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 10,
  },
});

export default ExplorePageImage;
