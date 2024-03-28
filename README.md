### TL;DR


本站从 `npmmirror` 和 `npm` 的 `API` 统计了 NPM 包的下载量，以及不同版本之间的对比，`npmmirror`,即淘宝镜像，一定程度上可以代表国内前端技术趋势

### 特色

- CNPM/NPM 双数据源
- 经过区间比率转换后的下载量对比
- 按版本号分类的下载量对比
- 按标签分类的下载量对比
- NPM 兼容的 `URL` 段

### 现状

- 首页的分类太乱，因为 `keywords` 是从 `npm` 上直接获取的，目前还在人工分类，欢迎来帮忙 [功能交流](#功能交流)

- 网站目前挂在 `Netlify` 上面（因为不要钱 ଘ(੭ˊᵕˋ)੭），所以访问可能需要一点魔法，因地区而已。后期如果访问量上来会考虑迁回国内。
- 目前还没有开源，因为代码写的太烂，等功能完善一点会开源

### 如何使用

#### 区间比率转换

因为 CNPM 和 NPM 的规模是不一样的，NPM 的下载量必须经过转换才具有可比性，这里选择了用 `NPM 过去一年的下载量/CNPM 过去一年的下载量` 作为比率对 NPM 的下载量进行转换

##### 如何读图

- 如果 A 技术 在 CNPM 的数据大于 NPM，则 A 技术在国内更流行，反之则相反
- 如果 A 技术没有形成稳定的工作日-休息日间隔，说明 A 技术没有稳定投入生产，从经验上，`工作日/休息日` 应该在 `4:1` 左右

#### 兼容

本站提供了和 `NPM` 兼容的 `URL` 段，将`https://www.npmjs.com/package/vue` 中的 `npmjs` 替换成 `npmstatas` 即可跳转

### 路线图

- 美化
- [x] 搜索
- 首页虚拟列表

### 注意事项

请不要迷信下载量，本站只是作为技术参考。

### 功能交流

- hellowyho@gmail.com
- QQ 群 `674913579`

### 灵感

东抄一点，西抄一点，感谢 ٩( 'ω' )و

- [今年各个前端框架和组件库的 npmmirror 总下载量 - 知乎](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F648316526 "https://zhuanlan.zhihu.com/p/648316526")
- [Lib.rs — home for Rust crates // Lib.rs](https://link.juejin.cn?target=https%3A%2F%2Flib.rs%2F "https://lib.rs/")
- [Best of JS](https://link.juejin.cn?target=https%3A%2F%2Fbestofjs.org%2F "https://bestofjs.org/")
- [State of JavaScript](https://link.juejin.cn?target=https%3A%2F%2Fstateofjs.com%2Fen-US "https://stateofjs.com/en-US")
- [npm trends: Compare NPM package downloads](https://link.juejin.cn?target=https%3A%2F%2Fnpmtrends.com%2F "https://npmtrends.com/")
