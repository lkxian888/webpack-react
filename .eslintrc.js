module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 继承的规则 [扩展]
  // extend 提供的是 eslint 现有规则的一系列预设
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // 插件
  // plugin 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候就可以借用插件来实现了
  plugins: ['react', '@typescript-eslint'],
  // 解析器  espima(默认), babel-eslint, @typescript-eslint/parse
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // es 特性配置
    ecmaFeatures: {
      globalReturn: true, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode
      jsx: true, // 启用 JSX
    },
    // es 版本号，默认为 5，也可以是用年份，比如 2015 (同 6)
    ecmaVersion: 12,
    // 代码类型：script(默认), module
    sourceType: 'module',
  },

  // 规则
  //   名称"semi"和"quotes"是ESLint中规则的名称。第一个值是规则的错误级别，可以是以下值之一：
  // "off"或0- 关闭规则
  // "warn"或1- 打开规则作为警告（不影响退出代码）
  // "error"或2- 将规则作为错误打开（退出代码将为 1）
  rules: {
    // semi: ['error', 'always'],
    // quotes: ['error', 'double'],

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 0, // 关闭 require

    // 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
    'no-extra-boolean-cast': 2, //  禁止不必要的布尔转换
    'no-extra-parens': 0, //  禁止不必要的括号
    'no-extra-semi': 2, //  禁止不必要的分号
    'no-irregular-whitespace': 2, // 禁止不规则的空白
    'no-console': 0,
    'no-debugger': 'error', // 禁用 debugger

    // 这些规则是关于风格指南的，而且是非常主观的
    semi: 1, // 要求或禁止使用分号代替 ASI
    camelcase: 2, // 强制使用骆驼拼写法命名约定
    'comma-dangle': 0, // 要求或禁止末尾逗号

    // 这些规则与变量声明有关
    'no-unused-vars': 1, // 禁止出现未使用过的变量
    'no-shadow': 2, // 禁止变量声明与外层作用域的变量同名
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-use-before-define': 0, // 禁止在变量定义之前使用它们

    // 这些规则只与 ES6 有关, 即通常所说的 ES2015
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-duplicate-imports': 2, // 禁止重复模块导入
    'no-useless-rename': 2, // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-var': 2, // 要求使用 let 或 const 而不是 var
    'object-shorthand': 2, // 要求或禁止对象字面量中方法和属性使用简写语法
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
  },
};
