#!/usr/bin/env node

const chalk = require('chalk')
const convert = require('../src/convert')
const fs = require('fs')
const { program: io } = require('@caporal/core')
const pkginfo = require('pkginfo')
const { DEFAULT_CLI_OPTIONS } = require('../src/constants')
const { VError } = require('verror')

class CommandLineError extends VError {}

const BOM_REGEX = /^\uFEFF/

pkginfo(module, 'version')
const version = module.exports.version
delete module.exports.version

io.version(version)
  .description('Convert LI-HAR to k6 script')
  .option('-o, --output <output>', 'Output file', {
    validator: output,
    default: '',
  })
  .option('--add-sleep', 'Add automatic sleep() based on startDateTime', {
    default: DEFAULT_CLI_OPTIONS.addSleep,
  })
  .option(
    '-s, --stdout',
    'Write to stdout (ignored when running with -o, --output)',
    { default: DEFAULT_CLI_OPTIONS.stdout }
  )
  .argument('<archive>', 'LI-HAR archive to convert')
  .action(run)

io.run(process.argv.slice(2))

function output(value) {
  if (fs.existsSync(value) && fs.lstatSync(value).isDirectory()) {
    throw new Error(`Cannot overwrite directory '${value}'`)
  }
  return value
}

/**
 * Returns logger that either logs to stdout or stderr
 * When writing to stdout, we want to log to stderr
 *
 * @param {import('caporal').LoggerInstance} log
 * @param {{stdout: boolean}} opt
 */
function getLogger(log, opt) {
  return opt.stdout ? log.warn : log.info
}

async function run({ args, options, logger: log }) {
  normalizeOptions(options)
  const logger = getLogger(log, options)

  try {
    start(args.archive, logger)
    const json = read(args.archive)
    const archive = parse(json)
    const { main } = await transform(archive, options)
    write(main, options)
    success(options, logger)
  } catch (error) {
    inform(error, log)
  }
}

/**
 * Normalize options so that they are sane
 * @param {{output: string, addSleep: boolean, stdout: boolean}} opt
 */
function normalizeOptions(opt) {
  // If output is empty, and stdout is not set, set output to default value
  if (opt.output === '' && !opt.stdout) {
    opt.output = DEFAULT_CLI_OPTIONS.output
  }

  // If output is not empty, and stdout is set, set stdout to FALSE
  if (opt.output !== '' && opt.stdout) {
    opt.stdout = false
  }
}

function start(file, logger) {
  logger(chalk.green(`Converting '${file}'`))
}

function read(file) {
  try {
    return fs.readFileSync(file, { encoding: 'utf8' })
  } catch (error) {
    throw new CommandLineError({ name: 'ReadError', cause: error })
  }
}

function parse(json) {
  try {
    return JSON.parse(json.replace(BOM_REGEX, ''))
  } catch (error) {
    throw new CommandLineError({ name: 'ParseError', cause: error })
  }
}

async function transform(archive, options) {
  try {
    return await convert(archive, options)
  } catch (error) {
    throw new CommandLineError({ name: 'ConvertError', cause: error })
  }
}

function write(main, opt) {
  try {
    // Write to stdout if requested, AND if no output file was specified
    if (opt.stdout) {
      process.stdout.write(main)
    } else {
      fs.writeFileSync(opt.output, main)
    }
  } catch (error) {
    throw new CommandLineError({ name: 'WriteError', cause: error })
  }
}

function success(opt, logger) {
  const target = opt.stdout ? 'STDOUT' : `'${opt.output}'`
  logger(chalk.green(`Wrote k6 script to ${target}`))
}

function inform(error, log) {
  log.error(`${summarize(error)}:`)
  const source = cause(error)
  const message = `${source.message}${
    source.path ? `, at path: ${source.path}` : ''
  }`

  log.error(chalk.red(message))
  log.debug(source.stack)
}

function summarize(error) {
  if (error instanceof CommandLineError) {
    switch (error.name) {
      case 'ReadError':
        return 'Error reading archive file'
      case 'ParseError':
        return 'Error parsing archive'
      case 'ConvertError':
        return 'Error converting archive'
      case 'WriteError':
        return 'Error writing output'
      default:
        return 'Could not convert archive'
    }
  } else {
    return 'Could not convert archive'
  }
}

function cause(error) {
  if (error instanceof CommandLineError) {
    return error.cause()
  } else {
    return error
  }
}
