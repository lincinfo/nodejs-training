const java = require('java')
const HashMap = java.import('java.util.HashMap')

exports.syncHashMap = function () {
    let hashMap = new HashMap()

    hashMap.putSync('name', 'SunilWang')
    hashMap.putSync('age', 20)

    let name = hashMap.getSync('name')
    let age = hashMap.getSync('age')

    console.log('name', name)
    console.log('age', age)
}

exports.asyncHashMap = function () {
    let hashMap = new HashMap()

    hashMap.put('name', 'SunilWang', (error, info) => {
        if (error) console.log('put name Error: ', error)
        hashMap.get('name', (error, name) => {
            if (error) console.log('get name Error: ', error)
            console.log('callback name：%s', name)
        })
    })
}