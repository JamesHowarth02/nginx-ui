<script setup lang="ts">
import { PortScannerCompact } from '@/components/PortScanner'
import Basic from './Basic.vue'
import Chat from './Chat.vue'

const activeKey = ref('basic')
</script>

<template>
  <div class="right-settings-container">
    <ACard
      class="right-settings"
      :bordered="false"
    >
      <ATabs
        v-model:active-key="activeKey"
        size="small"
      >
        <ATabPane key="basic" :tab="$gettext('Basic')">
          <Basic />
        </ATabPane>
        <ATabPane key="chat" :tab="$gettext('Chat')">
          <Chat />
        </ATabPane>
        <ATabPane key="port-scanner" :tab="$gettext('Port Scanner')">
          <PortScannerCompact />
        </ATabPane>
      </ATabs>
    </ACard>
  </div>
</template>

<style scoped lang="less">
.right-settings-container {
  position: relative;

  .right-settings {
    position: relative;
  }

  :deep(.ant-tabs-nav) {
    margin: 0;
    height: 55px;
    padding: 0 24px;
  }
}

:deep(.ant-tabs-content) {
  padding-top: 24px;
  overflow-y: auto;
}
</style>
