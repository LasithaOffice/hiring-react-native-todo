import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Plus from '../../../assets/images/svgs/Plus.svg'
import { COLORS } from '../../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Easing, useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useTaskCreater from '../../../hooks/tasks/useTaskManager'

const FloatingButton = () => {

  const insets = useSafeAreaInsets();

  const bottom = useSharedValue(insets.bottom);
  const rotate = useSharedValue(0);

  const MIN_BOTTOM = useMemo(() => insets.bottom + 20, [insets])

  const styles = useMemo(() => StyleSheet.create({
    fab: {
      position: 'absolute',
      right: 20,
      borderRadius: 100,
      width: 48,
      height: 48,
      backgroundColor: COLORS.PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }), [insets])

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', e => {
      const kbHeight = e.endCoordinates.height;
      bottom.value = withTiming(kbHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      });
      rotate.value = withTiming(135, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      });
    });

    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      bottom.value = withTiming(MIN_BOTTOM, { duration: 500 });
      rotate.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp)
      });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: MIN_BOTTOM,
      transform: [
        {
          rotate: `${rotate.value}deg`,
        }
      ]
    };
  });

  const { initTask } = useTaskCreater("")

  return (
    <Animated.View style={[styles.fab, animatedStyle]}>
      <TouchableOpacity onPress={initTask}>
        <Plus color={'white'} width={40} height={40} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default FloatingButton