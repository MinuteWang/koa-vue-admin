<template>
  <el-container style="height:100%">
    <el-header>
      <admin-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <admin-menu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
export default {
  components: {
    AdminHeader,
    AdminMenu
  }
};
</script>

<style>
</style>
