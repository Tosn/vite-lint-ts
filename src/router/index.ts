import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { $get } from '@/utils/request';
// 60ffbd8aedaa946ea9819949  60ffbd8aedaa946ea9819929
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index/60ffbd8aedaa946ea9819949',
  },
  {
    path: '/index/:id',
    component: () => import('@/views/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async () => {
  const url = window.location.href;
  const { data } = await $get(`jsconfig?url=${url}`);
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.app_id, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
  });
});

export default router;
