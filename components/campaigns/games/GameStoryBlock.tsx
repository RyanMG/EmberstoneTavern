import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import BodyText from "@components/common/text/BodyText";
import Divider from "@components/common/Divider";
import IconButton from "@components/common/forms/IconButton";
import ModalWrapper from "@components/common/ModalWrapper";
import Button from "@components/common/forms/Button";
import Spacer from "@components/common/Spacer";

import { useAuth } from "@context/AuthContext";
import COLORS from "@constants/colors";
import { TCampaignGame } from "@definitions/campaign";
import { updateGameStory } from "@api/gameApi";

interface IGameStoryBlockProps {
  game: TCampaignGame;
  story: string | undefined;
}

export default function GameStoryBlock({
  game,
  story
}: IGameStoryBlockProps) {
  const { authState } = useAuth();
  const queryClient = useQueryClient();

  const [editStory, setEditStory] = useState<boolean>(false);
  const [storyText, setStoryText] = useState<string>(story || "");

  const updateGameStoryMutation = useMutation({
    mutationFn: (story: string) => updateGameStory(game.campaign.id, game.id, story),
    onSuccess: () => {
      setEditStory(false);
      queryClient.invalidateQueries({
        queryKey: ['campaignGame', {id: game.campaign.id, gameId: game.id}],
      });
    }
  });

  return (
    <View style={{display: 'flex', flexDirection: 'column', width: '100%', borderWidth: 1, borderColor: COLORS.BORDER.BASE, borderRadius: 5, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10}}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 10}}>
        <BodyText bold={true} center={true} textSize="xl">Story</BodyText>
        {(authState.activeUser?.isSameAs(game.winner!.id) || authState.activeUser?.isSameAs(game.opponent!.id)) && (
          <IconButton iconName={editStory ? "check" : "pencil"} onPress={() => {
            setEditStory(!editStory);
          }} />
        )}
      </View>

      <Divider />
      <View style={{paddingVertical: 10}}>
        {(storyText === "" || storyText === null) && <BodyText center={true} italic={true} textSize="sm">This historical document is currently blank</BodyText>}
        {storyText !== "" && <BodyText textSize="sm">{storyText}</BodyText>}

        <ModalWrapper
          visible={editStory}
          closeModal={() => setEditStory(false)}
          title="Edit Story"
        >
          <TextInput
            style={styles.input}
            value={storyText || ""}
            onChangeText={(text) => setStoryText(text)}
            multiline={true}
            numberOfLines={20}
            placeholder="Enter story"
            keyboardType="default"
          />
          <Spacer />
          <Button
            title="Save"
            onPress={() => {
              updateGameStoryMutation.mutate(storyText);
              setEditStory(false);
            }}
          />
        </ModalWrapper>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BORDER.BASE,
    color: COLORS.TEXT.DARKEN20,
    backgroundColor: COLORS.BACKGROUND.LIGHTEN,
    padding: 10,
    flex: 1,
  }
})