- 创建独立空间 (首先只考虑两人的平台，一对一，一对多问题应该也不大，因为不做视频流)
- 在空间内新打开一网页，空间内的其他用户也会同步打开相同的页面 (不关心内容，不关心用户，不关心是否是会员)
- 一开始默认房间内的都是主持人
- 控制播放, 空间里的人都会收到消息
- 同步播放




手机APP一样的~~ 采用RN来实现

技术方案
- 为什么要采用WebRTC，和WebSocket相比有什么优势?
    - 接受WebRTC的文章 https://blog.irudder.me/2019-06-16/reference/WebRTC/webrtc-%E4%B8%93%E9%A2%98-01/

- Electron 采用 WS来 在主进程和WebView之间中转消息
    - https://www.cnblogs.com/lovesong/p/11180336.html


TODO 各视频网站适配，主要也就是 video视频播放器 挂在window上的变量而已
TODO 判断是否视频准备好了，也就是是否广告播放完了，需要根据各视频网站判断

TODO 通过本地时间，两边同步设置一个临近的整数时间，这样可以提供两边的同步性

TODO 视频流传输的方案也可以考虑考虑，But这就是zoom或者钉钉屏幕共享了呀，之前试了一次钉钉屏幕共享，声音不同步且听不清楚， 太难了


### 静态资源存放到七牛云存储
https://portal.qiniu.com/kodo/bucket/resource?bucketName=kktv-fun
