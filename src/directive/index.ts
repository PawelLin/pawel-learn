import number from './number'

const directive = {
    install (app) {
        app.directive('number', number)
    }
}

export default directive
