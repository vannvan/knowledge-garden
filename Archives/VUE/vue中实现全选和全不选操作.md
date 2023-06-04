```vue
<div class="checkbox">
	<label for="quan">
		<!-- 这里的 $event 是将当前对象传入进去，具体详情请参照vue官方文档 -->
		<input id="quan" type="checkbox" @click="checkAll($event)"> 全选
	</label>
	<label>
		<!-- v-model 双向数据绑定命令 -->
		<input class="checkItem" type="checkbox" value="apple" v-model="checkData"> apple
	</label>
	<label>
		<input class="checkItem" type="checkbox" value="banana" v-model="checkData"> banana
	</label>
	<label>
		<input class="checkItem" type="checkbox" value="orange" v-model="checkData"> orange
	</label>
</div>
<script>
	new Vue({
		el: '#app',
		data(){
			return {
				checkData: [] // 双向绑定checkbox数据数组
			}
		},
		watch: { // 监视双向绑定的数据数组
			checkData: {
				handler(){ // 数据数组有变化将触发此函数
					if(this.checkData.length == 3){
						document.querySelector('#quan').checked = true;
					}else {
						document.querySelector('#quan').checked = false;
					}
				},
				deep: true // 深度监视
			}
		},
		methods: {
			checkAll(e){ // 点击全选事件函数
				var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
				if(e.target.checked){ // 判定全选checkbox的勾选状态
					for(var i=0;i<checkObj.length;i++){
						if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
							this.checkData.push(checkObj[i].value);
						}
					}
				}else { // 如果是去掉全选则清空checkbox选项绑定数组
					this.checkData = [];
				}
			}
		}
	});
</script>

```


--------------------- 