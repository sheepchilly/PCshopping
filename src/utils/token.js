//持久化存储token

//存储TOKEN
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
//获取TOKEN
export const getToken=()=>{
    return localStorage.getItem('TOKEN')
}
//清除本地存储的Token
export const removeToken=()=>{
    //通过key清除value
    localStorage.removeItem("TOKEN")
}