```vue
<template>
  <div class="login-wrap" style="background-color: #fff">
    <div class="logo-wrap">
      <img src="../../assets/img/login/logo.png" alt="" />
    </div>
    <div class="illustration-wrap"></div>
    <div class="login-form">
      <h5 class="title">登录</h5>
      <div class="change-type-wrap">
        <span
          class="item"
          :class="{ active: loginType == 1 }"
          @click="loginType = 1"
          >账户密码登录</span
        >
        <span
          class="item"
          :class="{ active: loginType == 2 }"
          @click="loginType = 2"
          >手机号登录</span
        >
        <span class="under-line" ref="type"></span>
      </div>
      <!-- 账号密码 -->
      <div class="password-login-form" v-show="loginType == 1">
        <div class="input-item">
          <input
            type="text"
            placeholder="账号"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '账户'"
          />
          <div class="input-text">账户</div>
          <span class="icon account"></span>
        </div>
        <div class="input-item">
          <input
            type="text"
            placeholder="密码"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '密码'"
          />
          <div class="input-text">密码</div>
          <span class="icon password"></span>
        </div>
      </div>
      <!-- 手机验证码登录 -->
      <div class="phone-verify-form" v-show="loginType == 2">
        <div class="input-item">
          <input
            type="text"
            placeholder="手机号"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '手机号'"
          />
          <div class="input-text">手机号</div>
          <span class="icon phone"></span>
        </div>
        <div class="input-item">
          <input
            type="text"
            placeholder="验证码"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '验证码'"
            class="code"
          />
          <div class="input-text">验证码</div>
          <span
            class="send-code-btn"
            :class="{ disabled: countdown < 60 }"
            @click="sendVerifyCode()"
            >{{ sendCodeText }}</span
          >
          <span class="icon verify-status"></span>
        </div>
      </div>

      <div class="auto-login-forget">
        <span class="check-box" @click="rememberPassword = !rememberPassword">
          <img
            src="../../assets/img/login/uncheck.png"
            v-show="!rememberPassword"
          />
          <img
            src="../../assets/img/login/checked.png"
            v-show="rememberPassword"
          />
          自动登录
        </span>
        <span class="forget">忘记密码</span>
      </div>
      <div class="login-btn">登录</div>
      <div class="register-text">
        <router-link to="reg">注册账户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginType: 1, //登录类型
      rememberPassword: false,
      sendCodeText: "获取验证码",
      countdown: 60,
    };
  },
  watch: {
    loginType(newV) {
      let offset = newV == 2 ? "185" : "0";
      this.$refs.type.style.transform = `translateX(${offset}px)`;
    },
  },
  methods: {
    //发送验证码
    sendVerifyCode() {
      if (this.countdown < 60) return;
      let timer = setInterval(() => {
        this.countdown--;
        this.sendCodeText = this.countdown + "s后重新发送";
        if (this.countdown == 0) {
          clearInterval(timer);
          this.sendCodeText = "获取验证码";
          this.countdown = 60;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
$primaryColor: #1890ff;
.login-wrap {
  a {
    color: $primaryColor;
  }
  @keyframes showLeft {
    0% {
      transform: translate(0);
      opacity: 0;
    }

    to {
      opacity: 1;
      transform: translateX(-50px);
    }
  }
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/img/login/login-bg.png");
  background-size: 100% 100%;
  position: relative;
  .logo-wrap {
    position: absolute;
    top: 60px;
    left: 80px;
    img {
      height: 50px;
    }
  }
  .illustration-wrap {
    width: 560px;
    height: 570px;
    background: url("../../assets/img/login/illustration.png");
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 260px;
    margin-top: -285px;
  }
  .login-form {
    width: 448px;
    height: 436px;
    background: #fff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    position: absolute;
    right: 170px;
    top: 50%;
    margin-top: -218px;
    padding: 20px;
    box-sizing: border-box;
    animation: showLeft 0.8s linear forwards,
      twinkling 2s linear infinite alternate;
    // 动画名称 动画时长 延时时间 匀速 无限循环 逆播 */
    @-webkit-keyframes twinkling {
      0% {
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      }
      100% {
        box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.4);
      }
    }
    .title {
      padding: 0;
      font-size: 22px;
    }
    .change-type-wrap {
      width: 260px;
      height: 45px;
      margin: 0 auto;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      position: relative;
      span {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 400;
        &.active {
          color: $primaryColor;
        }
      }
      .under-line {
        position: absolute;
        height: 2px;
        width: 100px;
        background: $primaryColor;
        bottom: 0;
        left: -8px;
        transition: 0.3s;
      }
    }
    .password-login-form,
    .phone-verify-form {
      width: 80%;
      margin: 20px auto;
    }
    .input-item {
      height: 50px;
      margin-bottom: 20px;
      position: relative;
      //向上移动的文字
      .input-text {
        position: absolute;
        z-index: 0;
        opacity: 0;
        height: 20px;
        top: 50%;
        pointer-events: none;
        color: $primaryColor;
        line-height: 20px;
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
      }
      .send-code-btn {
        height: 35px;
        width: 35%;
        position: absolute;
        right: 0;
        bottom: 0;
        line-height: 35px;
        text-align: center;
        font-weight: 400;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid $primaryColor;
        color: $primaryColor;
        &.disabled {
          border: 1px solid #d9d9d9;
          color: rgba(0, 0, 0, 0.65);
          cursor: not-allowed;
        }
      }
      .icon {
        position: absolute;
        width: 16px;
        height: 16px;
        right: 10px;
        top: 50%;
        margin-top: -8px;
        &.account {
          background: url("../../assets/img/login/user.png");
          background-size: 100% 100%;
        }
        &.password {
          background: url("../../assets/img/login/pass.png");
          background-size: 100% 100%;
        }
        &.phone {
          background: url("../../assets/img/login/phone.png");
          background-size: 100% 100%;
        }
      }
      input:focus ~ .input-text {
        top: 0;
        z-index: 3;
        opacity: 1;
        margin-top: -10px;
      }
      input:focus ~ .account {
        background: url("../../assets/img/login/user-check.png");
        background-size: 100% 100%;
      }
      input:focus ~ .password {
        background: url("../../assets/img/login/pass-check.png");
        background-size: 100% 100%;
      }
      input:focus ~ .phone {
        background: url("../../assets/img/login/phone-check.png");
        background-size: 100% 100%;
      }
      input {
        border: none;
        outline: none;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #d8d8d8;
        color: #7b7b7b;
        padding-right: 60px;
        box-sizing: border-box;
        &.code {
          width: 60%;
        }
        &:focus {
          border-color: $primaryColor;
        }
      }
    }
  }
  .auto-login-forget {
    height: 35px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .check-box {
      width: auto;
      height: 16px;
      display: inline-block;
      cursor: pointer;
      user-select: none;
      img {
        height: 16px;
        display: inline-block;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    .forget {
      margin-left: auto;
      color: $primaryColor;
    }
  }
  .login-btn {
    width: 80%;
    height: 40px;
    background: $primaryColor;
    margin: 15px auto 0 auto;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 3px;
    cursor: pointer;
  }
  .register-text {
    text-align: right;
    margin-top: 12px;
    margin-right: 10%;
    color: $primaryColor;
  }
}
@media screen and (max-width: 1500px) {
  .login-wrap {
    .logo-wrap {
      position: absolute;
      top: 50px;
      left: 70px;
      img {
        height: 40px;
      }
    }
    .illustration-wrap {
      width: 350px;
      height: 360px;
      background: url("../../assets/img/login/illustration.png");
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 180px;
      margin-top: -180px;
    }
    .login-form {
      width: 398px;
      height: 386px;
      background: #fff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      position: absolute;
      right: 140px;
      top: 50%;
      margin-top: -193px;
    }
  }
}
</style>
```

