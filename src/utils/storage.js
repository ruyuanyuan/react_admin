/***
 * storage数据存储
 */
import store from 'store'
 export default {
    //存数据
    saveStorage(key,value){
      // localStorage.setItem(key,JSON.stringify(value))
      store.set(key,value)
    },
    //取数据
    getStorage(key){
      // return JSON.parse(localStorage.getItem(key)||'{}')
      return store.get(key)
    },
    //删除数据
    removeStorage(key){
      store.remove(key)
      // localStorage.removeItem(key)
    },
    //清除所有数据
    clearStorage(){
      store.clearAll()
      // return localStorage.clear()
    }
 }