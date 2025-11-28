import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { COLORS } from '../../../constants/colors'
import Typography from '../Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'
import { Task } from '../../../types/Task'
import useTaskConfirm from '../../../hooks/tasks/useTaskConfirm'
import Check from '../../../assets/images/svgs/Check.svg'
import useTaskCheckedUnchecked from '../../../hooks/tasks/useTaskCheckedUnchecked'
import Animated, { Layout, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useTaskSpawn from '../../../hooks/tasks/useTaskSpawn'
import useTaskUpdate from '../../../hooks/tasks/useTaskUpdate'

type Props = {
  data: Task,
}

const CheckItem = (p: Props) => {

  const taskSlice = useSelector(getTaskSlice);
  const [name, setName] = useState("");
  const isEdit = useMemo(() => p.data.id == taskSlice.currentEdit?.id, [p, taskSlice])

  const confirm = useTaskConfirm(name);
  const { lineStyle, taskChckedUnChecked } = useTaskCheckedUnchecked(p.data)
  const update = useTaskUpdate(name)

  const { spawningDelay, spawningStyle } = useTaskSpawn();

  return (
    <Animated.View layout={LinearTransition.springify(spawningDelay)} style={[styles(isEdit, p.data.completed).container, spawningStyle]}>
      <TouchableOpacity style={styles(isEdit, p.data.completed).checkBox} onPress={taskChckedUnChecked}>
        {
          (p.data.completed) ?
            <Check width={12} height={12} />
            :
            null
        }
      </TouchableOpacity>
      {
        (isEdit) ?
          <TextInput
            autoFocus
            style={styles(isEdit, p.data.completed).textInput}
            returnKeyType="done"
            placeholder='Type your task'
            placeholderTextColor={COLORS.DISABLED_TEXT}
            onChangeText={setName}
            onSubmitEditing={confirm}
            onBlur={confirm}
          />
          :
          <TouchableOpacity onPress={update} style={
            {
              justifyContent: 'center'
            }
          }>
            <Animated.View style={
              [
                {
                  height: 1,
                  backgroundColor: COLORS.DISABLED_TEXT,
                  position: 'absolute'
                }
                , lineStyle
              ]
            }></Animated.View>
            <Typography text={p.data.name} color={p.data.completed ? 'DISABLED_TEXT' : undefined} />
          </TouchableOpacity>
      }
    </Animated.View>
  )
}

const styles = (isEdit: boolean, completed: boolean) => StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isEdit ? COLORS.TEXT_FIELD : COLORS.WHITE,
    height: 56,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 16,
    backgroundColor: (completed) ? COLORS.PRIMARY : COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: '90%',
    height: 56,
  }
})

export default CheckItem