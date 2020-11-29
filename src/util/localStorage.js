
export function setBookObject(fileName, key, value) {
    let book = JSON.parse(localStorage.getItem(`${fileName}-info`))

    if (!book) {
        book = {}
    }
    book[key] = value

    localStorage.setItem(`${fileName}-info`, JSON.stringify(book))
}

export function getBookObject(fileName, key) {
    let book = localStorage.getItem(`${fileName}-info`)

    if (book) {
        book = JSON.parse(book)
       return book[key] 
    } else {
        return null
    }
}
export function getLocale() {
    return localStorage.getItem('locale')
}
export function saveLocale(locale) {
    return localStorage.setItem('locale', locale)
}
export function getFontFamily(fileNmae) {
    return getBookObject(fileNmae, 'fontFamily')
}
export function saveFontFamily(fileNmae, font) {
    return setBookObject(fileNmae, 'fontFamily', font)
}

export function getFontSize(fileName) {
    return getBookObject(fileName, 'fontSize')
  }
  
  export function saveFontSize(fileName, fontSize) {
    setBookObject(fileName, 'fontSize', fontSize)
  }
  export function getLocation(fileName) {
    return getBookObject(fileName, 'location')
  }
  
  export function saveLocation(fileName, location) {
    setBookObject(fileName, 'location', location)
  }
  
  export function getBookmark(fileName) {
    return getBookObject(fileName, 'bookmark')
  }
  
  export function saveBookmark(fileName, bookmark) {
    setBookObject(fileName, 'bookmark', bookmark)
  }
  
  export function getReadTime(fileName) {
    return getBookObject(fileName, 'time')
  }
  
  export function saveReadTime(fileName, theme) {
    setBookObject(fileName, 'time', theme)
  }
  
  export function getProgress(fileName) {
    return getBookObject(fileName, 'progress')
  }
  
  export function saveProgress(fileName, progress) {
    setBookObject(fileName, 'progress', progress)
  }
  
  export function getNavigation(fileName) {
    return getBookObject(fileName, 'navigation')
  }
  
  export function saveNavigation(fileName, navigation) {
    setBookObject(fileName, 'navigation', navigation)
  }
  
  export function getMetadata(fileName) {
    return getBookObject(fileName, 'metadata')
  }
  
  export function saveMetadata(fileName, metadata) {
    setBookObject(fileName, 'metadata', metadata)
  }
  
  export function getCover(fileName) {
    return getBookObject(fileName, 'cover')
  }
  
  export function saveCover(fileName, cover) {
    setBookObject(fileName, 'cover', cover)
  }

  export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
  }
  
  export function saveTheme(fileName, theme) {
    setBookObject(fileName, 'theme', theme)
  }