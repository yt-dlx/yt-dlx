(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("electron-serve"));
	else if(typeof define === 'function' && define.amd)
		define(["electron-serve"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("electron-serve")) : factory(root["electron-serve"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, (__WEBPACK_EXTERNAL_MODULE_electron_serve__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "electron-serve":
/*!*********************************!*\
  !*** external "electron-serve" ***!
  \*********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_electron_serve__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./main/background.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron_serve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-serve */ "electron-serve");
/* harmony import */ var electron_serve__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_serve__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! child_process */ "child_process");
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './helpers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





const isProd = "development" === "production";
async function startProcess(event, value) {
  if (event) {
    let scriptPath;
    if (isProd) {
      const parentDir = path__WEBPACK_IMPORTED_MODULE_0___default().dirname(path__WEBPACK_IMPORTED_MODULE_0___default().dirname(path__WEBPACK_IMPORTED_MODULE_0___default().dirname(__dirname)));
      scriptPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(parentDir, "scripts/runner.sh");
    } else scriptPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "../scripts/runner.sh");
    const cmd = `sh "${scriptPath}" ${value}`;
    (0,child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(cmd, (error, stdout) => {
      if (error) {
        console.error(`ERROR: Error executing post-install script: ${error}`);
        event.sender.send("log", error.message);
        return;
      }
      event.sender.send("log", "Python script executed successfully");
      event.sender.send("message", stdout);
    });
  }
}
electron__WEBPACK_IMPORTED_MODULE_3__.ipcMain.on("run-sh", async (event, value) => {
  console.log("DEBUG: starting process");
  event.sender.send("log", "Running...");
  await startProcess(event, value);
});
if (isProd) electron_serve__WEBPACK_IMPORTED_MODULE_1___default()({
  directory: "app"
});else electron__WEBPACK_IMPORTED_MODULE_3__.app.setPath("userData", `${electron__WEBPACK_IMPORTED_MODULE_3__.app.getPath("userData")} (development)`);
(async () => {
  await electron__WEBPACK_IMPORTED_MODULE_3__.app.whenReady();
  const mainWindow = Object(function webpackMissingModule() { var e = new Error("Cannot find module './helpers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "preload.js")
    }
  });
  if (isProd) await mainWindow.loadURL("app://./home");
  const port = process.argv[2];
  await mainWindow.loadURL(`http://localhost:${port}/home`);
  mainWindow.webContents.openDevTools();
})();
electron__WEBPACK_IMPORTED_MODULE_3__.app.on("window-all-closed", () => electron__WEBPACK_IMPORTED_MODULE_3__.app.quit());
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO01BQ2RDLE9BQU8sRUFBRW5DLGdEQUFTLENBQUNnQixTQUFTLEVBQUUsWUFBWTtJQUM1QztFQUNGLENBQUMsQ0FBQztFQUNGLElBQUlWLE1BQU0sRUFBRSxNQUFNeUIsVUFBVSxDQUFDSyxPQUFPLENBQUMsY0FBYyxDQUFDO0VBQ3BELE1BQU1DLElBQUksR0FBRzlCLE9BQU8sQ0FBQytCLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTVAsVUFBVSxDQUFDSyxPQUFPLENBQUUsb0JBQW1CQyxJQUFLLE9BQU0sQ0FBQztFQUN6RE4sVUFBVSxDQUFDUSxXQUFXLENBQUNDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsRUFBRSxDQUFDO0FBRUpyQyx5Q0FBRyxDQUFDc0IsRUFBRSxDQUFDLG1CQUFtQixFQUFFLE1BQU10Qix5Q0FBRyxDQUFDc0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL215LW5leHRyb24tYXBwL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC9leHRlcm5hbCB1bWQgXCJlbGVjdHJvbi1zZXJ2ZVwiIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS1uZXh0cm9uLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LW5leHRyb24tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktbmV4dHJvbi1hcHAvLi9tYWluL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZWxlY3Ryb24tc2VydmVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZWxlY3Ryb24tc2VydmVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImVsZWN0cm9uLXNlcnZlXCIpKSA6IGZhY3Rvcnkocm9vdFtcImVsZWN0cm9uLXNlcnZlXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZWxlY3Ryb25fc2VydmVfXykgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZWxlY3Ryb25fc2VydmVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBzZXJ2ZSBmcm9tIFwiZWxlY3Ryb24tc2VydmVcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgYXBwLCBpcGNNYWluIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBjcmVhdGVXaW5kb3cgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRQcm9jZXNzKGV2ZW50LCB2YWx1ZSkge1xuICBpZiAoZXZlbnQpIHtcbiAgICBsZXQgc2NyaXB0UGF0aDtcbiAgICBpZiAoaXNQcm9kKSB7XG4gICAgICBjb25zdCBwYXJlbnREaXIgPSBwYXRoLmRpcm5hbWUocGF0aC5kaXJuYW1lKHBhdGguZGlybmFtZShfX2Rpcm5hbWUpKSk7XG4gICAgICBzY3JpcHRQYXRoID0gcGF0aC5qb2luKHBhcmVudERpciwgXCJzY3JpcHRzL3J1bm5lci5zaFwiKTtcbiAgICB9IGVsc2Ugc2NyaXB0UGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vc2NyaXB0cy9ydW5uZXIuc2hcIik7XG4gICAgY29uc3QgY21kID0gYHNoIFwiJHtzY3JpcHRQYXRofVwiICR7dmFsdWV9YDtcbiAgICBleGVjKGNtZCwgKGVycm9yLCBzdGRvdXQpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogRXJyb3IgZXhlY3V0aW5nIHBvc3QtaW5zdGFsbCBzY3JpcHQ6ICR7ZXJyb3J9YCk7XG4gICAgICAgIGV2ZW50LnNlbmRlci5zZW5kKFwibG9nXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChcImxvZ1wiLCBcIlB5dGhvbiBzY3JpcHQgZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgZXZlbnQuc2VuZGVyLnNlbmQoXCJtZXNzYWdlXCIsIHN0ZG91dCk7XG4gICAgfSk7XG4gIH1cbn1cblxuaXBjTWFpbi5vbihcInJ1bi1zaFwiLCBhc3luYyAoZXZlbnQsIHZhbHVlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiREVCVUc6IHN0YXJ0aW5nIHByb2Nlc3NcIik7XG4gIGV2ZW50LnNlbmRlci5zZW5kKFwibG9nXCIsIFwiUnVubmluZy4uLlwiKTtcbiAgYXdhaXQgc3RhcnRQcm9jZXNzKGV2ZW50LCB2YWx1ZSk7XG59KTtcblxuaWYgKGlzUHJvZCkgc2VydmUoeyBkaXJlY3Rvcnk6IFwiYXBwXCIgfSk7XG5lbHNlIGFwcC5zZXRQYXRoKFwidXNlckRhdGFcIiwgYCR7YXBwLmdldFBhdGgoXCJ1c2VyRGF0YVwiKX0gKGRldmVsb3BtZW50KWApO1xuXG4oYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBhcHAud2hlblJlYWR5KCk7XG4gIGNvbnN0IG1haW5XaW5kb3cgPSBjcmVhdGVXaW5kb3coXCJtYWluXCIsIHtcbiAgICB3aWR0aDogMTAwMCxcbiAgICBoZWlnaHQ6IDYwMCxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCJwcmVsb2FkLmpzXCIpLFxuICAgIH0sXG4gIH0pO1xuICBpZiAoaXNQcm9kKSBhd2FpdCBtYWluV2luZG93LmxvYWRVUkwoXCJhcHA6Ly8uL2hvbWVcIik7XG4gIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmFyZ3ZbMl07XG4gIGF3YWl0IG1haW5XaW5kb3cubG9hZFVSTChgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2hvbWVgKTtcbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcbn0pKCk7XG5cbmFwcC5vbihcIndpbmRvdy1hbGwtY2xvc2VkXCIsICgpID0+IGFwcC5xdWl0KCkpO1xuIl0sIm5hbWVzIjpbInBhdGgiLCJzZXJ2ZSIsImV4ZWMiLCJhcHAiLCJpcGNNYWluIiwiY3JlYXRlV2luZG93IiwiaXNQcm9kIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwic3RhcnRQcm9jZXNzIiwiZXZlbnQiLCJ2YWx1ZSIsInNjcmlwdFBhdGgiLCJwYXJlbnREaXIiLCJkaXJuYW1lIiwiX19kaXJuYW1lIiwiam9pbiIsImNtZCIsImVycm9yIiwic3Rkb3V0IiwiY29uc29sZSIsInNlbmRlciIsInNlbmQiLCJtZXNzYWdlIiwib24iLCJsb2ciLCJkaXJlY3RvcnkiLCJzZXRQYXRoIiwiZ2V0UGF0aCIsIndoZW5SZWFkeSIsIm1haW5XaW5kb3ciLCJ3aWR0aCIsImhlaWdodCIsIndlYlByZWZlcmVuY2VzIiwicHJlbG9hZCIsImxvYWRVUkwiLCJwb3J0IiwiYXJndiIsIndlYkNvbnRlbnRzIiwib3BlbkRldlRvb2xzIiwicXVpdCJdLCJzb3VyY2VSb290IjoiIn0=