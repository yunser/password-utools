import { useEffect, useState } from 'react'
import './app.less'
import copy from 'copy-to-clipboard'

console.log('_plugin', window._plugin)

function App() {

    const [list, setList] = useState([])
    const [configPath, setConfigPath] = useState('')
    const [msg] = useState('React')
    const [ item, setItem ] = useState(null)
    // const [item, setItem] = useState({
    //     title: '苹果账号 - 公司测试',
    //     account: 'test@apple.com', 
    //     password: '123456-', 
    //     keywords: [], 
    //     id: '63bdc0387d608309a721bc9f291dbcc4'
    // })

    useEffect(() => {
        setList(window._plugin.getList())
        setConfigPath(window._plugin.getConfigPath())

        // const item = window._plugin.getItem()
        // console.log('item', item)
        // setItem(item)
    }, [])

    useEffect(() => {
        setInterval(() => {
            const item = window._plugin.getItem()
            console.log('item', item)
            setItem(item)
        }, 100)
        // setList(window._plugin.getList())
        // setConfigPath(window._plugin.getConfigPath())
    }, [])

    return (
        <div className="app">
            <div className="mb-4">已加载 {list.length} 条数据</div>

            <div className="mb-4">配置文件路径：{configPath}</div>

            <button
                onClick={() => {
                    window._plugin.showPath(configPath)
                    // window._plugin.getConfigPath()
                }}
            >打开配置文件</button>
            {/* <div className="hello">Hello {msg}</div> */}
            {/* <div>
                <button
                    onClick={() => {
                        alert('hello')
                    }}
                >Send Message</button>
            </div> */}
            <div>================</div>
            {!!item &&
                <div>
                    <div className="">账号：{item.account}
                        <button className="copy"
                            onClick={() => {
                                copy(item.account)
                            }}
                        >复制</button>
                    </div>
                    <div className="">密码：
                        ***
                        {/* {item.password} */}
                        <button className="copy"
                            onClick={() => {
                                copy(item.password)
                            }}
                        >复制</button>
                    </div>
                </div>
            }
        </div>
    )
}
export default App
