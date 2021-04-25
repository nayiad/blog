<template>
    <div class="auth">
        <div class="title-info">
            <img src="" alt="">
            <h2 class="title">Blog</h2>
        </div>
        
        <div class="form">
            <a-tabs>
                <a-tab-pane key="1" tab="登入">
                    <div class="item">
                        <a-input 
                            placeholder="账户"
                            v-model:value="loginForm.account" 
                        />
                    </div>

                    <div class="item">
                        <a-input 
                            placeholder="密码"
                            v-model:value="loginForm.password" 
                        />
                    </div>

                    <div class="item">
                        <a href="">忘记密码</a>
                    </div>

                    <div class="item">
                        <a-button 
                            size="large" 
                            type="primary"
                            @click="login"
                        >
                            Login
                        </a-button>
                    </div>
                </a-tab-pane>

                <a-tab-pane key="2" tab="注册">
                    <div class="item">
                        <a-input 
                            placeholder="账户" 
                            v-model:value="regForm.account"
                        />
                    </div>

                    <div class="item">
                        <a-input 
                            placeholder="密码" 
                            v-model:value="regForm.password"
                        />
                    </div>

                    <div class="item">
                        <a-input 
                            placeholder="邀请码"
                            v-model:value="regForm.inviteCode" 
                        />
                    </div>

                    <div class="item">
                        <a-button 
                            @click="register" 
                            size="large" 
                            type="primary"
                        >
                            Register
                        </a-button>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scpoed>
    @import './index.scss';
</style>