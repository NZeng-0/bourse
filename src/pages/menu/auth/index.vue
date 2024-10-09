<script setup lang="ts">
import { useAuth } from '~/store/useAuth'

const authStore = useAuth()

const { name, idcard } = authStore.auth

let auth = false
if (name !== '' && idcard !== '')
  auth = true
</script>

<template>
  <verified v-if="auth" />
  <unverified v-else />
</template>
