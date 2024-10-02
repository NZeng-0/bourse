<script setup lang="ts">
import { useUser } from '~/store/useUser'

const user = useUser()

const auth = user.data.auth_status === 1
</script>

<template>
  <verified v-if="auth" />
  <unverified v-else />
</template>
