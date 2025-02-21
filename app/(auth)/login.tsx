import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import BodyText from '@components/common/BodyText';
import InputElement from '@components/common/forms/InputElement';
import Divider from '@components/common/Divider';
import Spacer from '@components/common/Spacer';
import Button from '@components/common/forms/Button';
import FormErrorText from '@components/common/text/FormErrorText';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/lib/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [loginError, setLoginError] = useState<string | undefined>();
  const router = useRouter();

  const { login } = useAuth();

  const onLoginPress = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError('Valid email is required');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password is required');
    }

    if (!emailError && !passwordError) {
      const response = await login(email, password);

      if (!response.success) {
        setLoginError(response.message);
        return;
      }

      router.push('/(tabs)');
    }
  }

  return (
    <PageContainer>
      <PageTitle
        text="Login To App"
      />
      <View style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>

        <View style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
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
            <Button
              title="Login"
              onPress={onLoginPress}
            />
            {loginError && <FormErrorText errorText={loginError} />}
          </View>
          <Divider />

          <View style={{display: 'flex', paddingLeft: 40, paddingRight: 40, marginTop: 20, flexDirection: 'column'}}>
            <BodyText textSize="sm" italic={true}>
              Don't yet have an account? Register to get started!
            </BodyText>
            <Spacer size="sm" />
            <Button
              title="Register"
              onPress={() => {
                router.replace('/register');
              }}
            />
          </View>
        </View>
      </View>

      <View style={{width: '100%'}}>
        <Button
          title="Cancel"
          theme="secondary"
          onPress={() => router.push('/')}
        />
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
})