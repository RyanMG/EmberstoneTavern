import { useAuth } from '@context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import InputElement from '@components/common/forms/InputElement';
import Button from '@components/common/forms/Button';
import FormErrorText from '@components/common/text/FormErrorText';
import Colors from '@constants/Colors';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [agreed, setAgreed] = useState<boolean | undefined>(false);
  const [registerError, setRegisterError] = useState<string | undefined>();
  const router = useRouter();

  const onRegisterPress = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError('Valid email is required');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password is required');
    }

    if (agreed && !emailError && !passwordError) {
      const response = await register(email, password);

      if ('error' in response && response.error) {
        setRegisterError(response.errorMessage);
        return;
      }

      router.push('/(tabs)');

    } else {
      setAgreed(false);
    }
  }
  return (
    <PageContainer>
      <PageTitle
        text="Register"
      />
      <View style={styles.loginFormWrapper}>
        <InputElement
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          errorText={emailError}
        />
        <InputElement
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          errorText={passwordError}
        />
        <BouncyCheckbox
          onPress={(isChecked: boolean) => setAgreed(isChecked)}
          isChecked={agreed}

          text="I agree to the terms and conditions"
          fillColor={Colors.CHECKBOX.CHECKED}
          unFillColor={'transparent'}
          innerIconStyle={{
            borderRadius: 3,
            borderColor: Colors.BORDER.BASE
          }}
          iconStyle={{
            borderRadius: 3,
            borderColor: Colors.BORDER.BASE
          }}
          textStyle={{
            textDecorationLine: 'none',
            fontStyle: 'italic'
          }}
          style={{
            marginBottom: 10
          }}
        />
        <Button
          title="Register"
          disabled={!agreed}
          onPress={onRegisterPress}
        />
        {registerError && <FormErrorText errorText={registerError} />}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  loginFormWrapper: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 10
  }
});
