### 参考

-  [Canvas实用库Fabric.js使用手册](https://segmentfault.com/a/1190000017749198)
-  [使用Fabric.js玩转Canvas](https://blog.csdn.net/a526878729/article/details/87178066)



### 背景图

```js
var canvas = new fabric.Canvas('canvas')
canvas.setBackgroundImage(
  'https://erp.91miaoshou.com/img/watermark_base_map.ab70be45.jpg',
  canvas.renderAll.bind(canvas)
)
```

### 绘制图形

```js
var rect = new fabric.Rect({
  left:100,//距离画布左侧的距离，单位是像素
  top:100,//距离画布上边的距离
  fill:'red',//填充的颜色
  width:30,//方形的宽度
  height:30//方形的高度
});
```

### 可编辑文本

```js
var text = 'hello world'
var textWithBackground = new fabric.IText(text, {
  textBackgroundColor: 'rgba(0,0,0,0)'
})
canvas.add(textWithBackground)
textWithBackground.on('selected', function() {
  console.log('selected')
  //   text.hiddenTextarea.focus()
})
```

### vue组件

```vue
<template>
  <div class="water-mark-wrap">
    <div class="operation-left-wrap">
      <p v-if="!operationType">
        {{$t('other.message1')}}
      </p>
      <div class="text-operation-wrap" v-if="operationType == 'i-text'">
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-form-item :label="$t('other.color')">
            <a-input
              type="color"
              v-model="activeObjectData.fill"
              @change="handleChange('fill')"
            />
          </a-form-item>
          <a-form-item :label="$t('other.fontFamily')">
            <a-select
              placeholder="Tags Mode"
              v-model="activeObjectData.fontFamily"
              @change="handleChange('fontFamily')"
            >
              <a-select-option
                v-for="(item, index) in fontList"
                :key="index"
                :value="item.en"
              >
                {{ item.ch }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('other.size')">
            <a-col :span="17">
              <a-slider
                v-model="activeObjectData.fontSize"
                :min="6"
                :max="100"
                @change="handleChange('fontSize')"
              ></a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.fontSize"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('fontSize')"
                v-limitMinNumber="6"
                v-limitMaxNumber="100"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <div class="text-modify-check">
            <template v-for="item in TEXT_MODIFY">
              <input
                type="checkbox"
                aria-hidden="true"
                tabindex="-1"
                :id="item.key"
                :value="item.key"
                :key="item.key"
                v-model="checkedFontFamily"
              />
              <label :key="'i' + item.key" :for="item.key">
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.tips }}
              </label>
            </template>
          </div>

          <div class="text-align-check">
            <template v-for="item in textAlign">
              <a-button
                text
                :key="item.icon"
                :value="item.activeValue"
                @click="textAlign = item.activeValue"
              >
                {{ item.tips }}
              </a-button>
            </template>
          </div>

          <a-form-item :label="$t('other.opacity')">
            <a-col :span="17">
              <a-slider
                v-model="activeObjectData.opacity"
                :min="0.01"
                :max="1"
                thumb-label
                @change="handleChange('opacity')"
                :step="0.01"
                v-limitMinNumber="0.01"
                v-limitMaxNumber="1"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.opacity"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('opacity')"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('other.angle')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                thumb-label
                :min="0"
                :max="360"
                v-model="activeObjectData.angle"
                @change="handleChange('angle')"
                :step="1"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" offset="1">
              <a-input-number
                v-model="activeObjectData.angle"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('angle')"
                v-limitMinNumber="0"
                v-limitMaxNumber="360"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('other.lineHeight')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                thumb-label
                :min="1"
                :max="3"
                :step="0.01"
                v-model="activeObjectData.lineHeight"
                @change="handleChange('lineHeight')"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.lineHeight"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('lineHeight')"
                v-limitMinNumber="1"
                v-limitMaxNumber="3"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('other.charSpacing')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                thumb-label
                v-model="activeObjectData.charSpacing"
                :min="0.01"
                :max="2"
                :step="0.01"
                @change="handleChange('charSpacing')"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.charSpacing"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('charSpacing')"
                v-limitMinNumber="0.01"
                v-limitMaxNumber="2"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
        </a-form>
      </div>
      <div class="image-operation-wrap" v-if="operationType == 'image'">
        <div class="grid-position-wrap">
          <label
            v-for="(val, key) in gridView"
            :key="key"
            @click="handleChangePosition(key)"
          >
            <span
              class="radio-inner"
              :class="activeObjectData.position == key ? 'checked' : ''"
            ></span>
          </label>
        </div>
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-form-item :label="$t('other.opacity')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                v-model="activeObjectData.opacity"
                :min="0.01"
                :max="1"
                thumb-label
                @change="handleChange('opacity')"
                :step="0.01"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.opacity"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('opacity')"
                v-limitMinNumber="0.01"
                v-limitMaxNumber="1"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('other.angle')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                thumb-label
                :min="0"
                :max="360"
                v-model="activeObjectData.angle"
                @change="handleChange('angle')"
                :step="1"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.angle"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('angle')"
                v-limitMinNumber="0"
                v-limitMaxNumber="360"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('other.scale')">
            <a-col :span="17">
              <a-slider
                :thumb-size="24"
                thumb-label
                :min="1"
                :max="200"
                v-model="activeObjectData.scale"
                @change="handleChange('scale')"
                :step="1"
              >
              </a-slider>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-input-number
                v-model="activeObjectData.scale"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                @change="handleChange('scale')"
                v-limitMinNumber="1"
                v-limitMaxNumber="200"
              >
              </a-input-number>
            </a-col>
          </a-form-item>
        </a-form>
      </div>
      <!-- 公共操作 -->
      <div class="layer-common-operation" v-if="operationType">
        <div class="sub-operation">
          <span class="operation-title"> {{ $t('other.flip') }}： </span>
          <a-button small @click="handleChange('flipX')">
            <v-icon small>mdi-flip-horizontal</v-icon>
            {{ $t('other.horizontal') }}
          </a-button>
          <a-button small @click="handleChange('flipY')">
            <v-icon small>mdi-flip-vertical </v-icon>
            {{ $t('other.vertical') }}
          </a-button>
        </div>
        <div class="sub-operation">
          <span class="operation-title"> {{ $t('other.layer') }}： </span>
          <a-button small @click="handleCopyLayout()">
            <v-icon small>mdi-content-copy</v-icon>
            {{ $t('common.copy') }}
          </a-button>
          <a-button small @click="handleRemoveLayout()">
            <v-icon small>mdi-delete </v-icon>
            {{ $t('common.delete') }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="water-mark-example">
      <div
        style="background:url('https://erp.91miaoshou.com/img/watermark_base_map.ab70be45.jpg')"
      >
        <canvas width="600" height="600" :id="uuid"></canvas>
      </div>
    </div>
    <div class="operation-right-wrap">
      <p>
        <a-button type="primary" @click="handleAddText()">
          {{ $t('other.addText') }}</a-button
        >
      </p>
      <p>
        <a-button type="primary" @click="uploadVisible = true">{{
          $t('other.addImage')
        }}</a-button>
      </p>
    </div>

    <Upload v-model="uploadVisible" @on-success="getImageResult"></Upload>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import Upload from '@/components/Upload'
// 文字修饰类型
const TEXT_MODIFY = [
  {
    key: 'fontWeight',
    icon: 'mdi-format-bold',
    tips: '加粗',
    activeValue: 'bold',
    defaultValue: 'normal'
  },
  {
    key: 'fontStyle',
    icon: 'mdi-format-italic',
    tips: '斜体',
    activeValue: 'italic',
    defaultValue: 'normal'
  },
  {
    key: 'underline',
    icon: 'mdi-format-underline',
    tips: '下划线',
    activeValue: !0,
    defaultValue: !1
  },
  {
    key: 'overline',
    icon: 'mdi-format-overline',
    tips: '上划线',
    activeValue: !0,
    defaultValue: !1
  }
]
//文字对齐
const TEXT_ALIGN = [
  {
    key: 'textAlign',
    icon: 'mdi-format-align-left',
    tips: '左对齐',
    activeValue: 'left',
    defaultValue: 'left'
  },
  {
    key: 'textAlign',
    icon: 'mdi-format-align-right',
    tips: '右对齐',
    activeValue: 'right',
    defaultValue: 'left'
  },
  {
    key: 'textAlign',
    icon: 'mdi-format-align-center',
    tips: '居中对齐',
    activeValue: 'center',
    defaultValue: 'left'
  },
  {
    key: 'textAlign',
    icon: 'mdi-format-align-justify',
    tips: '两端对齐',
    activeValue: 'justify',
    defaultValue: 'left'
  }
]
//九宫格坐标位置
const BASE_DIST = 100
const GRID_VIEW_POS = {
  'top-start': {
    left: BASE_DIST,
    top: BASE_DIST
  },
  top: {
    left: 3 * BASE_DIST,
    top: BASE_DIST
  },
  'top-end': {
    left: 5 * BASE_DIST,
    top: BASE_DIST
  },
  'middle-start': {
    left: BASE_DIST,
    top: 3 * BASE_DIST
  },
  middle: {
    left: 3 * BASE_DIST,
    top: 3 * BASE_DIST
  },
  'middle-end': {
    left: 5 * BASE_DIST,
    top: 3 * BASE_DIST
  },
  'bottom-start': {
    left: BASE_DIST,
    top: 5 * BASE_DIST
  },
  bottom: {
    left: 3 * BASE_DIST,
    top: 5 * BASE_DIST
  },
  'bottom-end': {
    left: 5 * BASE_DIST,
    top: 5 * BASE_DIST
  }
}
import { limitMinNumber, limitMaxNumber } from '@/directive/number'
import { getFontList } from '@/util/font'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      TEXT_MODIFY,
      canvas: null, //画板实例
      operationType: null, //当前操作类型
      activeObjectData: {
        scale: 100
      }, //当前操作属性
      uploadVisible: false,
      gridView: GRID_VIEW_POS,
      fontList: getFontList(),
      checkedFontFamily: [],
      uuid: uuidv4()
    }
  },

  props: {
    objects: {
      type: String,
      default: ''
    }
  },

  components: {
    Upload
  },
  directives: {
    limitMinNumber,
    limitMaxNumber
  },

  computed: {
    //文字对齐
    textAlign: {
      get: function() {
        return TEXT_ALIGN
      },
      set: function(val) {
        this.canvas.getActiveObject().set('textAlign', val)
        this.canvas.requestRenderAll()
      }
    }
  },

  watch: {
    checkedFontFamily: {
      handler(newData) {
        const list = TEXT_MODIFY.map((el) => el.key)
        list.map((key) => {
          let item = TEXT_MODIFY.find((el) => el.key == key)
          if (newData.includes(key)) {
            this.canvas.getActiveObject().set(key, item.activeValue)
          } else {
            this.canvas.getActiveObject().set(key, item.defaultValue)
          }
        })
        this.canvas.requestRenderAll()
      }
    }
  },

  mounted() {
    // this.canvas = new fabric.Canvas('canvasWrapper')
    // this.canvas.setBackgroundImage(
    //   'https://erp.91miaoshou.com/img/watermark_base_map.ab70be45.jpg',
    //   this.canvas.renderAll.bind(this.canvas)
    // )
    this.render()
  },

  methods: {
    render() {
      let { canvas } = this.$data
      const { objects } = this.$props
      if (!canvas) {
        canvas = new fabric.Canvas(this.$data.uuid)
        this.canvas = canvas
      }

      if (objects) {
        canvas.loadFromJSON(JSON.parse(objects))
      }
      this.canvas.on({
        'object:moving': this.updateControls,
        'object:scaling': this.updateControls,
        'object:resizing': this.updateControls,
        'object:rotating': this.updateControls,
        'object:skewing': this.updateControls
      })
    },

    //添加文字
    handleAddText() {
      let text = '双击可编辑文字'
      let _this = this
      let textWithBackground = new fabric.IText(text, {
        top: 250,
        left: 200,
        hasControls: true,
        selectable: true,
        editingBorderColor: 'red',
        lockUniScaling: true,
        fill: '#ad8b00',
        fontSize: 28
      })

      this.canvas.add(textWithBackground)
      textWithBackground.on('selected', function(layer) {
        _this.$nextTick(() => {
          _this.updateControls(layer)
        })
      })
      this.canvas.setActiveObject(textWithBackground) //
    },

    //添加图片
    handleAddImage(imageUrl) {
      let _this = this
      let wraperSize = 15 * this.canvas.size()
      let wraperWidth = this.canvas.width
      let wraperHeight = this.canvas.height
      fabric.util.loadImage(
        imageUrl,
        function(imageUrl) {
          let imageLayer = new fabric.Image(imageUrl)
          imageLayer.set({
            lockUniScaling: !0,
            lockScalingFlip: !0,
            minScaleLimit: 0.01,
            originX: 'center',
            originY: 'center',
            left: 300 + wraperSize,
            top: 300 + wraperSize
          })
          imageLayer.scaleToWidth(Math.min(imageLayer.width, 0.8 * wraperWidth))
          imageLayer.scaleToHeight(
            Math.min(imageLayer.height, 0.8 * wraperHeight)
          )
          _this.canvas.add(imageLayer)
          imageLayer.on('selected', function(layer) {
            _this.$nextTick(() => {
              _this.updateControls(layer)
            })
          })
          _this.canvas.setActiveObject(imageLayer)
        },
        null,
        {
          crossOrigin: 'anonymous'
        }
      )
    },

    updateControls(layer) {
      this.activeObjectData = Object.assign(
        layer.target.toJSON(),
        this.activeObjectData
      )
      //   console.log(this.activeObjectData)
      this.operationType = layer.target.toJSON().type
      // 文字大小需要手动计算
      if (layer) {
        let t = layer.target,
          angle = t.angle,
          scaleX = t.scaleX,
          scaleY = t.scaleY,
          type = t.type,
          fontSize = t.fontSize
        ;(this.activeObjectData.angle = angle),
          (this.activeObjectData.scaleX = scaleX),
          (this.activeObjectData.scaleY = scaleY),
          ['i-text', 'text'].includes(type) &&
            (this.activeObjectData.fontSize = Math.round(fontSize * scaleX)) //文字大小
        this.activeObjectData.scale = Math.round(
          100 * layer.target.toJSON().scaleX
        ) //缩放
      }
    },

    //手动操作
    handleChange(key) {
      this.$nextTick(() => {
        switch (key) {
          case 'charSpacing': //字符间距
            this.canvas
              .getActiveObject()
              .set('charSpacing', this.activeObjectData['charSpacing'] * 1e3)
            break
          case 'scale': //缩放
            this.canvas
              .getActiveObject()
              .set({
                scaleX: parseFloat(this.activeObjectData.scale / 100),
                scaleY: parseFloat(this.activeObjectData.scale / 100)
              })
              .setCoords(),
              this.canvas.renderAll()
            break
          case 'flipX': //水平翻转
            this.canvas
              .getActiveObject()
              .set('flipX', !this.activeObjectData[key])
            this.activeObjectData.flipX = !this.activeObjectData.flipX
            break
          case 'flipY': //垂直翻转
            this.canvas
              .getActiveObject()
              .set('flipY', !this.activeObjectData[key])
            this.activeObjectData.flipY = !this.activeObjectData.flipY
            break
          default:
            this.canvas.getActiveObject().set(key, this.activeObjectData[key])
            break
        }

        this.canvas.requestRenderAll()
        this.canvas.renderAll()
      })
    },

    // 九宫格定位
    handleChangePosition(val) {
      this.$set(this.activeObjectData, 'position', val)
      this.canvas
        .getActiveObject()
        .set({
          left: GRID_VIEW_POS[val].left,
          top: GRID_VIEW_POS[val].top
        })
        .setCoords(),
        this.canvas.renderAll()
    },

    //删除图层
    handleRemoveLayout() {
      this.canvas.remove(this.canvas.getActiveObject())
    },

    //复制图层
    handleCopyLayout: function() {
      let _this = this
      this.canvas.getActiveObject().clone(function(t) {
        return _this.handlePasetLayout(t)
      })
    },

    //获取上传图片地址
    getImageResult(urls) {
      if (urls && urls.length > 0) {
        this.handleAddImage(urls[0])
      }
    },

    //粘贴
    handlePasetLayout(A) {
      A.clone(function(a) {
        this.canvas.discardActiveObject(),
          a.set({
            left: a.left + 20,
            top: a.top + 20,
            evented: !0
          }),
          'activeSelection' === a.type
            ? ((a.canvas = this.canvas),
              a.forEachObject(function(A) {
                this.canvas.add(A)
              }),
              a.setCoords())
            : this.canvas.add(a),
          (A.top += 20),
          (A.left += 20),
          this.canvas.setActiveObject(a)
      })
    },

    getDataURL() {
      const { canvas } = this.$data
      canvas.discardActiveObject()
      canvas.renderAll()
      return canvas.toDataURL('image/png')
    },

    getJSON() {
      const { canvas } = this.$data
      canvas.discardActiveObject()
      canvas.renderAll()
      return JSON.stringify(canvas.toJSON())
    }
  }
}
</script>

<style lang="scss" scoped>
.water-mark-wrap {
  display: flex;
  width: 100%;
  height: auto;
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
  justify-content: space-between;

  .operation-left-wrap {
    width: 420px;
    max-height: 600px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #fff;
    padding-top: 20px;
    box-sizing: border-box;
    padding: 20px;
    .text-operation-wrap,
    .image-operation-wrap {
      .grid-position-wrap {
        display: flex;
        flex-wrap: wrap;
        width: 255px;
        margin: 0px auto 10px auto;
        label {
          width: 85px;
          height: 85px;
          line-height: 85px;
          text-align: center;
          border: 4px solid #ededed;
          box-sizing: border-box;
          margin: -4px 0 0 -4px;
          list-style-type: none;
          cursor: pointer;
          .radio-inner {
            border: 1px solid #ededed;
            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #fff;
            position: relative;
            cursor: pointer;
            display: inline-block;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            &.checked {
              border-color: #03b3b2;
              background: #03b3b2;
            }
            &::after {
              width: 4px;
              height: 4px;
              border-radius: 100%;
              background-color: #fff;
              content: '';
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%, -50%) scale(0);
              transform: translate(-50%, -50%) scale(0);
              -webkit-transition: -webkit-transform 0.15s ease-in;
              transition: -webkit-transform 0.15s ease-in;
              transition: transform 0.15s ease-in;
              transition: transform 0.15s ease-in,
                -webkit-transform 0.15s ease-in;
            }
          }
          &:nth-child(3n + 1) {
            margin-left: 0;
          }
        }
      }
    }
    .text-operation-wrap {
      .text-modify-check,
      .text-align-check {
        height: 30px;
        background: #fff;
        display: flex;
        margin-bottom: 12px;
        input {
          display: none;
        }
        input:checked + label {
          border-color: #f7622f;
        }
        label {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 3px;
          text-align: center;
          padding: 0 8px;
          display: inline-block;
          cursor: pointer;
          line-height: 30px;
        }
      }
    }
    .layer-common-operation {
      .operation-title {
        font-size: 14px;
        margin-left: 20px;
      }
      .sub-operation {
        margin-bottom: 20px;
      }
    }
  }

  .water-mark-example {
    width: 700px;
    padding: 0 50px;
    canvas {
      //   margin-top: 100px;
      border: 4px solid #eee;
    }
  }
  .operation-right-wrap {
    flex: 1;
    margin-left: auto;
    background: #fff;
    text-align: center;
    padding: 20px;
    p {
      margin-bottom: 20px;
    }
  }
}
</style>

```

