<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  data() {
    return {
      startX: 0,
      startTime: 0,
      redition: {}
    }
  },
  computed: {
    ...mapGetters(['fileName', 'menuVisible'])
  },
  mounted() {
    console.log(this.$route.params.fileName)
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    prevPage() {
      if (this.redition) {
        this.redition.prev()
      }
    },
    nextPage() {
      if (this.redition) {
        this.redition.next()
      } 
    },
    toggleTitleAndMenu () {
      this.$store.dispatch('setMenuVisible', !this.menuVisible)
    },
    initEpub() {
      const url = `http://121.199.52.159:8089/${this.fileName}.epub`
      this.book = new Epub(url)
      this.redition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.redition.display()
      this.redition.on('touchstart', (event) => {
        this.startX = event.changedTouches[0].clientX
        this.startTime = event.timeStamp
      })
      this.redition.on('touchend', (event) => {
        const clientX = event.changedTouches[0].clientX - this.startX
        const time = event.timeStamp - this.startTime
        if (time < 500 && clientX > 40) {
          this.prevPage()
        } else if (time < 500 && clientX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefalut()
        event.stopPropagation()
      })
    }
  }
}
</script>

<style>
</style>