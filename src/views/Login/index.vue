<template>
    <div class="login" :style="login">
        <el-row :gutter="10" class="login-container">
            <el-form :model="loginForm" :rules="rules" ref="validateForm" label-width="1em" class="login-body"
                     hide-required-asterisk="false">
                <div class="logo">
                  <el-image class="login-logo" :src="logoImg"></el-image>
                  <h3>后台管理系统</h3>
                </div>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" show-password
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="imgCode">
                    <el-row>
                        <el-col :span="14">
                            <el-input v-model="loginForm.imgCode" prefix-icon="el-icon-message"
                                      placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <VueImgVerify ref="verifyRef"></VueImgVerify>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="text">忘记密码？</el-button>
                </el-form-item>
                <el-form-item class="login-body-button">
                    <el-button class="login-submit" type="danger" round @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {onBeforeMount, reactive, ref, toRefs, unref} from "vue"
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    // import {login} from '@/api/serviceApi'
    import {ElMessage} from "element-plus"
    import VueImgVerify from '@/components/VueImageVerify.vue'
    import LogoImg from '@/assets/logo.png'

    export default {
        setup() {
            const router = useRouter()
            const store = useStore()
            const validateForm = ref(null)
            const verifyRef = ref(null)
            const state = reactive({
                login: {
                    height: ''
                    // backgroundImage: 'url(' + require('@/assets/image/login_bj.png') + ')'
                },
                logoImg: LogoImg,
                loginForm: {
                    username: '',
                    password: '',
                    imgCode: ''
                },
            })

            const rules = {
                username: [
                    {required: true, message: '用户名称不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                imgCode: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            }

            // onBeforeMount(() => {
            //     state.login.height = document.body.clientHeight + "px"
            // })

            const submit = async () => {
                const form = unref(validateForm)
                if (!form) {
                    return
                }
                await form.validate()

                // 校验验证码
                const _imgCode = verifyRef.value.imgCode || ''
                if (_imgCode.toLowerCase() != state.loginForm.imgCode.toLowerCase()) {
                    ElMessage({showClose: true, message: '验证码有误，请重新输入!', type: 'error'})
                    return
                }

                console.log(state.loginForm)

                // login(state.loginForm).then(res => {
                //     if (res.code === 200) {
                //         // 登录成功后设置token到vuex中
                //         localStorage.username = res.data.username
                //         store.commit('setToken', res.data.token)
                //         router.push({path: 'home'})
                //     } else {
                //         ElMessage({showClose: true, message: res.data, type: 'error'})
                //     }
                // })
            }

            return {
                ...toRefs(state),
                rules,
                validateForm,
                verifyRef,
                submit,
            }
        },
        components: {
            VueImgVerify
        }
    }
</script>

<style lang="scss">
    .login {
      width: 100%;
      height: 100vh;
        background-size: cover;
        background: #000033;

        .login-logo {
            display: block;
            width: 60px;
            height: 60px;
            text-align: center;
        }

        .login-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: rgba(204, 255, 204, 0.3);
            border-radius: 0.4rem;
            border: 1px white solid;
            padding: 0.8rem;
        }

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          h3 {
            font-size: 20px;
            font-weight: 600;
          }
        }

        .login-body {
            padding: 1rem 2rem;
            // background: rgba(0, 255, 204, 0.6);
            border-radius: 0.2rem;
        }

        .el-input__inner {
            border-radius: 20px;
        }

        .codeImg {
            height: 40px;
        }

        .login-submit {
            width: 100%;
        }
    }
</style>