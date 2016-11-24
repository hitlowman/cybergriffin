import * as help from '../help'
import * as test from 'unit.js'


// walk help
(function () {
    console.log('HELP')
    let walk = function walk(node, padchar) {

        test.object(node)
        test.string(node.title)
        test.string(node.description)

        console.log(`${padchar} ${node.title}`)
        console.log(`${padchar} ${node.description}`)

        if (node.CHILDITEMS) {
            for (let child of node.CHILDITEMS) {
                walk(child, padchar + '  ')
            }
        }
    }

    walk(help.ARCHETYPES, '')

})()