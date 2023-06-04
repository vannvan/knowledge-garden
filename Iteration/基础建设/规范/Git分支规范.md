## **分支管理示意图**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1682263829605-e9f2dcfc-97af-414d-91af-4cbf7cc24b82.png#averageHue=%23020202&clientId=u20007f51-cd41-4&from=paste&id=uec35820f&originHeight=687&originWidth=1812&originalType=url&ratio=2&rotation=0&showTitle=false&size=93140&status=done&style=none&taskId=u7d168cf6-f53a-42e3-8f5f-28be48c5503&title=)
## **分支管理说明**

- master：主干分支，保持与线上版本一致
- release：发布分支，每次正式环境发布时，从 master 创建 release 分支，将续发布的 feature 或hotfix 分支合并至 release 分支，用于正式环境的版本发布（预发布/灰度）
- test：测试分支，用于测试环境发布
- hotfix：在线修复分支，用于线上问题紧急修复，命名规则为：hotfix/ID1028004/xxxx需求 （hotfix/tapd缺陷编号/修复功能标题）

（功能分支 - 多人协作开发）

- hotfix/TAPD ID + 描述
- hotfix/日期（20221122） + 描述

（个人开发分支）

- hotfix/TAPD ID + 描述/人名
- hotfix/日期（20221122） + 描述/人名

原则：上线后必须删除该分支

- feature：功能开发分支，用于正常产品需求迭代开发，命名规则为：feature/ID1004446/xxxxxu 需求 （feature/tapd需求编号/开发功能标题）

（功能分支 - 多人协作开发）

- feature/版本号
- feature/TAPD ID + 描述
- feature/描述（特殊情况，如：添加sentry、性能优化）

（个人开发分支）

- feature/版本号/人名
- feature/TAPD ID + 描述/人名
- feature/描述（特殊情况，如：添加sentry、性能优化）

原则：上线后必须删除该分支
## **commit 提交频率**

- 周末/节假日放假前必须提交个人分支，并push到远程功能分支。（要保证该分支无错误，可构建）
- hotfix、feature、bugfix、refactor分支尽量按照功能点或修复重构的问题及时 commit（不要求push）
## **Commit message**
每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。
```
<type>(<scope>): <subject>// 空一行<body>// 空一行<footer>
```
其中，Header 是必需的，Body 和 Footer 可以省略。
不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。
### **Header**
Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。
**（1）type**
type用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。
**（2）scope**
scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
**（3）subject**
subject是 commit 目的的简短描述，不超过50个字符。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（.）
### **Body**
Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。
有两个注意点。
（1）使用第一人称现在时，比如使用change而不是changed或changes。
（2）应该说明代码变动的动机，以及与以前行为的对比。
### **Footer**
Footer 部分只用于两种情况。
**（1）不兼容变动**
如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。
**（2）关闭 Issue**
如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。
也可以一次关闭多个 issue 。
### **Revert**
还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。
Body部分的格式是固定的，必须写成This reverts commit &lt;hash>.，其中的hash是被撤销 commit 的 SHA 标识符。
如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。
## Git 可视化工具

- mac：Sublime Merge  
- windows：GitKraken
## **代码合并规范**

- 合并到 test 分支前，个人开发分支需先合并到功能分支，功能分支合并到test后并且push 到 test（如无功能分支，可直接 push 到 test 分支）
- 禁止把 test 分支/ release 分支合并到个人开发分支/功能分支
- 回收 release/master 分支权限，需由开发者通过 merge_requests 提交合并代码给组长，由组长进行 Code Review 后进行合并操作
## **发布规范**

- 当天项目发布成功后，需要在 release 发布分支上新建 tags，标注当前发布版本
- tags 规范 v1.0.0.2022112101 （v + 版本号 + 当天日期 + 当日发布次数）
   - 如某个项目被多个产品线共用，则往tag后添加该产品标识，如空调/空压产品线：
   - v1.0.0.2022113001-air-compressor
   - v1.0.0.2022113001-air-conditioning
- 发布之前需要把release合并到功能分支处理完冲突再发布，目的为了提前解决冲突。
## **分支清理**
每次上线后，组长需提醒开发同学清理个人开发分支，组长清理功能分支
