<template>
  <div class="container">
    <header class="page-header">
      <div>
        <nuxt-link to="/">
          <img
          src="../../dist/img/logo.png"
          alt="Logo"
          title="Home page"
          class="logo"
        />
          </nuxt-link>
      </div>

    </header>
    <nuxt/>
  </div>
</template>

<style>
.page-header {
  border-bottom: 0px;
}
.logo {
  width: 50px;
  float: left;
  margin-right: 15px;
}
</style>
