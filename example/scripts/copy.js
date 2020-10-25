const fs = require('fs');

let dir

dir = '../dist/src';
if (!fs.existsSync(dir)){ fs.mkdirSync(dir) }

dir = '../../../../../wotamann.github.io/static';
if (!fs.existsSync(dir)){ fs.mkdirSync(dir) }


// destination.txt will be created or overwritten by default.
fs.copyFile('./public/index-cdn.html', '../dist/index-cdn.html', (err) => {
  if (err) console.warn(err);;
  console.log('SUCESS COPY - ./public/index-cdn.html was copied to /dist/');
});
fs.copyFile('./src/components/vFormBase.vue', '../dist/src/vFormBase.vue', (err) => {
  if (err) console.warn(err);;
  console.log('SUCESS COPY - vFormBase.vue was copied to /src/vFormBase.vue');
});
//  destination.txt will be created or overwritten by default.
fs.copyFile('../../../../../wotamann.github.io/static/index.html', '../../../../../wotamann.github.io/static/404.html', (err) => {
  if (err) return console.warn('ERROR COPY - ' + err)
  console.log('SUCESS COPY - /wotamann.github.io/static/index.html  was copied to 404.html');
});
