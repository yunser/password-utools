import { uid } from 'uid'
const md5 = require('md5')
const fs = require('fs')
// import fs from 'fs'
// console.log('Node version is: ' + process.version);
// console.log('version', process.versions)
console.log('fs', fs, fs.readFileSync)
const code_prefix = 'open-app-v2-'

const features = utools.getFeatures()
let g_findItem
// console.log('features', features)

const dbPath = '/Users/yunser/data/password/data.json'

const demo_passwords = [
    {
        "title": "苹果账号 - 公司测试",
        "account": "chenjianhang@weya-tech.com",
        "password": "Cjh123456-=",
        "keywords": [
        ]
    }
]

let passwords = demo_passwords

async function main() {
    
    // console.log('urls', JSON.stringify(ur))
    if (fs.existsSync(dbPath)) {
        const jsonContent = fs.readFileSync(dbPath, 'utf-8')
        let jsonData
        try {
            jsonData = JSON.parse(jsonContent)
        }
        catch (err) {
            console.error('JSON 格式解析出错')
            console.error(err)
        }
        if (jsonData) {
            passwords = jsonData.data
        }
    }
    
    for (let item of passwords) {
        item.id = md5(item.title) // TODO
    }
    
    for (let url of passwords) {
        utools.setFeature({
            "code": code_prefix + url.id,
            explain: `打开 ${url.title} ` + url.path,
            cmds: [
                url.title,
                ...(url.keywords || []),
            ]
        })
    }
    for (let feature of features) {
        if (!feature.code.includes(code_prefix)) {
            utools.removeFeature(feature.code)
        }
    }
    
    const features2 = utools.getFeatures()
    
    console.log('features2', features2)
    
    utools.onPluginEnter(({ code, type, payload }) => {
        console.log('用户进入插件', code, type, payload)
        // open-app-v1-63bdc0387d608309a721bc9f291dbcc3 text 苹果账号 - 公司测试
        // 密码 text 密码
        let findItem = null
        if (code.includes(code_prefix)) {
            const item = passwords.find(u => code_prefix + u.id == code)
            if (item) {
                console.log('找到', item)
                findItem = item
                // utools.showMainWindow()
                // utools.shellOpenPath(item.path)
                //                 window.utools.hideMainWindow()
                //     // utools.showNotification('hello')
                //     window.utools.outPlugin()
            }
        }
        g_findItem = findItem
    })
    
    // window.exports = {
    //     'open-in-browser': {
    //         mode: 'none',
    //         args: {
    //             enter: (action) => {
    //                 console.log('action', action)
    //                 // window.utools.hideMainWindow()
    //                 // utools.showNotification('hello')
    //                 // window.utools.outPlugin()
    //             }
    //         }
    //     }
    // }
}

main()

window._plugin = {

    getList() {
        return passwords
    },

    getConfigPath() {
        return dbPath
    },

    showPath(path) {
        utools.shellShowItemInFolder(path)
    },

    getItem() {
        console.log('getItem', g_findItem)
        return g_findItem
    },
}
