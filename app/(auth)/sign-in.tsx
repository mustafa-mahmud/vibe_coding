import { useState } from 'react';
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthActions } from '@convex-dev/auth/react';
import { AuthHeader, AuthInput, AuthButton, AuthError } from '@/components/(auth)/';

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
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerClassName="flex-1 justify-center px-6 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Sign In"
          subtitle="Welcome back! Please sign in to your account."
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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AuthError message={signInError} />

        <AuthButton
          label="Sign In"
          loadingLabel="Signing in..."
          onPress={handleSignIn}
          loading={loading}
        />

        <View className="mt-6 flex-row justify-center">
          <Text className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
          </Text>
          <Pressable onPress={() => router.push('/sign-up')}>
            <Text className="text-sm font-semibold text-blue-600">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
