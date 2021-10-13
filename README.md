# babel 解释

- babel-loader webpack 使用 babel 解析用到的 loader,打包转换成 es5 语法

- @babel/core babel 核心包，使用 babel 解析的合并包

- @babel/preset-env babel 官方预设的一些转换 babel 需要用到的 babel 依赖

- @babel/preset-react 解析 react 的 jsx 语法预设的一些依赖

- @babel/preset-typescript //typescript preset 翻译：预设置

# ts 解析/支持

- ts-loader 用来解析 ts 文件

- ts-loader typescript @types/react @types/react-dom @types/react-router-dom

# file

- file-loader 解决 css 等文件中引入图片路径的问题

- url-loader 当图片较小的时候会把图片 BASE64 编码，大于 limit 参数的时候还是使用 file-loader 进行拷贝

# antd

- "less": "2.7.3", 版本太高会报错
- "less-loader": "^10.0.1",

# eslint && ts 安装 ESLint 解析 TypeScript 的依赖 .prettierrc

```js
全局安装 npm install eslint -g

项目运行： eslint --init  回车看提示选择即可

yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

1. eslint：javascript代码检测工具，使用espree解析器

2. @typescript-eslint/parser：将 TypeScript 转换为 ESTree，使 eslint 可以识别

3. @typescript-eslint/eslint-plugin：只是一个可以打开或关闭的规则列表

```

# Prettier：一个 Opinionated 的代码格式化工具 .prettierrc

```js
1.prettier: 格式化规则程序

2.eslint-config-prettier: 禁用所有和 Prettier 产生冲突的规则

3.eslint-plugin-prettier: 把 Prettier 应用到 Eslint，配合 rules "prettier/prettier": "error" 实现 Eslint 提醒。

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

Visual Studio Code 安装插件 ESLint、Prettier
```

# EditorConfig：不同编辑器和 IDE 之间定义和维护一致的代码风格；.editorconfig

- 安装插件 EditorConfig

```js
打开vscode设置： ctrl+shift+p  => settings.json

{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.fontFamily": "JetBrains Mono, Consolas, 'Courier New', monospace",
  "editor.fontSize": 16,
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "todo-tree.general.tags": ["TODO", "FIXME", "XXX", "NOTE", "BUG", "HACK"],
  "todo-tree.highlights.defaultHighlight": {
    "foreground": "black",
    "type": "text"
  },
  "todo-tree.highlights.customHighlight": {
    "FIXME": {
      "icon": "flame",
      "iconColour": "orange",
      "background": "orange"
    },
    "TODO": {
      "icon": "check",
      "iconColour": "yellow",
      "background": "yellow"
    },
    "BUG": {
      "icon": "bug",
      "iconColour": "red",
      "background": "red"
    },
    "NOTE": {
      "icon": "note",
      "iconColour": "blue",
      "background": "blue"
    },
    "XXX": {
      "icon": "question",
      "iconColour": "green",
      "background": "green"
    },
    "HACK": {
      "icon": "alert",
      "iconColour": "purple",
      "background": "purple"
    }
  },
  "workbench.iconTheme": "vscode-icons",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.automationShell.windows": "",
  "editor.formatOnType": true
}
```

# husky

- 参考：Git - Git 钩子

- Github：typicode/husky
