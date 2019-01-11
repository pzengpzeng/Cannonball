/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext(\"2d\");\n\n  let game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n  game.animate();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/cannon.js":
/*!***********************!*\
  !*** ./src/cannon.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst cannonEmptyLeftImage = new Image();\ncannonEmptyLeftImage.src = \"../assets/images/cannon-empty-left.png\";\nconst cannonEmptyRightImage = new Image();\ncannonEmptyRightImage.src = \"../assets/images/cannon-empty-right.png\";\nconst cannonFullLeftImage = new Image();\ncannonFullLeftImage.src = \"../assets/images/cannon-full-left.png\";\nconst cannonFullRightImage = new Image();\ncannonFullRightImage.src = \"../assets/images/cannon-full-right.png\";\n\nclass Cannon {\n  constructor(xPos, verticalD, horizontalD) {\n    let yPos = Math.random() * 450 + 50;\n\n    this.position = [xPos, yPos];\n    this.emptyLeftImage = cannonEmptyLeftImage;\n    this.emptyRightImage = cannonEmptyRightImage;\n    this.fullLeftImage = cannonFullLeftImage;\n    this.fullRightImage = cannonFullRightImage;\n    this.verticalD = verticalD;\n    this.horizontalD = horizontalD;\n    this.degrees = 0;\n  }\n\n  drawStationary(ctx) {\n    let image = this.selectImage();\n    ctx.drawImage(image, this.position[0], this.position[1], 90, 90);\n  }\n\n  drawRotated(ctx, degrees) {\n    let image = this.selectImage();\n\n    ctx.save();\n    ctx.translate(this.position[0], this.position[1]);\n    ctx.rotate((degrees * Math.PI) / 180);\n    ctx.drawImage(image, -image.width / 2, -image.height / 2, 90, 90);\n    ctx.restore();\n  }\n\n  moveY() {\n    this.position[1] += this.verticalD;\n    if (this.position[1] <= 0 || this.position[1] + 90 >= 600) {\n      this.verticalD = -this.verticalD;\n    }\n  }\n\n  moveX(speed) {\n    this.position[0] -= speed;\n  }\n\n  selectImage() {\n    let image;\n    if (this.horizontalD === \"LEFT\") {\n      image = this.emptyLeftImage;\n    } else {\n      image = this.emptyRightImage;\n    }\n\n    return image;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cannon);\n\n\n//# sourceURL=webpack:///./src/cannon.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cannon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cannon */ \"./src/cannon.js\");\n/* harmony import */ var _monkey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monkey */ \"./src/monkey.js\");\n\n\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.score = 0;\n    this.gameOver = false;\n    this.cannons = [];\n    this.monkey = null;\n    this.successfulLaunch = false;\n    this.distanceMoved = 0;\n\n    this.animate();\n    this.detectKeyPress();\n  }\n\n  animate() {\n    if (this.cannons.length < 3) {\n      this.addCannon();\n    }\n\n    this.draw(this.ctx);\n\n    if (this.successfulLaunch) {\n      if (this.distanceMoved <= 300) {\n        this.moveAllCannons();\n        this.distanceMoved += 5;\n      } else {\n        this.successfulLaunch = false;\n        this.distanceMoved = 0;\n      }\n    } else {\n      this.step(this.ctx);\n    }\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  step() {\n    this.cannons.forEach(cannon => {\n      cannon.moveY();\n    });\n\n    if (this.monkey) {\n      this.monkey.move();\n    }\n\n    this.detectCollisions();\n  }\n\n  detectKeyPress() {\n    window.addEventListener(\"keydown\", event => {\n      if (event.keyCode === 32) {\n        this.addMonkey();\n      } else if (event.keyCode === 13) {\n        location.reload();\n      }\n    });\n  }\n\n  detectCollisions() {\n    let nextCannonX, nextCannonY, monkeyX, monkeyY;\n\n    if (this.cannons[1]) {\n      nextCannonX = this.cannons[1].position[0];\n      nextCannonY = this.cannons[1].position[1];\n    }\n\n    if (this.monkey) {\n      monkeyX = this.monkey.position[0];\n      monkeyY = this.monkey.position[1];\n    }\n    const xBoundaries = [0, 1000];\n    const yBoundaries = [0, 600];\n\n    if (\n      monkeyX + 30 >= nextCannonX + 45 &&\n      monkeyX + 30 <= nextCannonX + 90 &&\n      monkeyY + 30 >= nextCannonY + 45 &&\n      monkeyY + 30 <= nextCannonY + 90\n    ) {\n      this.removeMonkey();\n      this.removeCannon();\n      this.score += 1;\n      this.successfulLaunch = true;\n    } else if (\n      monkeyX <= xBoundaries[0] ||\n      monkeyX >= xBoundaries[1] ||\n      monkeyY <= yBoundaries[0] ||\n      monkeyY >= yBoundaries[1]\n    ) {\n      this.gameOver = true;\n    }\n  }\n\n  moveAllCannons() {\n    this.cannons.forEach(cannon => {\n      cannon.moveX(5);\n    });\n  }\n\n  addCannon() {\n    let xPos;\n    let verticalD;\n    let horizontalD;\n    const LEFT = \"LEFT\";\n    const RIGHT = \"RIGHT\";\n\n    if (this.cannons.length <= 0) {\n      xPos = 150;\n      verticalD = 2;\n      horizontalD = RIGHT;\n    } else {\n      xPos = this.cannons[this.cannons.length - 1].position[0] + 300;\n      verticalD = -this.cannons[this.cannons.length - 1].verticalD;\n      horizontalD = LEFT;\n    }\n\n    this.cannons.push(new _cannon__WEBPACK_IMPORTED_MODULE_0__[\"default\"](xPos, verticalD, horizontalD));\n  }\n\n  removeCannon() {\n    const RIGHT = \"RIGHT\";\n    this.cannons.splice(0, 1);\n    this.cannons[0].horizontalD = RIGHT;\n  }\n\n  addMonkey() {\n    let xPos = this.cannons[0].position[0] + 45;\n    let yPos = this.cannons[0].position[1];\n\n    this.monkey = new _monkey__WEBPACK_IMPORTED_MODULE_1__[\"default\"](xPos, yPos);\n  }\n\n  removeMonkey() {\n    this.monkey = null;\n  }\n\n  draw(ctx) {\n    if (this.gameOver) {\n      this.renderGameOver(ctx);\n    } else {\n      this.drawBackground(ctx);\n      this.drawCannons(ctx);\n      this.drawMonkey(ctx);\n    }\n  }\n\n  renderGameOver(ctx) {\n    ctx.textAlign = \"center\";\n    ctx.font = \"40px 'Teko'\";\n    ctx.fillStyle = \"white\";\n    ctx.fillText(`THANKS FOR PLAYING!`, 500, 300);\n    ctx.fillStyle = \"yellow\";\n    ctx.fillText(`Press enter to restart!`, 500, 350);\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(0, 0, 1000, 600);\n    ctx.font = \"30px 'Teko'\";\n    ctx.fillStyle = \"white\";\n    ctx.fillText(`Score: ${this.score}`, 860, 30);\n  }\n\n  drawCannons(ctx) {\n    this.cannons.forEach(cannon => {\n      cannon.drawStationary(ctx);\n      // cannon.degrees += 0.3;\n      // cannon.drawRotated(ctx, cannon.degrees);\n    });\n  }\n\n  drawMonkey(ctx) {\n    if (this.monkey) {\n      // this.monkey.drawStationary(ctx);\n      this.monkey.degrees += 5;\n      this.monkey.drawRotated(ctx, this.monkey.degrees);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/monkey.js":
/*!***********************!*\
  !*** ./src/monkey.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst monkeyFlyRightImage = new Image();\nmonkeyFlyRightImage.src = \"../assets/images/monkey-fly-right.png\";\nconst monkeyBallImage = new Image();\nmonkeyBallImage.src = \"../assets/images/monkey-ball.png\";\n\nclass Monkey {\n  constructor(xPos, yPos) {\n    this.position = [xPos, yPos];\n    this.flyRightImage = monkeyFlyRightImage;\n    this.ballImage = monkeyBallImage;\n    this.degrees = 0;\n  }\n\n  drawStationary(ctx) {\n    ctx.drawImage(this.flyRightImage, this.position[0], this.position[1], 60, 60);\n  }\n\n  drawRotated(ctx, degrees) {\n    ctx.save();\n    ctx.translate(this.position[0], this.position[1]);\n    ctx.rotate((degrees * Math.PI) / 180);\n    ctx.drawImage(this.ballImage, -60 / 2, -60 / 2, 60, 60);\n    ctx.restore();\n  }\n\n  move() {\n    this.position[0] += 8;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Monkey);\n\n\n//# sourceURL=webpack:///./src/monkey.js?");

/***/ })

/******/ });