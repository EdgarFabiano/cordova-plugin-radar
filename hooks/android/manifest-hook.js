#!/usr/bin/env node
'use strict';
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

module.exports = function (context) {
  const parseString = xml2js.parseString;
  const builder = new xml2js.Builder();
  var projectRoot = context.opts.cordova.project ? context.opts.cordova.project.root : context.opts.projectRoot;
  var manifestPath = path.join(projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
  const androidManifest = fs.readFileSync(manifestPath).toString();

  let manifestRoot;

  if (androidManifest) {
    parseString(androidManifest, (err, manifest) => {
      if (err) return console.error(err);

      manifestRoot = manifest['manifest'];

      manifestRoot.$['xmlns:tools'] = 'http://schemas.android.com/tools';

      fs.writeFileSync(manifestPath, builder.buildObject(manifest));
      console.log("xmlns:tools added in AndroidManifest.xml");
    });
  }
};