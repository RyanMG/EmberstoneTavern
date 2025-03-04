import { useAuth } from '@/lib/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Dialog from '@components/common/Dialog';
import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import InputElement from '@components/common/forms/InputElement';
import Button from '@components/common/forms/Button';
import FormErrorText from '@components/common/text/FormErrorText';
import BodyText from '@components/common/BodyText';

import COLORS from '@constants/colors';
import { isValidEmail } from '@/lib/utils/formUtils';
import { TDialogContent } from '@definitions/ui';

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

  const [dialogContent, setDialogContent] = useState<TDialogContent>(null);

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

    if (!email || !isValidEmail(email)) {
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

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <BouncyCheckbox
              onPress={(isChecked: boolean) => setAgreed(isChecked)}
              isChecked={agreed}
              fillColor={COLORS.CHECKBOX.CHECKED}
              unFillColor={'transparent'}
              innerIconStyle={{
                borderRadius: 3,
                borderColor: COLORS.BORDER.BASE
              }}
              iconStyle={{
                borderRadius: 3,
                borderColor: COLORS.BORDER.BASE
              }}
              textStyle={{
                textDecorationLine: 'none',
                fontStyle: 'italic'
              }}
            />
            <BodyText
              italic={true}
              link={true}
              onPress={() => setDialogContent({
                title: 'Terms and Conditions',
                body: `Terms and conditions coming at some point. In the meantime, don't be a dick.`
              })}
            >
              I agree to the terms and conditions
            </BodyText>
          </View>

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

      <Dialog
        dialogContent={dialogContent}
        setDialogContent={setDialogContent}
      />

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
