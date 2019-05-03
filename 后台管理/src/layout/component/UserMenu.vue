<template>
  <el-menu theme="dark" class="user-menu-component header-menu" mode="horizontal">
    <!-- <el-menu-item index="5">
      <i class="fa fa-envelope-o" aria-hidden="true"></i>
      <el-badge :value="3" class="item">
      </el-badge>
    </el-menu-item> -->
    <el-submenu index="1" class="userinfo-list">
      <template slot="title"><img src="../../asset/gly.png" alt="" class="manager-img">{{userName.name}}</template>
      <el-menu-item index="2-1" @click="modifyPassword">修改密码</el-menu-item>
      <el-menu-item index="2-2" @click="signOut">退出登录</el-menu-item>
      <!-- <li @click="modifyPassword">修改密码</li>
			<li @click="signOut">退出登录</li> -->
    </el-submenu>
    <!-- <el-menu-item index="6">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
    </el-menu-item> -->
    <el-dialog :visible.sync="dialogModifyPasswordVisible" title="修改密码" width="600px" class="role-user">
      <el-form :model="formModifyPasswordInfo" :rules="formModifyPasswordRules" ref="formModifyPasswordInfo" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="formModifyPasswordInfo.oldPassword" size="small" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formModifyPasswordInfo.newPassword" size="small" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="againPassword">
          <el-input v-model="formModifyPasswordInfo.againPassword" size="small" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" align="right">
        <el-button size="small" @click="dialogModifyPasswordVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="saveNewPassword">保存</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import {getUserInfo, modifyPassword ,signOut} from '@/api/index'

export default {
  name: 'user-menu',
  data () {
    return {
      userName: '',
      formModifyPasswordInfo: {
        oldPassword: '',
        newPassword: '',
        againPassword: ''
      },
      formModifyPasswordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码' }
        ],
        againPassword: [
          { required: true, message: '请再次输入新密码' }
        ]
      },
      dialogModifyPasswordVisible: false
    }
  },
  created () {
    getUserInfo().then(response => {
      if (response.success) {
        this.userName = response.data
      } else {
        window.location.href = window.location.origin + '/static/login/login.html'
      }
    })
  },
  methods: {
    signOut () {
      // signOut().then(res=>{
      //   if(res.success){
          
      //   }
      // })
      location.href = '/static/login/login.html'
    },
    modifyPassword () {
      this.formModifyPasswordInfo.newPasswrod = ''
      this.formModifyPasswordInfo.againPassword = ''
      this.dialogModifyPasswordVisible = true
    },
    saveNewPassword () {
      if (this.formModifyPasswordInfo.newPassword === this.formModifyPasswordInfo.againPassword) {
        this.$refs.formModifyPasswordInfo.validate((valid) => {
          if (!valid) return false
          const passwordParams = {
            currentUserId: this.userName.id,
            newPassword: this.formModifyPasswordInfo.newPassword,
            oldPasswrod: this.formModifyPasswordInfo.oldPassword
          }
          modifyPassword(passwordParams).then(response => {
            if (response.success) {
              this.$message('修改成功！')
              this.dialogModifyPasswordVisible = false
            } else {
              this.$message.warning(response.msg)
            }
          })
        })
      } else {
        this.$message('密码输入不一致，请重新输入')
      }
    }
  }
}
</script>

<style scoped>
.user-menu-component.header-menu {
  float: right;
}

.fa {
  font-size: 16px;
}
</style>

<style>
.user-menu-component .el-badge {
  position: absolute;
  right: 7px;
}

.user-menu-component .el-badge__content {
  height: 16px;
  padding: 0 5px;
  line-height: 16px;
}
.user-menu-component .head-img{
  width:36px;
}

.user-menu-component .manager-img{
  width:50px;
  margin-top:10px;

}
.user-menu-component .userinfo .el-submenu__title{
  color:#000!important
}
.el-menu--horizontal .el-menu li{
	cursor: pointer;
	text-align: center;
}
</style>
