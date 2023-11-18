import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index"; 
import { createPinia } from 'pinia' 
import * as echarts from 'echarts';
import Vant from 'vant';
import '../node_modules/vant/lib/index.css';

const pinia = createPinia()
const app= createApp(App)

app.config.globalProperties.$echarts = echarts
app.use(pinia)
app.use(Vant)
app.use(router)  
app.mount('#app')
