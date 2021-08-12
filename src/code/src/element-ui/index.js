import {Button, Message, MessageBox} from 'element-ui'

const element = {
    install: function(Vue) {
        Vue.use(Button)
        // 往Vue实例原型里添加消息提示，方便全局调用
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
        Vue.prototype.$confirm = MessageBox.confirm
        Vue.prototype.$message = Message
        // 使用：this.$message('这是一条消息')
    }
}

export default element