import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Aside,
  Col,
  Row,
  Message,
  Form,
  FormItem,
  Input,
  Dialog,
  MessageBox,
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox