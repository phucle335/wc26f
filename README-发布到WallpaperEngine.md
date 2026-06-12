# 世界杯倒计时壁纸 - Wallpaper Engine 发布版

这是给 Wallpaper Engine 使用的 Web 壁纸项目。入口文件是 `index.html`。

## 导入到 Wallpaper Engine

1. 打开 Wallpaper Engine。
2. 进入编辑器，选择创建新壁纸。
3. 把本目录里的 `index.html` 拖到创建窗口中。
4. 确认类型为 Web 壁纸，预览无误后保存项目。
5. 发布到 Steam Workshop 时，可使用本目录的 `preview.png` 作为预览图。

## 在线更新

- 壁纸会在浏览器里直接请求 ESPN 赛程接口，正常联网时右侧会显示 `ESPN`。
- 如果网络或接口不可用，会退回随包附带的 `worldcup-live-data.js`，右侧会显示 `LOCAL`。
- 这个发布版不需要运行 PowerShell 更新脚本，适合发到 Workshop 给别人订阅。

## 注意

- 最终发布 Steam Workshop 需要你本机安装 Wallpaper Engine，并登录自己的 Steam 账号。
- 如果 Workshop 审核或订阅端网络阻止 ESPN 接口，壁纸仍会显示本地缓存赛程，但赛果不会实时更新。
