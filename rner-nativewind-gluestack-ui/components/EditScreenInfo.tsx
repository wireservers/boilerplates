import React from 'react';
import { Text, View } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';

import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View className="items-center mx-12">
        <Text className="text-[17px] leading-6 text-center">
          Open up the code for this screen:
        </Text>

        <View className="rounded px-1 my-2 bg-black/5 dark:bg-white/5">
          <MonoText>{path}</MonoText>
        </View>

        <Text className="text-[17px] leading-6 text-center">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View className="mt-4 mx-5 items-center">
        <ExternalLink
          className="py-4"
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text className="text-center text-blue-600">
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
