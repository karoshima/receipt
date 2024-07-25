#!/bin/sh

rm receipt.xpi 2>/dev/null || :
zip -qr receipt.xpi manifest.json icons *.js
