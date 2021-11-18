

参考链接：

[Vue3+Vite+TS+Eslint（Airbnb规则）搭建生产项目，踩坑详记（二）：配置husky和lint-staged](https://juejin.cn/post/6982876819292684318)

[husky7.0.1 + commitlint 配置提交代码检查和规范踩坑指南](https://juejin.cn/post/6988116616923840549)

[编码规范，代码提交规范全家桶之husky+lint-staged+commitlint](https://juejin.cn/post/7002910497565622286)

安装eslint及相关插件

```js
// eslint eslint-plugin-vue  babel-eslint eslint-plugin-import 
cnpm i eslint eslint-plugin-vue babel-eslint eslint-plugin-import -D


// @vue/eslint-config-airbnb or @vue/eslint-config-standard  airbnb规范  standard规范 具体看使用什么规范 对应的.eslintrc.js使用对应的
cnpm i @vue/eslint-config-airbnb -D
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb'  // @vue/standard
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

// 注意 使用@vue/aribnb 或者 vue/standard 需要安装@vue/cli-service
cnpm i @vue/cli-service -D

// 如果使用@vue/eslint-config-standard 规范 需要额外安装一些依赖包
cnpm i eslint-plugin-node eslint-plugin-promise -D
```

```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb', // @vue/standard  @vue/airbnb
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.*.js', // protractor config
          '**vite**',
          '**@vitejs**',
        ],
      },
    ],
  },
};
```



安装husky和eslint

[husky](https://www.npmjs.com/package/husky)

```js
// husky  npm set-script prepare "husky install" 需要npm7.0以上
cnpm i husky -D
// 修改package.json
{
  '''
  "scripts": {
    ...
    "prepare": "husky install"
    ...
  }
  '''
}
// 执行 
// 在这之前确定项目有 git init 如果从网上clone项目需要再次执行 npm run prepare
npm run prepare
  
// add hook
npx husky add .husky/pre-commit "npm run lint-staged"
git add .husky/pre-commit
```

lint-staged

```js
// 安装
cnpm i lint-staged -D
// 配置 package.json
// package.json
...
"scripts": {
    ...
    "lint-staged": "lint-staged"
},
"lint-staged": {
    "*.{ts,js,vue}": [
      "eslint --fix",
      "git add ."
    ]
}
```

完整的package.json

```json
{
  "name": "vite-template",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.9.3",
    "babel-eslint": "^10.1.0",
    "eslint": "^7.30.0",  // 版本不要8.x 8.x 目前报错，暂不知道原因 可能和node版本有关系
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-vue": "^8.0.3",
    "husky": "^7.0.4",
    "lint-staged": "^12.0.2",
    "vite": "^2.6.4"
  },
  "lint-staged": {
    "*.{ts,js,vue}": [
      "eslint --fix",
      "git add ."
    ]
  }
}

```

备注：

> 针对vue3 setup部分api不需要引入eslint报错，可用eslint-disable注释替换 或者加上引入

```vue
<script setup>
  defineProps({
    msg: String,
  });
  // eslint会报错，defineProps is not defined
</script>
<!-- 可以加上引入 -->
<script setup>
import { defineProps } from 'vue'
</script>
<!-- 或者eslint disable 注释 -->
<script setup>
  /* eslint-disable */
  defineProps({
    msg: String,
  });
  /* eslint-disable */
</script>
```

#### 如果是Ts项目 需要额外安装的插件

```js
cnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
// 使用@vue/aribnb规范还需要安装 eslint-plugin-vuejs-accessibility
cnpm i eslint-plugin-vuejs-accessibility -D
```



```json
// ts 完整的package.json
{
  "name": "user-card-ts",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview",
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vitejs/plugin-vue": "^1.9.3",
    "@vue/cli-service": "^4.5.15",
    "@vue/eslint-config-airbnb": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^7.30.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-vue": "^8.0.3",
    "eslint-plugin-vuejs-accessibility": "^1.1.0",
    "husky": "^7.0.4",
    "lint-staged": "^12.0.2",
    "typescript": "^4.4.3",
    "vite": "^2.6.4",
    "vue-tsc": "^0.3.0"
  },
  "lint-staged": {
    "*.{ts,js,vue}": [
      "eslint --fix",
      "git add ."
    ]
  }
}

```

```js
// ts 完整的eslintrc.js文件module.exports = {  root: true,  env: {    node: true,  },  extends: [    'plugin:vue/vue3-essential',    'plugin:import/recommended',    '@vue/airbnb', // @vue/standard  @vue/airbnb  ],  plugins: ['@typescript-eslint'],  parserOptions: {    parser: '@typescript-eslint/parser',  },  settings: {    'import/resolver': {      typescript: {}    },  },  rules: {    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',    'import/no-extraneous-dependencies': [      'error',      {        devDependencies: [          'test/**', // tape, common npm pattern          'tests/**', // also common npm pattern          'spec/**', // mocha, rspec-like pattern          '**/__tests__/**', // jest pattern          '**/__mocks__/**', // jest pattern          'test.{js,jsx}', // repos with a single test file          'test-*.{js,jsx}', // repos with multiple top-level test files          '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test          '**/jest.config.js', // jest config          '**/webpack.config.js', // webpack config          '**/webpack.config.*.js', // webpack config          '**/rollup.config.js', // rollup config          '**/rollup.config.*.js', // rollup config          '**/gulpfile.js', // gulp config          '**/gulpfile.*.js', // gulp config          '**/Gruntfile{,.js}', // grunt config          '**/protractor.conf.js', // protractor config          '**/protractor.conf.*.js', // protractor config          '**vite**',          '**@vitejs**',        ],      },    ],  },};
```



Ts项目其他问题汇总

```js
// 解决Ts项目eslint不识别@ 标识符问题https://stackoverflow.com/questions/67835072/vue-3-on-vite-js-with-eslint-unable-to-resolve-path-to-module-eslintimport-no/69640843#69640843npm install eslint-import-resolver-typescript// .eslintrc.js{  // other configuration are omitted for brevity  settings: {    "import/resolver": {      typescript: {} // this loads <rootdir>/tsconfig.json to eslint    },  },}
```



### commit 规范

添加 commit-msg 脚本

```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

 ```sh
# 安装插件npm install --save-dev @commitlint/config-conventional @commitlint/cli
 ```

新建commitlint.config.js文件

```js
// commitlint.config.jsmodule.exports = {  extends: [    '@commitlint/config-conventional',  ],  rules: {    'type-enum': [2, 'always', [      'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert',    ]],    'type-case': [0],    'type-empty': [0],    'scope-empty': [0],    'scope-case': [0],    'subject-full-stop': [0, 'never'],    'subject-case': [0, 'never'],    'header-max-length': [0, 'always', 72],  },};
```

