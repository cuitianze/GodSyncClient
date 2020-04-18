/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Input, Row, Col } from 'antd';
import Peer from 'peerjs';
import { Link } from 'react-router-dom';
import isUrl from 'is-url';
// import {useFullscreen } from 'react-use';
import routes from '../constants/routes.json';
// import styles from './Home.css';
import './Home.css';

const electron = require('electron');

const { BrowserWindow } = electron.remote;

let webview: any;
let peer: any;
let conn: any;

const VIDEO_WEBSITE_LIST = [
  {
    id: 'youku',
    url: 'https://www.youku.com',
    logo: 'https://img.alicdn.com/tfs/TB17DTuXkH0gK0jSZPiXXavapXa-680-133.svg',
    background:
      'url(https://img.alicdn.com/tfs/TB17DTuXkH0gK0jSZPiXXavapXa-680-133.svg) 50% no-repeat',
    height: '38px',
    width: '126px'
  },
  {
    id: 'iqiyi',
    url: 'https://www.iqiyi.com',
    logo: 'http://q8z4m4xgu.bkt.clouddn.com/video_website_logo_iqiyi.svg',
    background:
      'url(http://q8z4m4xgu.bkt.clouddn.com/video_website_logo_iqiyi.svg) no-repeat',
    width: '120px',
    height: '40px'
  },
  {
    id: 'qq',
    url: 'https://v.qq.com',
    logo:
      'https://vm.gtimg.cn/tencentvideo/vstyle/web/v6/style/img/common/sprite_head_logo.svg',
    background:
      'url(https://vm.gtimg.cn/tencentvideo/vstyle/web/v6/style/img/common/sprite_head_logo.svg) 0 0 no-repeat',
    width: '135px',
    height: '36px'
  }
];

