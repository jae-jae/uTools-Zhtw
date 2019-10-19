<template>
  <div>
    <Row>
      <Input
        v-model="fromText"
        type="textarea"
        :autosize="inputAutoSize"
        placeholder="Enter something..."
        @on-change="fromTextChange"
      />
    </Row>
    <Row class="action-btn">
      <Col span="16">
        <Button style="margin-right: 10px" type="primary" @click="toZh">繁体字 -> 简体字</Button>
        <Button type="success" @click="toTw">简体字 -> 繁体字</Button>
      </Col>
      <Col span="8">
        <Button style="margin-right: 10px" @click="clear">↑清空</Button>
        <Button @click="copy">↓复制</Button>
      </Col>
    </Row>
    <Row>
      <Input readonly v-model="toText" type="textarea" :autosize="inputAutoSize" placeholder />
    </Row>
  </div>
</template>

<script>
import cnchar from 'cnchar'
import trad from 'cnchar-trad'
cnchar.use(trad)

export default {
  data () {
    return {
      inputAutoSize: { minRows: 9, maxRows: 9 },
      fromText: '',
      toText: '',
      cacheAction: null
    }
  },
  mounted () {
    utools.onPluginEnter(({ code, type, payload }) => {
      if (type !== 'over') {
        this.fromText = ''
        this.toText = ''
        return true
      }

      this.fromText = payload
      this.toText = ''

      if (code === '2zh') {
        this.toZh()
      } else if (code === '2tw') {
        this.toTw()
      }
    })
  },
  methods: {
    toZh () {
      this.toText = cnchar.convert(this.fromText, 'simple', 'trad')
      this.cacheAction = 'toZh'
    },
    toTw () {
      this.toText = cnchar.convert(this.fromText, 'trad', 'simple')
      this.cacheAction = 'toTw'
    },
    clear () {
      this.fromText = ''
      this.toText = ''
      this.cacheAction = null
    },
    copy () {
      Electron.clipboard.writeText(this.toText)
      this.$Message.info('内容已复制到剪切板!')
    },
    fromTextChange () {
      this.cacheAction && this[this.cacheAction]()
    }
  }
}
</script>

<style scoped>
.action-btn {
  margin: 10px auto;
  text-align: right;
}
</style>