import Dev from './dev'

const cmd = process.argv[2]

switch (cmd) {
    case 'dev':
        new Dev().start()
        break;
    default:
        console.log('unknown cmd ...')
}