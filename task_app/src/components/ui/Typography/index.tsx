import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { COLORS } from '../../../constants/colors'
import { FONT_REGULAR, FONT_SIZE_REGULAR, FONT_SIZE_TITLE, FONT_TITLE } from '../../../constants/fonts'

type Props = {
  color?: keyof typeof COLORS,
  text: string
}

const Typography = ({ color = 'TEXT', ...p }: Props) => {

  const style = useMemo(() => StyleSheet.create({
    text: {
      fontFamily: FONT_REGULAR,
      fontSize: FONT_SIZE_REGULAR,
      color: COLORS[color]
      // fontWeight: (p.isTitle) ? '700' : '400'
    }
  }), [p])

  return (
    <Text style={style.text}>{p.text}</Text>
  )
}



export default Typography