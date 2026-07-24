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

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuthActions();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setSignUpError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setSignUpError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setSignUpError('Password must be at least 8 characters.');
      return;
    }
    setSignUpError(null);
    setLoading(true);
    try {
      await signIn('password', { email, password, flow: 'signUp' });
    } catch (e: any) {
      setSignUpError(e.message ?? 'Failed to sign up.');
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
          title="Create Account"
          subtitle="Sign up to continue "
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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureToggle
            leftIcon="lock-closed-outline"
          />

          <AuthInput
            // label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureToggle
            leftIcon="lock-closed-outline"
          />

          <AuthError message={signUpError} />

          <AuthButton
            label="Create Account"
            loadingLabel="Creating account..."
            onPress={handleSignUp}
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
            Already a member?{' '}
          </Text>
          <Pressable onPress={() => router.push('/sign-in')}>
            <Text className="text-sm font-semibold text-[#7C3AED]">
              {' '}
              Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
