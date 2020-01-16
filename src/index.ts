import dev from './dev'

const cmd = process.argv[2]

switch (cmd) {
    case 'dev':
        dev()
        break;
    default:
        console.log('unknown cmd ...')
}