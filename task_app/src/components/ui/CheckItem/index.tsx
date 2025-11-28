import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { COLORS } from '../../../constants/colors'
import Typography from '../Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'
import { Task } from '../../../types/Task'
import Check from '../../../assets/images/svgs/Check.svg'
import Bin from '../../../assets/images/svgs/Bin.svg'
import Animated, { LinearTransition, withTiming } from 'react-native-reanimated'
import useTaskManager from '../../../hooks/tasks/useTaskManager'
import { FONT_REGULAR, FONT_SIZE_REGULAR } from '../../../constants/fonts'
import useTaskAnimations from '../../../hooks/tasks/useTaskAnimations'
import { GestureDetector } from 'react-native-gesture-handler'

type Props = {
  data: Task,
}

const CheckItem = (p: Props) => {

  const taskSlice = useSelector(getTaskSlice);
  const [name, setName] = useState(p.data.name);
  const isEdit = useMemo(() => p.data.id == taskSlice.currentEdit?.id, [p, taskSlice])

  const { initUpdateTask, confirmTask, taskCheckedUnChecked } = useTaskManager(name, p.data)
  const { spawningDelay, spawningStyle, lineStyle, panGesture, slideAnim } = useTaskAnimations(p.data)

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View layout={LinearTransition.springify(spawningDelay)} style={[styles(isEdit, p.data.completed).container, spawningStyle, slideAnim]} >
        <TouchableOpacity style={styles(isEdit, p.data.completed).checkBox} disabled={isEdit} onPress={taskCheckedUnChecked}>
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
              onSubmitEditing={confirmTask}
              onBlur={confirmTask}
              value={name}
            />
            :
            <TouchableOpacity disabled={p.data.completed} onPress={initUpdateTask} style={styles(isEdit, p.data.completed).editTouchable}>
              <Animated.View style={
                [
                  styles(isEdit, p.data.completed).lineStyle
                  , lineStyle
                ]
              }></Animated.View>
              <Typography text={p.data.name} color={p.data.completed ? 'DISABLED_TEXT' : undefined} />
            </TouchableOpacity>
        }
        <TouchableOpacity style={styles(isEdit, p.data.completed).removeContainer}>
          <Bin width={25} height={25} style={{ left: -10 }} />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
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
    fontFamily: FONT_REGULAR,
    fontSize: FONT_SIZE_REGULAR
  },
  lineStyle: {
    height: 1,
    backgroundColor: COLORS.DISABLED_TEXT,
    position: 'absolute'
  },
  editTouchable: {
    justifyContent: 'center'
  },
  removeContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    right: -100,
    height: 56,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CheckItem