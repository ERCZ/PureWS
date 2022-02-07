## Usage

Example:

```javascript
import WS from "pure-ws";
// 构造一个WS实例
let ws = new WS("ws://127.0.0.1:8080/");
// 相应事件的处理函数
function messageHandler(e) {
  console.log(e);
}
// 绑定一个处理函数到对应的事件
ws.on("message", messageHandler);
// 移除某个事件的处理函数
ws.off("message", messageHandler);
// 移除某个事件的所有处理函数
ws.clearHandlers("message");
// 发送一个字符串到服务端
ws.send("hello");
// 发送一个对象到服务端
ws.sendObj({ hello: "world" });
```

构造实例时第二个参数传入`{ data: true }`可在 message 事件中直接获取到服务端返回的数据，传入`{ data: true, json: true }`可直接在 message 事件中获取到服务端数据经过`JSON.parse()`后的结果

注意：由于代码对 websocket 事件进行了代理，获取 message 事件的数据时请使用`e.detail`而不是`e.data`，或者使用上面提到的加参数的方法更好
