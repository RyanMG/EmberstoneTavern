import { View } from 'react-native';
import Button from '@components/common/forms/Button';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import JoinCampaignModal from '@components/campaigns/JoinCampaignModal';

export default function CampaignsListActionButtons() {

  const router = useRouter();
  const [joinModalVisible, setJoinModalVisible] = useState(false);

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, width: '100%'}}>
      <Button
        title="Create Campaign"
        theme="primary"
        onPress={() => {
          router.push('/campaigns/new');
        }}
      />
      <Button
        title="Join Campaign"
        theme="secondary"
        onPress={() => {
          setJoinModalVisible(true);
        }}
      />
      <JoinCampaignModal visible={joinModalVisible} setModalVisible={() => setJoinModalVisible(false)} />
    </View>
  );
}
