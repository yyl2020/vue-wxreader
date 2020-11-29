<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMinx } from '../../util/mixin'
import { getFontFamily, saveFontFamily, saveFontSize, getFontSize, saveTheme, getTheme } from '../../util/localStorage'
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
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
      this.setFontFamilyVisible(false)
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
      this.rendition.display().then(() => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
      })
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
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet('http://121.199.52.159:8089/fonts/cabin.css')
        contents.addStylesheet('http://121.199.52.159:8089/fonts/daysOne.css')
        contents.addStylesheet('http://121.199.52.159:8089/fonts/montserrat.css')
        contents.addStylesheet('http://121.199.52.159:8089/fonts/tangerine.css')
      })
    },
    initFontSize() {
        const fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.setDefaultFontSize(fontSize)
          this.rendition.themes.fontSize(fontSize + 'px')
        }
    },
    initFontFamily() {
        const font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.setDefaultFontFamily(font)
          this.rendition.themes.font(font)
        }
    },
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        this.setDefaultTheme(defaultTheme)
        saveTheme(this.fileName, defaultTheme)
      }
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    }
  }
}
</script>

<style>
</style>