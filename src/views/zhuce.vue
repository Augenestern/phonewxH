<template>
    <div style="width: 100%;height: 100vh;display: flex;align-items: center;justify-content: center;">
        <div style="position: absolute;top: 3vh;left: 9vw;" @click="toLogin">取消</div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="name" label="姓名" placeholder="姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]" />
                <van-field v-model="phone" name="phone" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请输入手机号' },
                { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确手机号' }
                ]" />
                <van-field v-model="jueseName" is-link readonly name="station" label="选择角色" placeholder="点击选择角色"
                    @click="showPickerUser = true" />
                <!-- <van-field v-if="jueseName == '气站管理员'" v-model="zhandianName" is-link readonly name="station" label="选择气站"
                    placeholder="点击选择站点" @click="showPicker = true" /> -->
                <van-popup v-model:show="showPickerUser" round position="bottom">
                    <van-picker :columns="columnsUser" @confirm="onConfirmUser" @cancel="showPicker = false" />
                </van-popup>
                <!-- <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup> -->
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="rePassword" type="password" name="rePassword" label="确认密码" placeholder="确认密码"
                    :rules="rePasswordRules" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="success" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { showNotify } from 'vant';
import { getWxRegisterData } from "@/api/wxLogin";
import { getStation } from "@/api/ls/phone";
import { useMain } from '@/store/home'

const route = new (useRoute as any)
const username = ref('');
const password = ref('');
const rePassword = ref('');
const phone = ref('');
const jueseName = ref('');
// const zhandianName = ref('');
const showPickerUser = ref(false);
const showPicker = ref(false);

const columnsUser: any = ref([{ text: '超级管理员', value: '超级管理员' }, { text: '气站管理员', value: '气站管理员' }, { text: '司机', value: '司机' }])
const columns: any = ref([])

const onConfirmUser = ({ selectedOptions }) => {
    jueseName.value = selectedOptions[0]?.text;
    showPickerUser.value = false;
};
// const onConfirm = ({ selectedOptions }) => {
//     zhandianName.value = selectedOptions[0]?.text;
//     showPicker.value = false;
// };
const rePasswordRules: any = [
    { required: true, message: '请确认密码' },
];

const toLogin = () => {
    router.push('/login')
}
const onSubmit = (values: any) => {
    if (password.value != rePassword.value) {
        showNotify({ type: 'danger', message: '两次密码不一致' });
    } else {
        if (jueseName.value == "") {
            showNotify({ type: 'danger', message: '请选择角色' });
        } else {
            let params = {
                code: '',
                phone: values.phone,
                station: values.station,
                password: values.password,
                name: values.name
            }
            useMain().registerInfo = params
            let wxurl = getWeChatAuthUrl()
            console.log(wxurl);
            window.location.href = wxurl;
        }
    }
}

// 获取微信授权链接
function getWeChatAuthUrl() {
    var appId = 'wx5b0874b7be225912';
    var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/zhuce');
    // var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/callback');
    var scope = 'snsapi_userinfo';
    var state = encodeURIComponent('params');
    var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
    return authUrl;
}

const getAllzd = () => {
    getStation().then((res) => {
        console.log(res.data.data);
        for (let i = 0; i < res.data.data.length; i++) {
            let ls: any = { text: res.data.data[i], value: res.data.data[i] }
            columns.value.push(ls)
        }
    })
}
onMounted(() => {
    getAllzd()
    let code = route.query.code
    if (code) {
        let xx = JSON.parse(JSON.stringify(useMain().registerInfo))
        phone.value = xx.phone
        username.value = xx.name
        jueseName.value = xx.station
        password.value = xx.password
        rePassword.value = xx.password
        let params = {
            code: code,
            phone: phone.value,
            station: jueseName.value,
            password: password.value,
            name: username.value
        }
        getWxRegisterData(params).then((res) => {
            console.log(res, '注册');
            if (res.data.message == '账号重复') {
                showNotify({ type: 'danger', message: '账号已存在' });
            } else if (res.data.message == '微信号已注册') {
                showNotify({ type: 'danger', message: '微信号已注册' });
            }
            else {
                showNotify({ type: 'success', message: '注册成功' });
                router.push('/login')
            }
        })
    }
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped></style>