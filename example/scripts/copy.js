const fse = require('fs-extra');

const doTheJob = async() => {

  let dir
  let a 
  dir = '../dist/src';
  await fse.ensureDir(dir)

  dir = '../../../../../wotamann.github.io/static';
  await fse.ensureDir(dir)
  console.log(`fse.ensureDir(dir) ### finished ###`);

  await fse.copy('./public/index-cdn.html', '../dist/index-cdn.html');
  console.log(`fse.copy(./public/index-cdn.html, ../dist/index-cdn.html) ### finished ###`);
  
  await fse.copy('./src/components/vFormBase.vue', '../dist/src/vFormBase.vue');
  console.log(`fse.copy('./src/components/vFormBase.vue', '../dist/src/vFormBase.vue') ### finished ###`);
  
  await fse.copy('../../../../../wotamann.github.io/static/index.html', '../../../../../wotamann.github.io/static/404.html');
  console.log(`fse.copy('../../../../../wotamann.github.io/static/index.html', '../../../../../wotamann.github.io/static/404.html') ### finished ###`);
  
  dir = `../../../../../wotamann.github.io/static`;
  const destDir = `../../../../../wotamann.github.io`;
  // copy static folder to root
  await fse.copy(dir, destDir);
  console.log(`fse.copy(srcDir/static, destDir) ### finished ###`);
  // remove STATIC FOLDER!!!!
  await fse.remove(dir);
  console.log(`fse.remove(srcDir) ### finished ###`);
}

doTheJob().then( text => console.log('SUCCESS - ALL DONE'), err => console.log('ERROR - ALL DONE', err))