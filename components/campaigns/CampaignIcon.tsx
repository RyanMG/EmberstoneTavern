import { Image, StyleSheet } from 'react-native';

export default function CampaignIcon({
  iconLink
}: {
  iconLink: string;
}) {
  return (
    <Image
      style={styles.image}
      source={{ uri: iconLink }}
      defaultSource={require('@images/campaign_icon.png')}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
});
