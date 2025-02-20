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

  const [firstName, setFirstName] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string | undefined>();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | undefined>();

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const [agreed, setAgreed] = useState<boolean | undefined>(false);
  const [registerError, setRegisterError] = useState<string | undefined>();
  const router = useRouter();

  const onRegisterPress = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);
    setFirstNameError(undefined);
    setLastNameError(undefined);
    let hasError: boolean = false;

    if (!firstName) {
      setFirstNameError('First name is required');
      hasError = true;
    }

    if (!lastName) {
      setLastNameError('Last name is required');
      hasError = true;
    }

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError('Valid email is required');
      hasError = true;
    }

    if (!password || password.length < 6) {
      setPasswordError('A password of at least 6 charaters is required');
      hasError = true;
    }

    if (!hasError) {
      const response = await register(firstName, lastName, email, password);

      if (!response.success) {
        setRegisterError(response.message);
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
      <View style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>

        <View style={styles.loginFormWrapper}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <InputElement
              label="First Name"
              halfWidth
              value={firstName}
              onChangeText={setFirstName}
              errorText={firstNameError}
            />
            <InputElement
              label="Last Name"
              halfWidth
              value={lastName}
              onChangeText={setLastName}
              errorText={lastNameError}
            />
          </View>

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
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 10
  }
});
