"use strict";(self.webpackChunkamperityfrontend=self.webpackChunkamperityfrontend||[]).push([[948],{948:(t,e,n)=>{n.r(e),n.d(e,{IRetroShell:()=>M,RetroApp:()=>W,RetroShell:()=>I});var i=n(239),r=n(884),a=n(221),o=n(3),s=n(604),c=n(215),l=n(526),u=n(658);const p=new l.Token("@jupyterlab/application:ILayoutRestorer");var d;!function(t){function e(n){return n&&n.type?"tab-area"===n.type?{type:"tab-area",currentIndex:n.currentIndex,widgets:n.widgets.map((e=>t.nameProperty.get(e))).filter((t=>!!t))}:{type:"split-area",orientation:n.orientation,sizes:n.sizes,children:n.children.map(e).filter((t=>!!t))}:null}function n(t,e){if(!t)return null;const i=t.type||"unknown";if("unknown"===i||"tab-area"!==i&&"split-area"!==i)return console.warn(`Attempted to deserialize unknown type: ${i}`),null;if("tab-area"===i){const{currentIndex:n,widgets:i}=t,r={type:"tab-area",currentIndex:n||0,widgets:i&&i.map((t=>e.get(t))).filter((t=>!!t))||[]};return r.currentIndex>r.widgets.length-1&&(r.currentIndex=0),r}const{orientation:r,sizes:a,children:o}=t;return{type:"split-area",orientation:r,sizes:a||[],children:o&&o.map((t=>n(t,e))).filter((t=>!!t))||[]}}t.nameProperty=new u.AttachedProperty({name:"name",create:t=>""}),t.serializeMain=function(n){const i={dock:n&&n.dock&&e(n.dock.main)||null};if(n&&n.currentWidget){const e=t.nameProperty.get(n.currentWidget);e&&(i.current=e)}return i},t.deserializeMain=function(t,e){if(!t)return null;const i=t.current||null,r=t.dock||null;return{currentWidget:i&&e.has(i)&&e.get(i)||null,dock:r?{main:n(r,e)}:null}}}(d||(d={}));const h=new l.Token("@jupyterlab/application:IMimeDocumentTracker");var f;!function(t){t.factoryNameProperty=new u.AttachedProperty({name:"factoryName",create:()=>{}})}(f||(f={}));var g=n(923),y=n(840);new l.Token("@jupyterlab/application:ILabStatus");class m{constructor(t){this._busyCount=0,this._dirtyCount=0,this._busySignal=new y.Signal(t),this._dirtySignal=new y.Signal(t)}get busySignal(){return this._busySignal}get dirtySignal(){return this._dirtySignal}get isBusy(){return this._busyCount>0}get isDirty(){return this._dirtyCount>0}setDirty(){const t=this.isDirty;return this._dirtyCount++,this.isDirty!==t&&this._dirtySignal.emit(this.isDirty),new g.DisposableDelegate((()=>{const t=this.isDirty;this._dirtyCount=Math.max(0,this._dirtyCount-1),this.isDirty!==t&&this._dirtySignal.emit(this.isDirty)}))}setBusy(){const t=this.isBusy;return this._busyCount++,this.isBusy!==t&&this._busySignal.emit(this.isBusy),new g.DisposableDelegate((()=>{const t=this.isBusy;this._busyCount--,this.isBusy!==t&&this._busySignal.emit(this.isBusy)}))}}var _=n(848),v=function(t,e){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},v(t,e)};function b(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}v(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var w=function(){return w=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},w.apply(this,arguments)};function E(t,e,n,i){return new(n||(n=Promise))((function(r,a){function o(t){try{c(i.next(t))}catch(t){a(t)}}function s(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,s)}c((i=i.apply(t,e||[])).next())}))}function k(t,e){var n,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,i&&(r=2&a[0]?i.return:a[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,i=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((r=(r=o.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(t){a=[6,t],i=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}var P,D="function"==typeof requestAnimationFrame?requestAnimationFrame:setImmediate,T="function"==typeof cancelAnimationFrame?cancelAnimationFrame:clearImmediate,A=function(){function t(t){var e=this;this._disposed=new y.Signal(this),this._tick=new l.PromiseDelegate,this._ticked=new y.Signal(this),this._timeout=-1,this._factory=t.factory,this._standby=t.standby||P.DEFAULT_STANDBY,this._state=w(w({},P.DEFAULT_STATE),{timestamp:(new Date).getTime()});var n=t.frequency||{},i=Math.max(n.interval||0,n.max||0,P.DEFAULT_FREQUENCY.max);this.frequency=w(w(w({},P.DEFAULT_FREQUENCY),n),{max:i}),this.name=t.name||P.DEFAULT_NAME,"auto"in t&&!t.auto||D((function(){e.start()}))}return Object.defineProperty(t.prototype,"disposed",{get:function(){return this._disposed},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frequency",{get:function(){return this._frequency},set:function(e){if(!this.isDisposed&&!l.JSONExt.deepEqual(e,this.frequency||{})){var n=e.backoff,i=e.interval,r=e.max;if(i=Math.round(i),r=Math.round(r),"number"==typeof n&&n<1)throw new Error("Poll backoff growth factor must be at least 1");if((i<0||i>r)&&i!==t.NEVER)throw new Error("Poll interval must be between 0 and max");if(r>t.MAX_INTERVAL&&r!==t.NEVER)throw new Error("Max interval must be less than "+t.MAX_INTERVAL);this._frequency={backoff:n,interval:i,max:r}}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDisposed",{get:function(){return"disposed"===this.state.phase},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"standby",{get:function(){return this._standby},set:function(t){this.isDisposed||this.standby===t||(this._standby=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tick",{get:function(){return this._tick.promise},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ticked",{get:function(){return this._ticked},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){this.isDisposed||(this._state=w(w({},P.DISPOSED_STATE),{timestamp:(new Date).getTime()}),this._tick.promise.catch((function(t){})),this._tick.reject(new Error("Poll ("+this.name+") is disposed.")),this._disposed.emit(void 0),y.Signal.clearData(this))},t.prototype.refresh=function(){return this.schedule({cancel:function(t){return"refreshed"===t.phase},interval:t.IMMEDIATE,phase:"refreshed"})},t.prototype.schedule=function(e){return void 0===e&&(e={}),E(this,void 0,void 0,(function(){var n,i,r,a,o,s=this;return k(this,(function(c){switch(c.label){case 0:return this.isDisposed||e.cancel&&e.cancel(this.state)?[2]:(n=this.state,i=this._tick,r=new l.PromiseDelegate,a=w({interval:this.frequency.interval,payload:null,phase:"standby",timestamp:(new Date).getTime()},e),this._state=a,this._tick=r,n.interval===t.IMMEDIATE?T(this._timeout):clearTimeout(this._timeout),this._ticked.emit(this.state),i.resolve(this),[4,i.promise]);case 1:return c.sent(),o=function(){s.isDisposed||s.tick!==r.promise||s._execute()},this._timeout=a.interval===t.IMMEDIATE?D(o):a.interval===t.NEVER?-1:setTimeout(o,a.interval),[2]}}))}))},t.prototype.start=function(){return this.schedule({cancel:function(t){var e=t.phase;return"constructed"!==e&&"standby"!==e&&"stopped"!==e},interval:t.IMMEDIATE,phase:"started"})},t.prototype.stop=function(){return this.schedule({cancel:function(t){return"stopped"===t.phase},interval:t.NEVER,phase:"stopped"})},t.prototype._execute=function(){var t=this,e="function"==typeof this.standby?this.standby():this.standby;if(e="never"!==e&&("when-hidden"===e?!("undefined"==typeof document||!document||!document.hidden):e))this.schedule();else{var n=this.tick;this._factory(this.state).then((function(e){t.isDisposed||t.tick!==n||t.schedule({payload:e,phase:"rejected"===t.state.phase?"reconnected":"resolved"})})).catch((function(e){t.isDisposed||t.tick!==n||t.schedule({interval:P.sleep(t.frequency,t.state),payload:e,phase:"rejected"})}))}},t}();!function(t){t.IMMEDIATE=0,t.MAX_INTERVAL=2147483647,t.NEVER=1/0}(A||(A={})),function(t){t.DEFAULT_BACKOFF=3,t.DEFAULT_FREQUENCY={backoff:!0,interval:1e3,max:3e4},t.DEFAULT_NAME="unknown",t.DEFAULT_STANDBY="when-hidden",t.DEFAULT_STATE={interval:A.NEVER,payload:null,phase:"constructed",timestamp:new Date(0).getTime()},t.DISPOSED_STATE={interval:A.NEVER,payload:null,phase:"disposed",timestamp:new Date(0).getTime()},t.sleep=function(e,n){var i=e.backoff,r=e.interval,a=e.max;if(r===A.NEVER)return r;var o=!0===i?t.DEFAULT_BACKOFF:!1===i?1:i,s=function(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}(r,n.interval*o);return Math.min(a,s)}}(P||(P={}));var O=function(){function t(t,e){var n=this;void 0===e&&(e=500),this.args=void 0,this.payload=null,this.limit=e,this.poll=new A({auto:!1,factory:function(){return E(n,void 0,void 0,(function(){var e;return k(this,(function(n){return e=this.args,this.args=void 0,[2,t.apply(void 0,e)]}))}))},frequency:{backoff:!1,interval:A.NEVER,max:A.NEVER},standby:"never"}),this.payload=new l.PromiseDelegate,this.poll.ticked.connect((function(t,e){var i=n.payload;return"resolved"===e.phase?(n.payload=new l.PromiseDelegate,void i.resolve(e.payload)):"rejected"===e.phase||"stopped"===e.phase?(n.payload=new l.PromiseDelegate,i.promise.catch((function(t){})),void i.reject(e.payload)):void 0}),this)}return Object.defineProperty(t.prototype,"isDisposed",{get:function(){return null===this.payload},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){this.isDisposed||(this.args=void 0,this.payload=null,this.poll.dispose())},t.prototype.stop=function(){return E(this,void 0,void 0,(function(){return k(this,(function(t){return[2,this.poll.stop()]}))}))},t}(),C=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}b(e,t),e.prototype.invoke=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.args=t,this.poll.schedule({interval:this.limit,phase:"invoked"}),this.payload.promise}}(O),function(t){function e(e,n){var i=t.call(this,e,"number"==typeof n?n:n&&n.limit)||this;return i._trailing=!1,"number"!=typeof n&&n&&"trailing"===n.edge&&(i._trailing=!0),i._interval=i._trailing?i.limit:A.IMMEDIATE,i}return b(e,t),e.prototype.invoke=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="invoked"!==this.poll.state.phase;return(n||this._trailing)&&(this.args=t),n&&this.poll.schedule({interval:this._interval,phase:"invoked"}),this.payload.promise},e}(O)),F=n(918),x=n(720),S=n(431);const M=new l.Token("@retrolab/application:IRetroShell");class I extends S.Widget{constructor(){super(),this._currentChanged=new y.Signal(this),this.id="main";const t=new S.BoxLayout;this._topHandler=new N.PanelHandler,this._menuHandler=new N.PanelHandler,this._main=new S.Panel,this._topHandler.panel.id="top-panel",this._menuHandler.panel.id="menu-panel",this._main.id="main-panel";const e=this._topWrapper=new S.Panel;e.id="top-panel-wrapper",e.addWidget(this._topHandler.panel);const n=this._menuWrapper=new S.Panel;n.id="menu-panel-wrapper",n.addWidget(this._menuHandler.panel),S.BoxLayout.setStretch(e,0),S.BoxLayout.setStretch(n,0),S.BoxLayout.setStretch(this._main,1),this._spacer=new S.Widget,this._spacer.id="spacer-widget",t.spacing=0,t.addWidget(e),t.addWidget(n),t.addWidget(this._spacer),t.addWidget(this._main),this.layout=t}get currentChanged(){return this._currentChanged}get currentWidget(){var t;return null!==(t=this._main.widgets[0])&&void 0!==t?t:null}get top(){return this._topWrapper}get menu(){return this._menuWrapper}activateById(t){const e=(0,F.find)(this.widgets("main"),(e=>e.id===t));e&&e.activate()}add(t,e,n){var i;const r=null!==(i=null==n?void 0:n.rank)&&void 0!==i?i:900;if("top"===e)return this._topHandler.addWidget(t,r);if("menu"===e)return this._menuHandler.addWidget(t,r);if("main"===e||void 0===e){if(this._main.widgets.length>0)return;this._main.addWidget(t),this._main.update(),this._currentChanged.emit(void 0)}}collapseTop(){this._topWrapper.setHidden(!0),this._spacer.setHidden(!0)}expandTop(){this._topWrapper.setHidden(!1),this._spacer.setHidden(!1)}widgets(t){switch(null!=t?t:"main"){case"top":return(0,F.iter)(this._topHandler.panel.widgets);case"menu":return(0,F.iter)(this._menuHandler.panel.widgets);case"main":return(0,F.iter)(this._main.widgets);default:throw new Error(`Invalid area: ${t}`)}}}var N,R;!function(t){t.itemCmp=function(t,e){return t.rank-e.rank},t.PanelHandler=class{constructor(){this._panelChildHook=(t,e)=>{switch(e.type){case"child-added":{const t=e.child;if(this._items.find((e=>e.widget===t)))break;const n=this._items[this._items.length-1].rank;this._items.push({widget:t,rank:n})}break;case"child-removed":{const t=e.child;F.ArrayExt.removeFirstWhere(this._items,(e=>e.widget===t))}}return!0},this._items=new Array,this._panel=new S.Panel,x.MessageLoop.installMessageHook(this._panel,this._panelChildHook)}get panel(){return this._panel}addWidget(e,n){e.parent=null;const i={widget:e,rank:n},r=F.ArrayExt.upperBound(this._items,i,t.itemCmp);F.ArrayExt.insert(this._items,r,i),this._panel.insertWidget(r,e)}}}(N||(N={}));class W extends i.JupyterFrontEnd{constructor(t={shell:new I}){var e,n;if(super(Object.assign(Object.assign({},t),{shell:null!==(e=t.shell)&&void 0!==e?e:new I})),this.name="RetroLab",this.namespace=this.name,this.status=new m(this),this.version=null!==(n=_.PageConfig.getOption("appVersion"))&&void 0!==n?n:"unknown",this._formatter=new C((()=>{R.setFormat(this)}),250),t.mimeExtensions)for(const e of function(t){const e=[],n=new r.WidgetTracker({namespace:"application-mimedocuments"});return t.forEach((t=>{let i=t.default;t.hasOwnProperty("__esModule")||(i=t),Array.isArray(i)||(i=[i]),i.forEach((t=>{e.push(function(t,e){return{id:e.id,requires:[o.IRenderMimeRegistry,s.ITranslator],autoStart:!0,activate:(n,i,r)=>{if(void 0!==e.rank?i.addFactory(e.rendererFactory,e.rank):i.addFactory(e.rendererFactory),!e.documentWidgetFactoryOptions)return;const o=n.docRegistry;let s=[];s=Array.isArray(e.documentWidgetFactoryOptions)?e.documentWidgetFactoryOptions:[e.documentWidgetFactoryOptions],e.fileTypes&&e.fileTypes.forEach((t=>{t.icon&&(t=Object.assign(Object.assign({},t),{icon:c.LabIcon.resolve({icon:t.icon})})),n.docRegistry.addFileType(t)})),s.forEach((n=>{const s=n.toolbarFactory?t=>n.toolbarFactory(t.content.renderer):void 0,c=new a.MimeDocumentFactory({renderTimeout:e.renderTimeout,dataType:e.dataType,rendermime:i,modelName:n.modelName,name:n.name,primaryFileType:o.getFileType(n.primaryFileType),fileTypes:n.fileTypes,defaultFor:n.defaultFor,defaultRendered:n.defaultRendered,toolbarFactory:s,translator:r,factory:e.rendererFactory});o.addWidgetFactory(c),c.widgetCreated.connect(((e,n)=>{f.factoryNameProperty.set(n,c.name),n.context.pathChanged.connect((()=>{t.save(n)})),t.add(n)}))}))}}}(n,t))}))})),e.push({id:"@jupyterlab/application:mimedocument",optional:[p],provides:h,autoStart:!0,activate:(t,e)=>(e&&e.restore(n,{command:"docmanager:open",args:t=>({path:t.context.path,factory:f.factoryNameProperty.get(t)}),name:t=>`${t.context.path}:${f.factoryNameProperty.get(t)}`}),n)}),e}(t.mimeExtensions))this.registerPlugin(e);this.restored.then((()=>this._formatter.invoke()))}get paths(){return{urls:{base:_.PageConfig.getOption("baseUrl"),notFound:_.PageConfig.getOption("notFoundUrl"),app:_.PageConfig.getOption("appUrl"),static:_.PageConfig.getOption("staticUrl"),settings:_.PageConfig.getOption("settingsUrl"),themes:_.PageConfig.getOption("themesUrl"),doc:_.PageConfig.getOption("docUrl"),translations:_.PageConfig.getOption("translationsApiUrl"),hubHost:_.PageConfig.getOption("hubHost")||void 0,hubPrefix:_.PageConfig.getOption("hubPrefix")||void 0,hubUser:_.PageConfig.getOption("hubUser")||void 0,hubServerName:_.PageConfig.getOption("hubServerName")||void 0},directories:{appSettings:_.PageConfig.getOption("appSettingsDir"),schemas:_.PageConfig.getOption("schemasDir"),static:_.PageConfig.getOption("staticDir"),templates:_.PageConfig.getOption("templatesDir"),themes:_.PageConfig.getOption("themesDir"),userSettings:_.PageConfig.getOption("userSettingsDir"),serverRoot:_.PageConfig.getOption("serverRoot"),workspaces:_.PageConfig.getOption("workspacesDir")}}}handleEvent(t){super.handleEvent(t),"resize"===t.type&&this._formatter.invoke()}registerPluginModule(t){let e=t.default;Object.prototype.hasOwnProperty.call(t,"__esModule")||(e=t),Array.isArray(e)||(e=[e]),e.forEach((t=>{try{this.registerPlugin(t)}catch(t){console.error(t)}}))}registerPluginModules(t){t.forEach((t=>{this.registerPluginModule(t)}))}}!function(t){t.setFormat=function(t){t.format=window.matchMedia("only screen and (max-width: 760px)").matches?"mobile":"desktop"}}(R||(R={}))}}]);