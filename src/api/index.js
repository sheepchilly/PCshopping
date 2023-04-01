//当前这个模块：API进行统一管理
//requests就是封装后的axios，只不过把它的名字改成了requests
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动的接口
///api/product/getBaseCategoryList get请求，无参数
//axios发请求返回结果是Promise对象，这里写成一行省略了return
//写成箭头函数并且对外暴露，别的模块就可以调用
export const reCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

//获得首页轮播图的接口
export const reGetBannerList = ()=>mockRequests.get('/banner');

//获取floor数据
export const reFloorList=()=>mockRequests.get('/floor')

//获取search模块数据 post请求=>向服务器提交数据
//当前这个接口，给服务器传递参数params，params至少是一个空对象
export const reSearchInfo = params=>requests({url:'/list',method:'post',data:params})

//获取产品详情信息的接口 URL：/api/item/{skuId} 请求方式:get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车(获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表数据的接口
export const reqCartList=()=>requests({url:'/cart/cartList',method:"get"})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})

//修改商品选中的状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码的接口
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

//用户注册的接口
export const reqUserRegister = (data)=>requests({url:`/user/passport/register/`,data,method:"post"})

//用户登录的接口
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,data,method:"post"})

//添加token校验获取用户登录信息
export const reqUserToken = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:"get"})

//退出登录
export const reqLogout = ()=>requests({url:`/user/passport/logout`,method:"get"})

//获取用户地址信息
export const reqAddressInfo =()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})

//获取商品清单
export const reqOrderInfo = ()=>requests({url:`/order/auth/trade`,method:'get'})

//提交订单
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取订单的数据
export const reqMyOrderList =(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
