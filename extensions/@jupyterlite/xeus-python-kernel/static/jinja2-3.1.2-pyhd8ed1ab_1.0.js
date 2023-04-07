
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
      var PACKAGE_NAME = 'jinja2-3.1.2-pyhd8ed1ab_1.0.data';
      var REMOTE_PACKAGE_BASE = 'jinja2-3.1.2-pyhd8ed1ab_1.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "Jinja2-3.1.2.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "jinja2", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":273098,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,913,2945,4089,5529,6723,7849,9192,10248,11470,12676,13972,15096,16387,17702,18896,20153,21095,22248,23236,24315,25572,26680,27957,29016,30162,31334,32488,33631,34687,35684,36670,37737,38764,39743,40737,41843,42938,43929,44995,46159,47004,48011,49033,49919,50742,52434,53763,55051,56330,57579,58729,60037,60981,62260,63441,64601,65689,66925,67983,69125,70332,71476,72427,73640,74941,76147,77462,78663,79877,80960,82308,83354,84423,85464,86655,87831,88938,90106,91493,92824,93952,95292,96572,97957,99123,99941,101178,102048,103245,104194,105222,106479,107691,109161,110434,111655,112849,114127,115268,116634,117975,119447,120672,121869,122945,124312,125500,126811,128099,129432,130665,131979,133335,134678,135991,137128,138358,139583,140842,141781,142685,144051,144961,146121,147250,148248,149164,150182,151145,152396,153395,154427,155611,156835,157948,159252,160304,161219,162297,163616,164626,165480,166463,167790,169130,170422,171723,172938,174135,175327,176549,177787,178911,180085,181383,182737,183883,185201,186252,187563,188832,189935,191011,192211,193450,194736,195728,197066,198055,199078,200248,201167,202245,203431,204693,206107,207315,208532,209655,210910,212108,213106,214269,215153,216100,217133,218017,218822,219587,220866,221799,222650,223544,224463,225352,226350,227545,228861,230216,231285,232459,233702,234916,235942,237207,238177,239429,240542,241710,242635,243769,244787,246073,247344,248438,249424,250714,251726,253024,254214,255012,256068,257289,258596,259942,261332,262643,263740,265101,266166,267293,268444,269839,271106,272332],"sizes":[913,2032,1144,1440,1194,1126,1343,1056,1222,1206,1296,1124,1291,1315,1194,1257,942,1153,988,1079,1257,1108,1277,1059,1146,1172,1154,1143,1056,997,986,1067,1027,979,994,1106,1095,991,1066,1164,845,1007,1022,886,823,1692,1329,1288,1279,1249,1150,1308,944,1279,1181,1160,1088,1236,1058,1142,1207,1144,951,1213,1301,1206,1315,1201,1214,1083,1348,1046,1069,1041,1191,1176,1107,1168,1387,1331,1128,1340,1280,1385,1166,818,1237,870,1197,949,1028,1257,1212,1470,1273,1221,1194,1278,1141,1366,1341,1472,1225,1197,1076,1367,1188,1311,1288,1333,1233,1314,1356,1343,1313,1137,1230,1225,1259,939,904,1366,910,1160,1129,998,916,1018,963,1251,999,1032,1184,1224,1113,1304,1052,915,1078,1319,1010,854,983,1327,1340,1292,1301,1215,1197,1192,1222,1238,1124,1174,1298,1354,1146,1318,1051,1311,1269,1103,1076,1200,1239,1286,992,1338,989,1023,1170,919,1078,1186,1262,1414,1208,1217,1123,1255,1198,998,1163,884,947,1033,884,805,765,1279,933,851,894,919,889,998,1195,1316,1355,1069,1174,1243,1214,1026,1265,970,1252,1113,1168,925,1134,1018,1286,1271,1094,986,1290,1012,1298,1190,798,1056,1221,1307,1346,1390,1311,1097,1361,1065,1127,1151,1395,1267,1226,766],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_jinja2-3.1.2-pyhd8ed1ab_1.0.data');
      };
      Module['addRunDependency']('datafile_jinja2-3.1.2-pyhd8ed1ab_1.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/jinja2-3.1.2-pyhd8ed1ab_1.json", "start": 0, "end": 82}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/Jinja2-3.1.2.dist-info/direct_url.json", "start": 82, "end": 184}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/__init__.py", "start": 184, "end": 2111}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/_identifier.py", "start": 2111, "end": 4069}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/async_utils.py", "start": 4069, "end": 6541}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/bccache.py", "start": 6541, "end": 20602}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/compiler.py", "start": 20602, "end": 92774}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/constants.py", "start": 92774, "end": 94207}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/debug.py", "start": 94207, "end": 100506}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/defaults.py", "start": 100506, "end": 101773}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/environment.py", "start": 101773, "end": 163122}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/exceptions.py", "start": 163122, "end": 168193}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/ext.py", "start": 168193, "end": 199695}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/filters.py", "start": 199695, "end": 253204}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/idtracking.py", "start": 253204, "end": 263908}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/lexer.py", "start": 263908, "end": 293634}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/loaders.py", "start": 293634, "end": 316841}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/meta.py", "start": 316841, "end": 321237}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/nativetypes.py", "start": 321237, "end": 325463}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/nodes.py", "start": 325463, "end": 360013}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/optimizer.py", "start": 360013, "end": 361663}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/parser.py", "start": 361663, "end": 401258}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/runtime.py", "start": 401258, "end": 434734}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/sandbox.py", "start": 434734, "end": 449318}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/tests.py", "start": 449318, "end": 455223}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/utils.py", "start": 455223, "end": 479188}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/jinja2/visitor.py", "start": 479188, "end": 482756}]});
  })();
