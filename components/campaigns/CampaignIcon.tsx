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
      defaultSource={require('@images/campaign_icon.svg')}
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
