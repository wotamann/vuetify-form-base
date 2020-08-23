#!/bin/bash

# 1) cd to dir example
# 2) commit git
# 3) npm run build 
#		-> generates in ../dist/src/ vFormBase.vue & ../umd/vFormBase.umd.min.js etc... 
#		-> generates in wotamann.github.io  dir static  
# 4) publish
#    	cd ..
# 		npm version patch
# 		npm publish --otp=<code>
# 5) commit wotamann.github.io & publish
