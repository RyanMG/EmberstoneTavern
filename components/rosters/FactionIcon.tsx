import { Image, StyleSheet } from 'react-native';

export default function FactionIcon({
  factionName
}: {
  factionName: 'string';
}) {
  return (
    <Image
      style={styles.image}
      source={require('@images/sigmar/chaos/beasts.svg') }
    />
  );
}


const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
});
