import { mapGetters, mapActions } from 'vuex'
import { themeList } from '../utils/book'
import { setBookObject } from '../utils/localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'filename',
      'menuvisible',
      'setvisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom']),
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setFilename',
      'setMenuVisible',
      'setVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom']),
      refreshProgress(){
        let current = this.currentBook.rendition.currentLocation()
        let startCfi = current.start.cfi
        let process = this.currentBook.locations.percentageFromCfi(startCfi)
        setBookObject(this.filename,"startCfi",startCfi)
        this.setProgress(Math.floor(process*100))
        this.setSection(current.start.index)
      },
      display(target,fun){
        if(target){
          this.currentBook.rendition.display(target).then(()=>{
            this.refreshProgress()
            if(fun) fun()
          })
        }else{
          this.currentBook.rendition.display().then(()=>{
            this.refreshProgress()
            if(fun) fun()
          })
        }
      },
  }
}
