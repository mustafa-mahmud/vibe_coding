import {
  AuthButton,
  AuthError,
  AuthHeader,
  AuthInput,
} from '@/components/(auth)/';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuthActions();

  const handleSignIn = async () => {
    if (!email || !password) {
      setSignInError('Please enter both email and password.');
      return;
    }
    setSignInError(null);
    setLoading(true);
    try {
      await signIn('password', { email, password, flow: 'signIn' });
    } catch (e: any) {
      setSignInError(e.message ?? 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{
          backgroundColor: '#1E3A8A',
        }}
        contentContainerClassName="flex-1 justify-center px-3 pb-10 bg-"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Log In Account"
          subtitle="Sign in to continue "
          variant="dark"
          align="center"
        />

        <View
          style={{
            backgroundColor: '#ece3e3',
          }}
          className="rounded-2xl p-6"
        >
          <AuthInput
            // label="Email"
            placeholder="Your email here"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon="mail-outline"
          />

          <AuthInput
            // label="Password"
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureToggle
            leftIcon="lock-closed-outline"
          />

          <AuthError message={signInError} />

          <AuthButton
            label="Sign In"
            loadingLabel="Signing..."
            onPress={handleSignIn}
            loading={loading}
            variant="gradient"
          />
        </View>

        <View className="mt-8 flex-row justify-center">
          <Text
            style={{
              color: '#fff',
            }}
            className="text-center text-sm"
          >
            Have not any account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/sign-up')}>
            <Text className="text-sm font-semibold text-[#7C3AED]">
              {' '}
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
