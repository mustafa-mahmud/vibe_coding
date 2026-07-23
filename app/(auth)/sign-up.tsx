import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthActions } from '@convex-dev/auth/react';

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
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900">Sign Up</Text>
          <Text className="mt-2 text-base text-gray-600">
            Create your account to get started.
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

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-medium text-gray-700">Password</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
            placeholder="Create a password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Password"
          />
        </View>

        <View className="mb-6">
          <Text className="mb-1.5 text-sm font-medium text-gray-700">Confirm Password</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
            placeholder="Confirm your password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            accessibilityLabel="Confirm Password"
          />
        </View>

        {signUpError && (
          <View className="mb-4 rounded-lg bg-red-50 px-4 py-3">
            <Text className="text-sm text-red-600">{signUpError}</Text>
          </View>
        )}

        <Pressable
          className={`items-center justify-center rounded-lg bg-blue-600 px-4 py-3.5 ${loading ? 'opacity-50' : 'active:bg-blue-700'}`}
          onPress={handleSignUp}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Sign Up"
        >
          <Text className="text-base font-semibold text-white">{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </Pressable>

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
