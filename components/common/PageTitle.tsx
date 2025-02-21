import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/lib/constants/Colors';
import { Link } from 'expo-router';

export default function PageTitle({
  text,
  back
}: {
  text: string,
  back?: '/campaigns'
}) {
  return (
    <View style={styles.titleContainer}>
      {back && (
        <Link href={back} style={styles.backButton}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>
      )}
      <Text style={styles.title}>{text}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER.GREEN
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
    color: Colors.TEXT.GREEN
  },
  backButton: {
    marginTop: 3,
    marginRight: 10
  }
});
