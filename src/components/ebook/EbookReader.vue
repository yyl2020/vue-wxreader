<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMinx } from '../../util/mixin'
global.ePub = Epub
export default {
  mixins:[ebookMinx],
  data() {
    return {
      startX: 0,
      startTime: 0,
      rendition: {}
    }
  },
  mounted() {
    console.log(this.$route.params.fileName)
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      } 
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
    },
    initEpub() {
      const url = `http://121.199.52.159:8089/${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.setCurrentBook(this.book)
      this.rendition.display()
      this.rendition.on('touchstart', (event) => {
        this.startX = event.changedTouches[0].clientX
        this.startTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => {
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