const headers = require('./headers')
const cookies = require('./cookies')
const address = require('./address')
const object = require('./object')
const { websocketFactor: makeWebsocketFactor } = require('../make')

function websocket(spec) {
  let factor = getFactor(spec.request, spec)
  return render(factor)
}

function getFactor(request, spec) {
  const factor = makeWebsocketFactor()
  if (spec.addSleep) {
    factor.timeAlive = spec.timeConnected
    factor.addSleep = spec.addSleep
    factor.messages = changeMessageTimes(spec.webSocketMessages)
  } else {
    factor.messages = spec.webSocketMessages
  }
  factor.call = 'connect'
  address(request, factor)
  factor.headers = headers(request.headers)
  factor.cookies = cookies(request.cookies)
  factor.options = options(factor)
  factor.args = args(factor)

  return factor
}

function changeMessageTimes(messages) {
  /// calculates when to sleep between messages
  if (messages.length != 0) {
    let firstTimeStartsAtZero = 0
    let firstIndexSetToZero = 0
    let messagesWithNewTimes = JSON.parse(JSON.stringify(messages))
    messagesWithNewTimes[firstIndexSetToZero].time = firstTimeStartsAtZero
    for (let i = 1; i < messages.length; i++) {
      messagesWithNewTimes[i].time =
        (messages[i].time - messages[i - 1].time) * 1000 // 1000 millisecond multiplier
    }
    var sum = messagesWithNewTimes.reduce((accum, curr) => {
      return accum + curr.time
    }, 0)
    for (var i = messagesWithNewTimes.length - 1; i >= 0; i--) {
      sum = sum - messagesWithNewTimes[i].time
      messagesWithNewTimes[i].time = sum
    }
    return messagesWithNewTimes
  }
}

function ws_send_messages(factor) {
  // generates websocket functionality code
  let socket_function = [' function (socket) {', 'const messages = [']
  let send_messages = [`socket.on('open', () => {`]
  if (factor.addSleep) {
    send_messages.push(
      ...[
        `for (const currentMessage of messages) {
          socket.setTimeout(() => {
            socket.send(currentMessage.message)
          }, currentMessage.time)
        }`,
      ]
    )
  } else {
    send_messages.push(
      ...[
        `for (const currentMessage of messages) {
          socket.send(currentMessage.message)
        }`,
      ]
    )
  }

  send_messages.push('})')
  let messages = factor.messages
  let timeAlive = 2
  if (messages) {
    for (const message of messages) {
      if (message.type === 'send') {
        socket_function.push(
          ...[
            '{',
            `message: ${JSON.stringify(message.data)},`,
            `time: ${message.time},`,
            '},',
          ]
        )
      }
    }
  }
  if (factor.addSleep && factor.timeAlive > 0) {
    timeAlive = factor.timeAlive
  }
  send_messages.push(
    ...[
      'socket.setTimeout(() => {',
      'socket.close()',
      `}, ${timeAlive})`,
      "socket.on('error', (e) => {",
      'fail(`WebSocket failed: ${e.error()}`);',
      '})',
      '}',
    ]
  )
  socket_function.push(']')
  socket_function.push(...send_messages)
  return socket_function.join('\n')
}

function args(factor) {
  // creates list of generated code for use in main code generation
  const items = []
  items.push(factor.address)
  if (factor.options) {
    items.push(factor.options)
  }
  items.push(ws_send_messages(factor))

  return items
}

function options(factor) {
  if (factor.headers || factor.cookies) {
    const entries = []
    if (factor.headers) {
      entries.push({ name: 'headers', value: factor.headers })
    }
    if (factor.cookies) {
      entries.push({ name: 'cookies', value: factor.cookies })
    }
    return object(entries)
  } else {
    return null
  }
}

function main(factor) {
  const list = factor.args.join(`, `)
  return `ws.${factor.call}(${list});`
}

function render(factor) {
  return [main(factor)].filter(item => item).join(`\n`)
}

module.exports = websocket
