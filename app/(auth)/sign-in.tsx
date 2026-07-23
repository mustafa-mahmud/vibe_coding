import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthActions } from '@convex-dev/auth/react';

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
      const result = await signIn('password', { email, password });
      if (result.signingIn) {
        router.replace('/');
      }
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
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900">Sign In</Text>
          <Text className="mt-2 text-base text-gray-600">
            Welcome back! Please sign in to your account.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-medium text-gray-700">Email</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
            placeholder="you@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email"
          />
        </View>

        <View className="mb-6">
          <Text className="mb-1.5 text-sm font-medium text-gray-700">Password</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Password"
          />
        </View>

        {signInError && (
          <View className="mb-4 rounded-lg bg-red-50 px-4 py-3">
            <Text className="text-sm text-red-600">{signInError}</Text>
          </View>
        )}

        <Pressable
          className={`items-center justify-center rounded-lg bg-blue-600 px-4 py-3.5 ${loading ? 'opacity-50' : 'active:bg-blue-700'}`}
          onPress={handleSignIn}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Sign In"
        >
          <Text className="text-base font-semibold text-white">{loading ? 'Signing in...' : 'Sign In'}</Text>
        </Pressable>

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
