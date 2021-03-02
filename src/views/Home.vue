<template>
  <div>
    <Navbar />
    <router-view class="mx-4 " />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Home",
  components: { Navbar }
};
</script>

<style></style>
