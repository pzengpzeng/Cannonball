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
eval("__webpack_require__.r(__webpack_exports__);\nconst cannonEmptyLeftImage = new Image();\ncannonEmptyLeftImage.src = \"../assets/images/cannon-empty-left.png\";\nconst cannonEmptyRightImage = new Image();\ncannonEmptyRightImage.src = \"../assets/images/cannon-empty-right.png\";\nconst cannonFullRightImage = new Image();\ncannonFullRightImage.src = \"../assets/images/monkey-loaded-right.png\";\n\nclass Cannon {\n  constructor(xPos, verticalD, horizontalD) {\n    let yPos = Math.random() * 450 + 50;\n\n    this.position = [xPos, yPos];\n    this.emptyLeftImage = cannonEmptyLeftImage;\n    this.emptyRightImage = cannonEmptyRightImage;\n    this.fullRightImage = cannonFullRightImage;\n    this.verticalD = verticalD;\n    this.horizontalD = horizontalD;\n    this.image = null;\n    this.degrees = 0;\n  }\n\n  drawStationary(ctx) {\n    let image = this.selectImage();\n    ctx.drawImage(image, this.position[0], this.position[1], 90, 90);\n  }\n\n  drawRotated(ctx, degrees) {\n    let image = this.selectImage();\n\n    ctx.save();\n    ctx.translate(this.position[0], this.position[1]);\n    ctx.rotate((degrees * Math.PI) / 180);\n    ctx.drawImage(image, -image.width / 2, -image.height / 2, 90, 90);\n    ctx.restore();\n  }\n\n  moveY() {\n    this.position[1] += this.verticalD;\n    if (this.position[1] <= 0 || this.position[1] + 90 >= 600) {\n      this.verticalD = -this.verticalD;\n    }\n  }\n\n  moveX(speed) {\n    this.position[0] -= speed;\n  }\n\n  selectImage() {\n    if (this.horizontalD === \"LEFT\") {\n      this.image = this.emptyLeftImage;\n    } else if (this.horizontalD === \"RIGHTFULL\") {\n      this.image = this.fullRightImage;\n    } else if (this.horizontalD === \"RIGHTEMPTY\") {\n      this.image = this.emptyRightImage;\n    }\n\n    return this.image;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cannon);\n\n\n//# sourceURL=webpack:///./src/cannon.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cannon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cannon */ \"./src/cannon.js\");\n/* harmony import */ var _monkey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monkey */ \"./src/monkey.js\");\n\n\n\nconst backgroundImg = new Image();\nbackgroundImg.src = \"../assets/images/background.jpeg\";\nconst monkeyBallImg = new Image();\nmonkeyBallImg.src = \"../assets/images/monkey-ball.png\";\nconst cannonEmptyRightImg = new Image();\ncannonEmptyRightImg.src = \"../assets/images/cannon-empty-right.png\";\nconst cannonEmptyLeftImg = new Image();\ncannonEmptyLeftImg.src = \"../assets/images/cannon-empty-left.png\";\n\nconst bgTheme = new Audio(\"../assets/sounds/bg_theme.mp3\");\nconst barrelBlast = new Audio(\"../assets/sounds/barrel_blast.mp3\");\nconst barrelLoad = new Audio(\"../assets/sounds/barrel_load.mp3\");\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.backgroundImg = backgroundImg;\n    this.monkeyBallImg = monkeyBallImg;\n    this.cannonEmptyLeftImg = cannonEmptyLeftImg;\n    this.cannonEmptyRightImg = cannonEmptyRightImg;\n    this.blinkCounter = 0;\n    this.score = 0;\n    this.sessionStarted = false;\n    this.gameOver = false;\n    this.cannons = [];\n    this.monkey = null;\n    this.monkeyInFlight = false;\n    this.successfulLanding = false;\n    this.cannonSpeedX = 5;\n    this.distanceMoved = 0;\n    this.highestScore = parseInt(localStorage.getItem(\"highScore\"));\n\n    this.bgTheme = bgTheme;\n    this.bgTheme.volume = 0.1;\n    this.barrelBlast = barrelBlast;\n    this.barrelBlast.volume = 0.2;\n    this.barrelLoad = barrelLoad;\n    this.barrelLoad.volume = 0.2;\n\n    this.animate();\n    this.detectKeyPress();\n  }\n\n  reinitialize() {\n    this.score = 0;\n    this.gameOver = false;\n    this.cannons = [];\n    this.monkey = null;\n    this.monkeyInFlight = false;\n    this.distanceMoved = 0;\n  }\n\n  animate() {\n    if (!this.monkeyInFlight) {\n      if (this.cannons.length < 3) {\n        this.addCannon();\n      }\n    }\n\n    if (this.monkeyInFlight && !this.successfulLanding) {\n      this.moveAllCannons();\n      this.distanceMoved += this.cannonSpeedX;\n    } else if (this.cannons[0].position[0] >= 155) {\n      this.moveAllCannons();\n      this.distanceMoved += this.cannonSpeedX;\n    } else {\n      this.monkeyInFlight = false;\n      this.successfulLanding = false;\n      this.distanceMoved = 0;\n    }\n\n    this.step(this.ctx);\n\n    this.draw(this.ctx);\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  step() {\n    this.cannons.forEach(cannon => {\n      cannon.moveY();\n    });\n\n    if (this.monkey) {\n      this.monkey.move();\n    }\n\n    this.detectCollisions();\n  }\n\n  detectKeyPress() {\n    window.addEventListener(\"keydown\", event => {\n      const RIGHTEMPTY = \"RIGHTEMPTY\";\n      if (event.keyCode === 32) {\n        if (!this.sessionStarted) {\n          this.sessionStarted = true;\n          this.bgTheme.play();\n          this.bgTheme.loop = true;\n        } else if (this.gameOver) {\n          this.reinitialize();\n        } else {\n          this.addMonkey();\n          this.barrelBlast.play();\n          this.monkeyInFlight = true;\n          this.cannons[0].horizontalD = RIGHTEMPTY;\n        }\n      }\n    });\n  }\n\n  detectCollisions() {\n    let nextCannonX, nextCannonY, lastCannonX, lastCannonY, monkeyX, monkeyY;\n\n    if (this.cannons[1]) {\n      nextCannonX = this.cannons[1].position[0];\n      nextCannonY = this.cannons[1].position[1];\n    }\n\n    if (this.cannons[2]) {\n      lastCannonX = this.cannons[2].position[0];\n      lastCannonY = this.cannons[2].position[1];\n    }\n\n    if (this.monkey) {\n      monkeyX = this.monkey.position[0];\n      monkeyY = this.monkey.position[1];\n    }\n\n    const xBoundaries = [0, 1000];\n    const yBoundaries = [0, 600];\n\n    if (\n      monkeyX + 30 >= nextCannonX + 30 &&\n      monkeyX + 30 <= nextCannonX + 100 &&\n      monkeyY + 30 >= nextCannonY + 30 &&\n      monkeyY + 30 <= nextCannonY + 100\n    ) {\n      this.removeMonkey();\n      this.removeCannon();\n      this.successfulLanding = true;\n      this.score += 1;\n      this.barrelLoad.play();\n    } else if (\n      monkeyX + 30 >= lastCannonX + 30 &&\n      monkeyX + 30 <= lastCannonX + 100 &&\n      monkeyY + 30 >= lastCannonY + 30 &&\n      monkeyY + 30 <= lastCannonY + 100\n    ) {\n      this.removeMonkey();\n      this.removeCannon();\n      this.removeCannon();\n      this.successfulLanding = true;\n      this.score += 3;\n      this.barrelLoad.play();\n    } else if (\n      monkeyX + 30 <= xBoundaries[0] ||\n      monkeyX + 30 >= xBoundaries[1] ||\n      monkeyY + 30 <= yBoundaries[0] ||\n      monkeyY + 30 >= yBoundaries[1]\n    ) {\n      this.gameOver = true;\n      if (this.score > this.highestScore) {\n        localStorage.setItem(\"highScore\", this.score);\n        this.highestScore = parseInt(localStorage.getItem(\"highScore\"));\n      }\n    }\n  }\n\n  moveAllCannons() {\n    this.cannons.forEach(cannon => {\n      cannon.moveX(this.cannonSpeedX);\n    });\n  }\n\n  addCannon() {\n    let xPos;\n    let verticalD;\n    let horizontalD;\n    const LEFT = \"LEFT\";\n    const RIGHTFULL = \"RIGHTFULL\";\n\n    if (this.cannons.length <= 0) {\n      xPos = 150;\n      verticalD = 2;\n      horizontalD = RIGHTFULL;\n    } else {\n      xPos = this.cannons[this.cannons.length - 1].position[0] + 300;\n      verticalD = -this.cannons[this.cannons.length - 1].verticalD;\n      horizontalD = LEFT;\n    }\n\n    this.cannons.push(new _cannon__WEBPACK_IMPORTED_MODULE_0__[\"default\"](xPos, verticalD, horizontalD));\n  }\n\n  removeCannon() {\n    const RIGHTFULL = \"RIGHTFULL\";\n    this.cannons.splice(0, 1);\n    this.cannons[0].horizontalD = RIGHTFULL;\n  }\n\n  addMonkey() {\n    let xPos = this.cannons[0].position[0] + 45;\n    let yPos = this.cannons[0].position[1];\n\n    this.monkey = new _monkey__WEBPACK_IMPORTED_MODULE_1__[\"default\"](xPos, yPos);\n  }\n\n  removeMonkey() {\n    this.monkey = null;\n  }\n\n  draw(ctx) {\n    if (!this.sessionStarted) {\n      this.renderStartScreen(ctx);\n    } else if (this.gameOver) {\n      this.renderGameOver(ctx);\n    } else {\n      this.drawBackground(ctx);\n      this.drawCannons(ctx);\n      this.drawMonkey(ctx);\n    }\n  }\n\n  renderStartScreen(ctx) {\n    this.blinkCounter += 1;\n\n    ctx.drawImage(this.backgroundImg, 0, 0, 1000, 600);\n    ctx.textAlign = \"center\";\n    ctx.font = \"120px 'Teko'\";\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 4;\n    ctx.strokeText(`Cannonball`, 500, 200);\n    ctx.fillStyle = \"#C6D8FF\";\n    ctx.fillText(`Cannonball`, 500, 200);\n\n    ctx.drawImage(this.cannonEmptyRightImg, 305, 250, 90, 90);\n    ctx.drawImage(this.monkeyBallImg, 455, 250, 90, 90);\n    ctx.drawImage(this.cannonEmptyLeftImg, 605, 250, 90, 90);\n\n    ctx.strokeStyle = \"white\";\n    ctx.fillStyle = \"black\";\n    ctx.font = \"24px 'Teko'\";\n    ctx.strokeText(`Earn 1 point for every cannon you traverse`, 500, 390);\n    ctx.fillText(`Earn 1 point for every cannon you traverse`, 500, 390);\n    ctx.strokeText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);\n    ctx.fillText(`Earn 3x the points if you dare to traverse 2 cannons at a time!`, 500, 420);\n\n    if (this.blinkCounter <= 120) {\n      ctx.strokeStyle = \"black\";\n      ctx.fillStyle = \"white\";\n      ctx.font = \"40px 'Teko'\";\n      ctx.strokeText(`Press space to start`, 500, 500);\n      ctx.fillText(`Press space to start`, 500, 500);\n    } else if (this.blinkCounter > 120 && this.blinkCounter <= 240) {\n      ctx.strokeStyle = \"black\";\n      ctx.fillStyle = \"#C6D8FF\";\n      ctx.font = \"40px 'Teko'\";\n      ctx.strokeText(`Press space to start`, 500, 500);\n      ctx.fillText(`Press space to start`, 500, 500);\n    } else {\n      this.blinkCounter = 0;\n    }\n  }\n\n  renderGameOver(ctx) {\n    ctx.textAlign = \"center\";\n    ctx.font = \"80px 'Teko'\";\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 4;\n    ctx.strokeText(`GAME OVER`, 500, 200);\n    ctx.fillStyle = \"white\";\n    ctx.fillText(`GAME OVER`, 500, 200);\n\n    ctx.font = \"40px 'Teko'\";\n    ctx.strokeStyle = \"white\";\n    ctx.lineWidth = 4;\n    ctx.fillStyle = \"black\";\n    ctx.strokeText(`Your best score : ${this.highestScore}`, 500, 300);\n    ctx.strokeText(`Recent score : ${this.score}`, 500, 350);\n\n    ctx.fillStyle = \"black\";\n    ctx.fillText(`Your best score : ${this.highestScore}`, 500, 300);\n    ctx.fillText(`Recent score : ${this.score}`, 500, 350);\n\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 4;\n    ctx.strokeText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);\n    ctx.fillStyle = \"white\";\n    ctx.fillText(`PRESS SPACE TO CONTINUE PLAYING`, 500, 450);\n  }\n\n  drawBackground(ctx) {\n    ctx.drawImage(this.backgroundImg, 0, 0, 1000, 600);\n    ctx.textAlign = \"right\";\n    ctx.font = \"30px 'Teko'\";\n    ctx.strokeStyle = \"white\";\n    ctx.lineWidth = 4;\n    ctx.strokeText(`Score : ${this.score}`, 990, 30);\n    ctx.fillStyle = \"black\";\n    ctx.fillText(`Score : ${this.score}`, 990, 30);\n  }\n\n  drawCannons(ctx) {\n    this.cannons.forEach(cannon => {\n      cannon.drawStationary(ctx);\n    });\n  }\n\n  drawMonkey(ctx) {\n    if (this.monkey) {\n      this.monkey.degrees += 5;\n      this.monkey.drawRotated(ctx, this.monkey.degrees);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/monkey.js":
/*!***********************!*\
  !*** ./src/monkey.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst monkeyBallImage = new Image();\nmonkeyBallImage.src = \"../assets/images/monkey-ball.png\";\n\nclass Monkey {\n  constructor(xPos, yPos) {\n    this.position = [xPos, yPos];\n    this.ballImage = monkeyBallImage;\n    this.degrees = 0;\n  }\n\n  drawRotated(ctx, degrees) {\n    ctx.save();\n    ctx.translate(this.position[0], this.position[1]);\n    ctx.rotate((degrees * Math.PI) / 180);\n    ctx.drawImage(this.ballImage, -60 / 2, -60 / 2, 60, 60);\n    ctx.restore();\n  }\n\n  move() {\n    this.position[0] += 4;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Monkey);\n\n\n//# sourceURL=webpack:///./src/monkey.js?");

/***/ })

/******/ });