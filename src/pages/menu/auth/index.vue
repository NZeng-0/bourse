<script setup lang="ts">
import { useAuth } from '~/store/useAuth'
import unverified from '~/components/menu/auth/unverified.vue'
import verified from '~/components/menu/auth/verified.vue'

const authStore = useAuth()

const auth = authStore.auth === null
</script>

<template>
  <component :is="auth ? unverified : verified" />
</template>
