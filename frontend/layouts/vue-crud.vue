<template>
  <div class="container">
    <header class="page-header">
      <div>
            <Navbar/>

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



<script>
import Navbar from '~/components/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>

