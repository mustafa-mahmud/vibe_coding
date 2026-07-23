import { useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthActions } from '@convex-dev/auth/react';
import { AuthHeader, AuthInput, AuthButton, AuthError } from '@/components/(auth)/';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuthActions();

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
      const result = await signUp('password', { email, password });
      if (result.signingIn) {
        router.replace('/');
      } else {
        setSignUpError('Account created. Please sign in.');
        router.replace('/sign-in');
      }
    } catch (e: any) {
      setSignUpError(e.message ?? 'Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerClassName="flex-1 justify-center px-6 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Sign Up"
          subtitle="Create your account to get started."
        />

        <AuthInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthInput
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AuthInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <AuthError message={signUpError} />

        <AuthButton
          label="Sign Up"
          loadingLabel="Signing up..."
          onPress={handleSignUp}
          loading={loading}
        />

        <View className="mt-6 flex-row justify-center">
          <Text className="text-center text-sm text-gray-600">
            Already have an account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/sign-in')}>
            <Text className="text-sm font-semibold text-blue-600">Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
