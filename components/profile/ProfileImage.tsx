import { Pressable, Image, StyleSheet } from 'react-native';

export default function ProfileImage({
  image
}: {
  image: string | undefined
}) {
  return (
    <Pressable style={styles.imageContainer} onPress={() => console.log('TODO Upload avatar image')}>
      <Image
        style={styles.image}
        source={{ uri: image }}
        defaultSource={require('@images/blank-profile.png')}
      />
    </Pressable>

  );
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 10
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 100
  },
});

