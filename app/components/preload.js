// In guest page.
const { ipcRenderer } = require('electron');

const removeTarget = () => {
  var domAList = document.getElementsByTagName('a');
  console.log('🐰 开发日志: domAList', domAList);

  for (var i = domAList.length - 1; i >= 0; i--) {
    domAList[i].target = '';
    domAList[i].removeAttribute('target');
  }
  console.log(
    '%c 🕡 开发日志: domAList ',
    'font-size:16px;background-color:#1193dc;color:white;',
    domAList
  );
};

document.addEventListener('DOMContentLoaded', function(event) {
  // document.getElementById('lst-ib').value = 'Electron.js';
  removeTarget();
});

window.onload = function() {
  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-2.1.4.min.js';
  script.onload = script.onreadystatechange = function() {
    $(document).ready(function() {
      // $( document ).bind("click", function( e ) {
        // const ahref = $(e.target).closest("a").href;
        // console.log('%c 🇦🇫 开发日志: script.onload -> ahref ', 'font-size:16px;background-color:#9bd019;color:black;', ahref);
      // });
      // $('#lst-ib').val('Hello, World!');
      // $('body').on('')
      document.body.onclick = event => {
        const target = event.target;
        const targetHref = $(target).closest("a").attr('href');
        console.log('%c 🇨🇿 开发日志: script.onload -> ahref ', 'font-size:16px;background-color:#daf040;color:black;', targetHref);
        if (targetHref) {
          window.location.href = targetHref;
        }
        // const targetHref =
        //   event.target.href ||
        //   event.target.parentElement.href ||
        //   event.target.firstChild.href;
        // console.log(
        //   '%c ⏸️ 开发日志: document.body.onclick -> targetHref ',
        //   'font-size:16px;background-color:#82d5ef;color:black;',
        //   targetHref
        // );
        // if (targetHref) {
        //   window.location.href = targetHref;
        // }
      };
    });
  };
  document.body.appendChild(script);
};

window.xxxonload = function() {
  document.querySelector('.qy-focus-ad').style.zIndex = -999;
  // document.getElementsByTagName('body')[0].onclick = function(ev) {
  //   console.log(
  //     '%c ⌛ 开发日志: document.body.onclick -> ev ',
  //     'font-size:16px;background-color:#11d74f;color:white;',
  //     ev
  //   );
  //   var ev = ev || window.event;
  //   var target = ev.target || ev.srcElement;
  //   removeTarget();
  //   console.log(target);
  // };
  document.body.onmousemove = function() {
    document.querySelector('.qy-focus-ad').style.zIndex = -999;
    removeTarget();
  };

  document.body.onclick = event => {
    const targetHref =
      event.target.href ||
      event.target.parentElement.href ||
      event.target.firstChild.href;
    console.log(
      '%c ⏸️ 开发日志: document.body.onclick -> targetHref ',
      'font-size:16px;background-color:#82d5ef;color:black;',
      targetHref
    );
    if (targetHref) {
      window.location.href = targetHref;
    }
  };
};

ipcRenderer.on('ping', () => {
  console.log(
    '%c 🐺 开发日志:  ',
    'font-size:16px;background-color:#030637;color:white;',
    'ping'
  );
  // const currentTime = window.videoPlayer.getCurrentTime();
  // console.log('9️⃣ 开发日志: ----------------------------------');
  // console.log('9️⃣ 开发日志: currentTime', currentTime);
  // console.log('9️⃣ 开发日志: ----------------------------------');
  // if (currentTime) {
  //   ipcRenderer.sendToHost(String(currentTime));
  // }
  // window.videoPlayer.seek();

  var domAList = document.getElementsByTagName('a');
  console.log('🐰 开发日志: domAList', domAList);

  for (var i = domAList.length - 1; i >= 0; i--) {
    domAList[i].target = '';
    domAList[i].removeAttribute('target');
  }
  console.log(
    '%c 🕡 开发日志: domAList ',
    'font-size:16px;background-color:#1193dc;color:white;',
    domAList
  );
});

ipcRenderer.on('sync-process', (event, data) => {
  console.log('🥤 开发日志: -------------------');
  console.log('🥤 开发日志: data' + data);
  console.log('🥤 开发日志: -------------------');
  // ipcRenderer.sendToHost();
  const currentTime = data;
  // const currentTime = window.videoPlayer.getCurrentTime();
  if (currentTime) {
    window.videoPlayer.seek(parseFloat(currentTime));
  }
});
