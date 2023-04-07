
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
      var PACKAGE_NAME = 'seaborn-base-0.12.2-pyhd8ed1ab.0.data';
      var REMOTE_PACKAGE_BASE = 'seaborn-base-0.12.2-pyhd8ed1ab.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "seaborn-0.12.2.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages", "seaborn", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn", "_core", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn", "_marks", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn", "_stats", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn", "colors", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn", "external", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":605485,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1230,2427,3705,5043,6333,7591,8792,10056,11553,12791,14026,15268,16599,17898,19171,20328,21825,23137,24450,25695,26900,28318,29597,30922,32189,33295,34581,35974,37286,38708,40127,41337,42468,43619,44847,46160,47432,48680,49808,51038,52123,53325,54570,55741,56839,58098,59396,60505,61612,62614,63719,64896,66247,67527,68623,69817,71017,72121,73245,74439,75883,77195,78410,79624,80981,82395,83742,85091,86078,87259,88333,89626,90919,92006,92948,94348,95468,96773,97932,98901,100057,101115,102381,103512,104559,105962,107307,108666,109790,110970,112260,113507,114667,115915,117220,118420,119590,120843,122036,123429,124778,125991,127051,128155,129324,130167,131413,132565,133725,134903,136278,137634,138705,139772,141045,142047,143297,144612,145950,147074,148414,149683,150956,152177,153200,154478,155674,156851,157916,159198,160418,161684,162825,163945,165244,166674,167967,169372,170655,171525,172695,174067,175537,176670,177698,178956,180107,181030,182107,183337,184418,185756,187149,188513,189879,191365,192565,193634,194960,196530,197844,198977,200269,201730,202850,204280,205543,206948,208124,209412,210617,211848,213092,214382,215596,216659,217747,219149,220438,221549,222710,224011,225199,226147,227046,228058,229059,230117,230940,232323,233550,234866,235813,236620,237700,238786,239970,241200,242140,243363,244415,245616,246573,248029,249386,250792,251879,253301,254354,255618,257015,258280,259681,260956,262306,263534,264637,265760,267019,268000,269050,269884,271016,272178,273207,274267,275106,276206,277106,278052,279313,280324,281240,282048,282819,283621,284354,285388,286301,287239,288284,289424,290364,291529,292791,293899,294936,295996,296817,297918,299272,300515,301716,303122,304552,305995,307417,308747,310284,311636,313138,314623,316082,317379,318915,320184,321058,322346,323663,325034,326437,327651,328776,330016,331347,332682,334007,335302,336584,337919,339246,340551,341798,343101,344457,345777,347103,348368,349660,350972,352304,353621,354925,356220,357553,358913,360236,361526,362839,364143,365480,366776,368089,369369,370666,372004,373130,374180,375184,376043,376915,377830,378705,379562,380446,381276,382141,382962,383861,384731,385580,386454,387340,388230,389092,390209,391407,392709,393890,395295,396364,397474,398582,399756,400885,402014,402730,403898,404966,406096,407176,408401,409625,410551,411744,412919,414097,415324,416340,417555,418695,420108,421411,422916,424019,425250,426698,428171,429723,431228,432335,433778,435090,435928,437394,438774,440111,441220,442812,444249,445560,446722,448131,449453,450622,451648,452921,454005,455192,456216,457187,458357,459553,460601,461834,463145,464185,465759,467249,468556,469943,471071,472286,473515,474369,475372,476484,477360,478439,479819,481079,482399,483202,484246,485485,486745,487998,489260,490701,491712,492854,493955,495307,496145,497328,498360,499535,500591,501597,502704,503853,505198,506665,508002,509431,510597,511896,513276,514477,515475,516647,517944,519329,520569,521832,522922,524290,525706,527048,528208,529635,530806,531722,532969,534043,535402,536821,538111,539276,540303,541303,542213,543463,544696,546082,547359,548595,549927,551430,552782,554088,555320,556672,558244,559425,560867,562273,563173,564049,565384,566711,567808,568940,570202,571584,572823,574032,575376,576568,577815,579117,580579,582016,583317,584493,585881,586623,587829,589188,590587,591995,593103,594509,595773,597272,598629,599901,601129,601837,602885,604023,605228],"sizes":[1230,1197,1278,1338,1290,1258,1201,1264,1497,1238,1235,1242,1331,1299,1273,1157,1497,1312,1313,1245,1205,1418,1279,1325,1267,1106,1286,1393,1312,1422,1419,1210,1131,1151,1228,1313,1272,1248,1128,1230,1085,1202,1245,1171,1098,1259,1298,1109,1107,1002,1105,1177,1351,1280,1096,1194,1200,1104,1124,1194,1444,1312,1215,1214,1357,1414,1347,1349,987,1181,1074,1293,1293,1087,942,1400,1120,1305,1159,969,1156,1058,1266,1131,1047,1403,1345,1359,1124,1180,1290,1247,1160,1248,1305,1200,1170,1253,1193,1393,1349,1213,1060,1104,1169,843,1246,1152,1160,1178,1375,1356,1071,1067,1273,1002,1250,1315,1338,1124,1340,1269,1273,1221,1023,1278,1196,1177,1065,1282,1220,1266,1141,1120,1299,1430,1293,1405,1283,870,1170,1372,1470,1133,1028,1258,1151,923,1077,1230,1081,1338,1393,1364,1366,1486,1200,1069,1326,1570,1314,1133,1292,1461,1120,1430,1263,1405,1176,1288,1205,1231,1244,1290,1214,1063,1088,1402,1289,1111,1161,1301,1188,948,899,1012,1001,1058,823,1383,1227,1316,947,807,1080,1086,1184,1230,940,1223,1052,1201,957,1456,1357,1406,1087,1422,1053,1264,1397,1265,1401,1275,1350,1228,1103,1123,1259,981,1050,834,1132,1162,1029,1060,839,1100,900,946,1261,1011,916,808,771,802,733,1034,913,938,1045,1140,940,1165,1262,1108,1037,1060,821,1101,1354,1243,1201,1406,1430,1443,1422,1330,1537,1352,1502,1485,1459,1297,1536,1269,874,1288,1317,1371,1403,1214,1125,1240,1331,1335,1325,1295,1282,1335,1327,1305,1247,1303,1356,1320,1326,1265,1292,1312,1332,1317,1304,1295,1333,1360,1323,1290,1313,1304,1337,1296,1313,1280,1297,1338,1126,1050,1004,859,872,915,875,857,884,830,865,821,899,870,849,874,886,890,862,1117,1198,1302,1181,1405,1069,1110,1108,1174,1129,1129,716,1168,1068,1130,1080,1225,1224,926,1193,1175,1178,1227,1016,1215,1140,1413,1303,1505,1103,1231,1448,1473,1552,1505,1107,1443,1312,838,1466,1380,1337,1109,1592,1437,1311,1162,1409,1322,1169,1026,1273,1084,1187,1024,971,1170,1196,1048,1233,1311,1040,1574,1490,1307,1387,1128,1215,1229,854,1003,1112,876,1079,1380,1260,1320,803,1044,1239,1260,1253,1262,1441,1011,1142,1101,1352,838,1183,1032,1175,1056,1006,1107,1149,1345,1467,1337,1429,1166,1299,1380,1201,998,1172,1297,1385,1240,1263,1090,1368,1416,1342,1160,1427,1171,916,1247,1074,1359,1419,1290,1165,1027,1000,910,1250,1233,1386,1277,1236,1332,1503,1352,1306,1232,1352,1572,1181,1442,1406,900,876,1335,1327,1097,1132,1262,1382,1239,1209,1344,1192,1247,1302,1462,1437,1301,1176,1388,742,1206,1359,1399,1408,1108,1406,1264,1499,1357,1272,1228,708,1048,1138,1205,257],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_seaborn-base-0.12.2-pyhd8ed1ab.0.data');
      };
      Module['addRunDependency']('datafile_seaborn-base-0.12.2-pyhd8ed1ab.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/conda-meta/seaborn-base-0.12.2-pyhd8ed1ab_0.json", "start": 0, "end": 89}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn-0.12.2.dist-info/direct_url.json", "start": 89, "end": 198}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/__init__.py", "start": 198, "end": 942}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_compat.py", "start": 942, "end": 6684}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/__init__.py", "start": 6684, "end": 6684}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/data.py", "start": 6684, "end": 16003}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/exceptions.py", "start": 16003, "end": 17182}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/groupby.py", "start": 17182, "end": 21892}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/moves.py", "start": 21892, "end": 29442}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/plot.py", "start": 29442, "end": 92617}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/properties.py", "start": 92617, "end": 123247}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/rules.py", "start": 123247, "end": 128573}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/scales.py", "start": 128573, "end": 163827}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/subplots.py", "start": 163827, "end": 173998}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_core/typing.py", "start": 173998, "end": 175259}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_decorators.py", "start": 175259, "end": 175744}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_docstrings.py", "start": 175744, "end": 182208}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/__init__.py", "start": 182208, "end": 182208}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/area.py", "start": 182208, "end": 187430}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/bar.py", "start": 187430, "end": 196638}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/base.py", "start": 196638, "end": 206801}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/dot.py", "start": 206801, "end": 213424}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/line.py", "start": 213424, "end": 222668}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_marks/text.py", "start": 222668, "end": 224925}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_oldcore.py", "start": 224925, "end": 290245}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_statistics.py", "start": 290245, "end": 309635}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/__init__.py", "start": 309635, "end": 309635}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/aggregation.py", "start": 309635, "end": 312902}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/base.py", "start": 312902, "end": 315535}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/counting.py", "start": 315535, "end": 323838}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/density.py", "start": 323838, "end": 332514}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/order.py", "start": 332514, "end": 334788}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_stats/regression.py", "start": 334788, "end": 336071}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/_testing.py", "start": 336071, "end": 338391}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/algorithms.py", "start": 338391, "end": 343361}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/axisgrid.py", "start": 343361, "end": 430881}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/categorical.py", "start": 430881, "end": 560899}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/cm.py", "start": 560899, "end": 626937}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/colors/__init__.py", "start": 626937, "end": 627025}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/colors/crayons.py", "start": 627025, "end": 631355}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/colors/xkcd_rgb.py", "start": 631355, "end": 666734}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/distributions.py", "start": 666734, "end": 753966}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/__init__.py", "start": 753966, "end": 753966}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/appdirs.py", "start": 753966, "end": 762935}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/docscrape.py", "start": 762935, "end": 786231}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/husl.py", "start": 786231, "end": 792897}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/kde.py", "start": 792897, "end": 806623}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/external/version.py", "start": 806623, "end": 820024}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/matrix.py", "start": 820024, "end": 867351}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/miscplot.py", "start": 867351, "end": 868758}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/objects.py", "start": 868758, "end": 870966}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/palettes.py", "start": 870966, "end": 898858}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/rcmod.py", "start": 898858, "end": 914787}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/regression.py", "start": 914787, "end": 948035}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/relational.py", "start": 948035, "end": 985555}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/utils.py", "start": 985555, "end": 1014037}, {"filename": "/tmp/xeus-python-kernel/envs/xeus-python-kernel/lib/python3.10/site-packages/seaborn/widgets.py", "start": 1014037, "end": 1028601}]});
  })();
