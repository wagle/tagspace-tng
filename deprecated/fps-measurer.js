!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.FpsMeasurer = factory() : root.FpsMeasurer = factory();
}(this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
                return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__),
                module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules,
            __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _FramerateMeasurer = __webpack_require__(1);
            Object.defineProperty(exports, "FramerateMeasurer", {
                enumerable: !0,
                get: function() {
                    return _FramerateMeasurer.FramerateMeasurer;
                }
            });
            var _Statistics = __webpack_require__(5);
            Object.defineProperty(exports, "calculateMean", {
                enumerable: !0,
                get: function() {
                    return _Statistics.calculateMean;
                }
            }), Object.defineProperty(exports, "calculateRegressionSlope", {
                enumerable: !0,
                get: function() {
                    return _Statistics.calculateRegressionSlope;
                }
            });
            var _TestRunner = __webpack_require__(6);
            Object.defineProperty(exports, "TestRunner", {
                enumerable: !0,
                get: function() {
                    return _TestRunner.TestRunner;
                }
            });
        }, /* 1 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.FramerateMeasurer = void 0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
                        Constructor;
                };
            }(), _raf = __webpack_require__(2), _raf2 = _interopRequireDefault(_raf);
            exports.FramerateMeasurer = function() {
                function FramerateMeasurer() {
                    _classCallCheck(this, FramerateMeasurer), this._frames = 0, this._loop = this._loop.bind(this);
                }
                return _createClass(FramerateMeasurer, [ {
                    key: "start",
                    value: function() {
                        this._beginTime = this._getTime(), this._frames = 0, this._animationFrameId = (0,
                            _raf2["default"])(this._loop);
                    }
                }, {
                    key: "stop",
                    value: function() {
                        var endTime = this._getTime();
                        this._animationFrameId && _raf2["default"].cancel(this._animationFrameId);
                        var duration = (endTime - this._beginTime) / 1e3, framerate = 1e3 * this._frames / (endTime - this._beginTime);
                        return {
                            duration: duration,
                            framerate: framerate,
                            frames: this._frames
                        };
                    }
                }, {
                    key: "_getTime",
                    value: function() {
                        return "undefined" != typeof performance ? performance.now() : Date.now();
                    }
                }, {
                    key: "_loop",
                    value: function() {
                        this._frames++, this._animationFrameId = (0, _raf2["default"])(this._loop);
                    }
                } ]), FramerateMeasurer;
            }();
        }, /* 2 */
        /***/
        function(module, exports, __webpack_require__) {
            /* WEBPACK VAR INJECTION */
            (function(global) {
                for (var now = __webpack_require__(3), root = "undefined" == typeof window ? global : window, vendors = [ "moz", "webkit" ], suffix = "AnimationFrame", raf = root["request" + suffix], caf = root["cancel" + suffix] || root["cancelRequest" + suffix], i = 0; !raf && i < vendors.length; i++) raf = root[vendors[i] + "Request" + suffix],
                    caf = root[vendors[i] + "Cancel" + suffix] || root[vendors[i] + "CancelRequest" + suffix];
                // Some versions of FF have rAF but not cAF
                if (!raf || !caf) {
                    var last = 0, id = 0, queue = [], frameDuration = 1e3 / 60;
                    raf = function(callback) {
                        if (0 === queue.length) {
                            var _now = now(), next = Math.max(0, frameDuration - (_now - last));
                            last = next + _now, setTimeout(function() {
                                var cp = queue.slice(0);
                                // Clear queue here to prevent
                                // callbacks from appending listeners
                                // to the current frame's queue
                                queue.length = 0;
                                for (var i = 0; i < cp.length; i++) if (!cp[i].cancelled) try {
                                    cp[i].callback(last);
                                } catch (e) {
                                    setTimeout(function() {
                                        throw e;
                                    }, 0);
                                }
                            }, Math.round(next));
                        }
                        return queue.push({
                            handle: ++id,
                            callback: callback,
                            cancelled: !1
                        }), id;
                    }, caf = function(handle) {
                        for (var i = 0; i < queue.length; i++) queue[i].handle === handle && (queue[i].cancelled = !0);
                    };
                }
                module.exports = function(fn) {
                    // Wrap in a new function to prevent
                    // `cancel` potentially being assigned
                    // to the native rAF function
                    return raf.call(root, fn);
                }, module.exports.cancel = function() {
                    caf.apply(root, arguments);
                }, module.exports.polyfill = function() {
                    root.requestAnimationFrame = raf, root.cancelAnimationFrame = caf;
                };
            }).call(exports, function() {
                return this;
            }());
        }, /* 3 */
        /***/
        function(module, exports, __webpack_require__) {
            /* WEBPACK VAR INJECTION */
            (function(process) {
                // Generated by CoffeeScript 1.7.1
                (function() {
                    var getNanoSeconds, hrtime, loadTime;
                    "undefined" != typeof performance && null !== performance && performance.now ? module.exports = function() {
                        return performance.now();
                    } : "undefined" != typeof process && null !== process && process.hrtime ? (module.exports = function() {
                        return (getNanoSeconds() - loadTime) / 1e6;
                    }, hrtime = process.hrtime, getNanoSeconds = function() {
                        var hr;
                        return hr = hrtime(), 1e9 * hr[0] + hr[1];
                    }, loadTime = getNanoSeconds()) : Date.now ? (module.exports = function() {
                        return Date.now() - loadTime;
                    }, loadTime = Date.now()) : (module.exports = function() {
                        return new Date().getTime() - loadTime;
                    }, loadTime = new Date().getTime());
                }).call(this);
            }).call(exports, __webpack_require__(4));
        }, /* 4 */
        /***/
        function(module, exports) {
            function cleanUpNextTick() {
                draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1,
                queue.length && drainQueue());
            }
            function drainQueue() {
                if (!draining) {
                    var timeout = cachedSetTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var len = queue.length; len; ) {
                        for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, len = queue.length;
                    }
                    currentQueue = null, draining = !1, cachedClearTimeout(timeout);
                }
            }
            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun, this.array = array;
            }
            function noop() {}
            // shim for using process in browser
            var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
            !function() {
                try {
                    cachedSetTimeout = setTimeout;
                } catch (e) {
                    cachedSetTimeout = function() {
                        throw new Error("setTimeout is not defined");
                    };
                }
                try {
                    cachedClearTimeout = clearTimeout;
                } catch (e) {
                    cachedClearTimeout = function() {
                        throw new Error("clearTimeout is not defined");
                    };
                }
            }();
            var currentQueue, queue = [], draining = !1, queueIndex = -1;
            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
                queue.push(new Item(fun, args)), 1 !== queue.length || draining || cachedSetTimeout(drainQueue, 0);
            }, Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [],
                process.version = "", // empty string to avoid regexp issues
                process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop,
                process.off = noop, process.removeListener = noop, process.removeAllListeners = noop,
                process.emit = noop, process.binding = function(name) {
                throw new Error("process.binding is not supported");
            }, process.cwd = function() {
                return "/";
            }, process.chdir = function(dir) {
                throw new Error("process.chdir is not supported");
            }, process.umask = function() {
                return 0;
            };
        }, /* 5 */
        /***/
        function(module, exports) {
            "use strict";
            function calculateMean(samples) {
                var total = samples.reduce(function(total, x) {
                    return total += x;
                }, 0);
                return total / samples.length;
            }
            function calculateRegressionSlope(xValues, yValues) {
                for (var xMean = calculateMean(xValues), yMean = calculateMean(yValues), dividendSum = 0, divisorSum = 0, i = 0; i < xValues.length; i++) dividendSum += (xValues[i] - xMean) * (yValues[i] - yMean),
                    divisorSum += Math.pow(xValues[i] - xMean, 2);
                return dividendSum / divisorSum;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.calculateMean = calculateMean, exports.calculateRegressionSlope = calculateRegressionSlope;
        }, /* 6 */
        /***/
        function(module, exports, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.TestRunner = void 0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
                        Constructor;
                };
            }(), _FramerateMeasurer = __webpack_require__(1), _Statistics = __webpack_require__(5);
            exports.TestRunner = function() {
                function TestRunner(testCase) {
                    var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    _classCallCheck(this, TestRunner);
                    var _options$maxSampleSiz = options.maxSampleSize, maxSampleSize = void 0 === _options$maxSampleSiz ? 10 : _options$maxSampleSiz, _options$minSampleSiz = options.minSampleSize, minSampleSize = void 0 === _options$minSampleSiz ? 5 : _options$minSampleSiz;
                    this._testCase = testCase, this._maxSampleSize = maxSampleSize, this._minSampleSize = minSampleSize,
                        this._framerateMeasurer = new _FramerateMeasurer.FramerateMeasurer(), this._onTestComplete = this._onTestComplete.bind(this);
                }
                return _createClass(TestRunner, [ {
                    key: "isRunning",
                    value: function() {
                        return !!this._resolvePromise;
                    }
                }, {
                    key: "start",
                    value: function(completeCallback) {
                        var _this = this;
                        return this.isRunning() ? Promise.reject("Already running") : (this._completeCallback = completeCallback,
                            this._durations = [], this._framerates = [], new Promise(function(resolve, reject) {
                            _this._rejectPromise = reject, _this._resolvePromise = resolve, _this._runTest();
                        }));
                    }
                }, {
                    key: "stop",
                    value: function() {
                        if (!this.isRunning()) throw Error("Not running");
                        return this._rejectPromise = null, this._resolvePromise = null, this._getCompletedData();
                    }
                }, {
                    key: "_format",
                    value: function(number) {
                        return Math.round(100 * number) / 100;
                    }
                }, {
                    key: "_getCompletedData",
                    value: function() {
                        var duration = (0, _Statistics.calculateMean)(this._durations), framerate = (0,
                            _Statistics.calculateMean)(this._framerates);
                        return console.log("TestRunner: complete"), console.log("+ " + this._framerates.length + " measurements"),
                            console.log("+ mean framerate: " + this._format(framerate) + " fps"), console.log("+ mean duration: " + this._format(duration) + " seconds"),
                            {
                                duration: duration,
                                framerate: framerate
                            };
                    }
                }, {
                    key: "_getTestConfidence",
                    value: function() {
                        var sampleCount = this._framerates.length;
                        if (sampleCount >= this._maxSampleSize) return !0;
                        if (sampleCount >= this._minSampleSize) {
                            var indices = this._framerates.map(function(framerate, index) {
                                return index;
                            });
                            return (0, _Statistics.calculateRegressionSlope)(indices, this._framerates) >= 0;
                        }
                        return !1;
                    }
                }, {
                    key: "_onTestComplete",
                    value: function() {
                        if (this.isRunning()) {
                            var measurements = this._framerateMeasurer.stop();
                            console.log("TestRunner: test " + this._framerates.length), console.log("+ framerate: " + this._format(measurements.framerate) + " fps"),
                                console.log("+ duration: " + this._format(measurements.duration) + " seconds"),
                                this._durations.push(measurements.duration), this._framerates.push(measurements.framerate);
                            var isConfident = this._getTestConfidence(this._framerates, this._minSampleSize);
                            if (isConfident) {
                                var data = this._getCompletedData();
                                this._completeCallback && (this._completeCallback(data), this._completeCallback = null),
                                    this._resolvePromise(data), this._rejectPromise = null, this._resolvePromise = null;
                            } else this._runTest();
                        }
                    }
                }, {
                    key: "_onTestError",
                    value: function(error) {
                        this._rejectPromise(error), this._rejectPromise = null, this._resolvePromise = null;
                    }
                }, {
                    key: "_runTest",
                    value: function() {
                        this._framerateMeasurer.start();
                        var promise = this._testCase(this._onTestComplete);
                        promise instanceof Promise && promise.then(this._onTestComplete)["catch"](this._onTestError);
                    }
                } ]), TestRunner;
            }();
        } ]);
});
//# sourceMappingURL=fps-measurer.js.map
