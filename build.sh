#!/bin/bash


echo building dist....
rm -f dist.zip
npm run build
zip -q -r dist.zip dist
