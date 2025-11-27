import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { COLORS } from '../../../constants/colors'
import Typography from '../Typography'
import { useSelector } from 'react-redux'
import { getTaskSlice } from '../../../redux/slices/Tasks'
import { Task } from '../../../types/Task'
import useTaskConfirm from '../../../hooks/useTaskConfirm'

type Props = {
  data: Task,
}

const CheckItem = (p: Props) => {

  const taskSlice = useSelector(getTaskSlice);
  const [name, setName] = useState("");
  const isEdit = useMemo(() => p.data.id == taskSlice.currentEdit?.id, [p, taskSlice])

  const confirm = useTaskConfirm(name);

  return (
    <View style={styles(isEdit).container}>
      <View style={styles(isEdit).checkBox}></View>
      {
        (isEdit) ?
          <TextInput
            autoFocus
            style={styles(isEdit).textInput}
            returnKeyType="done"
            placeholder='Type your task'
            placeholderTextColor={COLORS.DISABLED_TEXT}
            onChangeText={setName}
            onSubmitEditing={confirm}
            onBlur={confirm}
          />
          :
          <Typography text={p.data.name} />
      }
    </View>
  )
}

const styles = (isEdit: boolean) => StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: isEdit ? COLORS.TEXT_FIELD : COLORS.WHITE
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 16,
    backgroundColor: COLORS.SECONDARY
  },
  textInput: {
    width: '90%',
  }
})

export default CheckItem