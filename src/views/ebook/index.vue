<template>
  <div class="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
export default {
    data () {
        return {

        }
    },
    components:{
        EbookReader,
        EbookTitle
    }
}
</script>

<style>

</style>