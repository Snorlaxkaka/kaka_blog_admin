<template>
  <div class="page-login">
    <div>
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请先登录</span>
        </div>
        <!-- 表单添加验证规则和状态提示 -->
        <el-form 
          class="card-body" 
          ref="form" 
          label-width="80px"
          :model="model"
          :rules="rules"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="model.username" 
              placeholder="请输入用户名"
              @keyup.enter.native="handleLogin"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="model.password" 
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            >
              <!-- 密码显示/隐藏切换 -->
              <i 
                slot="suffix" 
                :class="showPassword ? 'el-icon-eye-off' : 'el-icon-eye'"
                @click="showPassword = !showPassword"
                style="cursor: pointer"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              @click="handleLogin"
              style="margin-right: 10px"
            >
              登录
            </el-button>
            <el-button 
              type="danger" 
              @click="handleRegister"
           
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 密码验证规则（可根据实际需求调整）
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (value.length < 6) {
        return callback(new Error('密码长度不能少于6位'))
      }
      callback()
    }

    return {
      model: {
        username: '', // 初始化数据，避免undefined
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ]
      },
      showPassword: false // 密码显示状态
    }
  },
  methods: {
    // 登录处理
    async handleLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
         // 创建全屏加载实例
          const loadingInstance = this.$loading({
            lock: true,
            text: '登录中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          try {
            const res = await this.$http.post('/login', this.model)
            console.log('res',res)
            // 验证响应数据完整性（兼容旧版JS语法）
            if (!res.data || !res.data.token || !res.data.username) {
              throw new Error('登录信息不完整')
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('/')
          } catch (error) {
            // 处理错误信息（兼容旧版JS语法）
            let errorMsg = '登录失败，请重试'
            if (error.response && error.response.data && error.response.data.message) {
              errorMsg = error.response.data.message
            } else if (error.message) {
              errorMsg = error.message
            }
            this.$message({
              type: 'error',
              message: errorMsg
            })
          } finally {
          loadingInstance.close();
          }
        }
      })
    },

    // 注册处理
    async handleRegister() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
           // 创建全屏加载实例
          const loadingInstance = this.$loading({
            lock: true,
            text: '登录中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          try {
            const res = await this.$http.post('/register', this.model)
            console.log(res)

            // 验证响应数据完整性（兼容旧版JS语法）
            if (!res.data || !res.data.token || !res.data.username) {
              throw new Error('注册信息不完整')
            }
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.$message({
              type: 'success',
              message: '注册成功，请登录'
            })
            // 注册成功后重置表单
            this.$refs.form.resetFields()
            this.$router.push('/login')
          } catch (error) {
            // 处理错误信息（兼容旧版JS语法）
            let errorMsg = '注册失败，请重试'
            if (error.response && error.response.data && error.response.data.message) {
              errorMsg = error.response.data.message
            } else if (error.message) {
              errorMsg = error.message
            }
            this.$message({
              type: 'error',
              message: errorMsg
            })
          } finally {
            loadingInstance.close();
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;

  .card-view {
    width: 100%;
    max-width: 500px; // 最大宽度限制
    padding: 2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); // 添加阴影提升层次感

    .card-body {
      margin-top: 2rem;
    }
  }

  // 响应式调整
  @media (max-width: 768px) {
    .card-view {
      width: 90%;
      padding: 1rem;
    }
  }
}
</style>
