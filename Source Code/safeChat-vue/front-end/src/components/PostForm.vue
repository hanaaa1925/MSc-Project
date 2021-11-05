<template>
  <div class="editor">
    <div id="texteditor"></div>
    <button class="post-btn" @click="getEditorData">POST</button>
  </div>
</template>

<script>

// 引入 wangEditor
import wangEditor from 'wangeditor'

export default {
  name: 'PostForm',
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new wangEditor(`#texteditor`)

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
    }

    editor.config.height = 160
    editor.config.placeholder = 'xxx'
    editor.config.focus = false

    editor.config.menus = [
    'link',
    'todo',
    'emoticon',
    ]
    editor.config.emotions = [
    {
        title: 'emoji',  // tab 的标题
        type: 'emoji', // 'emoji' / 'image'
        // emoji 表情，content 是一个数组即可
        content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐 🤣 😍 🥰 😘 🤪 🥳 😎 😒 😔 😣 😟 😖 😫 🥺 😭 😠 😡 😱 😨 😰 🤔 🤫 🙄 🤒 😷 😵 💩 👻 🎃 👏 🤝 👍 👎 👌 🤘 🤟 💪 🐶 🐱 🐹 🐰 🐻 🦁 🐯 🐼 🐷 🐵 🐣 🦄 🦟 🐝 🦋 🦀 🦐 🐬 🐟 🦈 🐏 🦛 🐑 🐪 🦌 🕊 🐕‍🦺 🐇 🌴 🍄 ☘️ 🌾 🌱 💐 🌖 🌼 🌜 🌙 🌺 🌓 🌜 🌩 🌟 🌦 ☄️ 🌈 💥 💧 🍉'.split(/\s/),
    }
]
    editor.config.showMenuTooltips = false
    editor.config.showFullScreen = false

    // 创建编辑器
    editor.create()

    this.editor = editor
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      if (!data) {
        alert("empty")
      } else {
        let _this = this;
        this.axios.post("/api/postContent", {
            content: _this.data,
        }).then((response) => {
            if (response.data.length) {
                // 把当前登录用户数据存入state
                _this.$store.commit('GET_USER', response.data[0]);
                username = _this.response.data[0]
                _this.$router.push('/Home');
            } 
        });
      }
      
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
