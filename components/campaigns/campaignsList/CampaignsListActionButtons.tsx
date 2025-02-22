import { View } from 'react-native';
import Button from '@components/common/forms/Button';
import { useState } from 'react';
import CreateNewCampaignModal from '@components/campaigns/createNew/CreateNewModal';
import JoinCampaignModal from '@components/campaigns/JoinCampaignModal';

export default function CampaignsListActionButtons() {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10, width: '100%'}}>
      <Button
        title="Create Campaign"
        theme="primary"
        onPress={() => {
          setCreateModalVisible(true);
        }}
      />
      <Button
        title="Join Campaign"
        theme="secondary"
        onPress={() => {
          setJoinModalVisible(true);
        }}
      />
      <CreateNewCampaignModal visible={createModalVisible} setModalVisible={() => setCreateModalVisible(false)} />
      <JoinCampaignModal visible={joinModalVisible} setModalVisible={() => setJoinModalVisible(false)} />

    </View>
  );
}
