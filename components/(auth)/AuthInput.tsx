import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

interface AuthInputProps extends TextInputProps {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  secureToggle?: boolean;
}

export function AuthInput({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureToggle,
  ...textInputProps
}: AuthInputProps) {
  const [secure, setSecure] = useState(
    secureToggle ? !textInputProps.secureTextEntry : false,
  );

  const toggleSecure = () => {
    if (!secureToggle) return;
    setSecure((s) => !s);
    onRightIconPress?.();
  };

  return (
    <View className="mb-5">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      )}
      <View
        style={{ backgroundColor: '#dbd1d1' }}
        className="flex-row items-center rounded-full  px-4"
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color="#6B7280"
            className="mr-2.5"
          />
        )}
        <TextInput
          style={{
            fontSize: 13.5,
          }}
          className="flex-1 py-4 text-base text-gray-900"
          placeholderTextColor="#7d8695"
          accessibilityLabel={label}
          secureTextEntry={
            secureToggle ? secure : textInputProps.secureTextEntry
          }
          {...textInputProps}
        />
        {secureToggle && (
          <Pressable onPress={toggleSecure} className="ml-2 p-1">
            <Ionicons
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#6B7280"
            />
          </Pressable>
        )}
        {rightIcon && !secureToggle && (
          <Pressable onPress={onRightIconPress} className="ml-2 p-1">
            <Ionicons name={rightIcon} size={22} color="#6B7280" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
