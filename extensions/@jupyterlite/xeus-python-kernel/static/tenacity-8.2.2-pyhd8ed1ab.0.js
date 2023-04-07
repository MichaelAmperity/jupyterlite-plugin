
  var Module = typeof globalThis.Module !== 'undefined' ? globalThis.Module : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'tenacity-8.2.2-pyhd8ed1ab.0.data';
      var REMOTE_PACKAGE_BASE = 'tenacity-8.2.2-pyhd8ed1ab.0.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['empackSetStatus']) Module['empackSetStatus']('Downloading',PACKAGE_NAME,loaded,total);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "tmp", true, true);
Module['FS_createPath']("/tmp", "xeus-python-kernel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel", "envs", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs", "xeus-python-kernel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel", "conda-meta", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel", "lib", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib", "python3.10", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10", "site-packages", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "tenacity-8.2.2.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "tenacity", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":31011,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1185,2261,3455,4320,5615,6697,7691,8815,10070,11100,12421,13771,15135,16406,17716,19119,20395,21007,21936,22813,24035,24965,26299,27552,28586,29954],"sizes":[1185,1076,1194,865,1295,1082,994,1124,1255,1030,1321,1350,1364,1271,1310,1403,1276,612,929,877,1222,930,1334,1253,1034,1368,1057],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_tenacity-8.2.2-pyhd8ed1ab.0.data');
      };
      Module['addRunDependency']('datafile_tenacity-8.2.2-pyhd8ed1ab.0.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/tenacity-8.2.2-pyhd8ed1ab_0.json", "start": 0, "end": 84}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity-8.2.2.dist-info/direct_url.json", "start": 84, "end": 188}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/__init__.py", "start": 188, "end": 20377}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/_asyncio.py", "start": 20377, "end": 23868}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/_utils.py", "start": 23868, "end": 26047}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/after.py", "start": 26047, "end": 27705}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/before.py", "start": 27705, "end": 29243}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/before_sleep.py", "start": 29243, "end": 31591}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/nap.py", "start": 31591, "end": 32974}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/retry.py", "start": 32974, "end": 41708}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/stop.py", "start": 41708, "end": 44770}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/tornadoweb.py", "start": 44770, "end": 46864}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/tenacity/wait.py", "start": 46864, "end": 54864}]});
  })();
