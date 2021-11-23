<template>
  <div class="container bg-grey" v-show="hasGetData">
    <div class="user-card-box inner-container bg-white">
      <dl class="user-info">
        <dt>
          <img class="logo" :src="loadImage('logo.jpg')" alt="" />
        </dt>
        <dd>
          <p class="inset-name">
            <span class="text-big">{{ userInfo.name }}</span>
            <span class="en-name">{{ userInfo.name_en }}</span>
          </p>
          <p>{{ userInfo.title }}</p>
          <p>{{ companyName }}</p>
        </dd>
      </dl>
      <div class="contact-list m-t-30">
        <p class="text-big">联系方式</p>
        <ul>
          <li>
            <span>手机</span>
            <span><a :href="`tel:${userInfo.phone}`">{{ userInfo.phone }}</a></span>
          </li>
          <li>
            <span>微信</span>
            <span>{{ userInfo.wechat || userInfo.phone }}</span>
          </li>
          <li>
            <span>地址</span>
            <span>{{ userInfo.address || address }}</span>
          </li>
          <li>
            <span>邮箱</span>
            <span><a :href="`mailto:${userInfo.email}`">{{ userInfo.email }}</a></span>
          </li>
          <li>
            <span>网址</span>
            <span><a :href="`https://${linkUrl}`">{{ linkUrl }}</a></span>
          </li>
        </ul>
      </div>
      <div class="image-video m-t-30">
        <p class="text-big">图片视频</p>
        <img alt="section-1" class="m-t-10" :src="loadImage('section1-1.jpg')">
        <img alt="section-2" :src="loadImage('section1-2.jpg')">
        <img alt="section-3" :src="loadImage('section1-3.jpg')">
        <img alt="section-4" :src="loadImage('section1-4.jpg')">
        <img alt="section-5" :src="loadImage('section1-5.jpg')">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onMounted, computed, ComputedRef, Ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { $get } from '@/utils/request';

const route = useRoute();
const hasGetData = ref(false);
interface UserInfo {
  name: string;
  name_en: string;
  email: string;
  address: string;
  org: number;
  phone: string;
  title: string;
  title_en: string;
  wechat: string;
}
type PartialUserInfo = Partial<UserInfo>
// Partial 蒋参数变为可选
const userInfo: Ref<PartialUserInfo> = ref({});

// computed
const isWebeye: ComputedRef<boolean> = computed(():boolean => userInfo.value.org === 1);

const companyName: ComputedRef<string> = computed(():string => (isWebeye.value ? 'WebEye 网眼' : 'ModooPlay'));

const linkUrl: ComputedRef<string> = computed(():string => (isWebeye.value ? 'www.webeye.com' : 'www.modooplay.com'));

const address: ComputedRef<string> = computed(():string => (isWebeye.value ? '南京市软件大道21号H栋1层' : '南京市软件大道21号H栋2层'));

// methods
const getUser = () => {
  const userId: string = <string>route.params.id;
  return $get(`users/${userId}`).then((res: any) => res.data);
};

const loadImage = (url: string): string => {
  const path:string = isWebeye.value ? 'webeye' : 'modoo';
  return `${import.meta.env.BASE_URL}images/${path}/${url}`;
};

const setTitle = (): void => {
  const prefix: string = isWebeye.value ? 'WebEye' : 'ModooPlay';
  document.title = `${prefix} | ${userInfo.value.name}`;
};

const wxShare = (): void => {
  wx.ready(() => {
  // 分享给朋友
    const userInfoValue: PartialUserInfo = userInfo.value;
    const title: string = `${userInfoValue.name} | ${userInfoValue.name_en}`;
    const link: string = window.location.href;
    const desc: string = `${userInfoValue.title}\n\n${companyName.value}`;
    const imgUrl: string = isWebeye.value
      ? 'http://businesscard.webeye.cn/images/webeye/logo.jpg'
      : 'http://businesscard.webeye.cn/images/modoo/logo.jpg';
    wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
    });
    // 分享到朋友圈
    wx.updateTimelineShareData({
      title,
      link,
      imgUrl,
    });
  });
};

onMounted(async () => {
  userInfo.value = await getUser();
  setTitle();
  wxShare();
  hasGetData.value = true;
});

</script>

<style scoped lang="scss">
img {
  max-width: 100%;
}
.user-card-box {
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  border-radius: 10px;
}
.user-info {
  padding-top: 6px;
  display: flex;
  align-items: center;
  font-size: 16px;
  dt {
    width: 70px;
    height: 70px;
    margin-right: 10px;
    .logo {
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    }
  }
  dd {
    p {
      &:not(:first-child) {
        margin-top: 2px;
      }
      &.inset-name {
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span.en-name {
          font-size: 14px;
          margin-left: 20px;
          font-weight: bold;
          position: relative;
          &:before {
            position: absolute;
            height: 14px;
            width: 1px;
            background-color: #666;
            content: '';
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
.contact-list {
  ul {
    li {
      font-size: 16px;
      line-height: 30px;
      &:first-child {
        margin-top: 6px;
      }
      display: flex;
      span {
        margin-right: 8px;
        &:last-child {
          flex: 1
        }
      }
      a {
        text-decoration: none;
        color: #333
      }
    }
  }
}
</style>
