<script setup lang="ts">


</script>

<template>
  <UModal title="Modal with title" aria-describedby="modal feedback" description="Modal with description">
    <slot/>
    <template #body>
      modalA
      Modal with description
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, impedit quia esse omnis odio, accusantium placeat ducimus, commodi dignissimos modi perferendis ratione iure! Iure, mollitia. Veniam corporis optio dolores adipisci. Sed, similique accusantium explicabo totam blanditiis nostrum fuga aspernatur excepturi?
    </template>
  </UModal>
</template>
