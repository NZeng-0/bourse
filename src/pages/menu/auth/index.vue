<script setup lang="ts">
import { useAuth } from '~/store/useAuth'

const authStore = useAuth()

const auth = !authStore.auth === null
</script>

<template>
  <verified v-if="auth" />
  <unverified v-else />
</template>
