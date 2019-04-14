import test from 'ava'
import comment from 'render/comment'

test('single line', t => {
  const result = comment('Do important things')
  t.is(result, '// Do important things')
})

test('multiline', t => {
  const result = comment('Written by Hercules\nCopyright 1226 BC')
  t.is(result, `/*
 * Written by Hercules
 * Copyright 1226 BC
 */`)
})

test('encoded', t => {
  const result = comment('Bad comment */\nGood comment')
  t.is(result, `/*
 * Bad comment * /
 * Good comment
 */`)
})
