
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
      var PACKAGE_NAME = 'patsy-0.5.2-h8bed8af_0.0.data';
      var REMOTE_PACKAGE_BASE = 'patsy-0.5.2-h8bed8af_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "patsy-0.5.2.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "patsy", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":498646,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1570,2860,3956,4918,5594,6519,7471,8456,9283,10467,11429,12503,13438,14629,15630,17105,18067,19170,20509,21971,23279,24466,25877,27311,28856,30126,31158,32431,33628,34860,36107,37072,37857,39187,40618,41924,43040,44214,45406,46682,47805,48766,49960,51066,51988,53039,54047,54937,56148,57530,58734,59875,60841,62269,63247,64590,65429,66485,67420,68509,69757,71206,72554,73643,74768,75623,76855,77972,78898,79580,80763,82067,83364,84416,85550,86775,87924,88767,89722,90857,92108,93365,94471,95877,97099,98321,99335,100165,100934,101785,102757,104201,105622,106907,107903,109078,110434,111703,112910,114083,115309,116208,117112,117978,119386,120497,121592,122602,123581,124406,125350,126476,127794,129028,130271,131469,132532,133869,135274,136912,138062,139038,140190,141263,142765,144009,145148,146323,147715,148772,149866,150702,151338,152411,153706,154710,155871,157000,158055,159362,160794,161748,163075,164582,166063,167486,169097,170637,171904,173120,174170,175367,176705,177869,179210,180254,181341,182410,183640,185163,186205,187441,188761,189987,191531,192924,194423,195492,196261,197388,198627,199216,200635,201732,203173,204550,205670,206447,207824,208934,209834,210741,211744,212737,213581,214639,215585,216534,217247,218212,219196,220223,221108,221918,222647,223727,224667,225572,226592,227571,228418,229692,230989,231877,232734,234397,235769,237195,238636,239805,241297,242390,243742,244978,246455,247495,248907,250204,251498,252531,253835,255594,257182,258865,260696,262496,264256,265983,267631,269243,271008,272756,274512,276168,277920,279510,281223,282926,284727,286494,288241,289793,291489,293231,294935,296571,298338,300084,301923,303778,305586,307319,309127,310807,312542,314367,316190,317997,319806,321544,323314,324995,326662,328498,330332,332147,333952,335748,337395,339129,340953,342782,344584,346410,348173,349929,351779,353623,355477,357322,359167,361015,362869,364698,366500,368357,370166,371927,373695,375547,377395,379269,381099,382978,384816,386630,388488,390321,392149,394010,395875,397708,399572,401431,403273,405145,406958,408768,410629,412403,414217,416105,417942,419817,421661,423515,425380,427218,429020,430872,432683,434518,436387,438240,440099,441923,443745,445610,447451,449309,451131,452942,454787,456611,458429,460225,462010,463783,465476,467299,469116,470039,470952,472022,473014,474356,475301,476301,477263,478502,479882,481173,482123,483299,484414,485219,486265,487166,488195,489262,490492,491935,493426,494564,495863,496669,497862],"sizes":[1570,1290,1096,962,676,925,952,985,827,1184,962,1074,935,1191,1001,1475,962,1103,1339,1462,1308,1187,1411,1434,1545,1270,1032,1273,1197,1232,1247,965,785,1330,1431,1306,1116,1174,1192,1276,1123,961,1194,1106,922,1051,1008,890,1211,1382,1204,1141,966,1428,978,1343,839,1056,935,1089,1248,1449,1348,1089,1125,855,1232,1117,926,682,1183,1304,1297,1052,1134,1225,1149,843,955,1135,1251,1257,1106,1406,1222,1222,1014,830,769,851,972,1444,1421,1285,996,1175,1356,1269,1207,1173,1226,899,904,866,1408,1111,1095,1010,979,825,944,1126,1318,1234,1243,1198,1063,1337,1405,1638,1150,976,1152,1073,1502,1244,1139,1175,1392,1057,1094,836,636,1073,1295,1004,1161,1129,1055,1307,1432,954,1327,1507,1481,1423,1611,1540,1267,1216,1050,1197,1338,1164,1341,1044,1087,1069,1230,1523,1042,1236,1320,1226,1544,1393,1499,1069,769,1127,1239,589,1419,1097,1441,1377,1120,777,1377,1110,900,907,1003,993,844,1058,946,949,713,965,984,1027,885,810,729,1080,940,905,1020,979,847,1274,1297,888,857,1663,1372,1426,1441,1169,1492,1093,1352,1236,1477,1040,1412,1297,1294,1033,1304,1759,1588,1683,1831,1800,1760,1727,1648,1612,1765,1748,1756,1656,1752,1590,1713,1703,1801,1767,1747,1552,1696,1742,1704,1636,1767,1746,1839,1855,1808,1733,1808,1680,1735,1825,1823,1807,1809,1738,1770,1681,1667,1836,1834,1815,1805,1796,1647,1734,1824,1829,1802,1826,1763,1756,1850,1844,1854,1845,1845,1848,1854,1829,1802,1857,1809,1761,1768,1852,1848,1874,1830,1879,1838,1814,1858,1833,1828,1861,1865,1833,1864,1859,1842,1872,1813,1810,1861,1774,1814,1888,1837,1875,1844,1854,1865,1838,1802,1852,1811,1835,1869,1853,1859,1824,1822,1865,1841,1858,1822,1811,1845,1824,1818,1796,1785,1773,1693,1823,1817,923,913,1070,992,1342,945,1000,962,1239,1380,1291,950,1176,1115,805,1046,901,1029,1067,1230,1443,1491,1138,1299,806,1193,784],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_patsy-0.5.2-h8bed8af_0.0.data');
      };
      Module['addRunDependency']('datafile_patsy-0.5.2-h8bed8af_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/patsy-0.5.2-h8bed8af_0.json", "start": 0, "end": 79}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy-0.5.2.dist-info/direct_url.json", "start": 79, "end": 190}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/__init__.py", "start": 190, "end": 3697}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/build.py", "start": 3697, "end": 46455}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/builtins.py", "start": 46455, "end": 49586}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/categorical.py", "start": 49586, "end": 68612}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/compat.py", "start": 68612, "end": 70601}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/compat_ordereddict.py", "start": 70601, "end": 79771}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/constraint.py", "start": 79771, "end": 100051}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/contrasts.py", "start": 100051, "end": 124212}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/desc.py", "start": 124212, "end": 146687}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/design_info.py", "start": 146687, "end": 197379}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/eval.py", "start": 197379, "end": 229565}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/highlevel.py", "start": 229565, "end": 244281}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/infix_parser.py", "start": 244281, "end": 254061}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/mgcv_cubic_splines.py", "start": 254061, "end": 299166}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/missing.py", "start": 299166, "end": 310746}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/origin.py", "start": 310746, "end": 315336}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/parse_formula.py", "start": 315336, "end": 325080}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/redundancy.py", "start": 325080, "end": 335738}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/splines.py", "start": 335738, "end": 353265}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/state.py", "start": 353265, "end": 360134}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_build.py", "start": 360134, "end": 391159}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_highlevel.py", "start": 391159, "end": 419880}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_regressions.py", "start": 419880, "end": 420735}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_splines_bs_data.py", "start": 420735, "end": 564741}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_splines_crs_data.py", "start": 564741, "end": 697959}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/test_state.py", "start": 697959, "end": 705977}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/tokens.py", "start": 705977, "end": 714140}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/user_util.py", "start": 714140, "end": 723222}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/util.py", "start": 723222, "end": 751700}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/patsy/version.py", "start": 751700, "end": 752523}]});
  })();