export default function Home() {
  const [statePeerId, setStatePeerId] = useState('');
  const [stateTargetPeerId, setStateTargetPeerId] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [stateCurrentVideoWebsite, setStateCurrentVideoWebsite] = useState(
    VIDEO_WEBSITE_LIST[0].id
  );
  const [stateFullScreen, setStateFullScreen] = useState(false);
  // const ref = useRef(null);

  const initPeer = () => {
    peer = new Peer('fd96ffe5-4f86-4de6-b510-b84d1b052b02', {
      host: '47.93.203.44',
      port: 9898,
      path: '/sync-video',
      debug: 3,
      config: {
        iceServers: [
          {
            urls: 'turn:47.93.203.44:3478?transport=udp',
            credential: 'cuitianze',
            username: 'cuitianze'
          }
        ]
      }
    });
    console.log('😒 开发日志: initPeer -> peer', peer);

    peer.on('open', (id: string) => {
      console.log('🔇 开发日志: initPeer -> open');
      console.log('🚕 开发日志: initPeer -> id', id);
      setStatePeerId(id);
    });
  };

  useEffect(() => {
    initPeer();
    webview = document.querySelector('webview');
    if (webview) {
      const loadPage = () => {
        // webview.loadURL('http://qq.com');
        // webview.removeEventListener('dom-ready', loadPage);
        const webContents = webview.getWebContents();

        setStateInput(webview.getURL());

        webContents.on('did-finish-load', () => {
          console.log(
            '%c 🎳 开发日志: loadPage -> did-finish-load ',
            'font-size:16px;background-color:#858d38;color:white;',
            'did-finish-load'
          );
          setTimeout(() => {
            webview.send('ping');
            webview.replace('电影', '哈哈哈');
          }, 500);
        });

        // webview想要打开新窗口
        webContents.on(
          'new-window',
          (event, url, frameName, disposition, options) => {
            console.log(
              '%c 🇾🇹  URL : loadPage -> url ',
              'font-size:16px;background-color:#ab5573;color:white;',
              url
            );

            event.preventDefault();
            // webview.loadURL(url);
            if (isUrl(url)) {
              setStateInput(url);
              webview.loadURL(url);
              webview.executeJavaScript(
                "var domAList = document.getElementsByTagName('a');for (var i = domAList.length - 1; i >= 0; i--) {domAList[i].target = '';domAList[i].removeAttribute('target');}"
              );
            }

            // const win = new BrowserWindow({
            //   webContents: options.webContents, // use existing webContents if provided
            //   show: false
            // });
            // win.webContents.on('did-finish-load', () => {
            //   console.log('%c 🚸 开发日志: loadPage -> `about:blank` ', 'font-size:16px;background-color:#00b87a;color:white;', `about:blank`);
            //   // win.loadURL(url);
            // });
            // win.loadURL(url);

            // win.once('ready-to-show', () => win.show());
            // if (!options.webContents) {
            //   // win.loadURL(url); // existing webContents will be navigated automatically
            // }
            // event.newGuest = win;
          }
        );

        // webview是否全屏
        webContents.on('enter-html-full-screen', () => {
          setStateFullScreen(true);
        });
        webContents.on('leave-html-full-screen', () => {
          setStateFullScreen(false);
        });
      };
      // webview.loadUrl('http://www.baidu.com');
      webview.setAttribute('src', VIDEO_WEBSITE_LIST[0].url);
      webview.addEventListener('dom-ready', loadPage);
    }
  }, []);

  const onInputChange = (e: any) => {
    setStateInput(e.currentTarget.value);
  };

  const onVisitBtnClick = () => {
    if (webview) {
      webview.loadURL(stateInput);

      webview.addEventListener('console-message', e => {
        // console.log('Guest page logged a message:', e.message);
        console.log('🕵️‍♂️ 开发日志: onVisitBtnClick -> e.message', e.message);
      });

      return;

      conn.send({
        type: 'SYNC_LINK',
        content: stateInput
      });

      webview.addEventListener('ipc-message', event => {
        console.log('🐏 开发日志: onVisitBtnClick -> event', event);
        console.log(event.channel);
        console.log(
          '🚜 开发日志: onVisitBtnClick -> event.channel',
          event.channel
        );
        // Prints "pong"
      });
      webview.addEventListener('console-message', e => {
        // console.log('Guest page logged a message:', e.message);
        console.log('🕵️‍♂️ 开发日志: onVisitBtnClick -> e.message', e.message);
      });
      webview.send('ping');

      // const urlParams = new URLSearchParams(stateInput);

      // const pid = urlParams.get('pid');

      // const peer = new Peer(pid, {
      //   host: 'localhost',
      //   port: 9898,
      //   path: '/sync-video'
      // });

      // 视频流这个不着急
      // navigator.getUserMedia(
      //   {
      //     video: false,
      //     audio: true
      //   },
      //   stream => {
      //     console.log('↖️ 开发日志: -----------------------------');
      //     console.log('↖️ 开发日志: Home -> stream', stream);
      //     console.log('↖️ 开发日志: -----------------------------');
      //   },
      //   err => {
      //     console.log('👯‍♀️ 开发日志: ----------------------------');
      //     console.log('👯‍♀️ 开发日志: Home -> err', err);
      //     console.log('👯‍♀️ 开发日志: ----------------------------');
      //   }
      // );
      // const queryString = window.location.search;
    }
  };

  const onProgressBtnClick = () => {
    webview.addEventListener('ipc-message', event => {
      console.log(
        '🚜 开发日志: onProgressBtnClick -> event.channel',
        event.channel
      );
      const currentProgress = Math.floor(event.channel);
      conn.send({
        type: 'SYNC_PROGRESS',
        content: currentProgress
      });
      webview.send('sync-process', currentProgress);
    });
    webview.addEventListener('console-message', e => {});
    webview.send('ping');
  };

  const onTargetPeerIdInputChange = (e: any) => {
    setStateTargetPeerId(e.currentTarget.value);
  };

  const onConnectBtnClick = () => {
    console.log('🇰🇳 开发日志: onConnectBtnClick -> peer', peer);
    conn = peer.connect(stateTargetPeerId);
    peer.on('connection', c => {
      c.on('data', (data: any) => {
        console.log('🍡 开发日志: onConnectBtnClick -> data', data);
        // Will print 'hi!'
        console.log(data);
        switch (data.type) {
          case 'SYNC_LINK':
            webview.loadURL(data.content);
            break;
          case 'SYNC_PROGRESS':
            webview.send('sync-process', data.content);
            break;
          default:
        }
      });
    });
    conn.on('open', () => {
      console.log('🔇 开发日志: onConnectBtnClick -> open');
      conn.send('hi!');
    });
  };

  return (
    <div
      // className={styles.container}
      className="container"
      data-tid="container"
    >
      {/* <h2>Home</h2> */}
      {/* <Link to={routes.COUNTER}>to Counter</Link> */}

      {!stateFullScreen ? (
        <>
          <div style={{ display: 'flex' }}>
            <Input
              value={stateInput}
              placeholder="请输入要同步观看的视频网站链接"
              onChange={onInputChange}
            />
            <Button type="primary" onClick={onVisitBtnClick}>
              神同步
            </Button>
            <Button type="default" onClick={onProgressBtnClick}>
              进度同步
            </Button>
          </div>
          <div style={{ display: 'flex' }}>
            <Input value={statePeerId} placeholder="您的连接ID" readOnly />
            <Input
              value={stateTargetPeerId}
              placeholder="对方的连接ID"
              onChange={onTargetPeerIdInputChange}
            />
            <Button type="primary" onClick={onConnectBtnClick}>
              连接
            </Button>
          </div>
        </>
      ) : null}

      <Row>
        {VIDEO_WEBSITE_LIST.map(link => {
          if (link.id === stateCurrentVideoWebsite) return null;
          return (
            <Col span={6} key={link.url}>
              <div
                style={{
                  cursor: 'pointer',
                  width: link.width,
                  height: link.height,
                  background: link.background
                  // backgroundImage: `url(${link.logo})`,
                  // backgroundPosition: 'center',
                  // backgroundSize: 'contain',
                  // backgroundRepeat: 'no-repeat'
                  // backgroundPositionX: 0,
                  // backgroundPositionY: '-80px'
                }}
                onClick={() => {
                  setStateCurrentVideoWebsite(link.id);
                  setStateInput(link.url);
                  webview.loadURL(link.url);
                }}
              >
                {/* <img style={{ }} src={link.logo} /> */}
              </div>
            </Col>
          );
        })}
      </Row>

      <webview
        id="webview"
        src=""
        style={{ display: 'flex', flex: 1 }}
        preload="./components/preload.js"
      />

      {/* <iframe title="xx" src={stateInput+'&output=embed'} /> */}
    </div>
  );
}
