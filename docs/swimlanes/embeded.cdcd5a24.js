(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }
  return r
})()({
  1: [function(require, module, exports) {}, {}],
  2: [function(require, module, exports) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr)
      }
      return toStr.call(arr) === "[object Array]"
    };
    var isPlainObject = function isPlainObject(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false
      }
      var key;
      for (key in obj) {}
      return typeof key === "undefined" || hasOwn.call(obj, key)
    };
    var setProperty = function setProperty(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        })
      } else {
        target[options.name] = options.newValue
      }
    };
    var getProperty = function getProperty(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0
        } else if (gOPD) {
          return gOPD(obj, name).value
        }
      }
      return obj[name]
    };
    module.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {}
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : []
                } else {
                  clone = src && isPlainObject(src) ? src : {}
                }
                setProperty(target, {
                  name: name,
                  newValue: extend(deep, clone, copy)
                })
              } else if (typeof copy !== "undefined") {
                setProperty(target, {
                  name: name,
                  newValue: copy
                })
              }
            }
          }
        }
      }
      return target
    }
  }, {}],
  3: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _handlebarsRuntime = require("./handlebars.runtime");
    var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
    var _handlebarsCompilerAst = require("./handlebars/compiler/ast");
    var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
    var _handlebarsCompilerBase = require("./handlebars/compiler/base");
    var _handlebarsCompilerCompiler = require("./handlebars/compiler/compiler");
    var _handlebarsCompilerJavascriptCompiler = require("./handlebars/compiler/javascript-compiler");
    var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
    var _handlebarsCompilerVisitor = require("./handlebars/compiler/visitor");
    var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
    var _handlebarsNoConflict = require("./handlebars/no-conflict");
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    var _create = _handlebarsRuntime2["default"].create;

    function create() {
      var hb = _create();
      hb.compile = function(input, options) {
        return _handlebarsCompilerCompiler.compile(input, options, hb)
      };
      hb.precompile = function(input, options) {
        return _handlebarsCompilerCompiler.precompile(input, options, hb)
      };
      hb.AST = _handlebarsCompilerAst2["default"];
      hb.Compiler = _handlebarsCompilerCompiler.Compiler;
      hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
      hb.Parser = _handlebarsCompilerBase.parser;
      hb.parse = _handlebarsCompilerBase.parse;
      return hb
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst.Visitor = _handlebarsCompilerVisitor2["default"];
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"]
  }, {
    "./handlebars.runtime": 4,
    "./handlebars/compiler/ast": 6,
    "./handlebars/compiler/base": 7,
    "./handlebars/compiler/compiler": 9,
    "./handlebars/compiler/javascript-compiler": 11,
    "./handlebars/compiler/visitor": 14,
    "./handlebars/no-conflict": 28
  }],
  4: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
          }
        }
        newObj["default"] = obj;
        return newObj
      }
    }
    var _handlebarsBase = require("./handlebars/base");
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = require("./handlebars/safe-string");
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = require("./handlebars/exception");
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = require("./handlebars/utils");
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = require("./handlebars/runtime");
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = require("./handlebars/no-conflict");
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

    function create() {
      var hb = new base.HandlebarsEnvironment;
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb)
      };
      return hb
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"]
  }, {
    "./handlebars/base": 5,
    "./handlebars/exception": 18,
    "./handlebars/no-conflict": 28,
    "./handlebars/runtime": 29,
    "./handlebars/safe-string": 30,
    "./handlebars/utils": 31
  }],
  5: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _utils = require("./utils");
    var _exception = require("./exception");
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = require("./helpers");
    var _decorators = require("./decorators");
    var _logger = require("./logger");
    var _logger2 = _interopRequireDefault(_logger);
    var VERSION = "4.0.12";
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 7;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0"
    };
    exports.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = "[object Object]";

    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this)
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: function registerHelper(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple helpers")
          }
          _utils.extend(this.helpers, name)
        } else {
          this.helpers[name] = fn
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name]
      },
      registerPartial: function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType) {
          _utils.extend(this.partials, name)
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined')
          }
          this.partials[name] = partial
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name]
      },
      registerDecorator: function registerDecorator(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple decorators")
          }
          _utils.extend(this.decorators, name)
        } else {
          this.decorators[name] = fn
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name]
      }
    };
    var log = _logger2["default"].log;
    exports.log = log;
    exports.createFrame = _utils.createFrame;
    exports.logger = _logger2["default"]
  }, {
    "./decorators": 16,
    "./exception": 18,
    "./helpers": 19,
    "./logger": 27,
    "./utils": 31
  }],
  6: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var AST = {
      helpers: {
        helperExpression: function helperExpression(node) {
          return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash)
        },
        scopedId: function scopedId(path) {
          return /^\.|this\b/.test(path.original)
        },
        simpleId: function simpleId(path) {
          return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth
        }
      }
    };
    exports["default"] = AST;
    module.exports = exports["default"]
  }, {}],
  7: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.parse = parse;

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
          }
        }
        newObj["default"] = obj;
        return newObj
      }
    }

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _parser = require("./parser");
    var _parser2 = _interopRequireDefault(_parser);
    var _whitespaceControl = require("./whitespace-control");
    var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
    var _helpers = require("./helpers");
    var Helpers = _interopRequireWildcard(_helpers);
    var _utils = require("../utils");
    exports.parser = _parser2["default"];
    var yy = {};
    _utils.extend(yy, Helpers);

    function parse(input, options) {
      if (input.type === "Program") {
        return input
      }
      _parser2["default"].yy = yy;
      yy.locInfo = function(locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo)
      };
      var strip = new _whitespaceControl2["default"](options);
      return strip.accept(_parser2["default"].parse(input))
    }
  }, {
    "../utils": 31,
    "./helpers": 10,
    "./parser": 12,
    "./whitespace-control": 15
  }],
  8: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("../utils");
    var SourceNode = undefined;
    try {
      if (typeof define !== "function" || !define.amd) {
        var SourceMap = require("source-map");
        SourceNode = SourceMap.SourceNode
      }
    } catch (err) {}
    if (!SourceNode) {
      SourceNode = function(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) {
          this.add(chunks)
        }
      };
      SourceNode.prototype = {
        add: function add(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("")
          }
          this.src += chunks
        },
        prepend: function prepend(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("")
          }
          this.src = chunks + this.src
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
          return {
            code: this.toString()
          }
        },
        toString: function toString() {
          return this.src
        }
      }
    }

    function castChunk(chunk, codeGen, loc) {
      if (_utils.isArray(chunk)) {
        var ret = [];
        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc))
        }
        return ret
      } else if (typeof chunk === "boolean" || typeof chunk === "number") {
        return chunk + ""
      }
      return chunk
    }

    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = []
    }
    CodeGen.prototype = {
      isEmpty: function isEmpty() {
        return !this.source.length
      },
      prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc))
      },
      push: function push(source, loc) {
        this.source.push(this.wrap(source, loc))
      },
      merge: function merge() {
        var source = this.empty();
        this.each(function(line) {
          source.add(["  ", line, "\n"])
        });
        return source
      },
      each: function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i])
        }
      },
      empty: function empty() {
        var loc = this.currentLocation || {
          start: {}
        };
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile)
      },
      wrap: function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {
          start: {}
        } : arguments[1];
        if (chunk instanceof SourceNode) {
          return chunk
        }
        chunk = castChunk(chunk, this, loc);
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk)
      },
      functionCall: function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([fn, type ? "." + type + "(" : "(", params, ")"])
      },
      quotedString: function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
      },
      objectLiteral: function objectLiteral(obj) {
        var pairs = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = castChunk(obj[key], this);
            if (value !== "undefined") {
              pairs.push([this.quotedString(key), ":", value])
            }
          }
        }
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret
      },
      generateList: function generateList(entries) {
        var ret = this.empty();
        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(",")
          }
          ret.add(castChunk(entries[i], this))
        }
        return ret
      },
      generateArray: function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend("[");
        ret.add("]");
        return ret
      }
    };
    exports["default"] = CodeGen;
    module.exports = exports["default"]
  }, {
    "../utils": 31,
    "source-map": 46
  }],
  9: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Compiler = Compiler;
    exports.precompile = precompile;
    exports.compile = compile;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require("../utils");
    var _ast = require("./ast");
    var _ast2 = _interopRequireDefault(_ast);
    var slice = [].slice;

    function Compiler() {}
    Compiler.prototype = {
      compiler: Compiler,
      equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false
        }
        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false
          }
        }
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false
          }
        }
        return true
      },
      guid: 0,
      compile: function compile(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        var knownHelpers = options.knownHelpers;
        options.knownHelpers = {
          helperMissing: true,
          blockHelperMissing: true,
          each: true,
          if: true,
          unless: true,
          with: true,
          log: true,
          lookup: true
        };
        if (knownHelpers) {
          for (var _name in knownHelpers) {
            this.options.knownHelpers[_name] = knownHelpers[_name]
          }
        }
        return this.accept(program)
      },
      compileProgram: function compileProgram(program) {
        var childCompiler = new this.compiler,
          result = childCompiler.compile(program, this.options),
          guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid
      },
      accept: function accept(node) {
        if (!this[node.type]) {
          throw new _exception2["default"]("Unknown type: " + node.type, node)
        }
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret
      },
      Program: function Program(program) {
        this.options.blockParams.unshift(program.blockParams);
        var body = program.body,
          bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i])
        }
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;
        return this
      },
      BlockStatement: function BlockStatement(block) {
        transformLiteralToPath(block);
        var program = block.program,
          inverse = block.inverse;
        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);
        var type = this.classifySexpr(block);
        if (type === "helper") {
          this.helperSexpr(block, program, inverse)
        } else if (type === "simple") {
          this.simpleSexpr(block);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("blockValue", block.path.original)
        } else {
          this.ambiguousSexpr(block, program, inverse);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("ambiguousBlockValue")
        }
        this.opcode("append")
      },
      DecoratorBlock: function DecoratorBlock(decorator) {
        var program = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program, undefined),
          path = decorator.path;
        this.useDecorators = true;
        this.opcode("registerDecorator", params.length, path.original)
      },
      PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;
        var program = partial.program;
        if (program) {
          program = this.compileProgram(partial.program)
        }
        var params = partial.params;
        if (params.length > 1) {
          throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial)
        } else if (!params.length) {
          if (this.options.explicitPartialContext) {
            this.opcode("pushLiteral", "undefined")
          } else {
            params.push({
              type: "PathExpression",
              parts: [],
              depth: 0
            })
          }
        }
        var partialName = partial.name.original,
          isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) {
          this.accept(partial.name)
        }
        this.setupFullMustacheParams(partial, program, undefined, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
          this.opcode("appendContent", indent);
          indent = ""
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append")
      },
      PartialBlockStatement: function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock)
      },
      MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        if (mustache.escaped && !this.options.noEscape) {
          this.opcode("appendEscaped")
        } else {
          this.opcode("append")
        }
      },
      Decorator: function Decorator(decorator) {
        this.DecoratorBlock(decorator)
      },
      ContentStatement: function ContentStatement(content) {
        if (content.value) {
          this.opcode("appendContent", content.value)
        }
      },
      CommentStatement: function CommentStatement() {},
      SubExpression: function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") {
          this.simpleSexpr(sexpr)
        } else if (type === "helper") {
          this.helperSexpr(sexpr)
        } else {
          this.ambiguousSexpr(sexpr)
        }
      },
      ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
        var path = sexpr.path,
          name = path.parts[0],
          isBlock = program != null || inverse != null;
        this.opcode("getContext", path.depth);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        path.strict = true;
        this.accept(path);
        this.opcode("invokeAmbiguous", name, isBlock)
      },
      simpleSexpr: function simpleSexpr(sexpr) {
        var path = sexpr.path;
        path.strict = true;
        this.accept(path);
        this.opcode("resolvePossibleLambda")
      },
      helperSexpr: function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse),
          path = sexpr.path,
          name = path.parts[0];
        if (this.options.knownHelpers[name]) {
          this.opcode("invokeKnownHelper", params.length, name)
        } else if (this.options.knownHelpersOnly) {
          throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr)
        } else {
          path.strict = true;
          path.falsy = true;
          this.accept(path);
          this.opcode("invokeHelper", params.length, path.original, _ast2["default"].helpers.simpleId(path))
        }
      },
      PathExpression: function PathExpression(path) {
        this.addDepth(path.depth);
        this.opcode("getContext", path.depth);
        var name = path.parts[0],
          scoped = _ast2["default"].helpers.scopedId(path),
          blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) {
          this.opcode("lookupBlockParam", blockParamId, path.parts)
        } else if (!name) {
          this.opcode("pushContext")
        } else if (path.data) {
          this.options.data = true;
          this.opcode("lookupData", path.depth, path.parts, path.strict)
        } else {
          this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped)
        }
      },
      StringLiteral: function StringLiteral(string) {
        this.opcode("pushString", string.value)
      },
      NumberLiteral: function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value)
      },
      BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value)
      },
      UndefinedLiteral: function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined")
      },
      NullLiteral: function NullLiteral() {
        this.opcode("pushLiteral", "null")
      },
      Hash: function Hash(hash) {
        var pairs = hash.pairs,
          i = 0,
          l = pairs.length;
        this.opcode("pushHash");
        for (; i < l; i++) {
          this.pushParam(pairs[i].value)
        }
        while (i--) {
          this.opcode("assignToHash", pairs[i].key)
        }
        this.opcode("popHash")
      },
      opcode: function opcode(name) {
        this.opcodes.push({
          opcode: name,
          args: slice.call(arguments, 1),
          loc: this.sourceNode[0].loc
        })
      },
      addDepth: function addDepth(depth) {
        if (!depth) {
          return
        }
        this.useDepths = true
      },
      classifySexpr: function classifySexpr(sexpr) {
        var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
        var isEligible = !isBlockParam && (isHelper || isSimple);
        if (isEligible && !isHelper) {
          var _name2 = sexpr.path.parts[0],
            options = this.options;
          if (options.knownHelpers[_name2]) {
            isHelper = true
          } else if (options.knownHelpersOnly) {
            isEligible = false
          }
        }
        if (isHelper) {
          return "helper"
        } else if (isEligible) {
          return "ambiguous"
        } else {
          return "simple"
        }
      },
      pushParams: function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i])
        }
      },
      pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")
          }
          if (val.depth) {
            this.addDepth(val.depth)
          }
          this.opcode("getContext", val.depth || 0);
          this.opcode("pushStringParam", value, val.type);
          if (val.type === "SubExpression") {
            this.accept(val)
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = undefined;
            if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0])
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild)
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")
              }
              this.opcode("pushId", val.type, value)
            }
          }
          this.accept(val)
        }
      },
      setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        if (sexpr.hash) {
          this.accept(sexpr.hash)
        } else {
          this.opcode("emptyHash", omitEmpty)
        }
        return params
      },
      blockParamIndex: function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth],
            param = blockParams && _utils.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [depth, param]
          }
        }
      }
    };

    function precompile(input, options, env) {
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input)
      }
      options = options || {};
      if (!("data" in options)) {
        options.data = true
      }
      if (options.compat) {
        options.useDepths = true
      }
      var ast = env.parse(input, options),
        environment = (new env.Compiler).compile(ast, options);
      return (new env.JavaScriptCompiler).compile(environment, options)
    }

    function compile(input, options, env) {
      if (options === undefined) options = {};
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input)
      }
      options = _utils.extend({}, options);
      if (!("data" in options)) {
        options.data = true
      }
      if (options.compat) {
        options.useDepths = true
      }
      var compiled = undefined;

      function compileInput() {
        var ast = env.parse(input, options),
          environment = (new env.Compiler).compile(ast, options),
          templateSpec = (new env.JavaScriptCompiler).compile(environment, options, undefined, true);
        return env.template(templateSpec)
      }

      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled.call(this, context, execOptions)
      }
      ret._setup = function(setupOptions) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled._setup(setupOptions)
      };
      ret._child = function(i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput()
        }
        return compiled._child(i, data, blockParams, depths)
      };
      return ret
    }

    function argEquals(a, b) {
      if (a === b) {
        return true
      }
      if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b[i])) {
            return false
          }
        }
        return true
      }
    }

    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        sexpr.path = {
          type: "PathExpression",
          data: false,
          depth: 0,
          parts: [literal.original + ""],
          original: literal.original + "",
          loc: literal.loc
        }
      }
    }
  }, {
    "../exception": 18,
    "../utils": 31,
    "./ast": 6
  }],
  10: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.SourceLocation = SourceLocation;
    exports.id = id;
    exports.stripFlags = stripFlags;
    exports.stripComment = stripComment;
    exports.preparePath = preparePath;
    exports.prepareMustache = prepareMustache;
    exports.prepareRawBlock = prepareRawBlock;
    exports.prepareBlock = prepareBlock;
    exports.prepareProgram = prepareProgram;
    exports.preparePartialBlock = preparePartialBlock;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);

    function validateClose(open, close) {
      close = close.path ? close.path.original : close;
      if (open.path.original !== close) {
        var errorNode = {
          loc: open.path.loc
        };
        throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode)
      }
    }

    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      }
    }

    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substr(1, token.length - 2)
      } else {
        return token
      }
    }

    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      }
    }

    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "")
    }

    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);
      var original = data ? "@" : "",
        dig = [],
        depth = 0;
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part,
          isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new _exception2["default"]("Invalid path: " + original, {
              loc: loc
            })
          } else if (part === "..") {
            depth++
          }
        } else {
          dig.push(part)
        }
      }
      return {
        type: "PathExpression",
        data: data,
        depth: depth,
        parts: dig,
        original: original,
        loc: loc
      }
    }

    function prepareMustache(path, params, hash, open, strip, locInfo) {
      var escapeFlag = open.charAt(3) || open.charAt(2),
        escaped = escapeFlag !== "{" && escapeFlag !== "&";
      var decorator = /\*/.test(open);
      return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path: path,
        params: params,
        hash: hash,
        escaped: escaped,
        strip: strip,
        loc: this.locInfo(locInfo)
      }
    }

    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);
      locInfo = this.locInfo(locInfo);
      var program = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
      };
      return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program: program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      }
    }

    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close)
      }
      var decorator = /\*/.test(openBlock.open);
      program.blockParams = openBlock.blockParams;
      var inverse = undefined,
        inverseStrip = undefined;
      if (inverseAndProgram) {
        if (decorator) {
          throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram)
        }
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip
        }
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program
      }
      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted
      }
      return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program: program,
        inverse: inverse,
        openStrip: openBlock.strip,
        inverseStrip: inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      }
    }

    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc,
          lastLoc = statements[statements.length - 1].loc;
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          }
        }
      }
      return {
        type: "Program",
        body: statements,
        strip: {},
        loc: loc
      }
    }

    function preparePartialBlock(open, program, close, locInfo) {
      validateClose(open, close);
      return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program: program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      }
    }
  }, {
    "../exception": 18
  }],
  11: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _base = require("../base");
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require("../utils");
    var _codeGen = require("./code-gen");
    var _codeGen2 = _interopRequireDefault(_codeGen);

    function Literal(value) {
      this.value = value
    }

    function JavaScriptCompiler() {}
    JavaScriptCompiler.prototype = {
      nameLookup: function nameLookup(parent, name) {
        if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
          return [parent, ".", name]
        } else {
          return [parent, "[", JSON.stringify(name), "]"]
        }
      },
      depthedLookup: function depthedLookup(name) {
        return [this.aliasable("container.lookup"), '(depths, "', name, '")']
      },
      compilerInfo: function compilerInfo() {
        var revision = _base.COMPILER_REVISION,
          versions = _base.REVISION_CHANGES[revision];
        return [revision, versions]
      },
      appendToBuffer: function appendToBuffer(source, location, explicit) {
        if (!_utils.isArray(source)) {
          source = [source]
        }
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) {
          return ["return ", source, ";"]
        } else if (explicit) {
          return ["buffer += ", source, ";"]
        } else {
          source.appendToBuffer = true;
          return source
        }
      },
      initializeBuffer: function initializeBuffer() {
        return this.quotedString("")
      },
      compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          decorators: [],
          programs: [],
          environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = {
          list: []
        };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes,
          opcode = undefined,
          firstLoc = undefined,
          i = undefined,
          l = undefined;
        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];
          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args)
        }
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _exception2["default"]("Compile completed with content left on stack")
        }
        if (!this.decorators.isEmpty()) {
          this.useDecorators = true;
          this.decorators.prepend("var decorators = container.decorators;\n");
          this.decorators.push("return fn;");
          if (asObject) {
            this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()])
          } else {
            this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
            this.decorators.push("}\n");
            this.decorators = this.decorators.merge()
          }
        } else {
          this.decorators = undefined
        }
        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn
          };
          if (this.decorators) {
            ret.main_d = this.decorators;
            ret.useDecorators = true
          }
          var _context = this.context;
          var programs = _context.programs;
          var decorators = _context.decorators;
          for (i = 0, l = programs.length; i < l; i++) {
            if (programs[i]) {
              ret[i] = programs[i];
              if (decorators[i]) {
                ret[i + "_d"] = decorators[i];
                ret.useDecorators = true
              }
            }
          }
          if (this.environment.usePartial) {
            ret.usePartial = true
          }
          if (this.options.data) {
            ret.useData = true
          }
          if (this.useDepths) {
            ret.useDepths = true
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true
          }
          if (this.options.compat) {
            ret.compat = true
          }
          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);
            this.source.currentLocation = {
              start: {
                line: 1,
                column: 0
              }
            };
            ret = this.objectLiteral(ret);
            if (options.srcName) {
              ret = ret.toStringWithSourceMap({
                file: options.destName
              });
              ret.map = ret.map && ret.map.toString()
            } else {
              ret = ret.toString()
            }
          } else {
            ret.compilerOptions = this.options
          }
          return ret
        } else {
          return fn
        }
      },
      preamble: function preamble() {
        this.lastContext = 0;
        this.source = new _codeGen2["default"](this.options.srcName);
        this.decorators = new _codeGen2["default"](this.options.srcName)
      },
      createFunctionContext: function createFunctionContext(asObject) {
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ", " + locals.join(", ")
        }
        var aliasCount = 0;
        for (var alias in this.aliases) {
          var node = this.aliases[alias];
          if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
            varDeclarations += ", alias" + ++aliasCount + "=" + alias;
            node.children[0] = "alias" + aliasCount
          }
        }
        var params = ["container", "depth0", "helpers", "partials", "data"];
        if (this.useBlockParams || this.useDepths) {
          params.push("blockParams")
        }
        if (this.useDepths) {
          params.push("depths")
        }
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
          params.push(source);
          return Function.apply(this, params)
        } else {
          return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"])
        }
      },
      mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple,
          appendOnly = !this.forceBuffer,
          appendFirst = undefined,
          sourceSeen = undefined,
          bufferStart = undefined,
          bufferEnd = undefined;
        this.source.each(function(line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend("  + ")
            } else {
              bufferStart = line
            }
            bufferEnd = line
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true
              } else {
                bufferStart.prepend("buffer += ")
              }
              bufferEnd.add(";");
              bufferStart = bufferEnd = undefined
            }
            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false
            }
          }
        });
        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend("return ");
            bufferEnd.add(";")
          } else if (!sourceSeen) {
            this.source.push('return "";')
          }
        } else {
          varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
          if (bufferStart) {
            bufferStart.prepend("return buffer + ");
            bufferEnd.add(";")
          } else {
            this.source.push("return buffer;")
          }
        }
        if (varDeclarations) {
          this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"))
        }
        return this.source.merge()
      },
      blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"),
          params = [this.contextName(0)];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params))
      },
      ambiguousBlockValue: function ambiguousBlockValue() {
        var blockHelperMissing = this.aliasable("helpers.blockHelperMissing"),
          params = [this.contextName(0)];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"])
      },
      appendContent: function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content
        } else {
          this.pendingLocation = this.source.currentLocation
        }
        this.pendingContent = content
      },
      append: function append() {
        if (this.isInline()) {
          this.replaceStack(function(current) {
            return [" != null ? ", current, ' : ""']
          });
          this.pushSource(this.appendToBuffer(this.popStack()))
        } else {
          var local = this.popStack();
          this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, undefined, true), " }"]);
          if (this.environment.isSimple) {
            this.pushSource(["else { ", this.appendToBuffer("''", undefined, true), " }"])
          }
        }
      },
      appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
      },
      getContext: function getContext(depth) {
        this.lastContext = depth
      },
      pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext))
      },
      lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) {
          this.push(this.depthedLookup(parts[i++]))
        } else {
          this.pushContext()
        }
        this.resolvePath("context", parts, i, falsy, strict)
      },
      lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
        this.resolvePath("context", parts, 1)
      },
      lookupData: function lookupData(depth, parts, strict) {
        if (!depth) {
          this.pushStackLiteral("data")
        } else {
          this.pushStackLiteral("container.data(data, " + depth + ")")
        }
        this.resolvePath("data", parts, 0, true, strict)
      },
      resolvePath: function resolvePath(type, parts, i, falsy, strict) {
        var _this = this;
        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict && strict, this, parts, type));
          return
        }
        var len = parts.length;
        for (; i < len; i++) {
          this.replaceStack(function(current) {
            var lookup = _this.nameLookup(current, parts[i], type);
            if (!falsy) {
              return [" != null ? ", lookup, " : ", current]
            } else {
              return [" && ", lookup]
            }
          })
        }
      },
      resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
      },
      pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        if (type !== "SubExpression") {
          if (typeof string === "string") {
            this.pushString(string)
          } else {
            this.pushStackLiteral(string)
          }
        }
      },
      emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push("{}")
        }
        if (this.stringParams) {
          this.push("{}");
          this.push("{}")
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}")
      },
      pushHash: function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash)
        }
        this.hash = {
          values: [],
          types: [],
          contexts: [],
          ids: []
        }
      },
      popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids))
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types))
        }
        this.push(this.objectLiteral(hash.values))
      },
      pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string))
      },
      pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value)
      },
      pushProgram: function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid))
        } else {
          this.pushStackLiteral(null)
        }
      },
      registerDecorator: function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup("decorators", name, "decorator"),
          options = this.setupHelperArgs(name, paramSize);
        this.decorators.push(["fn = ", this.decorators.functionCall(foundDecorator, "", ["fn", "props", "container", options]), " || fn;"])
      },
      invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(),
          helper = this.setupHelper(paramSize, name),
          simple = isSimple ? [helper.name, " || "] : "";
        var lookup = ["("].concat(simple, nonHelper);
        if (!this.options.strict) {
          lookup.push(" || ", this.aliasable("helpers.helperMissing"))
        }
        lookup.push(")");
        this.push(this.source.functionCall(lookup, "call", helper.callParams))
      },
      invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams))
      },
      invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
        if (!this.options.strict) {
          lookup[0] = "(helper = ";
          lookup.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))
        }
        this.push(["(", lookup, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"])
      },
      invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [],
          options = this.setupParams(name, 1, params);
        if (isDynamic) {
          name = this.popStack();
          delete options.name
        }
        if (indent) {
          options.indent = JSON.stringify(indent)
        }
        options.helpers = "helpers";
        options.partials = "partials";
        options.decorators = "container.decorators";
        if (!isDynamic) {
          params.unshift(this.nameLookup("partials", name, "partial"))
        } else {
          params.unshift(name)
        }
        if (this.options.compat) {
          options.depths = "depths"
        }
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("container.invokePartial", "", params))
      },
      assignToHash: function assignToHash(key) {
        var value = this.popStack(),
          context = undefined,
          type = undefined,
          id = undefined;
        if (this.trackIds) {
          id = this.popStack()
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack()
        }
        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context
        }
        if (type) {
          hash.types[key] = type
        }
        if (id) {
          hash.ids[key] = id
        }
        hash.values[key] = value
      },
      pushId: function pushId(type, name, child) {
        if (type === "BlockParam") {
          this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""))
        } else if (type === "PathExpression") {
          this.pushString(name)
        } else if (type === "SubExpression") {
          this.pushStackLiteral("true")
        } else {
          this.pushStackLiteral("null")
        }
      },
      compiler: JavaScriptCompiler,
      compileChildren: function compileChildren(environment, options) {
        var children = environment.children,
          child = undefined,
          compiler = undefined;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler;
          var existing = this.matchExistingProgram(child);
          if (existing == null) {
            this.context.programs.push("");
            var index = this.context.programs.length;
            child.index = index;
            child.name = "program" + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.decorators[index] = compiler.decorators;
            this.context.environments[index] = child;
            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
            child.useDepths = this.useDepths;
            child.useBlockParams = this.useBlockParams
          } else {
            child.index = existing.index;
            child.name = "program" + existing.index;
            this.useDepths = this.useDepths || existing.useDepths;
            this.useBlockParams = this.useBlockParams || existing.useBlockParams
          }
        }
      },
      matchExistingProgram: function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return environment
          }
        }
      },
      programExpression: function programExpression(guid) {
        var child = this.environment.children[guid],
          programParams = [child.index, "data", child.blockParams];
        if (this.useBlockParams || this.useDepths) {
          programParams.push("blockParams")
        }
        if (this.useDepths) {
          programParams.push("depths")
        }
        return "container.program(" + programParams.join(", ") + ")"
      },
      useRegister: function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name)
        }
      },
      push: function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr)
        }
        this.inlineStack.push(expr);
        return expr
      },
      pushStackLiteral: function pushStackLiteral(item) {
        this.push(new Literal(item))
      },
      pushSource: function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = undefined
        }
        if (source) {
          this.source.push(source)
        }
      },
      replaceStack: function replaceStack(callback) {
        var prefix = ["("],
          stack = undefined,
          createdStack = undefined,
          usedLiteral = undefined;
        if (!this.isInline()) {
          throw new _exception2["default"]("replaceStack on non-inline")
        }
        var top = this.popStack(true);
        if (top instanceof Literal) {
          stack = [top.value];
          prefix = ["(", stack];
          usedLiteral = true
        } else {
          createdStack = true;
          var _name = this.incrStack();
          prefix = ["((", this.push(_name), " = ", top, ")"];
          stack = this.topStack()
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) {
          this.popStack()
        }
        if (createdStack) {
          this.stackSlot--
        }
        this.push(prefix.concat(item, ")"))
      },
      incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push("stack" + this.stackSlot)
        }
        return this.topStackName()
      },
      topStackName: function topStackName() {
        return "stack" + this.stackSlot
      },
      flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry)
          } else {
            var stack = this.incrStack();
            this.pushSource([stack, " = ", entry, ";"]);
            this.compileStack.push(stack)
          }
        }
      },
      isInline: function isInline() {
        return this.inlineStack.length
      },
      popStack: function popStack(wrapped) {
        var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof Literal) {
          return item.value
        } else {
          if (!inline) {
            if (!this.stackSlot) {
              throw new _exception2["default"]("Invalid stack pop")
            }
            this.stackSlot--
          }
          return item
        }
      },
      topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack,
          item = stack[stack.length - 1];
        if (item instanceof Literal) {
          return item.value
        } else {
          return item
        }
      },
      contextName: function contextName(context) {
        if (this.useDepths && context) {
          return "depths[" + context + "]"
        } else {
          return "depth" + context
        }
      },
      quotedString: function quotedString(str) {
        return this.source.quotedString(str)
      },
      objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj)
      },
      aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret
      },
      setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [],
          paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper"),
          callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
        return {
          params: params,
          paramsInit: paramsInit,
          name: foundHelper,
          callParams: [callContext].concat(params)
        }
      },
      setupParams: function setupParams(helper, paramSize, params) {
        var options = {},
          contexts = [],
          types = [],
          ids = [],
          objectArgs = !params,
          param = undefined;
        if (objectArgs) {
          params = []
        }
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) {
          options.hashIds = this.popStack()
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack()
        }
        var inverse = this.popStack(),
          program = this.popStack();
        if (program || inverse) {
          options.fn = program || "container.noop";
          options.inverse = inverse || "container.noop"
        }
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;
          if (this.trackIds) {
            ids[i] = this.popStack()
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack()
          }
        }
        if (objectArgs) {
          options.args = this.source.generateArray(params)
        }
        if (this.trackIds) {
          options.ids = this.source.generateArray(ids)
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts)
        }
        if (this.options.data) {
          options.data = "data"
        }
        if (this.useBlockParams) {
          options.blockParams = "blockParams"
        }
        return options
      },
      setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister("options");
          params.push("options");
          return ["options=", options]
        } else if (params) {
          params.push(options);
          return ""
        } else {
          return options
        }
      }
    };
    (function() {
      var reservedWords = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield await" + " null true false").split(" ");
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true
      }
    })();
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)
    };

    function strictLookup(requireTerminal, compiler, parts, type) {
      var stack = compiler.popStack(),
        i = 0,
        len = parts.length;
      if (requireTerminal) {
        len--
      }
      for (; i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type)
      }
      if (requireTerminal) {
        return [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[i]), ")"]
      } else {
        return stack
      }
    }
    exports["default"] = JavaScriptCompiler;
    module.exports = exports["default"]
  }, {
    "../base": 5,
    "../exception": 18,
    "../utils": 31,
    "./code-gen": 8
  }],
  12: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var handlebars = function() {
      var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
          error: 2,
          root: 3,
          program: 4,
          EOF: 5,
          program_repetition0: 6,
          statement: 7,
          mustache: 8,
          block: 9,
          rawBlock: 10,
          partial: 11,
          partialBlock: 12,
          content: 13,
          COMMENT: 14,
          CONTENT: 15,
          openRawBlock: 16,
          rawBlock_repetition_plus0: 17,
          END_RAW_BLOCK: 18,
          OPEN_RAW_BLOCK: 19,
          helperName: 20,
          openRawBlock_repetition0: 21,
          openRawBlock_option0: 22,
          CLOSE_RAW_BLOCK: 23,
          openBlock: 24,
          block_option0: 25,
          closeBlock: 26,
          openInverse: 27,
          block_option1: 28,
          OPEN_BLOCK: 29,
          openBlock_repetition0: 30,
          openBlock_option0: 31,
          openBlock_option1: 32,
          CLOSE: 33,
          OPEN_INVERSE: 34,
          openInverse_repetition0: 35,
          openInverse_option0: 36,
          openInverse_option1: 37,
          openInverseChain: 38,
          OPEN_INVERSE_CHAIN: 39,
          openInverseChain_repetition0: 40,
          openInverseChain_option0: 41,
          openInverseChain_option1: 42,
          inverseAndProgram: 43,
          INVERSE: 44,
          inverseChain: 45,
          inverseChain_option0: 46,
          OPEN_ENDBLOCK: 47,
          OPEN: 48,
          mustache_repetition0: 49,
          mustache_option0: 50,
          OPEN_UNESCAPED: 51,
          mustache_repetition1: 52,
          mustache_option1: 53,
          CLOSE_UNESCAPED: 54,
          OPEN_PARTIAL: 55,
          partialName: 56,
          partial_repetition0: 57,
          partial_option0: 58,
          openPartialBlock: 59,
          OPEN_PARTIAL_BLOCK: 60,
          openPartialBlock_repetition0: 61,
          openPartialBlock_option0: 62,
          param: 63,
          sexpr: 64,
          OPEN_SEXPR: 65,
          sexpr_repetition0: 66,
          sexpr_option0: 67,
          CLOSE_SEXPR: 68,
          hash: 69,
          hash_repetition_plus0: 70,
          hashSegment: 71,
          ID: 72,
          EQUALS: 73,
          blockParams: 74,
          OPEN_BLOCK_PARAMS: 75,
          blockParams_repetition_plus0: 76,
          CLOSE_BLOCK_PARAMS: 77,
          path: 78,
          dataName: 79,
          STRING: 80,
          NUMBER: 81,
          BOOLEAN: 82,
          UNDEFINED: 83,
          NULL: 84,
          DATA: 85,
          pathSegments: 86,
          SEP: 87,
          $accept: 0,
          $end: 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          14: "COMMENT",
          15: "CONTENT",
          18: "END_RAW_BLOCK",
          19: "OPEN_RAW_BLOCK",
          23: "CLOSE_RAW_BLOCK",
          29: "OPEN_BLOCK",
          33: "CLOSE",
          34: "OPEN_INVERSE",
          39: "OPEN_INVERSE_CHAIN",
          44: "INVERSE",
          47: "OPEN_ENDBLOCK",
          48: "OPEN",
          51: "OPEN_UNESCAPED",
          54: "CLOSE_UNESCAPED",
          55: "OPEN_PARTIAL",
          60: "OPEN_PARTIAL_BLOCK",
          65: "OPEN_SEXPR",
          68: "CLOSE_SEXPR",
          72: "ID",
          73: "EQUALS",
          75: "OPEN_BLOCK_PARAMS",
          77: "CLOSE_BLOCK_PARAMS",
          80: "STRING",
          81: "NUMBER",
          82: "BOOLEAN",
          83: "UNDEFINED",
          84: "NULL",
          85: "DATA",
          87: "SEP"
        },
        productions_: [0, [3, 2],
          [4, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [7, 1],
          [13, 1],
          [10, 3],
          [16, 5],
          [9, 4],
          [9, 4],
          [24, 6],
          [27, 6],
          [38, 6],
          [43, 2],
          [45, 3],
          [45, 1],
          [26, 3],
          [8, 5],
          [8, 5],
          [11, 5],
          [12, 3],
          [59, 5],
          [63, 1],
          [63, 1],
          [64, 5],
          [69, 1],
          [71, 3],
          [74, 3],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [20, 1],
          [56, 1],
          [56, 1],
          [79, 2],
          [78, 1],
          [86, 3],
          [86, 1],
          [6, 0],
          [6, 2],
          [17, 1],
          [17, 2],
          [21, 0],
          [21, 2],
          [22, 0],
          [22, 1],
          [25, 0],
          [25, 1],
          [28, 0],
          [28, 1],
          [30, 0],
          [30, 2],
          [31, 0],
          [31, 1],
          [32, 0],
          [32, 1],
          [35, 0],
          [35, 2],
          [36, 0],
          [36, 1],
          [37, 0],
          [37, 1],
          [40, 0],
          [40, 2],
          [41, 0],
          [41, 1],
          [42, 0],
          [42, 1],
          [46, 0],
          [46, 1],
          [49, 0],
          [49, 2],
          [50, 0],
          [50, 1],
          [52, 0],
          [52, 2],
          [53, 0],
          [53, 1],
          [57, 0],
          [57, 2],
          [58, 0],
          [58, 1],
          [61, 0],
          [61, 2],
          [62, 0],
          [62, 1],
          [66, 0],
          [66, 2],
          [67, 0],
          [67, 1],
          [70, 1],
          [70, 2],
          [76, 1],
          [76, 2]
        ],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
              this.$ = $$[$0];
              break;
            case 4:
              this.$ = $$[$0];
              break;
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = $$[$0];
              break;
            case 7:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1]
              };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = {
                open: $$[$0 - 5],
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 16:
              this.$ = {
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 17:
              this.$ = {
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 18:
              this.$ = {
                strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
                program: $$[$0]
              };
              break;
            case 19:
              var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
              program.chained = true;
              this.$ = {
                strip: $$[$0 - 2].strip,
                program: program,
                chain: true
              };
              break;
            case 20:
              this.$ = $$[$0];
              break;
            case 21:
              this.$ = {
                path: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 2], $$[$0])
              };
              break;
            case 22:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 4], $$[$0])
              };
              break;
            case 27:
              this.$ = $$[$0];
              break;
            case 28:
              this.$ = $$[$0];
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = {
                type: "Hash",
                pairs: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 31:
              this.$ = {
                type: "HashPair",
                key: yy.id($$[$0 - 2]),
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 33:
              this.$ = $$[$0];
              break;
            case 34:
              this.$ = $$[$0];
              break;
            case 35:
              this.$ = {
                type: "StringLiteral",
                value: $$[$0],
                original: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 36:
              this.$ = {
                type: "NumberLiteral",
                value: Number($$[$0]),
                original: Number($$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 37:
              this.$ = {
                type: "BooleanLiteral",
                value: $$[$0] === "true",
                original: $$[$0] === "true",
                loc: yy.locInfo(this._$)
              };
              break;
            case 38:
              this.$ = {
                type: "UndefinedLiteral",
                original: undefined,
                value: undefined,
                loc: yy.locInfo(this._$)
              };
              break;
            case 39:
              this.$ = {
                type: "NullLiteral",
                original: null,
                value: null,
                loc: yy.locInfo(this._$)
              };
              break;
            case 40:
              this.$ = $$[$0];
              break;
            case 41:
              this.$ = $$[$0];
              break;
            case 42:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 43:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 44:
              $$[$0 - 2].push({
                part: yy.id($$[$0]),
                original: $$[$0],
                separator: $$[$0 - 1]
              });
              this.$ = $$[$0 - 2];
              break;
            case 45:
              this.$ = [{
                part: yy.id($$[$0]),
                original: $$[$0]
              }];
              break;
            case 46:
              this.$ = [];
              break;
            case 47:
              $$[$0 - 1].push($$[$0]);
              break;
            case 48:
              this.$ = [$$[$0]];
              break;
            case 49:
              $$[$0 - 1].push($$[$0]);
              break;
            case 50:
              this.$ = [];
              break;
            case 51:
              $$[$0 - 1].push($$[$0]);
              break;
            case 58:
              this.$ = [];
              break;
            case 59:
              $$[$0 - 1].push($$[$0]);
              break;
            case 64:
              this.$ = [];
              break;
            case 65:
              $$[$0 - 1].push($$[$0]);
              break;
            case 70:
              this.$ = [];
              break;
            case 71:
              $$[$0 - 1].push($$[$0]);
              break;
            case 78:
              this.$ = [];
              break;
            case 79:
              $$[$0 - 1].push($$[$0]);
              break;
            case 82:
              this.$ = [];
              break;
            case 83:
              $$[$0 - 1].push($$[$0]);
              break;
            case 86:
              this.$ = [];
              break;
            case 87:
              $$[$0 - 1].push($$[$0]);
              break;
            case 90:
              this.$ = [];
              break;
            case 91:
              $$[$0 - 1].push($$[$0]);
              break;
            case 94:
              this.$ = [];
              break;
            case 95:
              $$[$0 - 1].push($$[$0]);
              break;
            case 98:
              this.$ = [$$[$0]];
              break;
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 100:
              this.$ = [$$[$0]];
              break;
            case 101:
              $$[$0 - 1].push($$[$0]);
              break
          }
        },
        table: [{
          3: 1,
          4: 2,
          5: [2, 46],
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          1: [3]
        }, {
          5: [1, 4]
        }, {
          5: [2, 2],
          7: 5,
          8: 6,
          9: 7,
          10: 8,
          11: 9,
          12: 10,
          13: 11,
          14: [1, 12],
          15: [1, 20],
          16: 17,
          19: [1, 23],
          24: 15,
          27: 16,
          29: [1, 21],
          34: [1, 22],
          39: [2, 2],
          44: [2, 2],
          47: [2, 2],
          48: [1, 13],
          51: [1, 14],
          55: [1, 18],
          59: 19,
          60: [1, 24]
        }, {
          1: [2, 1]
        }, {
          5: [2, 47],
          14: [2, 47],
          15: [2, 47],
          19: [2, 47],
          29: [2, 47],
          34: [2, 47],
          39: [2, 47],
          44: [2, 47],
          47: [2, 47],
          48: [2, 47],
          51: [2, 47],
          55: [2, 47],
          60: [2, 47]
        }, {
          5: [2, 3],
          14: [2, 3],
          15: [2, 3],
          19: [2, 3],
          29: [2, 3],
          34: [2, 3],
          39: [2, 3],
          44: [2, 3],
          47: [2, 3],
          48: [2, 3],
          51: [2, 3],
          55: [2, 3],
          60: [2, 3]
        }, {
          5: [2, 4],
          14: [2, 4],
          15: [2, 4],
          19: [2, 4],
          29: [2, 4],
          34: [2, 4],
          39: [2, 4],
          44: [2, 4],
          47: [2, 4],
          48: [2, 4],
          51: [2, 4],
          55: [2, 4],
          60: [2, 4]
        }, {
          5: [2, 5],
          14: [2, 5],
          15: [2, 5],
          19: [2, 5],
          29: [2, 5],
          34: [2, 5],
          39: [2, 5],
          44: [2, 5],
          47: [2, 5],
          48: [2, 5],
          51: [2, 5],
          55: [2, 5],
          60: [2, 5]
        }, {
          5: [2, 6],
          14: [2, 6],
          15: [2, 6],
          19: [2, 6],
          29: [2, 6],
          34: [2, 6],
          39: [2, 6],
          44: [2, 6],
          47: [2, 6],
          48: [2, 6],
          51: [2, 6],
          55: [2, 6],
          60: [2, 6]
        }, {
          5: [2, 7],
          14: [2, 7],
          15: [2, 7],
          19: [2, 7],
          29: [2, 7],
          34: [2, 7],
          39: [2, 7],
          44: [2, 7],
          47: [2, 7],
          48: [2, 7],
          51: [2, 7],
          55: [2, 7],
          60: [2, 7]
        }, {
          5: [2, 8],
          14: [2, 8],
          15: [2, 8],
          19: [2, 8],
          29: [2, 8],
          34: [2, 8],
          39: [2, 8],
          44: [2, 8],
          47: [2, 8],
          48: [2, 8],
          51: [2, 8],
          55: [2, 8],
          60: [2, 8]
        }, {
          5: [2, 9],
          14: [2, 9],
          15: [2, 9],
          19: [2, 9],
          29: [2, 9],
          34: [2, 9],
          39: [2, 9],
          44: [2, 9],
          47: [2, 9],
          48: [2, 9],
          51: [2, 9],
          55: [2, 9],
          60: [2, 9]
        }, {
          20: 25,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 36,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 37,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          39: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          4: 38,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          13: 40,
          15: [1, 20],
          17: 39
        }, {
          20: 42,
          56: 41,
          64: 43,
          65: [1, 44],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 45,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          5: [2, 10],
          14: [2, 10],
          15: [2, 10],
          18: [2, 10],
          19: [2, 10],
          29: [2, 10],
          34: [2, 10],
          39: [2, 10],
          44: [2, 10],
          47: [2, 10],
          48: [2, 10],
          51: [2, 10],
          55: [2, 10],
          60: [2, 10]
        }, {
          20: 46,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 47,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 48,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 42,
          56: 49,
          64: 43,
          65: [1, 44],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [2, 78],
          49: 50,
          65: [2, 78],
          72: [2, 78],
          80: [2, 78],
          81: [2, 78],
          82: [2, 78],
          83: [2, 78],
          84: [2, 78],
          85: [2, 78]
        }, {
          23: [2, 33],
          33: [2, 33],
          54: [2, 33],
          65: [2, 33],
          68: [2, 33],
          72: [2, 33],
          75: [2, 33],
          80: [2, 33],
          81: [2, 33],
          82: [2, 33],
          83: [2, 33],
          84: [2, 33],
          85: [2, 33]
        }, {
          23: [2, 34],
          33: [2, 34],
          54: [2, 34],
          65: [2, 34],
          68: [2, 34],
          72: [2, 34],
          75: [2, 34],
          80: [2, 34],
          81: [2, 34],
          82: [2, 34],
          83: [2, 34],
          84: [2, 34],
          85: [2, 34]
        }, {
          23: [2, 35],
          33: [2, 35],
          54: [2, 35],
          65: [2, 35],
          68: [2, 35],
          72: [2, 35],
          75: [2, 35],
          80: [2, 35],
          81: [2, 35],
          82: [2, 35],
          83: [2, 35],
          84: [2, 35],
          85: [2, 35]
        }, {
          23: [2, 36],
          33: [2, 36],
          54: [2, 36],
          65: [2, 36],
          68: [2, 36],
          72: [2, 36],
          75: [2, 36],
          80: [2, 36],
          81: [2, 36],
          82: [2, 36],
          83: [2, 36],
          84: [2, 36],
          85: [2, 36]
        }, {
          23: [2, 37],
          33: [2, 37],
          54: [2, 37],
          65: [2, 37],
          68: [2, 37],
          72: [2, 37],
          75: [2, 37],
          80: [2, 37],
          81: [2, 37],
          82: [2, 37],
          83: [2, 37],
          84: [2, 37],
          85: [2, 37]
        }, {
          23: [2, 38],
          33: [2, 38],
          54: [2, 38],
          65: [2, 38],
          68: [2, 38],
          72: [2, 38],
          75: [2, 38],
          80: [2, 38],
          81: [2, 38],
          82: [2, 38],
          83: [2, 38],
          84: [2, 38],
          85: [2, 38]
        }, {
          23: [2, 39],
          33: [2, 39],
          54: [2, 39],
          65: [2, 39],
          68: [2, 39],
          72: [2, 39],
          75: [2, 39],
          80: [2, 39],
          81: [2, 39],
          82: [2, 39],
          83: [2, 39],
          84: [2, 39],
          85: [2, 39]
        }, {
          23: [2, 43],
          33: [2, 43],
          54: [2, 43],
          65: [2, 43],
          68: [2, 43],
          72: [2, 43],
          75: [2, 43],
          80: [2, 43],
          81: [2, 43],
          82: [2, 43],
          83: [2, 43],
          84: [2, 43],
          85: [2, 43],
          87: [1, 51]
        }, {
          72: [1, 35],
          86: 52
        }, {
          23: [2, 45],
          33: [2, 45],
          54: [2, 45],
          65: [2, 45],
          68: [2, 45],
          72: [2, 45],
          75: [2, 45],
          80: [2, 45],
          81: [2, 45],
          82: [2, 45],
          83: [2, 45],
          84: [2, 45],
          85: [2, 45],
          87: [2, 45]
        }, {
          52: 53,
          54: [2, 82],
          65: [2, 82],
          72: [2, 82],
          80: [2, 82],
          81: [2, 82],
          82: [2, 82],
          83: [2, 82],
          84: [2, 82],
          85: [2, 82]
        }, {
          25: 54,
          38: 56,
          39: [1, 58],
          43: 57,
          44: [1, 59],
          45: 55,
          47: [2, 54]
        }, {
          28: 60,
          43: 61,
          44: [1, 59],
          47: [2, 56]
        }, {
          13: 63,
          15: [1, 20],
          18: [1, 62]
        }, {
          15: [2, 48],
          18: [2, 48]
        }, {
          33: [2, 86],
          57: 64,
          65: [2, 86],
          72: [2, 86],
          80: [2, 86],
          81: [2, 86],
          82: [2, 86],
          83: [2, 86],
          84: [2, 86],
          85: [2, 86]
        }, {
          33: [2, 40],
          65: [2, 40],
          72: [2, 40],
          80: [2, 40],
          81: [2, 40],
          82: [2, 40],
          83: [2, 40],
          84: [2, 40],
          85: [2, 40]
        }, {
          33: [2, 41],
          65: [2, 41],
          72: [2, 41],
          80: [2, 41],
          81: [2, 41],
          82: [2, 41],
          83: [2, 41],
          84: [2, 41],
          85: [2, 41]
        }, {
          20: 65,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          26: 66,
          47: [1, 67]
        }, {
          30: 68,
          33: [2, 58],
          65: [2, 58],
          72: [2, 58],
          75: [2, 58],
          80: [2, 58],
          81: [2, 58],
          82: [2, 58],
          83: [2, 58],
          84: [2, 58],
          85: [2, 58]
        }, {
          33: [2, 64],
          35: 69,
          65: [2, 64],
          72: [2, 64],
          75: [2, 64],
          80: [2, 64],
          81: [2, 64],
          82: [2, 64],
          83: [2, 64],
          84: [2, 64],
          85: [2, 64]
        }, {
          21: 70,
          23: [2, 50],
          65: [2, 50],
          72: [2, 50],
          80: [2, 50],
          81: [2, 50],
          82: [2, 50],
          83: [2, 50],
          84: [2, 50],
          85: [2, 50]
        }, {
          33: [2, 90],
          61: 71,
          65: [2, 90],
          72: [2, 90],
          80: [2, 90],
          81: [2, 90],
          82: [2, 90],
          83: [2, 90],
          84: [2, 90],
          85: [2, 90]
        }, {
          20: 75,
          33: [2, 80],
          50: 72,
          63: 73,
          64: 76,
          65: [1, 44],
          69: 74,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          72: [1, 80]
        }, {
          23: [2, 42],
          33: [2, 42],
          54: [2, 42],
          65: [2, 42],
          68: [2, 42],
          72: [2, 42],
          75: [2, 42],
          80: [2, 42],
          81: [2, 42],
          82: [2, 42],
          83: [2, 42],
          84: [2, 42],
          85: [2, 42],
          87: [1, 51]
        }, {
          20: 75,
          53: 81,
          54: [2, 84],
          63: 82,
          64: 76,
          65: [1, 44],
          69: 83,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          26: 84,
          47: [1, 67]
        }, {
          47: [2, 55]
        }, {
          4: 85,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          39: [2, 46],
          44: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          47: [2, 20]
        }, {
          20: 86,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          4: 87,
          6: 3,
          14: [2, 46],
          15: [2, 46],
          19: [2, 46],
          29: [2, 46],
          34: [2, 46],
          47: [2, 46],
          48: [2, 46],
          51: [2, 46],
          55: [2, 46],
          60: [2, 46]
        }, {
          26: 88,
          47: [1, 67]
        }, {
          47: [2, 57]
        }, {
          5: [2, 11],
          14: [2, 11],
          15: [2, 11],
          19: [2, 11],
          29: [2, 11],
          34: [2, 11],
          39: [2, 11],
          44: [2, 11],
          47: [2, 11],
          48: [2, 11],
          51: [2, 11],
          55: [2, 11],
          60: [2, 11]
        }, {
          15: [2, 49],
          18: [2, 49]
        }, {
          20: 75,
          33: [2, 88],
          58: 89,
          63: 90,
          64: 76,
          65: [1, 44],
          69: 91,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          65: [2, 94],
          66: 92,
          68: [2, 94],
          72: [2, 94],
          80: [2, 94],
          81: [2, 94],
          82: [2, 94],
          83: [2, 94],
          84: [2, 94],
          85: [2, 94]
        }, {
          5: [2, 25],
          14: [2, 25],
          15: [2, 25],
          19: [2, 25],
          29: [2, 25],
          34: [2, 25],
          39: [2, 25],
          44: [2, 25],
          47: [2, 25],
          48: [2, 25],
          51: [2, 25],
          55: [2, 25],
          60: [2, 25]
        }, {
          20: 93,
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 75,
          31: 94,
          33: [2, 60],
          63: 95,
          64: 76,
          65: [1, 44],
          69: 96,
          70: 77,
          71: 78,
          72: [1, 79],
          75: [2, 60],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 75,
          33: [2, 66],
          36: 97,
          63: 98,
          64: 76,
          65: [1, 44],
          69: 99,
          70: 77,
          71: 78,
          72: [1, 79],
          75: [2, 66],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 75,
          22: 100,
          23: [2, 52],
          63: 101,
          64: 76,
          65: [1, 44],
          69: 102,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          20: 75,
          33: [2, 92],
          62: 103,
          63: 104,
          64: 76,
          65: [1, 44],
          69: 105,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [1, 106]
        }, {
          33: [2, 79],
          65: [2, 79],
          72: [2, 79],
          80: [2, 79],
          81: [2, 79],
          82: [2, 79],
          83: [2, 79],
          84: [2, 79],
          85: [2, 79]
        }, {
          33: [2, 81]
        }, {
          23: [2, 27],
          33: [2, 27],
          54: [2, 27],
          65: [2, 27],
          68: [2, 27],
          72: [2, 27],
          75: [2, 27],
          80: [2, 27],
          81: [2, 27],
          82: [2, 27],
          83: [2, 27],
          84: [2, 27],
          85: [2, 27]
        }, {
          23: [2, 28],
          33: [2, 28],
          54: [2, 28],
          65: [2, 28],
          68: [2, 28],
          72: [2, 28],
          75: [2, 28],
          80: [2, 28],
          81: [2, 28],
          82: [2, 28],
          83: [2, 28],
          84: [2, 28],
          85: [2, 28]
        }, {
          23: [2, 30],
          33: [2, 30],
          54: [2, 30],
          68: [2, 30],
          71: 107,
          72: [1, 108],
          75: [2, 30]
        }, {
          23: [2, 98],
          33: [2, 98],
          54: [2, 98],
          68: [2, 98],
          72: [2, 98],
          75: [2, 98]
        }, {
          23: [2, 45],
          33: [2, 45],
          54: [2, 45],
          65: [2, 45],
          68: [2, 45],
          72: [2, 45],
          73: [1, 109],
          75: [2, 45],
          80: [2, 45],
          81: [2, 45],
          82: [2, 45],
          83: [2, 45],
          84: [2, 45],
          85: [2, 45],
          87: [2, 45]
        }, {
          23: [2, 44],
          33: [2, 44],
          54: [2, 44],
          65: [2, 44],
          68: [2, 44],
          72: [2, 44],
          75: [2, 44],
          80: [2, 44],
          81: [2, 44],
          82: [2, 44],
          83: [2, 44],
          84: [2, 44],
          85: [2, 44],
          87: [2, 44]
        }, {
          54: [1, 110]
        }, {
          54: [2, 83],
          65: [2, 83],
          72: [2, 83],
          80: [2, 83],
          81: [2, 83],
          82: [2, 83],
          83: [2, 83],
          84: [2, 83],
          85: [2, 83]
        }, {
          54: [2, 85]
        }, {
          5: [2, 13],
          14: [2, 13],
          15: [2, 13],
          19: [2, 13],
          29: [2, 13],
          34: [2, 13],
          39: [2, 13],
          44: [2, 13],
          47: [2, 13],
          48: [2, 13],
          51: [2, 13],
          55: [2, 13],
          60: [2, 13]
        }, {
          38: 56,
          39: [1, 58],
          43: 57,
          44: [1, 59],
          45: 112,
          46: 111,
          47: [2, 76]
        }, {
          33: [2, 70],
          40: 113,
          65: [2, 70],
          72: [2, 70],
          75: [2, 70],
          80: [2, 70],
          81: [2, 70],
          82: [2, 70],
          83: [2, 70],
          84: [2, 70],
          85: [2, 70]
        }, {
          47: [2, 18]
        }, {
          5: [2, 14],
          14: [2, 14],
          15: [2, 14],
          19: [2, 14],
          29: [2, 14],
          34: [2, 14],
          39: [2, 14],
          44: [2, 14],
          47: [2, 14],
          48: [2, 14],
          51: [2, 14],
          55: [2, 14],
          60: [2, 14]
        }, {
          33: [1, 114]
        }, {
          33: [2, 87],
          65: [2, 87],
          72: [2, 87],
          80: [2, 87],
          81: [2, 87],
          82: [2, 87],
          83: [2, 87],
          84: [2, 87],
          85: [2, 87]
        }, {
          33: [2, 89]
        }, {
          20: 75,
          63: 116,
          64: 76,
          65: [1, 44],
          67: 115,
          68: [2, 96],
          69: 117,
          70: 77,
          71: 78,
          72: [1, 79],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          33: [1, 118]
        }, {
          32: 119,
          33: [2, 62],
          74: 120,
          75: [1, 121]
        }, {
          33: [2, 59],
          65: [2, 59],
          72: [2, 59],
          75: [2, 59],
          80: [2, 59],
          81: [2, 59],
          82: [2, 59],
          83: [2, 59],
          84: [2, 59],
          85: [2, 59]
        }, {
          33: [2, 61],
          75: [2, 61]
        }, {
          33: [2, 68],
          37: 122,
          74: 123,
          75: [1, 121]
        }, {
          33: [2, 65],
          65: [2, 65],
          72: [2, 65],
          75: [2, 65],
          80: [2, 65],
          81: [2, 65],
          82: [2, 65],
          83: [2, 65],
          84: [2, 65],
          85: [2, 65]
        }, {
          33: [2, 67],
          75: [2, 67]
        }, {
          23: [1, 124]
        }, {
          23: [2, 51],
          65: [2, 51],
          72: [2, 51],
          80: [2, 51],
          81: [2, 51],
          82: [2, 51],
          83: [2, 51],
          84: [2, 51],
          85: [2, 51]
        }, {
          23: [2, 53]
        }, {
          33: [1, 125]
        }, {
          33: [2, 91],
          65: [2, 91],
          72: [2, 91],
          80: [2, 91],
          81: [2, 91],
          82: [2, 91],
          83: [2, 91],
          84: [2, 91],
          85: [2, 91]
        }, {
          33: [2, 93]
        }, {
          5: [2, 22],
          14: [2, 22],
          15: [2, 22],
          19: [2, 22],
          29: [2, 22],
          34: [2, 22],
          39: [2, 22],
          44: [2, 22],
          47: [2, 22],
          48: [2, 22],
          51: [2, 22],
          55: [2, 22],
          60: [2, 22]
        }, {
          23: [2, 99],
          33: [2, 99],
          54: [2, 99],
          68: [2, 99],
          72: [2, 99],
          75: [2, 99]
        }, {
          73: [1, 109]
        }, {
          20: 75,
          63: 126,
          64: 76,
          65: [1, 44],
          72: [1, 35],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          5: [2, 23],
          14: [2, 23],
          15: [2, 23],
          19: [2, 23],
          29: [2, 23],
          34: [2, 23],
          39: [2, 23],
          44: [2, 23],
          47: [2, 23],
          48: [2, 23],
          51: [2, 23],
          55: [2, 23],
          60: [2, 23]
        }, {
          47: [2, 19]
        }, {
          47: [2, 77]
        }, {
          20: 75,
          33: [2, 72],
          41: 127,
          63: 128,
          64: 76,
          65: [1, 44],
          69: 129,
          70: 77,
          71: 78,
          72: [1, 79],
          75: [2, 72],
          78: 26,
          79: 27,
          80: [1, 28],
          81: [1, 29],
          82: [1, 30],
          83: [1, 31],
          84: [1, 32],
          85: [1, 34],
          86: 33
        }, {
          5: [2, 24],
          14: [2, 24],
          15: [2, 24],
          19: [2, 24],
          29: [2, 24],
          34: [2, 24],
          39: [2, 24],
          44: [2, 24],
          47: [2, 24],
          48: [2, 24],
          51: [2, 24],
          55: [2, 24],
          60: [2, 24]
        }, {
          68: [1, 130]
        }, {
          65: [2, 95],
          68: [2, 95],
          72: [2, 95],
          80: [2, 95],
          81: [2, 95],
          82: [2, 95],
          83: [2, 95],
          84: [2, 95],
          85: [2, 95]
        }, {
          68: [2, 97]
        }, {
          5: [2, 21],
          14: [2, 21],
          15: [2, 21],
          19: [2, 21],
          29: [2, 21],
          34: [2, 21],
          39: [2, 21],
          44: [2, 21],
          47: [2, 21],
          48: [2, 21],
          51: [2, 21],
          55: [2, 21],
          60: [2, 21]
        }, {
          33: [1, 131]
        }, {
          33: [2, 63]
        }, {
          72: [1, 133],
          76: 132
        }, {
          33: [1, 134]
        }, {
          33: [2, 69]
        }, {
          15: [2, 12]
        }, {
          14: [2, 26],
          15: [2, 26],
          19: [2, 26],
          29: [2, 26],
          34: [2, 26],
          47: [2, 26],
          48: [2, 26],
          51: [2, 26],
          55: [2, 26],
          60: [2, 26]
        }, {
          23: [2, 31],
          33: [2, 31],
          54: [2, 31],
          68: [2, 31],
          72: [2, 31],
          75: [2, 31]
        }, {
          33: [2, 74],
          42: 135,
          74: 136,
          75: [1, 121]
        }, {
          33: [2, 71],
          65: [2, 71],
          72: [2, 71],
          75: [2, 71],
          80: [2, 71],
          81: [2, 71],
          82: [2, 71],
          83: [2, 71],
          84: [2, 71],
          85: [2, 71]
        }, {
          33: [2, 73],
          75: [2, 73]
        }, {
          23: [2, 29],
          33: [2, 29],
          54: [2, 29],
          65: [2, 29],
          68: [2, 29],
          72: [2, 29],
          75: [2, 29],
          80: [2, 29],
          81: [2, 29],
          82: [2, 29],
          83: [2, 29],
          84: [2, 29],
          85: [2, 29]
        }, {
          14: [2, 15],
          15: [2, 15],
          19: [2, 15],
          29: [2, 15],
          34: [2, 15],
          39: [2, 15],
          44: [2, 15],
          47: [2, 15],
          48: [2, 15],
          51: [2, 15],
          55: [2, 15],
          60: [2, 15]
        }, {
          72: [1, 138],
          77: [1, 137]
        }, {
          72: [2, 100],
          77: [2, 100]
        }, {
          14: [2, 16],
          15: [2, 16],
          19: [2, 16],
          29: [2, 16],
          34: [2, 16],
          44: [2, 16],
          47: [2, 16],
          48: [2, 16],
          51: [2, 16],
          55: [2, 16],
          60: [2, 16]
        }, {
          33: [1, 139]
        }, {
          33: [2, 75]
        }, {
          33: [2, 32]
        }, {
          72: [2, 101],
          77: [2, 101]
        }, {
          14: [2, 17],
          15: [2, 17],
          19: [2, 17],
          29: [2, 17],
          34: [2, 17],
          39: [2, 17],
          44: [2, 17],
          47: [2, 17],
          48: [2, 17],
          51: [2, 17],
          55: [2, 17],
          60: [2, 17]
        }],
        defaultActions: {
          4: [2, 1],
          55: [2, 55],
          57: [2, 20],
          61: [2, 57],
          74: [2, 81],
          83: [2, 85],
          87: [2, 18],
          91: [2, 89],
          102: [2, 53],
          105: [2, 93],
          111: [2, 19],
          112: [2, 77],
          117: [2, 97],
          120: [2, 63],
          123: [2, 69],
          124: [2, 12],
          136: [2, 75],
          137: [2, 32]
        },
        parseError: function parseError(str, hash) {
          throw new Error(str)
        },
        parse: function parse(input) {
          var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = "",
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;

          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n
          }

          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token
            }
            return token
          }
          var symbol, preErrorSymbol, state, action, a, r, yyval = {},
            p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state]
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex()
              }
              action = table[state] && table[state][symbol]
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p in table[state])
                  if (this.terminals_[p] && p > 2) {
                    expected.push("'" + this.terminals_[p] + "'")
                  } if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'"
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'")
                }
                this.parseError(errStr, {
                  text: this.lexer.match,
                  token: this.terminals_[symbol] || symbol,
                  line: this.lexer.yylineno,
                  loc: yyloc,
                  expected: expected
                })
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol)
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0) recovering--
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]]
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                  return r
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len)
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true
            }
          }
          return true
        }
      };
      var lexer = function() {
        var lexer = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash)
            } else {
              throw new Error(str)
            }
          },
          setInput: function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) this.yylloc.range = [0, 0];
            this.offset = 0;
            return this
          },
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++
            } else {
              this.yylloc.last_column++
            }
            if (this.options.ranges) this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch
          },
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len]
            }
            return this
          },
          more: function more() {
            this._more = true;
            return this
          },
          less: function less(n) {
            this.unput(this.match.slice(n))
          },
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
          },
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length)
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
          },
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^"
          },
          next: function next() {
            if (this.done) {
              return this.EOF
            }
            if (!this._input) this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = ""
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng]
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return
            }
            if (this._input === "") {
              return this.EOF
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              })
            }
          },
          lex: function lex() {
            var r = this.next();
            if (typeof r !== "undefined") {
              return r
            } else {
              return this.lex()
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition)
          },
          popState: function popState() {
            return this.conditionStack.pop()
          },
          _currentRules: function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
          },
          topState: function topState() {
            return this.conditionStack[this.conditionStack.length - 2]
          },
          pushState: function begin(condition) {
            this.begin(condition)
          }
        };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end)
          }
          var YYSTATE = YY_START;
          switch ($avoiding_name_collisions) {
            case 0:
              if (yy_.yytext.slice(-2) === "\\\\") {
                strip(0, 1);
                this.begin("mu")
              } else if (yy_.yytext.slice(-1) === "\\") {
                strip(0, 1);
                this.begin("emu")
              } else {
                this.begin("mu")
              }
              if (yy_.yytext) return 15;
              break;
            case 1:
              return 15;
              break;
            case 2:
              this.popState();
              return 15;
              break;
            case 3:
              this.begin("raw");
              return 15;
              break;
            case 4:
              this.popState();
              if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                return 15
              } else {
                yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
                return "END_RAW_BLOCK"
              }
              break;
            case 5:
              return 15;
              break;
            case 6:
              this.popState();
              return 14;
              break;
            case 7:
              return 65;
              break;
            case 8:
              return 68;
              break;
            case 9:
              return 19;
              break;
            case 10:
              this.popState();
              this.begin("raw");
              return 23;
              break;
            case 11:
              return 55;
              break;
            case 12:
              return 60;
              break;
            case 13:
              return 29;
              break;
            case 14:
              return 47;
              break;
            case 15:
              this.popState();
              return 44;
              break;
            case 16:
              this.popState();
              return 44;
              break;
            case 17:
              return 34;
              break;
            case 18:
              return 39;
              break;
            case 19:
              return 51;
              break;
            case 20:
              return 48;
              break;
            case 21:
              this.unput(yy_.yytext);
              this.popState();
              this.begin("com");
              break;
            case 22:
              this.popState();
              return 14;
              break;
            case 23:
              return 48;
              break;
            case 24:
              return 73;
              break;
            case 25:
              return 72;
              break;
            case 26:
              return 72;
              break;
            case 27:
              return 87;
              break;
            case 28:
              break;
            case 29:
              this.popState();
              return 54;
              break;
            case 30:
              this.popState();
              return 33;
              break;
            case 31:
              yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
              return 80;
              break;
            case 32:
              yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
              return 80;
              break;
            case 33:
              return 85;
              break;
            case 34:
              return 82;
              break;
            case 35:
              return 82;
              break;
            case 36:
              return 83;
              break;
            case 37:
              return 84;
              break;
            case 38:
              return 81;
              break;
            case 39:
              return 75;
              break;
            case 40:
              return 77;
              break;
            case 41:
              return 72;
              break;
            case 42:
              yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
              return 72;
              break;
            case 43:
              return "INVALID";
              break;
            case 44:
              return 5;
              break
          }
        };
        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
        lexer.conditions = {
          mu: {
            rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            inclusive: false
          },
          emu: {
            rules: [2],
            inclusive: false
          },
          com: {
            rules: [6],
            inclusive: false
          },
          raw: {
            rules: [3, 4, 5],
            inclusive: false
          },
          INITIAL: {
            rules: [0, 1, 44],
            inclusive: true
          }
        };
        return lexer
      }();
      parser.lexer = lexer;

      function Parser() {
        this.yy = {}
      }
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser
    }();
    exports["default"] = handlebars;
    module.exports = exports["default"]
  }, {}],
  13: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.print = print;
    exports.PrintVisitor = PrintVisitor;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _visitor = require("./visitor");
    var _visitor2 = _interopRequireDefault(_visitor);

    function print(ast) {
      return (new PrintVisitor).accept(ast)
    }

    function PrintVisitor() {
      this.padding = 0
    }
    PrintVisitor.prototype = new _visitor2["default"];
    PrintVisitor.prototype.pad = function(string) {
      var out = "";
      for (var i = 0, l = this.padding; i < l; i++) {
        out += "  "
      }
      out += string + "\n";
      return out
    };
    PrintVisitor.prototype.Program = function(program) {
      var out = "",
        body = program.body,
        i = undefined,
        l = undefined;
      if (program.blockParams) {
        var blockParams = "BLOCK PARAMS: [";
        for (i = 0, l = program.blockParams.length; i < l; i++) {
          blockParams += " " + program.blockParams[i]
        }
        blockParams += " ]";
        out += this.pad(blockParams)
      }
      for (i = 0, l = body.length; i < l; i++) {
        out += this.accept(body[i])
      }
      this.padding--;
      return out
    };
    PrintVisitor.prototype.MustacheStatement = function(mustache) {
      return this.pad("{{ " + this.SubExpression(mustache) + " }}")
    };
    PrintVisitor.prototype.Decorator = function(mustache) {
      return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}")
    };
    PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function(block) {
      var out = "";
      out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++
        }
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--
        }
      }
      this.padding--;
      return out
    };
    PrintVisitor.prototype.PartialStatement = function(partial) {
      var content = "PARTIAL:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0])
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash)
      }
      return this.pad("{{> " + content + " }}")
    };
    PrintVisitor.prototype.PartialBlockStatement = function(partial) {
      var content = "PARTIAL BLOCK:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0])
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash)
      }
      content += " " + this.pad("PROGRAM:");
      this.padding++;
      content += this.accept(partial.program);
      this.padding--;
      return this.pad("{{> " + content + " }}")
    };
    PrintVisitor.prototype.ContentStatement = function(content) {
      return this.pad("CONTENT[ '" + content.value + "' ]")
    };
    PrintVisitor.prototype.CommentStatement = function(comment) {
      return this.pad("{{! '" + comment.value + "' }}")
    };
    PrintVisitor.prototype.SubExpression = function(sexpr) {
      var params = sexpr.params,
        paramStrings = [],
        hash = undefined;
      for (var i = 0, l = params.length; i < l; i++) {
        paramStrings.push(this.accept(params[i]))
      }
      params = "[" + paramStrings.join(", ") + "]";
      hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
      return this.accept(sexpr.path) + " " + params + hash
    };
    PrintVisitor.prototype.PathExpression = function(id) {
      var path = id.parts.join("/");
      return (id.data ? "@" : "") + "PATH:" + path
    };
    PrintVisitor.prototype.StringLiteral = function(string) {
      return '"' + string.value + '"'
    };
    PrintVisitor.prototype.NumberLiteral = function(number) {
      return "NUMBER{" + number.value + "}"
    };
    PrintVisitor.prototype.BooleanLiteral = function(bool) {
      return "BOOLEAN{" + bool.value + "}"
    };
    PrintVisitor.prototype.UndefinedLiteral = function() {
      return "UNDEFINED"
    };
    PrintVisitor.prototype.NullLiteral = function() {
      return "NULL"
    };
    PrintVisitor.prototype.Hash = function(hash) {
      var pairs = hash.pairs,
        joinedPairs = [];
      for (var i = 0, l = pairs.length; i < l; i++) {
        joinedPairs.push(this.accept(pairs[i]))
      }
      return "HASH{" + joinedPairs.join(", ") + "}"
    };
    PrintVisitor.prototype.HashPair = function(pair) {
      return pair.key + "=" + this.accept(pair.value)
    }
  }, {
    "./visitor": 14
  }],
  14: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);

    function Visitor() {
      this.parents = []
    }
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          if (value && !Visitor.prototype[value.type]) {
            throw new _exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type)
          }
          node[name] = value
        }
      },
      acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new _exception2["default"](node.type + " requires " + name)
        }
      },
      acceptArray: function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--
          }
        }
      },
      accept: function accept(object) {
        if (!object) {
          return
        }
        if (!this[object.type]) {
          throw new _exception2["default"]("Unknown type: " + object.type, object)
        }
        if (this.current) {
          this.parents.unshift(this.current)
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret
        } else if (ret !== false) {
          return object
        }
      },
      Program: function Program(program) {
        this.acceptArray(program.body)
      },
      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,
      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,
      PartialStatement: visitPartial,
      PartialBlockStatement: function PartialBlockStatement(partial) {
        visitPartial.call(this, partial);
        this.acceptKey(partial, "program")
      },
      ContentStatement: function ContentStatement() {},
      CommentStatement: function CommentStatement() {},
      SubExpression: visitSubExpression,
      PathExpression: function PathExpression() {},
      StringLiteral: function StringLiteral() {},
      NumberLiteral: function NumberLiteral() {},
      BooleanLiteral: function BooleanLiteral() {},
      UndefinedLiteral: function UndefinedLiteral() {},
      NullLiteral: function NullLiteral() {},
      Hash: function Hash(hash) {
        this.acceptArray(hash.pairs)
      },
      HashPair: function HashPair(pair) {
        this.acceptRequired(pair, "value")
      }
    };

    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, "path");
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, "hash")
    }

    function visitBlock(block) {
      visitSubExpression.call(this, block);
      this.acceptKey(block, "program");
      this.acceptKey(block, "inverse")
    }

    function visitPartial(partial) {
      this.acceptRequired(partial, "name");
      this.acceptArray(partial.params);
      this.acceptKey(partial, "hash")
    }
    exports["default"] = Visitor;
    module.exports = exports["default"]
  }, {
    "../exception": 18
  }],
  15: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _visitor = require("./visitor");
    var _visitor2 = _interopRequireDefault(_visitor);

    function WhitespaceControl() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      this.options = options
    }
    WhitespaceControl.prototype = new _visitor2["default"];
    WhitespaceControl.prototype.Program = function(program) {
      var doStandalone = !this.options.ignoreStandalone;
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i],
          strip = this.accept(current);
        if (!strip) {
          continue
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
          _isNextWhitespace = isNextWhitespace(body, i, isRoot),
          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true)
        }
        if (strip.open) {
          omitLeft(body, i, true)
        }
        if (doStandalone && inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            if (current.type === "PartialStatement") {
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1]
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);
          omitLeft(body, i)
        }
        if (doStandalone && closeStandalone) {
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body)
        }
      }
      return program
    };
    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      var program = block.program || block.inverse,
        inverse = block.program && block.inverse,
        firstInverse = inverse,
        lastInverse = inverse;
      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };
      if (block.openStrip.close) {
        omitRight(program.body, null, true)
      }
      if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program.body, null, true)
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true)
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true)
        }
        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body)
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true)
      }
      return strip
    };
    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      }
    };

    function isPrevWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = body.length
      }
      var prev = body[i - 1],
        sibling = body[i - 2];
      if (!prev) {
        return isRoot
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original)
      }
    }

    function isNextWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = -1
      }
      var next = body[i + 1],
        sibling = body[i + 2];
      if (!next) {
        return isRoot
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original)
      }
    }

    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original
    }

    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped
    }
    exports["default"] = WhitespaceControl;
    module.exports = exports["default"]
  }, {
    "./visitor": 14
  }],
  16: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultDecorators = registerDefaultDecorators;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _decoratorsInline = require("./decorators/inline");
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance)
    }
  }, {
    "./decorators/inline": 17
  }],
  17: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("../utils");
    exports["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = function(context, options) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret = fn(context, options);
            container.partials = original;
            return ret
          }
        }
        props.partials[options.args[0]] = options.fn;
        return ret
      })
    };
    module.exports = exports["default"]
  }, {
    "../utils": 31
  }],
  18: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

    function Exception(message, node) {
      var loc = node && node.loc,
        line = undefined,
        column = undefined;
      if (loc) {
        line = loc.start.line;
        column = loc.start.column;
        message += " - " + line + ":" + column
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]]
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception)
      }
      try {
        if (loc) {
          this.lineNumber = line;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            })
          } else {
            this.column = column
          }
        }
      } catch (nop) {}
    }
    Exception.prototype = new Error;
    exports["default"] = Exception;
    module.exports = exports["default"]
  }, {}],
  19: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultHelpers = registerDefaultHelpers;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _helpersBlockHelperMissing = require("./helpers/block-helper-missing");
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = require("./helpers/each");
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = require("./helpers/helper-missing");
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = require("./helpers/if");
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = require("./helpers/log");
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = require("./helpers/lookup");
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = require("./helpers/with");
    var _helpersWith2 = _interopRequireDefault(_helpersWith);

    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance)
    }
  }, {
    "./helpers/block-helper-missing": 20,
    "./helpers/each": 21,
    "./helpers/helper-missing": 22,
    "./helpers/if": 23,
    "./helpers/log": 24,
    "./helpers/lookup": 25,
    "./helpers/with": 26
  }],
  20: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("../utils");
    exports["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse,
          fn = options.fn;
        if (context === true) {
          return fn(this)
        } else if (context === false || context == null) {
          return inverse(this)
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name]
            }
            return instance.helpers.each(context, options)
          } else {
            return inverse(this)
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = {
              data: data
            }
          }
          return fn(context, options)
        }
      })
    };
    module.exports = exports["default"]
  }, {
    "../utils": 31
  }],
  21: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _utils = require("../utils");
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _exception2["default"]("Must pass iterator to #each")
        }
        var fn = options.fn,
          inverse = options.inverse,
          i = 0,
          ret = "",
          data = undefined,
          contextPath = undefined;
        if (options.data && options.ids) {
          contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + "."
        }
        if (_utils.isFunction(context)) {
          context = context.call(this)
        }
        if (options.data) {
          data = _utils.createFrame(options.data)
        }

        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field
            }
          }
          ret = ret + fn(context[field], {
            data: data,
            blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
          })
        }
        if (context && typeof context === "object") {
          if (_utils.isArray(context)) {
            for (var j = context.length; i < j; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1)
              }
            }
          } else {
            var priorKey = undefined;
            for (var key in context) {
              if (context.hasOwnProperty(key)) {
                if (priorKey !== undefined) {
                  execIteration(priorKey, i - 1)
                }
                priorKey = key;
                i++
              }
            }
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1, true)
            }
          }
        }
        if (i === 0) {
          ret = inverse(this)
        }
        return ret
      })
    };
    module.exports = exports["default"]
  }, {
    "../exception": 18,
    "../utils": 31
  }],
  22: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }
    var _exception = require("../exception");
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return undefined
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
        }
      })
    };
    module.exports = exports["default"]
  }, {
    "../exception": 18
  }],
  23: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("../utils");
    exports["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this)
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this)
        } else {
          return options.fn(this)
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        })
      })
    };
    module.exports = exports["default"]
  }, {
    "../utils": 31
  }],
  24: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [undefined],
          options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i])
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level
        } else if (options.data && options.data.level != null) {
          level = options.data.level
        }
        args[0] = level;
        instance.log.apply(instance, args)
      })
    };
    module.exports = exports["default"]
  }, {}],
  25: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field) {
        return obj && obj[field]
      })
    };
    module.exports = exports["default"]
  }, {}],
  26: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("../utils");
    exports["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (_utils.isFunction(context)) {
          context = context.call(this)
        }
        var fn = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0])
          }
          return fn(context, {
            data: data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          })
        } else {
          return options.inverse(this)
        }
      })
    };
    module.exports = exports["default"]
  }, {
    "../utils": 31
  }],
  27: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    var _utils = require("./utils");
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap
          } else {
            level = parseInt(level, 10)
          }
        }
        return level
      },
      log: function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log"
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key]
          }
          console[method].apply(console, message)
        }
      }
    };
    exports["default"] = logger;
    module.exports = exports["default"]
  }, {
    "./utils": 31
  }],
  28: [function(require, module, exports) {
    (function(global) {
      "use strict";
      exports.__esModule = true;
      exports["default"] = function(Handlebars) {
        var root = typeof global !== "undefined" ? global : window,
          $Handlebars = root.Handlebars;
        Handlebars.noConflict = function() {
          if (root.Handlebars === Handlebars) {
            root.Handlebars = $Handlebars
          }
          return Handlebars
        }
      };
      module.exports = exports["default"]
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {}],
  29: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      }
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
          }
        }
        newObj["default"] = obj;
        return newObj
      }
    }
    var _utils = require("./utils");
    var Utils = _interopRequireWildcard(_utils);
    var _exception = require("./exception");
    var _exception2 = _interopRequireDefault(_exception);
    var _base = require("./base");

    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
            compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").")
        } else {
          throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").")
        }
      }
    }

    function template(templateSpec, env) {
      if (!env) {
        throw new _exception2["default"]("No environment passed to template")
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec)
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env.VM.checkRevision(templateSpec.compiler);

      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var result = env.VM.invokePartial.call(this, partial, context, options);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, options)
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break
              }
              lines[i] = options.indent + lines[i]
            }
            result = lines.join("\n")
          }
          return result
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode")
        }
      }
      var container = {
        strict: function strict(obj, name) {
          if (!(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj)
          }
          return obj[name]
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            if (depths[i] && depths[i][name] != null) {
              return depths[i][name]
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
          var ret = templateSpec[i];
          ret.decorator = templateSpec[i + "_d"];
          return ret
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i],
            fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths)
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn)
          }
          return programWrapper
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent
          }
          return value
        },
        merge: function merge(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param)
          }
          return obj
        },
        nullContext: Object.seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };

      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data)
        }
        var depths = undefined,
          blockParams = templateSpec.useBlockParams ? [] : undefined;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths
          } else {
            depths = [context]
          }
        }

        function main(context) {
          return "" + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths)
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options)
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          container.helpers = container.merge(options.helpers, env.helpers);
          if (templateSpec.usePartial) {
            container.partials = container.merge(options.partials, env.partials)
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = container.merge(options.decorators, env.decorators)
          }
        } else {
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params")
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths")
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths)
      };
      return ret
    }

    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths)
        }
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths)
      }
      prog = executeDecorators(fn, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog
    }

    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = options.data["partial-block"]
        } else {
          partial = options.partials[options.name]
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = options.partials[partial]
      }
      return partial
    }

    function invokePartial(partial, context, options) {
      var currentPartialBlock = options.data && options.data["partial-block"];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath
      }
      var partialBlock = undefined;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn = options.fn;
          partialBlock = options.data["partial-block"] = function partialBlockWrapper(context) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            options.data = _base.createFrame(options.data);
            options.data["partial-block"] = currentPartialBlock;
            return fn(context, options)
          };
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials)
          }
        })()
      }
      if (partial === undefined && partialBlock) {
        partial = partialBlock
      }
      if (partial === undefined) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found")
      } else if (partial instanceof Function) {
        return partial(context, options)
      }
    }

    function noop() {
      return ""
    }

    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context
      }
      return data
    }

    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props)
      }
      return prog
    }
  }, {
    "./base": 5,
    "./exception": 18,
    "./utils": 31
  }],
  30: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;

    function SafeString(string) {
      this.string = string
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string
    };
    exports["default"] = SafeString;
    module.exports = exports["default"]
  }, {}],
  31: [function(require, module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = extend;
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.createFrame = createFrame;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g,
      possible = /[&<>"'`=]/;

    function escapeChar(chr) {
      return escape[chr]
    }

    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key]
          }
        }
      }
      return obj
    }
    var toString = Object.prototype.toString;
    exports.toString = toString;
    var isFunction = function isFunction(value) {
      return typeof value === "function"
    };
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]"
      }
    }
    exports.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false
    };
    exports.isArray = isArray;

    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }

    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML()
        } else if (string == null) {
          return ""
        } else if (!string) {
          return string + ""
        }
        string = "" + string
      }
      if (!possible.test(string)) {
        return string
      }
      return string.replace(badChars, escapeChar)
    }

    function isEmpty(value) {
      if (!value && value !== 0) {
        return true
      } else if (isArray(value) && value.length === 0) {
        return true
      } else {
        return false
      }
    }

    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame
    }

    function blockParams(params, ids) {
      params.path = ids;
      return params
    }

    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id
    }
  }, {}],
  32: [function(require, module, exports) {
    var handlebars = require("../dist/cjs/handlebars")["default"];
    var printer = require("../dist/cjs/handlebars/compiler/printer");
    handlebars.PrintVisitor = printer.PrintVisitor;
    handlebars.print = printer.print;
    module.exports = handlebars;

    function extension(module, filename) {
      var fs = require("fs");
      var templateString = fs.readFileSync(filename, "utf8");
      module.exports = handlebars.compile(templateString)
    }
    if (typeof require !== "undefined" && require.extensions) {
      require.extensions[".handlebars"] = extension;
      require.extensions[".hbs"] = extension
    }
  }, {
    "../dist/cjs/handlebars": 3,
    "../dist/cjs/handlebars/compiler/printer": 13,
    fs: 1
  }],
  33: [function(require, module, exports) {
    (function(global) {
      (function(root) {
        "use strict";
        var block = {
          newline: /^\n+/,
          code: /^( {4}[^\n]+\n*)+/,
          fences: noop,
          hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
          heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
          nptable: noop,
          blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
          list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
          html: "^ {0,3}(?:" + "<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)" + "|comment[^\\n]*(\\n+|$)" + "|<\\?[\\s\\S]*?\\?>\\n*" + "|<![A-Z][\\s\\S]*?>\\n*" + "|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*" + "|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)" + "|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)" + "|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)" + ")",
          def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
          table: noop,
          lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
          paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
          text: /^[^\n]+/
        };
        block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
        block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
        block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
        block.bullet = /(?:[*+-]|\d+\.)/;
        block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
        block.item = edit(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
        block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
        block._tag = "address|article|aside|base|basefont|blockquote|body|caption" + "|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption" + "|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe" + "|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option" + "|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr" + "|track|ul";
        block._comment = /<!--(?!-?>)[\s\S]*?-->/;
        block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
        block.paragraph = edit(block.paragraph).replace("hr", block.hr).replace("heading", block.heading).replace("lheading", block.lheading).replace("tag", block._tag).getRegex();
        block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
        block.normal = merge({}, block);
        block.gfm = merge({}, block.normal, {
          fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
          paragraph: /^/,
          heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        });
        block.gfm.paragraph = edit(block.paragraph).replace("(?!", "(?!" + block.gfm.fences.source.replace("\\1", "\\2") + "|" + block.list.source.replace("\\1", "\\3") + "|").getRegex();
        block.tables = merge({}, block.gfm, {
          nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
          table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
        });
        block.pedantic = merge({}, block.normal, {
          html: edit("^ *(?:comment *(?:\\n|\\s*$)" + "|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)" + "|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", block._comment).replace(/tag/g, "(?!(?:" + "a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub" + "|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)" + "\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
          def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/
        });

        function Lexer(options) {
          this.tokens = [];
          this.tokens.links = Object.create(null);
          this.options = options || marked.defaults;
          this.rules = block.normal;
          if (this.options.pedantic) {
            this.rules = block.pedantic
          } else if (this.options.gfm) {
            if (this.options.tables) {
              this.rules = block.tables
            } else {
              this.rules = block.gfm
            }
          }
        }
        Lexer.rules = block;
        Lexer.lex = function(src, options) {
          var lexer = new Lexer(options);
          return lexer.lex(src)
        };
        Lexer.prototype.lex = function(src) {
          src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
          return this.token(src, true)
        };
        Lexer.prototype.token = function(src, top) {
          src = src.replace(/^ +$/gm, "");
          var next, loose, cap, bull, b, item, listStart, listItems, t, space, i, tag, l, isordered, istask, ischecked;
          while (src) {
            if (cap = this.rules.newline.exec(src)) {
              src = src.substring(cap[0].length);
              if (cap[0].length > 1) {
                this.tokens.push({
                  type: "space"
                })
              }
            }
            if (cap = this.rules.code.exec(src)) {
              src = src.substring(cap[0].length);
              cap = cap[0].replace(/^ {4}/gm, "");
              this.tokens.push({
                type: "code",
                text: !this.options.pedantic ? rtrim(cap, "\n") : cap
              });
              continue
            }
            if (cap = this.rules.fences.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "code",
                lang: cap[2],
                text: cap[3] || ""
              });
              continue
            }
            if (cap = this.rules.heading.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "heading",
                depth: cap[1].length,
                text: cap[2]
              });
              continue
            }
            if (top && (cap = this.rules.nptable.exec(src))) {
              item = {
                type: "table",
                header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
                align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
              };
              if (item.header.length === item.align.length) {
                src = src.substring(cap[0].length);
                for (i = 0; i < item.align.length; i++) {
                  if (/^ *-+: *$/.test(item.align[i])) {
                    item.align[i] = "right"
                  } else if (/^ *:-+: *$/.test(item.align[i])) {
                    item.align[i] = "center"
                  } else if (/^ *:-+ *$/.test(item.align[i])) {
                    item.align[i] = "left"
                  } else {
                    item.align[i] = null
                  }
                }
                for (i = 0; i < item.cells.length; i++) {
                  item.cells[i] = splitCells(item.cells[i], item.header.length)
                }
                this.tokens.push(item);
                continue
              }
            }
            if (cap = this.rules.hr.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "hr"
              });
              continue
            }
            if (cap = this.rules.blockquote.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "blockquote_start"
              });
              cap = cap[0].replace(/^ *> ?/gm, "");
              this.token(cap, top);
              this.tokens.push({
                type: "blockquote_end"
              });
              continue
            }
            if (cap = this.rules.list.exec(src)) {
              src = src.substring(cap[0].length);
              bull = cap[2];
              isordered = bull.length > 1;
              listStart = {
                type: "list_start",
                ordered: isordered,
                start: isordered ? +bull : "",
                loose: false
              };
              this.tokens.push(listStart);
              cap = cap[0].match(this.rules.item);
              listItems = [];
              next = false;
              l = cap.length;
              i = 0;
              for (; i < l; i++) {
                item = cap[i];
                space = item.length;
                item = item.replace(/^ *([*+-]|\d+\.) +/, "");
                if (~item.indexOf("\n ")) {
                  space -= item.length;
                  item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "")
                }
                if (this.options.smartLists && i !== l - 1) {
                  b = block.bullet.exec(cap[i + 1])[0];
                  if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                    src = cap.slice(i + 1).join("\n") + src;
                    i = l - 1
                  }
                }
                loose = next || /\n\n(?!\s*$)/.test(item);
                if (i !== l - 1) {
                  next = item.charAt(item.length - 1) === "\n";
                  if (!loose) loose = next
                }
                if (loose) {
                  listStart.loose = true
                }
                istask = /^\[[ xX]\] /.test(item);
                ischecked = undefined;
                if (istask) {
                  ischecked = item[1] !== " ";
                  item = item.replace(/^\[[ xX]\] +/, "")
                }
                t = {
                  type: "list_item_start",
                  task: istask,
                  checked: ischecked,
                  loose: loose
                };
                listItems.push(t);
                this.tokens.push(t);
                this.token(item, false);
                this.tokens.push({
                  type: "list_item_end"
                })
              }
              if (listStart.loose) {
                l = listItems.length;
                i = 0;
                for (; i < l; i++) {
                  listItems[i].loose = true
                }
              }
              this.tokens.push({
                type: "list_end"
              });
              continue
            }
            if (cap = this.rules.html.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: this.options.sanitize ? "paragraph" : "html",
                pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
                text: cap[0]
              });
              continue
            }
            if (top && (cap = this.rules.def.exec(src))) {
              src = src.substring(cap[0].length);
              if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
              tag = cap[1].toLowerCase().replace(/\s+/g, " ");
              if (!this.tokens.links[tag]) {
                this.tokens.links[tag] = {
                  href: cap[2],
                  title: cap[3]
                }
              }
              continue
            }
            if (top && (cap = this.rules.table.exec(src))) {
              item = {
                type: "table",
                header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
                align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: cap[3] ? cap[3].replace(/(?: *\| *)?\n$/, "").split("\n") : []
              };
              if (item.header.length === item.align.length) {
                src = src.substring(cap[0].length);
                for (i = 0; i < item.align.length; i++) {
                  if (/^ *-+: *$/.test(item.align[i])) {
                    item.align[i] = "right"
                  } else if (/^ *:-+: *$/.test(item.align[i])) {
                    item.align[i] = "center"
                  } else if (/^ *:-+ *$/.test(item.align[i])) {
                    item.align[i] = "left"
                  } else {
                    item.align[i] = null
                  }
                }
                for (i = 0; i < item.cells.length; i++) {
                  item.cells[i] = splitCells(item.cells[i].replace(/^ *\| *| *\| *$/g, ""), item.header.length)
                }
                this.tokens.push(item);
                continue
              }
            }
            if (cap = this.rules.lheading.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "heading",
                depth: cap[2] === "=" ? 1 : 2,
                text: cap[1]
              });
              continue
            }
            if (top && (cap = this.rules.paragraph.exec(src))) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "paragraph",
                text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
              });
              continue
            }
            if (cap = this.rules.text.exec(src)) {
              src = src.substring(cap[0].length);
              this.tokens.push({
                type: "text",
                text: cap[0]
              });
              continue
            }
            if (src) {
              throw new Error("Infinite loop on byte: " + src.charCodeAt(0))
            }
          }
          return this.tokens
        };
        var inline = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: noop,
          tag: "^comment" + "|^</[a-zA-Z][\\w:-]*\\s*>" + "|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>" + "|^<\\?[\\s\\S]*?\\?>" + "|^<![a-zA-Z]+\\s[\\s\\S]*?>" + "|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
          link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
          nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
          strong: /^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
          em: /^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: noop,
          text: /^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
        };
        inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
        inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
        inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
        inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
        inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
        inline.tag = edit(inline.tag).replace("comment", block._comment).replace("attribute", inline._attribute).getRegex();
        inline._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
        inline._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/;
        inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
        inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
        inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
        inline.normal = merge({}, inline);
        inline.pedantic = merge({}, inline.normal, {
          strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
          link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
          reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
        });
        inline.gfm = merge({}, inline.normal, {
          escape: edit(inline.escape).replace("])", "~|])").getRegex(),
          _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
          url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
          _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
          del: /^~+(?=\S)([\s\S]*?\S)~+/,
          text: edit(inline.text).replace("]|", "~]|").replace("|$", "|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$").getRegex()
        });
        inline.gfm.url = edit(inline.gfm.url).replace("email", inline.gfm._extended_email).getRegex();
        inline.breaks = merge({}, inline.gfm, {
          br: edit(inline.br).replace("{2,}", "*").getRegex(),
          text: edit(inline.gfm.text).replace("{2,}", "*").getRegex()
        });

        function InlineLexer(links, options) {
          this.options = options || marked.defaults;
          this.links = links;
          this.rules = inline.normal;
          this.renderer = this.options.renderer || new Renderer;
          this.renderer.options = this.options;
          if (!this.links) {
            throw new Error("Tokens array requires a `links` property.")
          }
          if (this.options.pedantic) {
            this.rules = inline.pedantic
          } else if (this.options.gfm) {
            if (this.options.breaks) {
              this.rules = inline.breaks
            } else {
              this.rules = inline.gfm
            }
          }
        }
        InlineLexer.rules = inline;
        InlineLexer.output = function(src, links, options) {
          var inline = new InlineLexer(links, options);
          return inline.output(src)
        };
        InlineLexer.prototype.output = function(src) {
          var out = "",
            link, text, href, title, cap, prevCapZero;
          while (src) {
            if (cap = this.rules.escape.exec(src)) {
              src = src.substring(cap[0].length);
              out += cap[1];
              continue
            }
            if (cap = this.rules.autolink.exec(src)) {
              src = src.substring(cap[0].length);
              if (cap[2] === "@") {
                text = escape(this.mangle(cap[1]));
                href = "mailto:" + text
              } else {
                text = escape(cap[1]);
                href = text
              }
              out += this.renderer.link(href, null, text);
              continue
            }
            if (!this.inLink && (cap = this.rules.url.exec(src))) {
              if (cap[2] === "@") {
                text = escape(cap[0]);
                href = "mailto:" + text
              } else {
                do {
                  prevCapZero = cap[0];
                  cap[0] = this.rules._backpedal.exec(cap[0])[0]
                } while (prevCapZero !== cap[0]);
                text = escape(cap[0]);
                if (cap[1] === "www.") {
                  href = "http://" + text
                } else {
                  href = text
                }
              }
              src = src.substring(cap[0].length);
              out += this.renderer.link(href, null, text);
              continue
            }
            if (cap = this.rules.tag.exec(src)) {
              if (!this.inLink && /^<a /i.test(cap[0])) {
                this.inLink = true
              } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                this.inLink = false
              }
              if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.inRawBlock = true
              } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.inRawBlock = false
              }
              src = src.substring(cap[0].length);
              out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
              continue
            }
            if (cap = this.rules.link.exec(src)) {
              src = src.substring(cap[0].length);
              this.inLink = true;
              href = cap[2];
              if (this.options.pedantic) {
                link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                if (link) {
                  href = link[1];
                  title = link[3]
                } else {
                  title = ""
                }
              } else {
                title = cap[3] ? cap[3].slice(1, -1) : ""
              }
              href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
              out += this.outputLink(cap, {
                href: InlineLexer.escapes(href),
                title: InlineLexer.escapes(title)
              });
              this.inLink = false;
              continue
            }
            if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
              src = src.substring(cap[0].length);
              link = (cap[2] || cap[1]).replace(/\s+/g, " ");
              link = this.links[link.toLowerCase()];
              if (!link || !link.href) {
                out += cap[0].charAt(0);
                src = cap[0].substring(1) + src;
                continue
              }
              this.inLink = true;
              out += this.outputLink(cap, link);
              this.inLink = false;
              continue
            }
            if (cap = this.rules.strong.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
              continue
            }
            if (cap = this.rules.em.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
              continue
            }
            if (cap = this.rules.code.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.codespan(escape(cap[2].trim(), true));
              continue
            }
            if (cap = this.rules.br.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.br();
              continue
            }
            if (cap = this.rules.del.exec(src)) {
              src = src.substring(cap[0].length);
              out += this.renderer.del(this.output(cap[1]));
              continue
            }
            if (cap = this.rules.text.exec(src)) {
              src = src.substring(cap[0].length);
              if (this.inRawBlock) {
                out += this.renderer.text(cap[0])
              } else {
                out += this.renderer.text(escape(this.smartypants(cap[0])))
              }
              continue
            }
            if (src) {
              throw new Error("Infinite loop on byte: " + src.charCodeAt(0))
            }
          }
          return out
        };
        InlineLexer.escapes = function(text) {
          return text ? text.replace(InlineLexer.rules._escapes, "$1") : text
        };
        InlineLexer.prototype.outputLink = function(cap, link) {
          var href = link.href,
            title = link.title ? escape(link.title) : null;
          return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]))
        };
        InlineLexer.prototype.smartypants = function(text) {
          if (!this.options.smartypants) return text;
          return text.replace(/---/g, "").replace(/--/g, "").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1").replace(/'/g, "").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1").replace(/"/g, "").replace(/\.{3}/g, "&")
        };
        InlineLexer.prototype.mangle = function(text) {
          if (!this.options.mangle) return text;
          var out = "",
            l = text.length,
            i = 0,
            ch;
          for (; i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > .5) {
              ch = "x" + ch.toString(16)
            }
            out += "&#" + ch + ";"
          }
          return out
        };

        function Renderer(options) {
          this.options = options || marked.defaults
        }
        Renderer.prototype.code = function(code, lang, escaped) {
          if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
              escaped = true;
              code = out
            }
          }
          if (!lang) {
            return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>"
          }
          return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n"
        };
        Renderer.prototype.blockquote = function(quote) {
          return "<blockquote>\n" + quote + "</blockquote>\n"
        };
        Renderer.prototype.html = function(html) {
          return html
        };
        Renderer.prototype.heading = function(text, level, raw) {
          if (this.options.headerIds) {
            return "<h" + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-") + '">' + text + "</h" + level + ">\n"
          }
          return "<h" + level + ">" + text + "</h" + level + ">\n"
        };
        Renderer.prototype.hr = function() {
          return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        };
        Renderer.prototype.list = function(body, ordered, start) {
          var type = ordered ? "ol" : "ul",
            startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
          return "<" + type + startatt + ">\n" + body + "</" + type + ">\n"
        };
        Renderer.prototype.listitem = function(text) {
          return "<li>" + text + "</li>\n"
        };
        Renderer.prototype.checkbox = function(checked) {
          return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        };
        Renderer.prototype.paragraph = function(text) {
          return "<p>" + text + "</p>\n"
        };
        Renderer.prototype.table = function(header, body) {
          if (body) body = "<tbody>" + body + "</tbody>";
          return "<table>\n" + "<thead>\n" + header + "</thead>\n" + body + "</table>\n"
        };
        Renderer.prototype.tablerow = function(content) {
          return "<tr>\n" + content + "</tr>\n"
        };
        Renderer.prototype.tablecell = function(content, flags) {
          var type = flags.header ? "th" : "td";
          var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
          return tag + content + "</" + type + ">\n"
        };
        Renderer.prototype.strong = function(text) {
          return "<strong>" + text + "</strong>"
        };
        Renderer.prototype.em = function(text) {
          return "<em>" + text + "</em>"
        };
        Renderer.prototype.codespan = function(text) {
          return "<code>" + text + "</code>"
        };
        Renderer.prototype.br = function() {
          return this.options.xhtml ? "<br/>" : "<br>"
        };
        Renderer.prototype.del = function(text) {
          return "<del>" + text + "</del>"
        };
        Renderer.prototype.link = function(href, title, text) {
          if (this.options.sanitize) {
            try {
              var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
              return text
            }
            if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
              return text
            }
          }
          if (this.options.baseUrl && !originIndependentUrl.test(href)) {
            href = resolveUrl(this.options.baseUrl, href)
          }
          try {
            href = encodeURI(href).replace(/%25/g, "%")
          } catch (e) {
            return text
          }
          var out = '<a href="' + escape(href) + '"';
          if (title) {
            out += ' title="' + title + '"'
          }
          out += ">" + text + "</a>";
          return out
        };
        Renderer.prototype.image = function(href, title, text) {
          if (this.options.baseUrl && !originIndependentUrl.test(href)) {
            href = resolveUrl(this.options.baseUrl, href)
          }
          var out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"'
          }
          out += this.options.xhtml ? "/>" : ">";
          return out
        };
        Renderer.prototype.text = function(text) {
          return text
        };

        function TextRenderer() {}
        TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function(text) {
          return text
        };
        TextRenderer.prototype.link = TextRenderer.prototype.image = function(href, title, text) {
          return "" + text
        };
        TextRenderer.prototype.br = function() {
          return ""
        };

        function Parser(options) {
          this.tokens = [];
          this.token = null;
          this.options = options || marked.defaults;
          this.options.renderer = this.options.renderer || new Renderer;
          this.renderer = this.options.renderer;
          this.renderer.options = this.options
        }
        Parser.parse = function(src, options) {
          var parser = new Parser(options);
          return parser.parse(src)
        };
        Parser.prototype.parse = function(src) {
          this.inline = new InlineLexer(src.links, this.options);
          this.inlineText = new InlineLexer(src.links, merge({}, this.options, {
            renderer: new TextRenderer
          }));
          this.tokens = src.reverse();
          var out = "";
          while (this.next()) {
            out += this.tok()
          }
          return out
        };
        Parser.prototype.next = function() {
          return this.token = this.tokens.pop()
        };
        Parser.prototype.peek = function() {
          return this.tokens[this.tokens.length - 1] || 0
        };
        Parser.prototype.parseText = function() {
          var body = this.token.text;
          while (this.peek().type === "text") {
            body += "\n" + this.next().text
          }
          return this.inline.output(body)
        };
        Parser.prototype.tok = function() {
          switch (this.token.type) {
            case "space":
              {
                return ""
              }
            case "hr":
              {
                return this.renderer.hr()
              }
            case "heading":
              {
                return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape(this.inlineText.output(this.token.text)))
              }
            case "code":
              {
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped)
              }
            case "table":
              {
                var header = "",
                  body = "",
                  i, row, cell, j;cell = "";
                for (i = 0; i < this.token.header.length; i++) {
                  cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), {
                    header: true,
                    align: this.token.align[i]
                  })
                }
                header += this.renderer.tablerow(cell);
                for (i = 0; i < this.token.cells.length; i++) {
                  row = this.token.cells[i];
                  cell = "";
                  for (j = 0; j < row.length; j++) {
                    cell += this.renderer.tablecell(this.inline.output(row[j]), {
                      header: false,
                      align: this.token.align[j]
                    })
                  }
                  body += this.renderer.tablerow(cell)
                }
                return this.renderer.table(header, body)
              }
            case "blockquote_start":
              {
                body = "";
                while (this.next().type !== "blockquote_end") {
                  body += this.tok()
                }
                return this.renderer.blockquote(body)
              }
            case "list_start":
              {
                body = "";
                var ordered = this.token.ordered,
                  start = this.token.start;
                while (this.next().type !== "list_end") {
                  body += this.tok()
                }
                return this.renderer.list(body, ordered, start)
              }
            case "list_item_start":
              {
                body = "";
                var loose = this.token.loose;
                if (this.token.task) {
                  body += this.renderer.checkbox(this.token.checked)
                }
                while (this.next().type !== "list_item_end") {
                  body += !loose && this.token.type === "text" ? this.parseText() : this.tok()
                }
                return this.renderer.listitem(body)
              }
            case "html":
              {
                return this.renderer.html(this.token.text)
              }
            case "paragraph":
              {
                return this.renderer.paragraph(this.inline.output(this.token.text))
              }
            case "text":
              {
                return this.renderer.paragraph(this.parseText())
              }
          }
        };

        function escape(html, encode) {
          if (encode) {
            if (escape.escapeTest.test(html)) {
              return html.replace(escape.escapeReplace, function(ch) {
                return escape.replacements[ch]
              })
            }
          } else {
            if (escape.escapeTestNoEncode.test(html)) {
              return html.replace(escape.escapeReplaceNoEncode, function(ch) {
                return escape.replacements[ch]
              })
            }
          }
          return html
        }
        escape.escapeTest = /[&<>"']/;
        escape.escapeReplace = /[&<>"']/g;
        escape.replacements = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
        escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

        function unescape(html) {
          return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function(_, n) {
            n = n.toLowerCase();
            if (n === "colon") return ":";
            if (n.charAt(0) === "#") {
              return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1))
            }
            return ""
          })
        }

        function edit(regex, opt) {
          regex = regex.source || regex;
          opt = opt || "";
          return {
            replace: function(name, val) {
              val = val.source || val;
              val = val.replace(/(^|[^\[])\^/g, "$1");
              regex = regex.replace(name, val);
              return this
            },
            getRegex: function() {
              return new RegExp(regex, opt)
            }
          }
        }

        function resolveUrl(base, href) {
          if (!baseUrls[" " + base]) {
            if (/^[^:]+:\/*[^/]*$/.test(base)) {
              baseUrls[" " + base] = base + "/"
            } else {
              baseUrls[" " + base] = rtrim(base, "/", true)
            }
          }
          base = baseUrls[" " + base];
          if (href.slice(0, 2) === "//") {
            return base.replace(/:[\s\S]*/, ":") + href
          } else if (href.charAt(0) === "/") {
            return base.replace(/(:\/*[^/]*)[\s\S]*/, "$1") + href
          } else {
            return base + href
          }
        }
        var baseUrls = {};
        var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

        function noop() {}
        noop.exec = noop;

        function merge(obj) {
          var i = 1,
            target, key;
          for (; i < arguments.length; i++) {
            target = arguments[i];
            for (key in target) {
              if (Object.prototype.hasOwnProperty.call(target, key)) {
                obj[key] = target[key]
              }
            }
          }
          return obj
        }

        function splitCells(tableRow, count) {
          var row = tableRow.replace(/\|/g, function(match, offset, str) {
              var escaped = false,
                curr = offset;
              while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
              if (escaped) {
                return "|"
              } else {
                return " |"
              }
            }),
            cells = row.split(/ \|/),
            i = 0;
          if (cells.length > count) {
            cells.splice(count)
          } else {
            while (cells.length < count) cells.push("")
          }
          for (; i < cells.length; i++) {
            cells[i] = cells[i].trim().replace(/\\\|/g, "|")
          }
          return cells
        }

        function rtrim(str, c, invert) {
          if (str.length === 0) {
            return ""
          }
          var suffLen = 0;
          while (suffLen < str.length) {
            var currChar = str.charAt(str.length - suffLen - 1);
            if (currChar === c && !invert) {
              suffLen++
            } else if (currChar !== c && invert) {
              suffLen++
            } else {
              break
            }
          }
          return str.substr(0, str.length - suffLen)
        }

        function marked(src, opt, callback) {
          if (typeof src === "undefined" || src === null) {
            throw new Error("marked(): input parameter is undefined or null")
          }
          if (typeof src !== "string") {
            throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected")
          }
          if (callback || typeof opt === "function") {
            if (!callback) {
              callback = opt;
              opt = null
            }
            opt = merge({}, marked.defaults, opt || {});
            var highlight = opt.highlight,
              tokens, pending, i = 0;
            try {
              tokens = Lexer.lex(src, opt)
            } catch (e) {
              return callback(e)
            }
            pending = tokens.length;
            var done = function(err) {
              if (err) {
                opt.highlight = highlight;
                return callback(err)
              }
              var out;
              try {
                out = Parser.parse(tokens, opt)
              } catch (e) {
                err = e
              }
              opt.highlight = highlight;
              return err ? callback(err) : callback(null, out)
            };
            if (!highlight || highlight.length < 3) {
              return done()
            }
            delete opt.highlight;
            if (!pending) return done();
            for (; i < tokens.length; i++) {
              (function(token) {
                if (token.type !== "code") {
                  return --pending || done()
                }
                return highlight(token.text, token.lang, function(err, code) {
                  if (err) return done(err);
                  if (code == null || code === token.text) {
                    return --pending || done()
                  }
                  token.text = code;
                  token.escaped = true;
                  --pending || done()
                })
              })(tokens[i])
            }
            return
          }
          try {
            if (opt) opt = merge({}, marked.defaults, opt);
            return Parser.parse(Lexer.lex(src, opt), opt)
          } catch (e) {
            e.message += "\nPlease report this to https://github.com/markedjs/marked.";
            if ((opt || marked.defaults).silent) {
              return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>"
            }
            throw e
          }
        }
        marked.options = marked.setOptions = function(opt) {
          merge(marked.defaults, opt);
          return marked
        };
        marked.getDefaults = function() {
          return {
            baseUrl: null,
            breaks: false,
            gfm: true,
            headerIds: true,
            headerPrefix: "",
            highlight: null,
            langPrefix: "language-",
            mangle: true,
            pedantic: false,
            renderer: new Renderer,
            sanitize: false,
            sanitizer: null,
            silent: false,
            smartLists: false,
            smartypants: false,
            tables: true,
            xhtml: false
          }
        };
        marked.defaults = marked.getDefaults();
        marked.Parser = Parser;
        marked.parser = Parser.parse;
        marked.Renderer = Renderer;
        marked.TextRenderer = TextRenderer;
        marked.Lexer = Lexer;
        marked.lexer = Lexer.lex;
        marked.InlineLexer = InlineLexer;
        marked.inlineLexer = InlineLexer.output;
        marked.parse = marked;
        if (typeof module !== "undefined" && typeof exports === "object") {
          module.exports = marked
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return marked
          })
        } else {
          root.marked = marked
        }
      })(this || (typeof window !== "undefined" ? window : global))
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {}],
  34: [function(require, module, exports) {
    (function(process) {
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1)
          } else if (last === "..") {
            parts.splice(i, 1);
            up++
          } else if (up) {
            parts.splice(i, 1);
            up--
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift("..")
          }
        }
        return parts
      }
      exports.resolve = function() {
        var resolvedPath = "",
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : process.cwd();
          if (typeof path !== "string") {
            throw new TypeError("Arguments to path.resolve must be strings")
          } else if (!path) {
            continue
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charAt(0) === "/"
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path),
          trailingSlash = substr(path, -1) === "/";
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p
        }), !isAbsolute).join("/");
        if (!path && !isAbsolute) {
          path = "."
        }
        if (path && trailingSlash) {
          path += "/"
        }
        return (isAbsolute ? "/" : "") + path
      };
      exports.isAbsolute = function(path) {
        return path.charAt(0) === "/"
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(filter(paths, function(p, index) {
          if (typeof p !== "string") {
            throw new TypeError("Arguments to path.join must be strings")
          }
          return p
        }).join("/"))
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);

        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "") break
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "") break
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1)
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..")
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/")
      };
      exports.sep = "/";
      exports.delimiter = ":";
      exports.dirname = function(path) {
        if (typeof path !== "string") path = path + "";
        if (path.length === 0) return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break
            }
          } else {
            matchedSlash = false
          }
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) {
          return "/"
        }
        return path.slice(0, end)
      };

      function basename(path) {
        if (typeof path !== "string") path = path + "";
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        for (i = path.length - 1; i >= 0; --i) {
          if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1
          }
        }
        if (end === -1) return "";
        return path.slice(start, end)
      }
      exports.basename = function(path, ext) {
        var f = basename(path);
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length)
        }
        return f
      };
      exports.extname = function(path) {
        if (typeof path !== "string") path = path + "";
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break
            }
            continue
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1
          } else if (startDot !== -1) {
            preDotState = -1
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return ""
        }
        return path.slice(startDot, end)
      };

      function filter(xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i])
        }
        return res
      }
      var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
        return str.substr(start, len)
      } : function(str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len)
      }
    }).call(this, require("_process"))
  }, {
    _process: 35
  }],
  35: [function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined")
    }(function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout
        } else {
          cachedSetTimeout = defaultSetTimout
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout
        } else {
          cachedClearTimeout = defaultClearTimeout
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout
      }
    })();

    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0)
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0)
      }
      try {
        return cachedSetTimeout(fun, 0)
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0)
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0)
        }
      }
    }

    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker)
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker)
      }
      try {
        return cachedClearTimeout(marker)
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker)
        } catch (e) {
          return cachedClearTimeout.call(this, marker)
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue)
      } else {
        queueIndex = -1
      }
      if (queue.length) {
        drainQueue()
      }
    }

    function drainQueue() {
      if (draining) {
        return
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run()
          }
        }
        queueIndex = -1;
        len = queue.length
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout)
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i]
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue)
      }
    };

    function Item(fun, array) {
      this.fun = fun;
      this.array = array
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array)
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};

    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return []
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported")
    };
    process.cwd = function() {
      return "/"
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported")
    };
    process.umask = function() {
      return 0
    }
  }, {}],
  36: [function(require, module, exports) {
    var util = require("./util");
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";

    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? new Map : Object.create(null)
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet;
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates)
      }
      return set
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr)
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx)
        } else {
          this._set[sStr] = idx
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr)
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr)
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr]
        }
      }
      throw new Error('"' + aStr + '" is not in the set.')
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx]
      }
      throw new Error("No element indexed by " + aIdx)
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice()
    };
    exports.ArraySet = ArraySet
  }, {
    "./util": 45
  }],
  37: [function(require, module, exports) {
    var base64 = require("./base64");
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;

    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0
    }

    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT
        }
        encoded += base64.encode(digit)
      } while (vlq > 0);
      return encoded
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.")
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1))
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex
    }
  }, {
    "./base64": 38
  }],
  38: [function(require, module, exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number]
      }
      throw new TypeError("Must be between 0 and 63: " + number)
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset
      }
      if (charCode == plus) {
        return 62
      }
      if (charCode == slash) {
        return 63
      }
      return -1
    }
  }, {}],
  39: [function(require, module, exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;

    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias)
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1
        } else {
          return mid
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias)
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid
        } else {
          return aLow < 0 ? -1 : aLow
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1
      }
      var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
      if (index < 0) {
        return -1
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break
        }--index
      }
      return index
    }
  }, {}],
  40: [function(require, module, exports) {
    var util = require("./util");

    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0
    }

    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = {
        generatedLine: -1,
        generatedColumn: 0
      }
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg)
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping)
      } else {
        this._sorted = false;
        this._array.push(aMapping)
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true
      }
      return this._array
    };
    exports.MappingList = MappingList
  }, {
    "./util": 45
  }],
  41: [function(require, module, exports) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp
    }

    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low))
    }

    function doQuickSort(ary, comparator, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p; j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j)
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r)
      }
    }
    exports.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1)
    }
  }, {}],
  42: [function(require, module, exports) {
    var util = require("./util");
    var binarySearch = require("./binary-search");
    var ArraySet = require("./array-set").ArraySet;
    var base64VLQ = require("./base64-vlq");
    var quickSort = require("./quick-sort").quickSort;

    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap)
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL)
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL)
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot)
        }
        return this.__generatedMappings
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot)
        }
        return this.__originalMappings
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ","
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings")
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.")
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        }
      }, this).forEach(aCallback, context)
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return []
      }
      var mappings = [];
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index]
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index]
          }
        }
      }
      return mappings
    };
    exports.SourceMapConsumer = SourceMapConsumer;

    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap)
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version)
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot)
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL)
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource)
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource)
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i
        }
      }
      return -1
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL)
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name)
          }
          destOriginalMappings.push(destMapping)
        }
        destGeneratedMappings.push(destMapping)
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice()
      }
    });

    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0
        } else if (aStr.charAt(index) === ",") {
          index++
        } else {
          mapping = new Mapping;
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break
            }
          }
          str = aStr.slice(index, end);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value)
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column")
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column")
            }
            cachedSegments[str] = segment
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4]
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping)
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName])
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName])
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias)
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue
          }
        }
        mapping.lastGeneratedColumn = Infinity
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL)
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name)
          }
          return {
            source: source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name: name
          }
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      }
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null
      })
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index]
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource)
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)]
        }
      }
      if (nullOnMissing) {
        return null
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.')
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        }
      }
      var needle = {
        source: source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          }
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      }
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap)
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version)
      }
      this._sources = new ArraySet;
      this._names = new ArraySet;
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.")
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.")
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        }
      })
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j])
          }
        }
        return sources
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp
        }
        return needle.generatedColumn - section.generatedOffset.generatedColumn
      });
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        }
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      })
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources()
      })
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content
        }
      }
      if (nullOnMissing) {
        return null
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.')
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret
        }
      }
      return {
        line: null,
        column: null
      }
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name)
          }
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping)
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions)
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer
  }, {
    "./array-set": 36,
    "./base64-vlq": 37,
    "./binary-search": 39,
    "./quick-sort": 41,
    "./util": 45
  }],
  43: [function(require, module, exports) {
    var base64VLQ = require("./base64-vlq");
    var util = require("./util");
    var ArraySet = require("./array-set").ArraySet;
    var MappingList = require("./mapping-list").MappingList;

    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {}
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet;
      this._names = new ArraySet;
      this._mappings = new MappingList;
      this._sourcesContents = null
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source)
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name
          }
        }
        generator.addMapping(newMapping)
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile)
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative)
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content)
        }
      });
      return generator
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name)
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source)
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name)
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      })
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source)
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = Object.create(null)
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, " + 'or the source map\'s "file" property. Both were omitted.')
        }
        sourceFile = aSourceMapConsumer.file
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile)
      }
      var newSources = new ArraySet;
      var newNames = new ArraySet;
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source)
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source)
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name)
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile)
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile)
          }
          this.setSourceContent(sourceFile, content)
        }
      }, this)
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error("original.line and original.column are not numbers -- you probably meant to omit " + "the original mapping entirely and only map the generated position. If so, pass " + "null for the original mapping instead of an object with empty or null values.")
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }))
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue
            }
            next += ","
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx
          }
        }
        result += next
      }
      return result
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source)
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null
      }, this)
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)
      }
      return map
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON())
    };
    exports.SourceMapGenerator = SourceMapGenerator
  }, {
    "./array-set": 36,
    "./base64-vlq": 37,
    "./mapping-list": 40,
    "./util": 45
  }],
  44: [function(require, module, exports) {
    var SourceMapGenerator = require("./source-map-generator").SourceMapGenerator;
    var util = require("./util");
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";

    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks)
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode;
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;

        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined
        }
      };
      var lastGeneratedLine = 1,
        lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn
        }
        lastMapping = mapping
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine())
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""))
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile)
          }
          node.setSourceContent(sourceFile, content)
        }
      });
      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code)
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name))
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk)
        }, this)
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk)
        }
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk)
      }
      return this
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i])
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk)
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk)
      }
      return this
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn)
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            })
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep)
        }
        newChildren.push(this.children[i]);
        this.children = newChildren
      }
      return this
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement)
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement)
      } else {
        this.children.push("".replace(aPattern, aReplacement))
      }
      return this
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn)
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]])
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk
      });
      return str
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            })
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              })
            }
          } else {
            generated.column++
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent)
      });
      return {
        code: generated.code,
        map: map
      }
    };
    exports.SourceNode = SourceNode
  }, {
    "./source-map-generator": 43,
    "./util": 45
  }],
  45: [function(require, module, exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName]
      } else if (arguments.length === 3) {
        return aDefaultValue
      } else {
        throw new Error('"' + aName + '" is a required argument.')
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;

    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      }
    }
    exports.urlParse = urlParse;

    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":"
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@"
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path
      }
      return url
    }
    exports.urlGenerate = urlGenerate;

    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath
        }
        path = url.path
      }
      var isAbsolute = exports.isAbsolute(path);
      var parts = path.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1)
        } else if (part === "..") {
          up++
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0
          } else {
            parts.splice(i, 2);
            up--
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : "."
      }
      if (url) {
        url.path = path;
        return urlGenerate(url)
      }
      return path
    }
    exports.normalize = normalize;

    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = "."
      }
      if (aPath === "") {
        aPath = "."
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/"
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme
        }
        return urlGenerate(aPathUrl)
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl)
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl)
      }
      return joined
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath)
    };

    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = "."
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath
        }++level
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1)
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = Object.create(null);
      return !("__proto__" in obj)
    }();

    function identity(s) {
      return s
    }

    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr
      }
      return aStr
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;

    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1)
      }
      return aStr
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;

    function isProtoString(s) {
      if (!s) {
        return false
      }
      var length = s.length;
      if (length < 9) {
        return false
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false
        }
      }
      return true
    }

    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp
      }
      return strcmp(mappingA.name, mappingB.name)
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;

    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp
      }
      return strcmp(mappingA.name, mappingB.name)
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0
      }
      if (aStr1 === null) {
        return 1
      }
      if (aStr2 === null) {
        return -1
      }
      if (aStr1 > aStr2) {
        return 1
      }
      return -1
    }

    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp
      }
      return strcmp(mappingA.name, mappingB.name)
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""))
    }
    exports.parseSourceMapInput = parseSourceMapInput;

    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/"
        }
        sourceURL = sourceRoot + sourceURL
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed")
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1)
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL)
      }
      return normalize(sourceURL)
    }
    exports.computeSourceURL = computeSourceURL
  }, {}],
  46: [function(require, module, exports) {
    exports.SourceMapGenerator = require("./lib/source-map-generator").SourceMapGenerator;
    exports.SourceMapConsumer = require("./lib/source-map-consumer").SourceMapConsumer;
    exports.SourceNode = require("./lib/source-node").SourceNode
  }, {
    "./lib/source-map-consumer": 42,
    "./lib/source-map-generator": 43,
    "./lib/source-node": 44
  }],
  47: [function(require, module, exports) {
    (function(global) {
      (function() {
        var root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || this || {};
        var previousUnderscore = root._;
        var ArrayProto = Array.prototype,
          ObjProto = Object.prototype;
        var SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
        var push = ArrayProto.push,
          slice = ArrayProto.slice,
          toString = ObjProto.toString,
          hasOwnProperty = ObjProto.hasOwnProperty;
        var nativeIsArray = Array.isArray,
          nativeKeys = Object.keys,
          nativeCreate = Object.create;
        var Ctor = function() {};
        var _ = function(obj) {
          if (obj instanceof _) return obj;
          if (!(this instanceof _)) return new _(obj);
          this._wrapped = obj
        };
        if (typeof exports != "undefined" && !exports.nodeType) {
          if (typeof module != "undefined" && !module.nodeType && module.exports) {
            exports = module.exports = _
          }
          exports._ = _
        } else {
          root._ = _
        }
        _.VERSION = "1.9.1";
        var optimizeCb = function(func, context, argCount) {
          if (context === void 0) return func;
          switch (argCount == null ? 3 : argCount) {
            case 1:
              return function(value) {
                return func.call(context, value)
              };
            case 3:
              return function(value, index, collection) {
                return func.call(context, value, index, collection)
              };
            case 4:
              return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection)
              }
          }
          return function() {
            return func.apply(context, arguments)
          }
        };
        var builtinIteratee;
        var cb = function(value, context, argCount) {
          if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
          if (value == null) return _.identity;
          if (_.isFunction(value)) return optimizeCb(value, context, argCount);
          if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
          return _.property(value)
        };
        _.iteratee = builtinIteratee = function(value, context) {
          return cb(value, context, Infinity)
        };
        var restArguments = function(func, startIndex) {
          startIndex = startIndex == null ? func.length - 1 : +startIndex;
          return function() {
            var length = Math.max(arguments.length - startIndex, 0),
              rest = Array(length),
              index = 0;
            for (; index < length; index++) {
              rest[index] = arguments[index + startIndex]
            }
            switch (startIndex) {
              case 0:
                return func.call(this, rest);
              case 1:
                return func.call(this, arguments[0], rest);
              case 2:
                return func.call(this, arguments[0], arguments[1], rest)
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
              args[index] = arguments[index]
            }
            args[startIndex] = rest;
            return func.apply(this, args)
          }
        };
        var baseCreate = function(prototype) {
          if (!_.isObject(prototype)) return {};
          if (nativeCreate) return nativeCreate(prototype);
          Ctor.prototype = prototype;
          var result = new Ctor;
          Ctor.prototype = null;
          return result
        };
        var shallowProperty = function(key) {
          return function(obj) {
            return obj == null ? void 0 : obj[key]
          }
        };
        var has = function(obj, path) {
          return obj != null && hasOwnProperty.call(obj, path)
        };
        var deepGet = function(obj, path) {
          var length = path.length;
          for (var i = 0; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]]
          }
          return length ? obj : void 0
        };
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        var getLength = shallowProperty("length");
        var isArrayLike = function(collection) {
          var length = getLength(collection);
          return typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
        };
        _.each = _.forEach = function(obj, iteratee, context) {
          iteratee = optimizeCb(iteratee, context);
          var i, length;
          if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
              iteratee(obj[i], i, obj)
            }
          } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
              iteratee(obj[keys[i]], keys[i], obj)
            }
          }
          return obj
        };
        _.map = _.collect = function(obj, iteratee, context) {
          iteratee = cb(iteratee, context);
          var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
          for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj)
          }
          return results
        };
        var createReduce = function(dir) {
          var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
              length = (keys || obj).length,
              index = dir > 0 ? 0 : length - 1;
            if (!initial) {
              memo = obj[keys ? keys[index] : index];
              index += dir
            }
            for (; index >= 0 && index < length; index += dir) {
              var currentKey = keys ? keys[index] : index;
              memo = iteratee(memo, obj[currentKey], currentKey, obj)
            }
            return memo
          };
          return function(obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial)
          }
        };
        _.reduce = _.foldl = _.inject = createReduce(1);
        _.reduceRight = _.foldr = createReduce(-1);
        _.find = _.detect = function(obj, predicate, context) {
          var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
          var key = keyFinder(obj, predicate, context);
          if (key !== void 0 && key !== -1) return obj[key]
        };
        _.filter = _.select = function(obj, predicate, context) {
          var results = [];
          predicate = cb(predicate, context);
          _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value)
          });
          return results
        };
        _.reject = function(obj, predicate, context) {
          return _.filter(obj, _.negate(cb(predicate)), context)
        };
        _.every = _.all = function(obj, predicate, context) {
          predicate = cb(predicate, context);
          var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
          for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false
          }
          return true
        };
        _.some = _.any = function(obj, predicate, context) {
          predicate = cb(predicate, context);
          var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
          for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true
          }
          return false
        };
        _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
          if (!isArrayLike(obj)) obj = _.values(obj);
          if (typeof fromIndex != "number" || guard) fromIndex = 0;
          return _.indexOf(obj, item, fromIndex) >= 0
        };
        _.invoke = restArguments(function(obj, path, args) {
          var contextPath, func;
          if (_.isFunction(path)) {
            func = path
          } else if (_.isArray(path)) {
            contextPath = path.slice(0, -1);
            path = path[path.length - 1]
          }
          return _.map(obj, function(context) {
            var method = func;
            if (!method) {
              if (contextPath && contextPath.length) {
                context = deepGet(context, contextPath)
              }
              if (context == null) return void 0;
              method = context[path]
            }
            return method == null ? method : method.apply(context, args)
          })
        });
        _.pluck = function(obj, key) {
          return _.map(obj, _.property(key))
        };
        _.where = function(obj, attrs) {
          return _.filter(obj, _.matcher(attrs))
        };
        _.findWhere = function(obj, attrs) {
          return _.find(obj, _.matcher(attrs))
        };
        _.max = function(obj, iteratee, context) {
          var result = -Infinity,
            lastComputed = -Infinity,
            value, computed;
          if (iteratee == null || typeof iteratee == "number" && typeof obj[0] != "object" && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
              value = obj[i];
              if (value != null && value > result) {
                result = value
              }
            }
          } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
              computed = iteratee(v, index, list);
              if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                result = v;
                lastComputed = computed
              }
            })
          }
          return result
        };
        _.min = function(obj, iteratee, context) {
          var result = Infinity,
            lastComputed = Infinity,
            value, computed;
          if (iteratee == null || typeof iteratee == "number" && typeof obj[0] != "object" && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
              value = obj[i];
              if (value != null && value < result) {
                result = value
              }
            }
          } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(v, index, list) {
              computed = iteratee(v, index, list);
              if (computed < lastComputed || computed === Infinity && result === Infinity) {
                result = v;
                lastComputed = computed
              }
            })
          }
          return result
        };
        _.shuffle = function(obj) {
          return _.sample(obj, Infinity)
        };
        _.sample = function(obj, n, guard) {
          if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(obj.length - 1)]
          }
          var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
          var length = getLength(sample);
          n = Math.max(Math.min(n, length), 0);
          var last = length - 1;
          for (var index = 0; index < n; index++) {
            var rand = _.random(index, last);
            var temp = sample[index];
            sample[index] = sample[rand];
            sample[rand] = temp
          }
          return sample.slice(0, n)
        };
        _.sortBy = function(obj, iteratee, context) {
          var index = 0;
          iteratee = cb(iteratee, context);
          return _.pluck(_.map(obj, function(value, key, list) {
            return {
              value: value,
              index: index++,
              criteria: iteratee(value, key, list)
            }
          }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
              if (a > b || a === void 0) return 1;
              if (a < b || b === void 0) return -1
            }
            return left.index - right.index
          }), "value")
        };
        var group = function(behavior, partition) {
          return function(obj, iteratee, context) {
            var result = partition ? [
              [],
              []
            ] : {};
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index) {
              var key = iteratee(value, index, obj);
              behavior(result, value, key)
            });
            return result
          }
        };
        _.groupBy = group(function(result, value, key) {
          if (has(result, key)) result[key].push(value);
          else result[key] = [value]
        });
        _.indexBy = group(function(result, value, key) {
          result[key] = value
        });
        _.countBy = group(function(result, value, key) {
          if (has(result, key)) result[key]++;
          else result[key] = 1
        });
        var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        _.toArray = function(obj) {
          if (!obj) return [];
          if (_.isArray(obj)) return slice.call(obj);
          if (_.isString(obj)) {
            return obj.match(reStrSymbol)
          }
          if (isArrayLike(obj)) return _.map(obj, _.identity);
          return _.values(obj)
        };
        _.size = function(obj) {
          if (obj == null) return 0;
          return isArrayLike(obj) ? obj.length : _.keys(obj).length
        };
        _.partition = group(function(result, value, pass) {
          result[pass ? 0 : 1].push(value)
        }, true);
        _.first = _.head = _.take = function(array, n, guard) {
          if (array == null || array.length < 1) return n == null ? void 0 : [];
          if (n == null || guard) return array[0];
          return _.initial(array, array.length - n)
        };
        _.initial = function(array, n, guard) {
          return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)))
        };
        _.last = function(array, n, guard) {
          if (array == null || array.length < 1) return n == null ? void 0 : [];
          if (n == null || guard) return array[array.length - 1];
          return _.rest(array, Math.max(0, array.length - n))
        };
        _.rest = _.tail = _.drop = function(array, n, guard) {
          return slice.call(array, n == null || guard ? 1 : n)
        };
        _.compact = function(array) {
          return _.filter(array, Boolean)
        };
        var flatten = function(input, shallow, strict, output) {
          output = output || [];
          var idx = output.length;
          for (var i = 0, length = getLength(input); i < length; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
              if (shallow) {
                var j = 0,
                  len = value.length;
                while (j < len) output[idx++] = value[j++]
              } else {
                flatten(value, shallow, strict, output);
                idx = output.length
              }
            } else if (!strict) {
              output[idx++] = value
            }
          }
          return output
        };
        _.flatten = function(array, shallow) {
          return flatten(array, shallow, false)
        };
        _.without = restArguments(function(array, otherArrays) {
          return _.difference(array, otherArrays)
        });
        _.uniq = _.unique = function(array, isSorted, iteratee, context) {
          if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false
          }
          if (iteratee != null) iteratee = cb(iteratee, context);
          var result = [];
          var seen = [];
          for (var i = 0, length = getLength(array); i < length; i++) {
            var value = array[i],
              computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted && !iteratee) {
              if (!i || seen !== computed) result.push(value);
              seen = computed
            } else if (iteratee) {
              if (!_.contains(seen, computed)) {
                seen.push(computed);
                result.push(value)
              }
            } else if (!_.contains(result, value)) {
              result.push(value)
            }
          }
          return result
        };
        _.union = restArguments(function(arrays) {
          return _.uniq(flatten(arrays, true, true))
        });
        _.intersection = function(array) {
          var result = [];
          var argsLength = arguments.length;
          for (var i = 0, length = getLength(array); i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            var j;
            for (j = 1; j < argsLength; j++) {
              if (!_.contains(arguments[j], item)) break
            }
            if (j === argsLength) result.push(item)
          }
          return result
        };
        _.difference = restArguments(function(array, rest) {
          rest = flatten(rest, true, true);
          return _.filter(array, function(value) {
            return !_.contains(rest, value)
          })
        });
        _.unzip = function(array) {
          var length = array && _.max(array, getLength).length || 0;
          var result = Array(length);
          for (var index = 0; index < length; index++) {
            result[index] = _.pluck(array, index)
          }
          return result
        };
        _.zip = restArguments(_.unzip);
        _.object = function(list, values) {
          var result = {};
          for (var i = 0, length = getLength(list); i < length; i++) {
            if (values) {
              result[list[i]] = values[i]
            } else {
              result[list[i][0]] = list[i][1]
            }
          }
          return result
        };
        var createPredicateIndexFinder = function(dir) {
          return function(array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
              if (predicate(array[index], index, array)) return index
            }
            return -1
          }
        };
        _.findIndex = createPredicateIndexFinder(1);
        _.findLastIndex = createPredicateIndexFinder(-1);
        _.sortedIndex = function(array, obj, iteratee, context) {
          iteratee = cb(iteratee, context, 1);
          var value = iteratee(obj);
          var low = 0,
            high = getLength(array);
          while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1;
            else high = mid
          }
          return low
        };
        var createIndexFinder = function(dir, predicateFind, sortedIndex) {
          return function(array, item, idx) {
            var i = 0,
              length = getLength(array);
            if (typeof idx == "number") {
              if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(idx + length, i)
              } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1
              }
            } else if (sortedIndex && idx && length) {
              idx = sortedIndex(array, item);
              return array[idx] === item ? idx : -1
            }
            if (item !== item) {
              idx = predicateFind(slice.call(array, i, length), _.isNaN);
              return idx >= 0 ? idx + i : -1
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
              if (array[idx] === item) return idx
            }
            return -1
          }
        };
        _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
        _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
        _.range = function(start, stop, step) {
          if (stop == null) {
            stop = start || 0;
            start = 0
          }
          if (!step) {
            step = stop < start ? -1 : 1
          }
          var length = Math.max(Math.ceil((stop - start) / step), 0);
          var range = Array(length);
          for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start
          }
          return range
        };
        _.chunk = function(array, count) {
          if (count == null || count < 1) return [];
          var result = [];
          var i = 0,
            length = array.length;
          while (i < length) {
            result.push(slice.call(array, i, i += count))
          }
          return result
        };
        var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
          if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
          var self = baseCreate(sourceFunc.prototype);
          var result = sourceFunc.apply(self, args);
          if (_.isObject(result)) return result;
          return self
        };
        _.bind = restArguments(function(func, context, args) {
          if (!_.isFunction(func)) throw new TypeError("Bind must be called on a function");
          var bound = restArguments(function(callArgs) {
            return executeBound(func, bound, context, this, args.concat(callArgs))
          });
          return bound
        });
        _.partial = restArguments(function(func, boundArgs) {
          var placeholder = _.partial.placeholder;
          var bound = function() {
            var position = 0,
              length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
              args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i]
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args)
          };
          return bound
        });
        _.partial.placeholder = _;
        _.bindAll = restArguments(function(obj, keys) {
          keys = flatten(keys, false, false);
          var index = keys.length;
          if (index < 1) throw new Error("bindAll must be passed function names");
          while (index--) {
            var key = keys[index];
            obj[key] = _.bind(obj[key], obj)
          }
        });
        _.memoize = function(func, hasher) {
          var memoize = function(key) {
            var cache = memoize.cache;
            var address = "" + (hasher ? hasher.apply(this, arguments) : key);
            if (!has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address]
          };
          memoize.cache = {};
          return memoize
        };
        _.delay = restArguments(function(func, wait, args) {
          return setTimeout(function() {
            return func.apply(null, args)
          }, wait)
        });
        _.defer = _.partial(_.delay, _, 1);
        _.throttle = function(func, wait, options) {
          var timeout, context, args, result;
          var previous = 0;
          if (!options) options = {};
          var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null
          };
          var throttled = function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                clearTimeout(timeout);
                timeout = null
              }
              previous = now;
              result = func.apply(context, args);
              if (!timeout) context = args = null
            } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining)
            }
            return result
          };
          throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null
          };
          return throttled
        };
        _.debounce = function(func, wait, immediate) {
          var timeout, result;
          var later = function(context, args) {
            timeout = null;
            if (args) result = func.apply(context, args)
          };
          var debounced = restArguments(function(args) {
            if (timeout) clearTimeout(timeout);
            if (immediate) {
              var callNow = !timeout;
              timeout = setTimeout(later, wait);
              if (callNow) result = func.apply(this, args)
            } else {
              timeout = _.delay(later, wait, this, args)
            }
            return result
          });
          debounced.cancel = function() {
            clearTimeout(timeout);
            timeout = null
          };
          return debounced
        };
        _.wrap = function(func, wrapper) {
          return _.partial(wrapper, func)
        };
        _.negate = function(predicate) {
          return function() {
            return !predicate.apply(this, arguments)
          }
        };
        _.compose = function() {
          var args = arguments;
          var start = args.length - 1;
          return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result
          }
        };
        _.after = function(times, func) {
          return function() {
            if (--times < 1) {
              return func.apply(this, arguments)
            }
          }
        };
        _.before = function(times, func) {
          var memo;
          return function() {
            if (--times > 0) {
              memo = func.apply(this, arguments)
            }
            if (times <= 1) func = null;
            return memo
          }
        };
        _.once = _.partial(_.before, 2);
        _.restArguments = restArguments;
        var hasEnumBug = !{
          toString: null
        }.propertyIsEnumerable("toString");
        var nonEnumerableProps = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        var collectNonEnumProps = function(obj, keys) {
          var nonEnumIdx = nonEnumerableProps.length;
          var constructor = obj.constructor;
          var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
          var prop = "constructor";
          if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
          while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
              keys.push(prop)
            }
          }
        };
        _.keys = function(obj) {
          if (!_.isObject(obj)) return [];
          if (nativeKeys) return nativeKeys(obj);
          var keys = [];
          for (var key in obj)
            if (has(obj, key)) keys.push(key);
          if (hasEnumBug) collectNonEnumProps(obj, keys);
          return keys
        };
        _.allKeys = function(obj) {
          if (!_.isObject(obj)) return [];
          var keys = [];
          for (var key in obj) keys.push(key);
          if (hasEnumBug) collectNonEnumProps(obj, keys);
          return keys
        };
        _.values = function(obj) {
          var keys = _.keys(obj);
          var length = keys.length;
          var values = Array(length);
          for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]]
          }
          return values
        };
        _.mapObject = function(obj, iteratee, context) {
          iteratee = cb(iteratee, context);
          var keys = _.keys(obj),
            length = keys.length,
            results = {};
          for (var index = 0; index < length; index++) {
            var currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj)
          }
          return results
        };
        _.pairs = function(obj) {
          var keys = _.keys(obj);
          var length = keys.length;
          var pairs = Array(length);
          for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]]
          }
          return pairs
        };
        _.invert = function(obj) {
          var result = {};
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i]
          }
          return result
        };
        _.functions = _.methods = function(obj) {
          var names = [];
          for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key)
          }
          return names.sort()
        };
        var createAssigner = function(keysFunc, defaults) {
          return function(obj) {
            var length = arguments.length;
            if (defaults) obj = Object(obj);
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
              var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
              for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (!defaults || obj[key] === void 0) obj[key] = source[key]
              }
            }
            return obj
          }
        };
        _.extend = createAssigner(_.allKeys);
        _.extendOwn = _.assign = createAssigner(_.keys);
        _.findKey = function(obj, predicate, context) {
          predicate = cb(predicate, context);
          var keys = _.keys(obj),
            key;
          for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key
          }
        };
        var keyInObj = function(value, key, obj) {
          return key in obj
        };
        _.pick = restArguments(function(obj, keys) {
          var result = {},
            iteratee = keys[0];
          if (obj == null) return result;
          if (_.isFunction(iteratee)) {
            if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
            keys = _.allKeys(obj)
          } else {
            iteratee = keyInObj;
            keys = flatten(keys, false, false);
            obj = Object(obj)
          }
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) result[key] = value
          }
          return result
        });
        _.omit = restArguments(function(obj, keys) {
          var iteratee = keys[0],
            context;
          if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
            if (keys.length > 1) context = keys[1]
          } else {
            keys = _.map(flatten(keys, false, false), String);
            iteratee = function(value, key) {
              return !_.contains(keys, key)
            }
          }
          return _.pick(obj, iteratee, context)
        });
        _.defaults = createAssigner(_.allKeys, true);
        _.create = function(prototype, props) {
          var result = baseCreate(prototype);
          if (props) _.extendOwn(result, props);
          return result
        };
        _.clone = function(obj) {
          if (!_.isObject(obj)) return obj;
          return _.isArray(obj) ? obj.slice() : _.extend({}, obj)
        };
        _.tap = function(obj, interceptor) {
          interceptor(obj);
          return obj
        };
        _.isMatch = function(object, attrs) {
          var keys = _.keys(attrs),
            length = keys.length;
          if (object == null) return !length;
          var obj = Object(object);
          for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false
          }
          return true
        };
        var eq, deepEq;
        eq = function(a, b, aStack, bStack) {
          if (a === b) return a !== 0 || 1 / a === 1 / b;
          if (a == null || b == null) return false;
          if (a !== a) return b !== b;
          var type = typeof a;
          if (type !== "function" && type !== "object" && typeof b != "object") return false;
          return deepEq(a, b, aStack, bStack)
        };
        deepEq = function(a, b, aStack, bStack) {
          if (a instanceof _) a = a._wrapped;
          if (b instanceof _) b = b._wrapped;
          var className = toString.call(a);
          if (className !== toString.call(b)) return false;
          switch (className) {
            case "[object RegExp]":
            case "[object String]":
              return "" + a === "" + b;
            case "[object Number]":
              if (+a !== +a) return +b !== +b;
              return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case "[object Date]":
            case "[object Boolean]":
              return +a === +b;
            case "[object Symbol]":
              return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b)
          }
          var areArrays = className === "[object Array]";
          if (!areArrays) {
            if (typeof a != "object" || typeof b != "object") return false;
            var aCtor = a.constructor,
              bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
              return false
            }
          }
          aStack = aStack || [];
          bStack = bStack || [];
          var length = aStack.length;
          while (length--) {
            if (aStack[length] === a) return bStack[length] === b
          }
          aStack.push(a);
          bStack.push(b);
          if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;
            while (length--) {
              if (!eq(a[length], b[length], aStack, bStack)) return false
            }
          } else {
            var keys = _.keys(a),
              key;
            length = keys.length;
            if (_.keys(b).length !== length) return false;
            while (length--) {
              key = keys[length];
              if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false
            }
          }
          aStack.pop();
          bStack.pop();
          return true
        };
        _.isEqual = function(a, b) {
          return eq(a, b)
        };
        _.isEmpty = function(obj) {
          if (obj == null) return true;
          if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
          return _.keys(obj).length === 0
        };
        _.isElement = function(obj) {
          return !!(obj && obj.nodeType === 1)
        };
        _.isArray = nativeIsArray || function(obj) {
          return toString.call(obj) === "[object Array]"
        };
        _.isObject = function(obj) {
          var type = typeof obj;
          return type === "function" || type === "object" && !!obj
        };
        _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function(name) {
          _["is" + name] = function(obj) {
            return toString.call(obj) === "[object " + name + "]"
          }
        });
        if (!_.isArguments(arguments)) {
          _.isArguments = function(obj) {
            return has(obj, "callee")
          }
        }
        var nodelist = root.document && root.document.childNodes;
        if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
          _.isFunction = function(obj) {
            return typeof obj == "function" || false
          }
        }
        _.isFinite = function(obj) {
          return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj))
        };
        _.isNaN = function(obj) {
          return _.isNumber(obj) && isNaN(obj)
        };
        _.isBoolean = function(obj) {
          return obj === true || obj === false || toString.call(obj) === "[object Boolean]"
        };
        _.isNull = function(obj) {
          return obj === null
        };
        _.isUndefined = function(obj) {
          return obj === void 0
        };
        _.has = function(obj, path) {
          if (!_.isArray(path)) {
            return has(obj, path)
          }
          var length = path.length;
          for (var i = 0; i < length; i++) {
            var key = path[i];
            if (obj == null || !hasOwnProperty.call(obj, key)) {
              return false
            }
            obj = obj[key]
          }
          return !!length
        };
        _.noConflict = function() {
          root._ = previousUnderscore;
          return this
        };
        _.identity = function(value) {
          return value
        };
        _.constant = function(value) {
          return function() {
            return value
          }
        };
        _.noop = function() {};
        _.property = function(path) {
          if (!_.isArray(path)) {
            return shallowProperty(path)
          }
          return function(obj) {
            return deepGet(obj, path)
          }
        };
        _.propertyOf = function(obj) {
          if (obj == null) {
            return function() {}
          }
          return function(path) {
            return !_.isArray(path) ? obj[path] : deepGet(obj, path)
          }
        };
        _.matcher = _.matches = function(attrs) {
          attrs = _.extendOwn({}, attrs);
          return function(obj) {
            return _.isMatch(obj, attrs)
          }
        };
        _.times = function(n, iteratee, context) {
          var accum = Array(Math.max(0, n));
          iteratee = optimizeCb(iteratee, context, 1);
          for (var i = 0; i < n; i++) accum[i] = iteratee(i);
          return accum
        };
        _.random = function(min, max) {
          if (max == null) {
            max = min;
            min = 0
          }
          return min + Math.floor(Math.random() * (max - min + 1))
        };
        _.now = Date.now || function() {
          return (new Date).getTime()
        };
        var escapeMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        };
        var unescapeMap = _.invert(escapeMap);
        var createEscaper = function(map) {
          var escaper = function(match) {
            return map[match]
          };
          var source = "(?:" + _.keys(map).join("|") + ")";
          var testRegexp = RegExp(source);
          var replaceRegexp = RegExp(source, "g");
          return function(string) {
            string = string == null ? "" : "" + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
          }
        };
        _.escape = createEscaper(escapeMap);
        _.unescape = createEscaper(unescapeMap);
        _.result = function(obj, path, fallback) {
          if (!_.isArray(path)) path = [path];
          var length = path.length;
          if (!length) {
            return _.isFunction(fallback) ? fallback.call(obj) : fallback
          }
          for (var i = 0; i < length; i++) {
            var prop = obj == null ? void 0 : obj[path[i]];
            if (prop === void 0) {
              prop = fallback;
              i = length
            }
            obj = _.isFunction(prop) ? prop.call(obj) : prop
          }
          return obj
        };
        var idCounter = 0;
        _.uniqueId = function(prefix) {
          var id = ++idCounter + "";
          return prefix ? prefix + id : id
        };
        _.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/;
        var escapes = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
        var escapeChar = function(match) {
          return "\\" + escapes[match]
        };
        _.template = function(text, settings, oldSettings) {
          if (!settings && oldSettings) settings = oldSettings;
          settings = _.defaults({}, settings, _.templateSettings);
          var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");
          var index = 0;
          var source = "__p+='";
          text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
            index = offset + match.length;
            if (escape) {
              source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"
            } else if (interpolate) {
              source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"
            } else if (evaluate) {
              source += "';\n" + evaluate + "\n__p+='"
            }
            return match
          });
          source += "';\n";
          if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
          source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
          var render;
          try {
            render = new Function(settings.variable || "obj", "_", source)
          } catch (e) {
            e.source = source;
            throw e
          }
          var template = function(data) {
            return render.call(this, data, _)
          };
          var argument = settings.variable || "obj";
          template.source = "function(" + argument + "){\n" + source + "}";
          return template
        };
        _.chain = function(obj) {
          var instance = _(obj);
          instance._chain = true;
          return instance
        };
        var chainResult = function(instance, obj) {
          return instance._chain ? _(obj).chain() : obj
        };
        _.mixin = function(obj) {
          _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
              var args = [this._wrapped];
              push.apply(args, arguments);
              return chainResult(this, func.apply(_, args))
            }
          });
          return _
        };
        _.mixin(_);
        _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
          var method = ArrayProto[name];
          _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === "shift" || name === "splice") && obj.length === 0) delete obj[0];
            return chainResult(this, obj)
          }
        });
        _.each(["concat", "join", "slice"], function(name) {
          var method = ArrayProto[name];
          _.prototype[name] = function() {
            return chainResult(this, method.apply(this._wrapped, arguments))
          }
        });
        _.prototype.value = function() {
          return this._wrapped
        };
        _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
        _.prototype.toString = function() {
          return String(this._wrapped)
        };
        if (typeof define == "function" && define.amd) {
          define("underscore", [], function() {
            return _
          })
        }
      })()
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {}],
  48: [function(require, module, exports) {
    var encode = require("../lib/encode");
    var decode = require("../lib/decode");
    var path = require("path");
    var Handlebars = require("handlebars");
    var parser = require("../lib/parser");
    var render = require("../lib/swimlanes_renderer");
    var templates = {};
    Handlebars.registerHelper("iff", function(lvalue, rvalue, options) {
      if (arguments.length < 3) throw new Error("Handlebars Helper iff needs 2 parameters");
      if (lvalue !== rvalue) {
        return options.inverse(this)
      } else {
        return options.fn(this)
      }
    });
    templates.laneTitles = Handlebars.compile('<div class="lane-titles {{position}}">\n  {{#each lanes}}\n    <div class="lane-title" data-index="{{@index}}" style="left:{{left}}%; width:{{width}}%"><span>{{{title}}}</span></div>\n  {{/each}}\n</div>\n');
    templates.elements = Handlebars.compile('<div class="elements">\n\n  {{#each elements}}\n\n    {{#iff type "message"}}\n      <div id="element_{{index}}" data-index="{{index}}" class="element">\n        <div class="message {{line}} {{toSelf}}" style="left:{{x}}%; width:{{width}}%">\n          <span>{{{text}}}</span>\n          {{#if left.arrow}}\n            <svg class="left arrow {{left.arrow}}">\n              {{#iff left.arrow "open"}}\n                {{#if ../highRes}}\n                  <polyline class="x2" points="18,6 6,14 18,22" />\n                {{else}}\n                  <polyline class="x1" points="9,3 3,7 9,11" />\n                {{/if}}\n              {{/iff}}\n              {{#iff left.arrow "closed"}}\n                {{#if ../highRes}}\n                  <polygon class="x2" points="18,6 6,14 18,22" />\n                {{else}}\n                  <polygon class="x1" points="9,3 3,7 9,11" />\n                {{/if}}\n              {{/iff}}\n              {{#iff left.arrow "dropped"}}\n                {{#if ../highRes}}\n                  <polyline class="x2" points="22,6 6,22" />\n                  <polyline class="x2" points="22,22 6,6" />\n                {{else}}\n                  <polyline class="x1" points="11,3 3,11" />\n                  <polyline class="x1" points="11,11 3,3" />\n                {{/if}}\n              {{/iff}}\n            </svg>\n          {{/if}}\n          {{#if right.arrow}}\n            <svg class="right arrow {{right.arrow}}">\n              {{#iff right.arrow "open"}}\n                {{#if ../highRes}}\n                  <polyline class="x2" points="6,6 18,14 6,22" />\n                {{else}}\n                  <polyline class="x1" points="3,3 9,7 3,11" />\n                {{/if}}\n              {{/iff}}\n              {{#iff right.arrow "closed"}}\n                {{#if ../highRes}}\n                  <polygon class="x2" points="6,6 18,14 6,22" />\n                {{else}}\n                  <polygon class="x1" points="3,3 9,7 3,11" />\n                {{/if}}\n              {{/iff}}\n              {{#iff right.arrow "dropped"}}\n                {{#if ../highRes}}\n                  <polyline class="x2" points="22,6,6,22" />\n                  <polyline class="x2" points="22,22,6,6" />\n                {{else}}\n                  <polyline class="x1" points="11,3 3,11" />\n                  <polyline class="x1" points="11,11 3,3" />\n                {{/if}}\n              {{/iff}}\n            </svg>\n          {{/if}}\n          {{#if toSelf}}\n            <div class="pointer">&nbsp;</div>\n          {{/if}}\n        </div>\n      </div>\n    {{/iff}}\n\n    {{#iff type "line"}}\n      <div id="element_{{index}}" data-index="{{index}}" class="element {{#if index}}v-space{{/if}}">\n        <div class="line {{line}}">\n          <span>{{{text}}}</span>\n        </div>\n      </div>\n    {{/iff}}\n\n    {{#iff type "delay"}}\n      <div id="element_{{index}}" data-index="{{index}}" class="element delay">\n        {{#if text}}\n          <div class="delay-text">\n            <span>{{{text}}}</span>\n          </div>\n        {{/if}}\n        {{#each x}}\n          <div class="lane-overlay" style="left:{{this}}%"></div>\n        {{/each}}\n      </div>\n    {{/iff}}\n\n    {{#iff type "note"}}\n      <div id="element_{{index}}" data-index="{{index}}" class="element">\n        <div class="note" style="left:{{x}}%; width:{{width}}%">\n          {{{text}}}\n        </div>\n      </div>\n    {{/iff}}\n\n    {{#iff type "if"}}\n      <div id="element_{{index}}" data-index="{{index}}" class="element if">\n        {{#if text}}\n          <div class="title"><span>{{{text}}}</span></div>\n        {{/if}}\n    {{/iff}}\n\n    {{#iff type "else"}}\n      </div>\n      <div id="element_{{index}}" data-index="{{index}}" class="element else">\n        {{#if text}}\n          <div class="title"><span>{{{text}}}</span></div>\n        {{/if}}\n    {{/iff}}\n\n    {{#iff type "end"}}\n      </div>\n    {{/iff}}\n\n  {{/each}}\n\n  {{#each lanes}}\n    <div class="lane-line" style="left:{{left}}%"></div>\n  {{/each}}\n</div>\n\n\n\n');
    window.onload = function() {
      var windowHeight, diagram, footer;
      var editLink = "";
      var swimlanes = {};
      var state = window.location.href.split("#")[1];
      var divId = window.location.href.split("#")[2];
      var options = window.location.href.split("#")[3];
      var text = atob(decodeURIComponent(state));
      //var text = decode(state);
      text = stripLeadingWhitespace(text);
      swimlanes.attributes = parser(text);
      diagram = render(swimlanes, templates);
      if (options && options.indexOf("edit-link") > -1) {
        editLink = '<div class="edit-link"><a target="_blank" href="https://swimlanes.io?edit#' + encode(text) + '">open in editor</a></div>'
      }
      footer = ''; 
      if (text.indexOf("{fa") > 0) addFA();
      document.querySelector("#content").insertAdjacentHTML("afterbegin", diagram);
      document.querySelector("#content").insertAdjacentHTML("beforeend", footer);
      windowHeight = h();
      sendPostMessage();
      window.onresize = function() {
        if (h() !== windowHeight) {
          windowHeight = h();
          sendPostMessage()
        }
      };
      function stripLeadingWhitespace(text) {
        var re;
        var trimLeft = 0;
        var strippedLines = [];
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.match(/\S/)) {
            trimLeft = line.search(/\S/);
            break
          }
        }
        re = new RegExp("^\\s{" + trimLeft + "}");
        lines.forEach(function(line) {
          strippedLines.push(line.replace(re, ""))
        });
        return strippedLines.join("\n")
      }

      function h() {
        return Math.floor(document.querySelector("#content").scrollHeight)
      }

      function sendPostMessage() {
        if (divId) {
          parent.postMessage("swimlanes-io:" + divId + ":" + (h() + 20), "*")
        }
      }

      function addFA() {
        var fa = document.createElement("script");
        fa.setAttribute("src", "https://kit.fontawesome.com/39bbd2152b.js");
        fa.onload = function() {
          setTimeout(sendPostMessage, 300)
        };
        document.querySelector("head").appendChild(fa)
      }
    }
  }, {
    "../lib/decode": 49,
    "../lib/encode": 51,
    "../lib/parser": 55,
    "../lib/swimlanes_renderer": 56,
    handlebars: 32,
    path: 34
  }],
  49: [function(require, module, exports) {
    var inflate = require("./inflate");
    module.exports = function(str) {
      return decodeURIComponent(escape(inflate(window.atob(str))))
    }
  }, {
    "./inflate": 53
  }],
  50: [function(require, module, exports) {
    var zip_WSIZE = 32768;
    var zip_STORED_BLOCK = 0;
    var zip_STATIC_TREES = 1;
    var zip_DYN_TREES = 2;
    var zip_DEFAULT_LEVEL = 6;
    var zip_FULL_SEARCH = true;
    var zip_INBUFSIZ = 32768;
    var zip_INBUF_EXTRA = 64;
    var zip_OUTBUFSIZ = 1024 * 8;
    var zip_window_size = 2 * zip_WSIZE;
    var zip_MIN_MATCH = 3;
    var zip_MAX_MATCH = 258;
    var zip_BITS = 16;
    var zip_LIT_BUFSIZE = 8192;
    var zip_HASH_BITS = 13;
    if (zip_LIT_BUFSIZE > zip_INBUFSIZ) alert("error: zip_INBUFSIZ is too small");
    if (zip_WSIZE << 1 > 1 << zip_BITS) alert("error: zip_WSIZE is too large");
    if (zip_HASH_BITS > zip_BITS - 1) alert("error: zip_HASH_BITS is too large");
    if (zip_HASH_BITS < 8 || zip_MAX_MATCH != 258) alert("error: Code too clever");
    var zip_DIST_BUFSIZE = zip_LIT_BUFSIZE;
    var zip_HASH_SIZE = 1 << zip_HASH_BITS;
    var zip_HASH_MASK = zip_HASH_SIZE - 1;
    var zip_WMASK = zip_WSIZE - 1;
    var zip_NIL = 0;
    var zip_TOO_FAR = 4096;
    var zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1;
    var zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD;
    var zip_SMALLEST = 1;
    var zip_MAX_BITS = 15;
    var zip_MAX_BL_BITS = 7;
    var zip_LENGTH_CODES = 29;
    var zip_LITERALS = 256;
    var zip_END_BLOCK = 256;
    var zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES;
    var zip_D_CODES = 30;
    var zip_BL_CODES = 19;
    var zip_REP_3_6 = 16;
    var zip_REPZ_3_10 = 17;
    var zip_REPZ_11_138 = 18;
    var zip_HEAP_SIZE = 2 * zip_L_CODES + 1;
    var zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1) / zip_MIN_MATCH);
    var zip_free_queue;
    var zip_qhead, zip_qtail;
    var zip_initflag;
    var zip_outbuf = null;
    var zip_outcnt, zip_outoff;
    var zip_complete;
    var zip_window;
    var zip_d_buf;
    var zip_l_buf;
    var zip_prev;
    var zip_bi_buf;
    var zip_bi_valid;
    var zip_block_start;
    var zip_ins_h;
    var zip_hash_head;
    var zip_prev_match;
    var zip_match_available;
    var zip_match_length;
    var zip_prev_length;
    var zip_strstart;
    var zip_match_start;
    var zip_eofile;
    var zip_lookahead;
    var zip_max_chain_length;
    var zip_max_lazy_match;
    var zip_compr_level;
    var zip_good_match;
    var zip_nice_match;
    var zip_dyn_ltree;
    var zip_dyn_dtree;
    var zip_static_ltree;
    var zip_static_dtree;
    var zip_bl_tree;
    var zip_l_desc;
    var zip_d_desc;
    var zip_bl_desc;
    var zip_bl_count;
    var zip_heap;
    var zip_heap_len;
    var zip_heap_max;
    var zip_depth;
    var zip_length_code;
    var zip_dist_code;
    var zip_base_length;
    var zip_base_dist;
    var zip_flag_buf;
    var zip_last_lit;
    var zip_last_dist;
    var zip_last_flags;
    var zip_flags;
    var zip_flag_bit;
    var zip_opt_len;
    var zip_static_len;
    var zip_deflate_data;
    var zip_deflate_pos;
    var zip_DeflateCT = function() {
      this.fc = 0;
      this.dl = 0
    };
    var zip_DeflateTreeDesc = function() {
      this.dyn_tree = null;
      this.static_tree = null;
      this.extra_bits = null;
      this.extra_base = 0;
      this.elems = 0;
      this.max_length = 0;
      this.max_code = 0
    };
    var zip_DeflateConfiguration = function(a, b, c, d) {
      this.good_length = a;
      this.max_lazy = b;
      this.nice_length = c;
      this.max_chain = d
    };
    var zip_DeflateBuffer = function() {
      this.next = null;
      this.len = 0;
      this.ptr = new Array(zip_OUTBUFSIZ);
      this.off = 0
    };
    var zip_extra_lbits = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0);
    var zip_extra_dbits = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
    var zip_extra_blbits = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7);
    var zip_bl_order = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
    var zip_configuration_table = new Array(new zip_DeflateConfiguration(0, 0, 0, 0), new zip_DeflateConfiguration(4, 4, 8, 4), new zip_DeflateConfiguration(4, 5, 16, 8), new zip_DeflateConfiguration(4, 6, 32, 32), new zip_DeflateConfiguration(4, 4, 16, 16), new zip_DeflateConfiguration(8, 16, 32, 32), new zip_DeflateConfiguration(8, 16, 128, 128), new zip_DeflateConfiguration(8, 32, 128, 256), new zip_DeflateConfiguration(32, 128, 258, 1024), new zip_DeflateConfiguration(32, 258, 258, 4096));
    var zip_deflate_start = function(level) {
      var i;
      if (!level) level = zip_DEFAULT_LEVEL;
      else if (level < 1) level = 1;
      else if (level > 9) level = 9;
      zip_compr_level = level;
      zip_initflag = false;
      zip_eofile = false;
      if (zip_outbuf != null) return;
      zip_free_queue = zip_qhead = zip_qtail = null;
      zip_outbuf = new Array(zip_OUTBUFSIZ);
      zip_window = new Array(zip_window_size);
      zip_d_buf = new Array(zip_DIST_BUFSIZE);
      zip_l_buf = new Array(zip_INBUFSIZ + zip_INBUF_EXTRA);
      zip_prev = new Array(1 << zip_BITS);
      zip_dyn_ltree = new Array(zip_HEAP_SIZE);
      for (i = 0; i < zip_HEAP_SIZE; i++) zip_dyn_ltree[i] = new zip_DeflateCT;
      zip_dyn_dtree = new Array(2 * zip_D_CODES + 1);
      for (i = 0; i < 2 * zip_D_CODES + 1; i++) zip_dyn_dtree[i] = new zip_DeflateCT;
      zip_static_ltree = new Array(zip_L_CODES + 2);
      for (i = 0; i < zip_L_CODES + 2; i++) zip_static_ltree[i] = new zip_DeflateCT;
      zip_static_dtree = new Array(zip_D_CODES);
      for (i = 0; i < zip_D_CODES; i++) zip_static_dtree[i] = new zip_DeflateCT;
      zip_bl_tree = new Array(2 * zip_BL_CODES + 1);
      for (i = 0; i < 2 * zip_BL_CODES + 1; i++) zip_bl_tree[i] = new zip_DeflateCT;
      zip_l_desc = new zip_DeflateTreeDesc;
      zip_d_desc = new zip_DeflateTreeDesc;
      zip_bl_desc = new zip_DeflateTreeDesc;
      zip_bl_count = new Array(zip_MAX_BITS + 1);
      zip_heap = new Array(2 * zip_L_CODES + 1);
      zip_depth = new Array(2 * zip_L_CODES + 1);
      zip_length_code = new Array(zip_MAX_MATCH - zip_MIN_MATCH + 1);
      zip_dist_code = new Array(512);
      zip_base_length = new Array(zip_LENGTH_CODES);
      zip_base_dist = new Array(zip_D_CODES);
      zip_flag_buf = new Array(parseInt(zip_LIT_BUFSIZE / 8))
    };
    var zip_deflate_end = function() {
      zip_free_queue = zip_qhead = zip_qtail = null;
      zip_outbuf = null;
      zip_window = null;
      zip_d_buf = null;
      zip_l_buf = null;
      zip_prev = null;
      zip_dyn_ltree = null;
      zip_dyn_dtree = null;
      zip_static_ltree = null;
      zip_static_dtree = null;
      zip_bl_tree = null;
      zip_l_desc = null;
      zip_d_desc = null;
      zip_bl_desc = null;
      zip_bl_count = null;
      zip_heap = null;
      zip_depth = null;
      zip_length_code = null;
      zip_dist_code = null;
      zip_base_length = null;
      zip_base_dist = null;
      zip_flag_buf = null
    };
    var zip_reuse_queue = function(p) {
      p.next = zip_free_queue;
      zip_free_queue = p
    };
    var zip_new_queue = function() {
      var p;
      if (zip_free_queue != null) {
        p = zip_free_queue;
        zip_free_queue = zip_free_queue.next
      } else p = new zip_DeflateBuffer;
      p.next = null;
      p.len = p.off = 0;
      return p
    };
    var zip_head1 = function(i) {
      return zip_prev[zip_WSIZE + i]
    };
    var zip_head2 = function(i, val) {
      return zip_prev[zip_WSIZE + i] = val
    };
    var zip_put_byte = function(c) {
      zip_outbuf[zip_outoff + zip_outcnt++] = c;
      if (zip_outoff + zip_outcnt == zip_OUTBUFSIZ) zip_qoutbuf()
    };
    var zip_put_short = function(w) {
      w &= 65535;
      if (zip_outoff + zip_outcnt < zip_OUTBUFSIZ - 2) {
        zip_outbuf[zip_outoff + zip_outcnt++] = w & 255;
        zip_outbuf[zip_outoff + zip_outcnt++] = w >>> 8
      } else {
        zip_put_byte(w & 255);
        zip_put_byte(w >>> 8)
      }
    };
    var zip_INSERT_STRING = function() {
      zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart + zip_MIN_MATCH - 1] & 255) & zip_HASH_MASK;
      zip_hash_head = zip_head1(zip_ins_h);
      zip_prev[zip_strstart & zip_WMASK] = zip_hash_head;
      zip_head2(zip_ins_h, zip_strstart)
    };
    var zip_SEND_CODE = function(c, tree) {
      zip_send_bits(tree[c].fc, tree[c].dl)
    };
    var zip_D_CODE = function(dist) {
      return (dist < 256 ? zip_dist_code[dist] : zip_dist_code[256 + (dist >> 7)]) & 255
    };
    var zip_SMALLER = function(tree, n, m) {
      return tree[n].fc < tree[m].fc || tree[n].fc == tree[m].fc && zip_depth[n] <= zip_depth[m]
    };
    var zip_read_buff = function(buff, offset, n) {
      var i;
      for (i = 0; i < n && zip_deflate_pos < zip_deflate_data.length; i++) buff[offset + i] = zip_deflate_data.charCodeAt(zip_deflate_pos++) & 255;
      return i
    };
    var zip_lm_init = function() {
      var j;
      for (j = 0; j < zip_HASH_SIZE; j++) zip_prev[zip_WSIZE + j] = 0;
      zip_max_lazy_match = zip_configuration_table[zip_compr_level].max_lazy;
      zip_good_match = zip_configuration_table[zip_compr_level].good_length;
      if (!zip_FULL_SEARCH) zip_nice_match = zip_configuration_table[zip_compr_level].nice_length;
      zip_max_chain_length = zip_configuration_table[zip_compr_level].max_chain;
      zip_strstart = 0;
      zip_block_start = 0;
      zip_lookahead = zip_read_buff(zip_window, 0, 2 * zip_WSIZE);
      if (zip_lookahead <= 0) {
        zip_eofile = true;
        zip_lookahead = 0;
        return
      }
      zip_eofile = false;
      while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) zip_fill_window();
      zip_ins_h = 0;
      for (j = 0; j < zip_MIN_MATCH - 1; j++) {
        zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[j] & 255) & zip_HASH_MASK
      }
    };
    var zip_longest_match = function(cur_match) {
      var chain_length = zip_max_chain_length;
      var scanp = zip_strstart;
      var matchp;
      var len;
      var best_len = zip_prev_length;
      var limit = zip_strstart > zip_MAX_DIST ? zip_strstart - zip_MAX_DIST : zip_NIL;
      var strendp = zip_strstart + zip_MAX_MATCH;
      var scan_end1 = zip_window[scanp + best_len - 1];
      var scan_end = zip_window[scanp + best_len];
      if (zip_prev_length >= zip_good_match) chain_length >>= 2;
      do {
        matchp = cur_match;
        if (zip_window[matchp + best_len] != scan_end || zip_window[matchp + best_len - 1] != scan_end1 || zip_window[matchp] != zip_window[scanp] || zip_window[++matchp] != zip_window[scanp + 1]) {
          continue
        }
        scanp += 2;
        matchp++;
        do {} while (zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && zip_window[++scanp] == zip_window[++matchp] && scanp < strendp);
        len = zip_MAX_MATCH - (strendp - scanp);
        scanp = strendp - zip_MAX_MATCH;
        if (len > best_len) {
          zip_match_start = cur_match;
          best_len = len;
          if (zip_FULL_SEARCH) {
            if (len >= zip_MAX_MATCH) break
          } else {
            if (len >= zip_nice_match) break
          }
          scan_end1 = zip_window[scanp + best_len - 1];
          scan_end = zip_window[scanp + best_len]
        }
      } while ((cur_match = zip_prev[cur_match & zip_WMASK]) > limit && --chain_length != 0);
      return best_len
    };
    var zip_fill_window = function() {
      var n, m;
      var more = zip_window_size - zip_lookahead - zip_strstart;
      if (more == -1) {
        more--
      } else if (zip_strstart >= zip_WSIZE + zip_MAX_DIST) {
        for (n = 0; n < zip_WSIZE; n++) zip_window[n] = zip_window[n + zip_WSIZE];
        zip_match_start -= zip_WSIZE;
        zip_strstart -= zip_WSIZE;
        zip_block_start -= zip_WSIZE;
        for (n = 0; n < zip_HASH_SIZE; n++) {
          m = zip_head1(n);
          zip_head2(n, m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL)
        }
        for (n = 0; n < zip_WSIZE; n++) {
          m = zip_prev[n];
          zip_prev[n] = m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL
        }
        more += zip_WSIZE
      }
      if (!zip_eofile) {
        n = zip_read_buff(zip_window, zip_strstart + zip_lookahead, more);
        if (n <= 0) zip_eofile = true;
        else zip_lookahead += n
      }
    };
    var zip_deflate_fast = function() {
      while (zip_lookahead != 0 && zip_qhead == null) {
        var flush;
        zip_INSERT_STRING();
        if (zip_hash_head != zip_NIL && zip_strstart - zip_hash_head <= zip_MAX_DIST) {
          zip_match_length = zip_longest_match(zip_hash_head);
          if (zip_match_length > zip_lookahead) zip_match_length = zip_lookahead
        }
        if (zip_match_length >= zip_MIN_MATCH) {
          flush = zip_ct_tally(zip_strstart - zip_match_start, zip_match_length - zip_MIN_MATCH);
          zip_lookahead -= zip_match_length;
          if (zip_match_length <= zip_max_lazy_match) {
            zip_match_length--;
            do {
              zip_strstart++;
              zip_INSERT_STRING()
            } while (--zip_match_length != 0);
            zip_strstart++
          } else {
            zip_strstart += zip_match_length;
            zip_match_length = 0;
            zip_ins_h = zip_window[zip_strstart] & 255;
            zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart + 1] & 255) & zip_HASH_MASK
          }
        } else {
          flush = zip_ct_tally(0, zip_window[zip_strstart] & 255);
          zip_lookahead--;
          zip_strstart++
        }
        if (flush) {
          zip_flush_block(0);
          zip_block_start = zip_strstart
        }
        while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) zip_fill_window()
      }
    };
    var zip_deflate_better = function() {
      while (zip_lookahead != 0 && zip_qhead == null) {
        zip_INSERT_STRING();
        zip_prev_length = zip_match_length;
        zip_prev_match = zip_match_start;
        zip_match_length = zip_MIN_MATCH - 1;
        if (zip_hash_head != zip_NIL && zip_prev_length < zip_max_lazy_match && zip_strstart - zip_hash_head <= zip_MAX_DIST) {
          zip_match_length = zip_longest_match(zip_hash_head);
          if (zip_match_length > zip_lookahead) zip_match_length = zip_lookahead;
          if (zip_match_length == zip_MIN_MATCH && zip_strstart - zip_match_start > zip_TOO_FAR) {
            zip_match_length--
          }
        }
        if (zip_prev_length >= zip_MIN_MATCH && zip_match_length <= zip_prev_length) {
          var flush;
          flush = zip_ct_tally(zip_strstart - 1 - zip_prev_match, zip_prev_length - zip_MIN_MATCH);
          zip_lookahead -= zip_prev_length - 1;
          zip_prev_length -= 2;
          do {
            zip_strstart++;
            zip_INSERT_STRING()
          } while (--zip_prev_length != 0);
          zip_match_available = 0;
          zip_match_length = zip_MIN_MATCH - 1;
          zip_strstart++;
          if (flush) {
            zip_flush_block(0);
            zip_block_start = zip_strstart
          }
        } else if (zip_match_available != 0) {
          if (zip_ct_tally(0, zip_window[zip_strstart - 1] & 255)) {
            zip_flush_block(0);
            zip_block_start = zip_strstart
          }
          zip_strstart++;
          zip_lookahead--
        } else {
          zip_match_available = 1;
          zip_strstart++;
          zip_lookahead--
        }
        while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) zip_fill_window()
      }
    };
    var zip_init_deflate = function() {
      if (zip_eofile) return;
      zip_bi_buf = 0;
      zip_bi_valid = 0;
      zip_ct_init();
      zip_lm_init();
      zip_qhead = null;
      zip_outcnt = 0;
      zip_outoff = 0;
      zip_match_available = 0;
      if (zip_compr_level <= 3) {
        zip_prev_length = zip_MIN_MATCH - 1;
        zip_match_length = 0
      } else {
        zip_match_length = zip_MIN_MATCH - 1;
        zip_match_available = 0;
        zip_match_available = 0
      }
      zip_complete = false
    };
    var zip_deflate_internal = function(buff, off, buff_size) {
      var n;
      if (!zip_initflag) {
        zip_init_deflate();
        zip_initflag = true;
        if (zip_lookahead == 0) {
          zip_complete = true;
          return 0
        }
      }
      if ((n = zip_qcopy(buff, off, buff_size)) == buff_size) return buff_size;
      if (zip_complete) return n;
      if (zip_compr_level <= 3) zip_deflate_fast();
      else zip_deflate_better();
      if (zip_lookahead == 0) {
        if (zip_match_available != 0) zip_ct_tally(0, zip_window[zip_strstart - 1] & 255);
        zip_flush_block(1);
        zip_complete = true
      }
      return n + zip_qcopy(buff, n + off, buff_size - n)
    };
    var zip_qcopy = function(buff, off, buff_size) {
      var n, i, j;
      n = 0;
      while (zip_qhead != null && n < buff_size) {
        i = buff_size - n;
        if (i > zip_qhead.len) i = zip_qhead.len;
        for (j = 0; j < i; j++) buff[off + n + j] = zip_qhead.ptr[zip_qhead.off + j];
        zip_qhead.off += i;
        zip_qhead.len -= i;
        n += i;
        if (zip_qhead.len == 0) {
          var p;
          p = zip_qhead;
          zip_qhead = zip_qhead.next;
          zip_reuse_queue(p)
        }
      }
      if (n == buff_size) return n;
      if (zip_outoff < zip_outcnt) {
        i = buff_size - n;
        if (i > zip_outcnt - zip_outoff) i = zip_outcnt - zip_outoff;
        for (j = 0; j < i; j++) buff[off + n + j] = zip_outbuf[zip_outoff + j];
        zip_outoff += i;
        n += i;
        if (zip_outcnt == zip_outoff) zip_outcnt = zip_outoff = 0
      }
      return n
    };
    var zip_ct_init = function() {
      var n;
      var bits;
      var length;
      var code;
      var dist;
      if (zip_static_dtree[0].dl != 0) return;
      zip_l_desc.dyn_tree = zip_dyn_ltree;
      zip_l_desc.static_tree = zip_static_ltree;
      zip_l_desc.extra_bits = zip_extra_lbits;
      zip_l_desc.extra_base = zip_LITERALS + 1;
      zip_l_desc.elems = zip_L_CODES;
      zip_l_desc.max_length = zip_MAX_BITS;
      zip_l_desc.max_code = 0;
      zip_d_desc.dyn_tree = zip_dyn_dtree;
      zip_d_desc.static_tree = zip_static_dtree;
      zip_d_desc.extra_bits = zip_extra_dbits;
      zip_d_desc.extra_base = 0;
      zip_d_desc.elems = zip_D_CODES;
      zip_d_desc.max_length = zip_MAX_BITS;
      zip_d_desc.max_code = 0;
      zip_bl_desc.dyn_tree = zip_bl_tree;
      zip_bl_desc.static_tree = null;
      zip_bl_desc.extra_bits = zip_extra_blbits;
      zip_bl_desc.extra_base = 0;
      zip_bl_desc.elems = zip_BL_CODES;
      zip_bl_desc.max_length = zip_MAX_BL_BITS;
      zip_bl_desc.max_code = 0;
      length = 0;
      for (code = 0; code < zip_LENGTH_CODES - 1; code++) {
        zip_base_length[code] = length;
        for (n = 0; n < 1 << zip_extra_lbits[code]; n++) zip_length_code[length++] = code
      }
      zip_length_code[length - 1] = code;
      dist = 0;
      for (code = 0; code < 16; code++) {
        zip_base_dist[code] = dist;
        for (n = 0; n < 1 << zip_extra_dbits[code]; n++) {
          zip_dist_code[dist++] = code
        }
      }
      dist >>= 7;
      for (; code < zip_D_CODES; code++) {
        zip_base_dist[code] = dist << 7;
        for (n = 0; n < 1 << zip_extra_dbits[code] - 7; n++) zip_dist_code[256 + dist++] = code
      }
      for (bits = 0; bits <= zip_MAX_BITS; bits++) zip_bl_count[bits] = 0;
      n = 0;
      while (n <= 143) {
        zip_static_ltree[n++].dl = 8;
        zip_bl_count[8]++
      }
      while (n <= 255) {
        zip_static_ltree[n++].dl = 9;
        zip_bl_count[9]++
      }
      while (n <= 279) {
        zip_static_ltree[n++].dl = 7;
        zip_bl_count[7]++
      }
      while (n <= 287) {
        zip_static_ltree[n++].dl = 8;
        zip_bl_count[8]++
      }
      zip_gen_codes(zip_static_ltree, zip_L_CODES + 1);
      for (n = 0; n < zip_D_CODES; n++) {
        zip_static_dtree[n].dl = 5;
        zip_static_dtree[n].fc = zip_bi_reverse(n, 5)
      }
      zip_init_block()
    };
    var zip_init_block = function() {
      var n;
      for (n = 0; n < zip_L_CODES; n++) zip_dyn_ltree[n].fc = 0;
      for (n = 0; n < zip_D_CODES; n++) zip_dyn_dtree[n].fc = 0;
      for (n = 0; n < zip_BL_CODES; n++) zip_bl_tree[n].fc = 0;
      zip_dyn_ltree[zip_END_BLOCK].fc = 1;
      zip_opt_len = zip_static_len = 0;
      zip_last_lit = zip_last_dist = zip_last_flags = 0;
      zip_flags = 0;
      zip_flag_bit = 1
    };
    var zip_pqdownheap = function(tree, k) {
      var v = zip_heap[k];
      var j = k << 1;
      while (j <= zip_heap_len) {
        if (j < zip_heap_len && zip_SMALLER(tree, zip_heap[j + 1], zip_heap[j])) j++;
        if (zip_SMALLER(tree, v, zip_heap[j])) break;
        zip_heap[k] = zip_heap[j];
        k = j;
        j <<= 1
      }
      zip_heap[k] = v
    };
    var zip_gen_bitlen = function(desc) {
      var tree = desc.dyn_tree;
      var extra = desc.extra_bits;
      var base = desc.extra_base;
      var max_code = desc.max_code;
      var max_length = desc.max_length;
      var stree = desc.static_tree;
      var h;
      var n, m;
      var bits;
      var xbits;
      var f;
      var overflow = 0;
      for (bits = 0; bits <= zip_MAX_BITS; bits++) zip_bl_count[bits] = 0;
      tree[zip_heap[zip_heap_max]].dl = 0;
      for (h = zip_heap_max + 1; h < zip_HEAP_SIZE; h++) {
        n = zip_heap[h];
        bits = tree[tree[n].dl].dl + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++
        }
        tree[n].dl = bits;
        if (n > max_code) continue;
        zip_bl_count[bits]++;
        xbits = 0;
        if (n >= base) xbits = extra[n - base];
        f = tree[n].fc;
        zip_opt_len += f * (bits + xbits);
        if (stree != null) zip_static_len += f * (stree[n].dl + xbits)
      }
      if (overflow == 0) return;
      do {
        bits = max_length - 1;
        while (zip_bl_count[bits] == 0) bits--;
        zip_bl_count[bits]--;
        zip_bl_count[bits + 1] += 2;
        zip_bl_count[max_length]--;
        overflow -= 2
      } while (overflow > 0);
      for (bits = max_length; bits != 0; bits--) {
        n = zip_bl_count[bits];
        while (n != 0) {
          m = zip_heap[--h];
          if (m > max_code) continue;
          if (tree[m].dl != bits) {
            zip_opt_len += (bits - tree[m].dl) * tree[m].fc;
            tree[m].fc = bits
          }
          n--
        }
      }
    };
    var zip_gen_codes = function(tree, max_code) {
      var next_code = new Array(zip_MAX_BITS + 1);
      var code = 0;
      var bits;
      var n;
      for (bits = 1; bits <= zip_MAX_BITS; bits++) {
        code = code + zip_bl_count[bits - 1] << 1;
        next_code[bits] = code
      }
      for (n = 0; n <= max_code; n++) {
        var len = tree[n].dl;
        if (len == 0) continue;
        tree[n].fc = zip_bi_reverse(next_code[len]++, len)
      }
    };
    var zip_build_tree = function(desc) {
      var tree = desc.dyn_tree;
      var stree = desc.static_tree;
      var elems = desc.elems;
      var n, m;
      var max_code = -1;
      var node = elems;
      zip_heap_len = 0;
      zip_heap_max = zip_HEAP_SIZE;
      for (n = 0; n < elems; n++) {
        if (tree[n].fc != 0) {
          zip_heap[++zip_heap_len] = max_code = n;
          zip_depth[n] = 0
        } else tree[n].dl = 0
      }
      while (zip_heap_len < 2) {
        var xnew = zip_heap[++zip_heap_len] = max_code < 2 ? ++max_code : 0;
        tree[xnew].fc = 1;
        zip_depth[xnew] = 0;
        zip_opt_len--;
        if (stree != null) zip_static_len -= stree[xnew].dl
      }
      desc.max_code = max_code;
      for (n = zip_heap_len >> 1; n >= 1; n--) zip_pqdownheap(tree, n);
      do {
        n = zip_heap[zip_SMALLEST];
        zip_heap[zip_SMALLEST] = zip_heap[zip_heap_len--];
        zip_pqdownheap(tree, zip_SMALLEST);
        m = zip_heap[zip_SMALLEST];
        zip_heap[--zip_heap_max] = n;
        zip_heap[--zip_heap_max] = m;
        tree[node].fc = tree[n].fc + tree[m].fc;
        if (zip_depth[n] > zip_depth[m] + 1) zip_depth[node] = zip_depth[n];
        else zip_depth[node] = zip_depth[m] + 1;
        tree[n].dl = tree[m].dl = node;
        zip_heap[zip_SMALLEST] = node++;
        zip_pqdownheap(tree, zip_SMALLEST)
      } while (zip_heap_len >= 2);
      zip_heap[--zip_heap_max] = zip_heap[zip_SMALLEST];
      zip_gen_bitlen(desc);
      zip_gen_codes(tree, max_code)
    };
    var zip_scan_tree = function(tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0].dl;
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen == 0) {
        max_count = 138;
        min_count = 3
      }
      tree[max_code + 1].dl = 65535;
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[n + 1].dl;
        if (++count < max_count && curlen == nextlen) continue;
        else if (count < min_count) zip_bl_tree[curlen].fc += count;
        else if (curlen != 0) {
          if (curlen != prevlen) zip_bl_tree[curlen].fc++;
          zip_bl_tree[zip_REP_3_6].fc++
        } else if (count <= 10) zip_bl_tree[zip_REPZ_3_10].fc++;
        else zip_bl_tree[zip_REPZ_11_138].fc++;
        count = 0;
        prevlen = curlen;
        if (nextlen == 0) {
          max_count = 138;
          min_count = 3
        } else if (curlen == nextlen) {
          max_count = 6;
          min_count = 3
        } else {
          max_count = 7;
          min_count = 4
        }
      }
    };
    var zip_send_tree = function(tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0].dl;
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen == 0) {
        max_count = 138;
        min_count = 3
      }
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[n + 1].dl;
        if (++count < max_count && curlen == nextlen) {
          continue
        } else if (count < min_count) {
          do {
            zip_SEND_CODE(curlen, zip_bl_tree)
          } while (--count != 0)
        } else if (curlen != 0) {
          if (curlen != prevlen) {
            zip_SEND_CODE(curlen, zip_bl_tree);
            count--
          }
          zip_SEND_CODE(zip_REP_3_6, zip_bl_tree);
          zip_send_bits(count - 3, 2)
        } else if (count <= 10) {
          zip_SEND_CODE(zip_REPZ_3_10, zip_bl_tree);
          zip_send_bits(count - 3, 3)
        } else {
          zip_SEND_CODE(zip_REPZ_11_138, zip_bl_tree);
          zip_send_bits(count - 11, 7)
        }
        count = 0;
        prevlen = curlen;
        if (nextlen == 0) {
          max_count = 138;
          min_count = 3
        } else if (curlen == nextlen) {
          max_count = 6;
          min_count = 3
        } else {
          max_count = 7;
          min_count = 4
        }
      }
    };
    var zip_build_bl_tree = function() {
      var max_blindex;
      zip_scan_tree(zip_dyn_ltree, zip_l_desc.max_code);
      zip_scan_tree(zip_dyn_dtree, zip_d_desc.max_code);
      zip_build_tree(zip_bl_desc);
      for (max_blindex = zip_BL_CODES - 1; max_blindex >= 3; max_blindex--) {
        if (zip_bl_tree[zip_bl_order[max_blindex]].dl != 0) break
      }
      zip_opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex
    };
    var zip_send_all_trees = function(lcodes, dcodes, blcodes) {
      var rank;
      zip_send_bits(lcodes - 257, 5);
      zip_send_bits(dcodes - 1, 5);
      zip_send_bits(blcodes - 4, 4);
      for (rank = 0; rank < blcodes; rank++) {
        zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl, 3)
      }
      zip_send_tree(zip_dyn_ltree, lcodes - 1);
      zip_send_tree(zip_dyn_dtree, dcodes - 1)
    };
    var zip_flush_block = function(eof) {
      var opt_lenb, static_lenb;
      var max_blindex;
      var stored_len;
      stored_len = zip_strstart - zip_block_start;
      zip_flag_buf[zip_last_flags] = zip_flags;
      zip_build_tree(zip_l_desc);
      zip_build_tree(zip_d_desc);
      max_blindex = zip_build_bl_tree();
      opt_lenb = zip_opt_len + 3 + 7 >> 3;
      static_lenb = zip_static_len + 3 + 7 >> 3;
      if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
      if (stored_len + 4 <= opt_lenb && zip_block_start >= 0) {
        var i;
        zip_send_bits((zip_STORED_BLOCK << 1) + eof, 3);
        zip_bi_windup();
        zip_put_short(stored_len);
        zip_put_short(~stored_len);
        for (i = 0; i < stored_len; i++) zip_put_byte(zip_window[zip_block_start + i])
      } else if (static_lenb == opt_lenb) {
        zip_send_bits((zip_STATIC_TREES << 1) + eof, 3);
        zip_compress_block(zip_static_ltree, zip_static_dtree)
      } else {
        zip_send_bits((zip_DYN_TREES << 1) + eof, 3);
        zip_send_all_trees(zip_l_desc.max_code + 1, zip_d_desc.max_code + 1, max_blindex + 1);
        zip_compress_block(zip_dyn_ltree, zip_dyn_dtree)
      }
      zip_init_block();
      if (eof != 0) zip_bi_windup()
    };
    var zip_ct_tally = function(dist, lc) {
      zip_l_buf[zip_last_lit++] = lc;
      if (dist == 0) {
        zip_dyn_ltree[lc].fc++
      } else {
        dist--;
        zip_dyn_ltree[zip_length_code[lc] + zip_LITERALS + 1].fc++;
        zip_dyn_dtree[zip_D_CODE(dist)].fc++;
        zip_d_buf[zip_last_dist++] = dist;
        zip_flags |= zip_flag_bit
      }
      zip_flag_bit <<= 1;
      if ((zip_last_lit & 7) == 0) {
        zip_flag_buf[zip_last_flags++] = zip_flags;
        zip_flags = 0;
        zip_flag_bit = 1
      }
      if (zip_compr_level > 2 && (zip_last_lit & 4095) == 0) {
        var out_length = zip_last_lit * 8;
        var in_length = zip_strstart - zip_block_start;
        var dcode;
        for (dcode = 0; dcode < zip_D_CODES; dcode++) {
          out_length += zip_dyn_dtree[dcode].fc * (5 + zip_extra_dbits[dcode])
        }
        out_length >>= 3;
        if (zip_last_dist < parseInt(zip_last_lit / 2) && out_length < parseInt(in_length / 2)) return true
      }
      return zip_last_lit == zip_LIT_BUFSIZE - 1 || zip_last_dist == zip_DIST_BUFSIZE
    };
    var zip_compress_block = function(ltree, dtree) {
      var dist;
      var lc;
      var lx = 0;
      var dx = 0;
      var fx = 0;
      var flag = 0;
      var code;
      var extra;
      if (zip_last_lit != 0)
        do {
          if ((lx & 7) == 0) flag = zip_flag_buf[fx++];
          lc = zip_l_buf[lx++] & 255;
          if ((flag & 1) == 0) {
            zip_SEND_CODE(lc, ltree)
          } else {
            code = zip_length_code[lc];
            zip_SEND_CODE(code + zip_LITERALS + 1, ltree);
            extra = zip_extra_lbits[code];
            if (extra != 0) {
              lc -= zip_base_length[code];
              zip_send_bits(lc, extra)
            }
            dist = zip_d_buf[dx++];
            code = zip_D_CODE(dist);
            zip_SEND_CODE(code, dtree);
            extra = zip_extra_dbits[code];
            if (extra != 0) {
              dist -= zip_base_dist[code];
              zip_send_bits(dist, extra)
            }
          }
          flag >>= 1
        } while (lx < zip_last_lit);
      zip_SEND_CODE(zip_END_BLOCK, ltree)
    };
    var zip_Buf_size = 16;
    var zip_send_bits = function(value, length) {
      if (zip_bi_valid > zip_Buf_size - length) {
        zip_bi_buf |= value << zip_bi_valid;
        zip_put_short(zip_bi_buf);
        zip_bi_buf = value >> zip_Buf_size - zip_bi_valid;
        zip_bi_valid += length - zip_Buf_size
      } else {
        zip_bi_buf |= value << zip_bi_valid;
        zip_bi_valid += length
      }
    };
    var zip_bi_reverse = function(code, len) {
      var res = 0;
      do {
        res |= code & 1;
        code >>= 1;
        res <<= 1
      } while (--len > 0);
      return res >> 1
    };
    var zip_bi_windup = function() {
      if (zip_bi_valid > 8) {
        zip_put_short(zip_bi_buf)
      } else if (zip_bi_valid > 0) {
        zip_put_byte(zip_bi_buf)
      }
      zip_bi_buf = 0;
      zip_bi_valid = 0
    };
    var zip_qoutbuf = function() {
      if (zip_outcnt != 0) {
        var q, i;
        q = zip_new_queue();
        if (zip_qhead == null) zip_qhead = zip_qtail = q;
        else zip_qtail = zip_qtail.next = q;
        q.len = zip_outcnt - zip_outoff;
        for (i = 0; i < q.len; i++) q.ptr[i] = zip_outbuf[zip_outoff + i];
        zip_outcnt = zip_outoff = 0
      }
    };
    var zip_deflate = function(str, level) {
      var i, j;
      zip_deflate_data = str;
      zip_deflate_pos = 0;
      if (typeof level == "undefined") level = zip_DEFAULT_LEVEL;
      zip_deflate_start(level);
      var buff = new Array(1024);
      var aout = [];
      while ((i = zip_deflate_internal(buff, 0, buff.length)) > 0) {
        var cbuf = new Array(i);
        for (j = 0; j < i; j++) {
          cbuf[j] = String.fromCharCode(buff[j])
        }
        aout[aout.length] = cbuf.join("")
      }
      zip_deflate_data = null;
      return aout.join("")
    };
    module.exports = zip_deflate
  }, {}],
  51: [function(require, module, exports) {
    var deflate = require("./deflate");
    module.exports = function(str) {
      return window.btoa(deflate(unescape(encodeURIComponent(str))))
    }
  }, {
    "./deflate": 50
  }],
  52: [function(require, module, exports) {
    var pattern = /(\{fa([bsrld]?)-)(.*?)(\})/gi;
    module.exports = function fa(text) {
      if (text.match(pattern)) text = text.replace(pattern, '<i class="fa$2 fa-$3"></i>');
      return text
    }
  }, {}],
  53: [function(require, module, exports) {
    var zip_WSIZE = 32768;
    var zip_STORED_BLOCK = 0;
    var zip_STATIC_TREES = 1;
    var zip_DYN_TREES = 2;
    var zip_lbits = 9;
    var zip_dbits = 6;
    var zip_INBUFSIZ = 32768;
    var zip_INBUF_EXTRA = 64;
    var zip_slide;
    var zip_wp;
    var zip_fixed_tl = null;
    var zip_fixed_td;
    var zip_fixed_bl, zip_fixed_bd;
    var zip_bit_buf;
    var zip_bit_len;
    var zip_method;
    var zip_eof;
    var zip_copy_leng;
    var zip_copy_dist;
    var zip_tl, zip_td;
    var zip_bl, zip_bd;
    var zip_inflate_data;
    var zip_inflate_pos;
    var zip_MASK_BITS = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
    var zip_cplens = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
    var zip_cplext = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99);
    var zip_cpdist = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577);
    var zip_cpdext = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
    var zip_border = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
    var zip_HuftList = function() {
      this.next = null;
      this.list = null
    };
    var zip_HuftNode = function() {
      this.e = 0;
      this.b = 0;
      this.n = 0;
      this.t = null
    };
    var zip_HuftBuild = function(b, n, s, d, e, mm) {
      this.BMAX = 16;
      this.N_MAX = 288;
      this.status = 0;
      this.root = null;
      this.m = 0; {
        var a;
        var c = new Array(this.BMAX + 1);
        var el;
        var f;
        var g;
        var h;
        var i;
        var j;
        var k;
        var lx = new Array(this.BMAX + 1);
        var p;
        var pidx;
        var q;
        var r = new zip_HuftNode;
        var u = new Array(this.BMAX);
        var v = new Array(this.N_MAX);
        var w;
        var x = new Array(this.BMAX + 1);
        var xp;
        var y;
        var z;
        var o;
        var tail;
        tail = this.root = null;
        for (i = 0; i < c.length; i++) c[i] = 0;
        for (i = 0; i < lx.length; i++) lx[i] = 0;
        for (i = 0; i < u.length; i++) u[i] = null;
        for (i = 0; i < v.length; i++) v[i] = 0;
        for (i = 0; i < x.length; i++) x[i] = 0;
        el = n > 256 ? b[256] : this.BMAX;
        p = b;
        pidx = 0;
        i = n;
        do {
          c[p[pidx]]++;
          pidx++
        } while (--i > 0);
        if (c[0] == n) {
          this.root = null;
          this.m = 0;
          this.status = 0;
          return
        }
        for (j = 1; j <= this.BMAX; j++)
          if (c[j] != 0) break;
        k = j;
        if (mm < j) mm = j;
        for (i = this.BMAX; i != 0; i--)
          if (c[i] != 0) break;
        g = i;
        if (mm > i) mm = i;
        for (y = 1 << j; j < i; j++, y <<= 1)
          if ((y -= c[j]) < 0) {
            this.status = 2;
            this.m = mm;
            return
          } if ((y -= c[i]) < 0) {
          this.status = 2;
          this.m = mm;
          return
        }
        c[i] += y;
        x[1] = j = 0;
        p = c;
        pidx = 1;
        xp = 2;
        while (--i > 0) x[xp++] = j += p[pidx++];
        p = b;
        pidx = 0;
        i = 0;
        do {
          if ((j = p[pidx++]) != 0) v[x[j]++] = i
        } while (++i < n);
        n = x[g];
        x[0] = i = 0;
        p = v;
        pidx = 0;
        h = -1;
        w = lx[0] = 0;
        q = null;
        z = 0;
        for (; k <= g; k++) {
          a = c[k];
          while (a-- > 0) {
            while (k > w + lx[1 + h]) {
              w += lx[1 + h];
              h++;
              z = (z = g - w) > mm ? mm : z;
              if ((f = 1 << (j = k - w)) > a + 1) {
                f -= a + 1;
                xp = k;
                while (++j < z) {
                  if ((f <<= 1) <= c[++xp]) break;
                  f -= c[xp]
                }
              }
              if (w + j > el && w < el) j = el - w;
              z = 1 << j;
              lx[1 + h] = j;
              q = new Array(z);
              for (o = 0; o < z; o++) {
                q[o] = new zip_HuftNode
              }
              if (tail == null) tail = this.root = new zip_HuftList;
              else tail = tail.next = new zip_HuftList;
              tail.next = null;
              tail.list = q;
              u[h] = q;
              if (h > 0) {
                x[h] = i;
                r.b = lx[h];
                r.e = 16 + j;
                r.t = q;
                j = (i & (1 << w) - 1) >> w - lx[h];
                u[h - 1][j].e = r.e;
                u[h - 1][j].b = r.b;
                u[h - 1][j].n = r.n;
                u[h - 1][j].t = r.t
              }
            }
            r.b = k - w;
            if (pidx >= n) r.e = 99;
            else if (p[pidx] < s) {
              r.e = p[pidx] < 256 ? 16 : 15;
              r.n = p[pidx++]
            } else {
              r.e = e[p[pidx] - s];
              r.n = d[p[pidx++] - s]
            }
            f = 1 << k - w;
            for (j = i >> w; j < z; j += f) {
              q[j].e = r.e;
              q[j].b = r.b;
              q[j].n = r.n;
              q[j].t = r.t
            }
            for (j = 1 << k - 1;
              (i & j) != 0; j >>= 1) i ^= j;
            i ^= j;
            while ((i & (1 << w) - 1) != x[h]) {
              w -= lx[h];
              h--
            }
          }
        }
        this.m = lx[1];
        this.status = y != 0 && g != 1 ? 1 : 0
      }
    };
    var zip_GET_BYTE = function() {
      if (zip_inflate_data.length == zip_inflate_pos) return -1;
      return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 255
    };
    var zip_NEEDBITS = function(n) {
      while (zip_bit_len < n) {
        zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
        zip_bit_len += 8
      }
    };
    var zip_GETBITS = function(n) {
      return zip_bit_buf & zip_MASK_BITS[n]
    };
    var zip_DUMPBITS = function(n) {
      zip_bit_buf >>= n;
      zip_bit_len -= n
    };
    var zip_inflate_codes = function(buff, off, size) {
      var e;
      var t;
      var n;
      if (size == 0) return 0;
      n = 0;
      for (;;) {
        zip_NEEDBITS(zip_bl);
        t = zip_tl.list[zip_GETBITS(zip_bl)];
        e = t.e;
        while (e > 16) {
          if (e == 99) return -1;
          zip_DUMPBITS(t.b);
          e -= 16;
          zip_NEEDBITS(e);
          t = t.t[zip_GETBITS(e)];
          e = t.e
        }
        zip_DUMPBITS(t.b);
        if (e == 16) {
          zip_wp &= zip_WSIZE - 1;
          buff[off + n++] = zip_slide[zip_wp++] = t.n;
          if (n == size) return size;
          continue
        }
        if (e == 15) break;
        zip_NEEDBITS(e);
        zip_copy_leng = t.n + zip_GETBITS(e);
        zip_DUMPBITS(e);
        zip_NEEDBITS(zip_bd);
        t = zip_td.list[zip_GETBITS(zip_bd)];
        e = t.e;
        while (e > 16) {
          if (e == 99) return -1;
          zip_DUMPBITS(t.b);
          e -= 16;
          zip_NEEDBITS(e);
          t = t.t[zip_GETBITS(e)];
          e = t.e
        }
        zip_DUMPBITS(t.b);
        zip_NEEDBITS(e);
        zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
        zip_DUMPBITS(e);
        while (zip_copy_leng > 0 && n < size) {
          zip_copy_leng--;
          zip_copy_dist &= zip_WSIZE - 1;
          zip_wp &= zip_WSIZE - 1;
          buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
        }
        if (n == size) return size
      }
      zip_method = -1;
      return n
    };
    var zip_inflate_stored = function(buff, off, size) {
      var n;
      n = zip_bit_len & 7;
      zip_DUMPBITS(n);
      zip_NEEDBITS(16);
      n = zip_GETBITS(16);
      zip_DUMPBITS(16);
      zip_NEEDBITS(16);
      if (n != (~zip_bit_buf & 65535)) return -1;
      zip_DUMPBITS(16);
      zip_copy_leng = n;
      n = 0;
      while (zip_copy_leng > 0 && n < size) {
        zip_copy_leng--;
        zip_wp &= zip_WSIZE - 1;
        zip_NEEDBITS(8);
        buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
        zip_DUMPBITS(8)
      }
      if (zip_copy_leng == 0) zip_method = -1;
      return n
    };
    var zip_inflate_fixed = function(buff, off, size) {
      if (zip_fixed_tl == null) {
        var i;
        var l = new Array(288);
        var h;
        for (i = 0; i < 144; i++) l[i] = 8;
        for (; i < 256; i++) l[i] = 9;
        for (; i < 280; i++) l[i] = 7;
        for (; i < 288; i++) l[i] = 8;
        zip_fixed_bl = 7;
        h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext, zip_fixed_bl);
        if (h.status != 0) {
          alert("HufBuild error: " + h.status);
          return -1
        }
        zip_fixed_tl = h.root;
        zip_fixed_bl = h.m;
        for (i = 0; i < 30; i++) l[i] = 5;
        zip_fixed_bd = 5;
        h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
        if (h.status > 1) {
          zip_fixed_tl = null;
          alert("HufBuild error: " + h.status);
          return -1
        }
        zip_fixed_td = h.root;
        zip_fixed_bd = h.m
      }
      zip_tl = zip_fixed_tl;
      zip_td = zip_fixed_td;
      zip_bl = zip_fixed_bl;
      zip_bd = zip_fixed_bd;
      return zip_inflate_codes(buff, off, size)
    };
    var zip_inflate_dynamic = function(buff, off, size) {
      var i;
      var j;
      var l;
      var n;
      var t;
      var nb;
      var nl;
      var nd;
      var ll = new Array(286 + 30);
      var h;
      for (i = 0; i < ll.length; i++) ll[i] = 0;
      zip_NEEDBITS(5);
      nl = 257 + zip_GETBITS(5);
      zip_DUMPBITS(5);
      zip_NEEDBITS(5);
      nd = 1 + zip_GETBITS(5);
      zip_DUMPBITS(5);
      zip_NEEDBITS(4);
      nb = 4 + zip_GETBITS(4);
      zip_DUMPBITS(4);
      if (nl > 286 || nd > 30) return -1;
      for (j = 0; j < nb; j++) {
        zip_NEEDBITS(3);
        ll[zip_border[j]] = zip_GETBITS(3);
        zip_DUMPBITS(3)
      }
      for (; j < 19; j++) ll[zip_border[j]] = 0;
      zip_bl = 7;
      h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
      if (h.status != 0) return -1;
      zip_tl = h.root;
      zip_bl = h.m;
      n = nl + nd;
      i = l = 0;
      while (i < n) {
        zip_NEEDBITS(zip_bl);
        t = zip_tl.list[zip_GETBITS(zip_bl)];
        j = t.b;
        zip_DUMPBITS(j);
        j = t.n;
        if (j < 16) ll[i++] = l = j;
        else if (j == 16) {
          zip_NEEDBITS(2);
          j = 3 + zip_GETBITS(2);
          zip_DUMPBITS(2);
          if (i + j > n) return -1;
          while (j-- > 0) ll[i++] = l
        } else if (j == 17) {
          zip_NEEDBITS(3);
          j = 3 + zip_GETBITS(3);
          zip_DUMPBITS(3);
          if (i + j > n) return -1;
          while (j-- > 0) ll[i++] = 0;
          l = 0
        } else {
          zip_NEEDBITS(7);
          j = 11 + zip_GETBITS(7);
          zip_DUMPBITS(7);
          if (i + j > n) return -1;
          while (j-- > 0) ll[i++] = 0;
          l = 0
        }
      }
      zip_bl = zip_lbits;
      h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
      if (zip_bl == 0) h.status = 1;
      if (h.status != 0) {
        if (h.status == 1);
        return -1
      }
      zip_tl = h.root;
      zip_bl = h.m;
      for (i = 0; i < nd; i++) ll[i] = ll[i + nl];
      zip_bd = zip_dbits;
      h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
      zip_td = h.root;
      zip_bd = h.m;
      if (zip_bd == 0 && nl > 257) {
        return -1
      }
      if (h.status == 1) {}
      if (h.status != 0) return -1;
      return zip_inflate_codes(buff, off, size)
    };
    var zip_inflate_start = function() {
      var i;
      if (zip_slide == null) zip_slide = new Array(2 * zip_WSIZE);
      zip_wp = 0;
      zip_bit_buf = 0;
      zip_bit_len = 0;
      zip_method = -1;
      zip_eof = false;
      zip_copy_leng = zip_copy_dist = 0;
      zip_tl = null
    };
    var zip_inflate_internal = function(buff, off, size) {
      var n, i;
      n = 0;
      while (n < size) {
        if (zip_eof && zip_method == -1) return n;
        if (zip_copy_leng > 0) {
          if (zip_method != zip_STORED_BLOCK) {
            while (zip_copy_leng > 0 && n < size) {
              zip_copy_leng--;
              zip_copy_dist &= zip_WSIZE - 1;
              zip_wp &= zip_WSIZE - 1;
              buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
            }
          } else {
            while (zip_copy_leng > 0 && n < size) {
              zip_copy_leng--;
              zip_wp &= zip_WSIZE - 1;
              zip_NEEDBITS(8);
              buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
              zip_DUMPBITS(8)
            }
            if (zip_copy_leng == 0) zip_method = -1
          }
          if (n == size) return n
        }
        if (zip_method == -1) {
          if (zip_eof) break;
          zip_NEEDBITS(1);
          if (zip_GETBITS(1) != 0) zip_eof = true;
          zip_DUMPBITS(1);
          zip_NEEDBITS(2);
          zip_method = zip_GETBITS(2);
          zip_DUMPBITS(2);
          zip_tl = null;
          zip_copy_leng = 0
        }
        switch (zip_method) {
          case 0:
            i = zip_inflate_stored(buff, off + n, size - n);
            break;
          case 1:
            if (zip_tl != null) i = zip_inflate_codes(buff, off + n, size - n);
            else i = zip_inflate_fixed(buff, off + n, size - n);
            break;
          case 2:
            if (zip_tl != null) i = zip_inflate_codes(buff, off + n, size - n);
            else i = zip_inflate_dynamic(buff, off + n, size - n);
            break;
          default:
            i = -1;
            break
        }
        if (i == -1) {
          if (zip_eof) return 0;
          return -1
        }
        n += i
      }
      return n
    };
    var zip_inflate = function(str) {
      var i, j;
      zip_inflate_start();
      zip_inflate_data = str;
      zip_inflate_pos = 0;
      var buff = new Array(1024);
      var aout = [];
      while ((i = zip_inflate_internal(buff, 0, buff.length)) > 0) {
        var cbuf = new Array(i);
        for (j = 0; j < i; j++) {
          cbuf[j] = String.fromCharCode(buff[j])
        }
        aout[aout.length] = cbuf.join("")
      }
      zip_inflate_data = null;
      return aout.join("")
    };
    module.exports = zip_inflate
  }, {}],
  54: [function(require, module, exports) {
    var pattern = {
      strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
      em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
      del: /^~~([\s\S]+?)~~/,
      code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
      text: /^[\s\S]+?(?=[\\<!\[_*`~]| {2,}\n|$)/
    };
    var renderer = {
      strong: function(text) {
        return "<strong>" + text + "</strong>"
      },
      em: function(text) {
        return "<em>" + text + "</em>"
      },
      del: function(text) {
        return "<del>" + text + "</del>"
      },
      code: function(text) {
        return "<code>" + text + "</code>"
      },
      text: function(text) {
        return text
      }
    };

    function mark(src) {
      if (!src) return "";
      src = escape(src);
      return output(src)
    }

    function escape(html) {
      return html.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function removeComment(text) {
      return text.replace(/\/\/.*/, "")
    }

    function output(src) {
      src = src.trim();
      var out = "";
      var cap;
      while (src) {
        if (cap = pattern.strong.exec(src)) {
          src = src.substring(cap[0].length);
          out += renderer.strong(output(cap[2] || cap[1]));
          continue
        }
        if (cap = pattern.em.exec(src)) {
          src = src.substring(cap[0].length);
          out += renderer.em(output(cap[2] || cap[1]));
          continue
        }
        if (cap = pattern.del.exec(src)) {
          src = src.substring(cap[0].length);
          out += renderer.del(output(cap[1]));
          continue
        }
        if (cap = pattern.code.exec(src)) {
          src = src.substring(cap[0].length);
          out += renderer.code(cap[2]);
          continue
        }
        if (cap = pattern.text.exec(src)) {
          src = src.substring(cap[0].length);
          out += renderer.text(cap[0]);
          continue
        }
        if (src) {
          throw new Error("Infinite loop on byte: " + src.charCodeAt(0))
        }
      }
      return out
    }
    module.exports = mark
  }, {}],
  55: [function(require, module, exports) {
    var _ = require("underscore");
    module.exports = parse;
    var pattern = {
      message: /^(([^:<>]|\{.*?\})+?)(<{0,2}| x)(--|-|=)(x\s|>{0,2})((\{.*\}|[^<>:])+?):(.*)/i,
      line: /^(-|--|=|_)\s*:(.*)/,
      note: /^note([^:]*?:|\s|$)(.*)/i,
      if: /^(?:if|group)(?:$|\s*:)(.*)/i,
      else: /^else(?:$|\s*:)(.*)/i,
      end: /^end(?:$|\s*\:$)/i,
      comment: /^(?:\/\/|#)(.+)*/,
      name: /^name\s*:(.*)/i,
      title: /^title\s*:(.*)/i,
      order: /^order\s*:/i,
      delay: /^(\.\.\.)\s*:(.*)/,
      alias: /^alias (.*): (.*)/i,
      autonumber: /^autonumber$/i
    };

    function parse(raw) {
      var name, title;
      var lanes = [];
      var elements = [];
      var alias = {};
      var lines = raw.split("\n");
      var currentNote;
      var openIfs = 0;
      var setOrder = null;
      var autonumber = false;
      _.each(lines, function(rawLine, lineNo) {
        var line = rawLine.trim();
        var match;
        if (!currentNote && line == "") {} else if (currentNoteInOpenCodeBlock(currentNote)) {
          currentNote.text += "\n";
          currentNote.text += rawLine.replace(/\t/g, "  ").replace(/\{/g, "[escape-left-curley-bracket]");
          currentNote.lines.push(lineNo)
        } else if (pattern.comment.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createComment(line, lineNo, elements.length))
        } else if (pattern.order.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createOrder(line, lineNo, elements.length))
        } else if (pattern.message.test(line) && (match = pattern.message.exec(line)) && match[1].trim() && match[6].trim() && (match[3] || match[5])) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createMessage(line, lineNo, elements.length))
        } else if (pattern.line.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createLine(line, lineNo, elements.length))
        } else if (pattern.if.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createIf(line, lineNo, elements.length));
          openIfs++
        } else if (openIfs && pattern.else.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createElse(line, lineNo, elements.length))
        } else if (openIfs && pattern.end.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createEnd(lineNo, elements.length));
          openIfs--
        } else if (pattern.note.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          currentNote = createNote(line, lineNo, elements.length, elements)
        } else if (pattern.name.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          name = createName(line)
        } else if (pattern.title.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createTitle(line, lineNo, elements.length))
        } else if (pattern.delay.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createDelay(line, lineNo, elements.length))
        } else if (pattern.alias.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createAlias(line, lineNo, elements.length))
        } else if (pattern.autonumber.test(line)) {
          currentNote = addCurrentNote(elements, currentNote);
          elements.push(createAutonumber(line, lineNo, elements.length));
          autonumber = true
        } else if (currentNote) {
          if (currentNote.text) currentNote.text += "\n";
          if (/(\{img\:)(.*?)(\})/i.test(rawLine)) currentNote.text += rawLine.replace(/:\/\//, "[escape-colon-slash-slash]");
          else currentNote.text += rawLine;
          currentNote.lines.push(lineNo)
        } else {
          elements.push(createError(line, lineNo, elements.length))
        }
      });
      addCurrentNote(elements, currentNote);
      while (openIfs) {
        elements.push(createEnd(null, elements.length));
        openIfs--
      }
      _.each(_.filter(elements, function(e) {
        return e.type === "message"
      }), function(element) {
        if (element.from.arrow == "dropped") {
          if (element.to.arrow == "dropped") element.type = "error";
          else if (element.to.arrow) {
            element.from.arrow = null;
            element.from.lane += pattern.message.exec(lines[element.lines[0]])[3]
          }
        } else if (element.to.arrow == "dropped") {
          if (element.from.arrow == "dropped") element.type = "error";
          else if (element.from.arrow) {
            element.to.arrow = null;
            element.to.lane = pattern.message.exec(lines[element.lines[0]])[5] + element.to.lane
          }
        }
      });
      _.each(_.filter(elements, function(e) {
        return e.type === "message"
      }), function(element) {
        var lower, matched;
        var pos = ["from", "to"];
        _.each(pos, function(p) {
          if (element[p] && element[p].lane) {
            lower = element[p].lane.toLowerCase();
            if (matched = _.find(lanes, function(lane) {
                return lane.toLowerCase() === lower
              })) {
              element[p].lane = matched
            } else {
              lanes.push(element[p].lane)
            }
          }
        })
      });
      var orderRowNo;
      _.each(_.filter(elements, function(e) {
        return e.type === "order"
      }), function(element) {
        if (orderRowNo) {
          element.type = "error";
          element.message = "Order already defined at row " + (orderRowNo + 1);
          return
        }
        var reorderdLanes = [];
        var vaildOrder = false;
        _.each(element.lanes, function(orderLane) {
          var matched = _.find(lanes, function(lane) {
            return lane.toLowerCase() === orderLane
          });
          if (matched) {
            reorderdLanes.push(lanes.splice(_.indexOf(lanes, matched), 1));
            vaildOrder = true
          }
        });
        _.each(lanes, function(lane) {
          reorderdLanes.push(lane)
        });
        lanes = _.flatten(reorderdLanes);
        if (!vaildOrder) {
          element.type = "error";
          element.message = "No vaild actors defined for ordering"
        } else {
          orderRowNo = element.lines[0]
        }
      });
      _.each(_.filter(elements, function(e) {
        return e.type === "alias"
      }), function(element) {
        if (!element.to) {
          element.type = "error";
          element.message = "Alias cannot be blank"
        } else if (!_.find(lanes, function(lane) {
            return lane.toLowerCase() === element.from
          })) {
          element.type = "error";
          element.message = "Invalid actor"
        } else if (alias[element.from]) {
          element.type = "error";
          element.message = "Alias already defined for the actor " + element.from
        } else {
          alias[element.from] = element.to
        }
      });
      var titleRowNo;
      _.each(_.filter(elements, function(e) {
        return e.type === "title"
      }), function(element) {
        if (!title) {
          title = {
            text: element.text,
            line: element.lines[0]
          };
          titleRowNo = element.lines[0]
        } else {
          element.type = "error";
          element.message = "Title already defined at row " + (titleRowNo + 1)
        }
      });
      _.each(_.filter(elements, function(e) {
        return e.type === "note"
      }), function(element) {
        var lower, matched;
        var pos = ["from", "to"];
        _.each(pos, function(p) {
          if (element[p] && element[p].lane) {
            lower = element[p].lane.toLowerCase();
            if (matched = _.find(lanes, function(lane) {
                return lane.toLowerCase() === lower
              })) {
              element[p].lane = matched
            } else {
              element[p].lane = null
            }
          }
        })
      });
      _.each(elements, function(element) {
        if (element.type === "note" && (element.from.lane === null || element.to.lane === null)) {
          element.from.lane = lanes[0];
          element.to.lane = lanes[lanes.length - 1]
        }
      });
      return {
        name: name,
        title: title,
        elements: elements,
        alias: alias,
        lanes: lanes,
        autonumber: autonumber,
        raw: raw
      }
    }

    function currentNoteInOpenCodeBlock(currentNote) {
      if (!currentNote) return false;
      var codeBlockTags = (currentNote.text.match(/```/g) || []).length;
      return codeBlockTags % 2
    }

    function addCurrentNote(elements, currentNote) {
      if (currentNote) {
        elements.push(currentNote)
      }
      return null
    }

    function createMessage(line, lineNo, elementIndex) {
      var match = pattern.message.exec(line);
      return {
        type: "message",
        from: {
          lane: match[1].trim(),
          arrow: parseArrow(3)
        },
        to: {
          lane: match[6].trim(),
          arrow: parseArrow(5)
        },
        line: match[4] === "-" ? "solid" : match[4] === "--" ? "dashed" : "strong",
        text: match[8].trim(),
        lines: [lineNo],
        index: elementIndex
      };

      function parseArrow(i) {
        if (!match[i]) return null;
        if (match[i].trim().toLowerCase() == "x") return "dropped";
        return match[i].length == 1 ? "closed" : "open"
      }
    }

    function createLine(line, lineNo, elementIndex) {
      var lineTypes = {
        "-": "solid",
        "--": "dashed",
        "=": "strong",
        _: "thin"
      };
      var match = pattern.line.exec(line);
      return {
        type: "line",
        line: lineTypes[match[1]],
        text: match[2].trim(),
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createNote(line, lineNo, elementIndex, elements) {
      var match = pattern.note.exec(line);
      var previous, rawLanes, fromLane, toLane;
      var i = 1;
      if (match[1] && match[1].trim() && match[1].trim() != ":") {
        rawLanes = match[1].replace(":", "").trim();
        if (rawLanes.indexOf(",") > -1) {
          fromLane = rawLanes.split(",")[0].trim();
          toLane = rawLanes.split(",")[1].trim()
        } else {
          fromLane = toLane = rawLanes
        }
      } else {
        while (elements[elementIndex - i] && !previous) {
          if (elements[elementIndex - i].from && elements[elementIndex - i].from.lane) {
            previous = elements[elementIndex - i]
          }
          i++
        }
      }
      return {
        type: "note",
        from: {
          lane: fromLane ? fromLane : previous ? previous.from.lane : null
        },
        to: {
          lane: toLane ? toLane : previous ? previous.to.lane : null
        },
        text: match[2] ? match[2].trim() : "",
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createIf(line, lineNo, elementIndex) {
      var match = pattern.if.exec(line);
      return {
        type: "if",
        text: match[1] ? match[1].trim() : null,
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createElse(line, lineNo, elementIndex) {
      var match = pattern.else.exec(line);
      return {
        type: "else",
        text: match[1] ? match[1].trim() : null,
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createEnd(lineNo, elementIndex) {
      return {
        type: "end",
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createComment(line, lineNo, elementIndex) {
      var match = pattern.comment.exec(line);
      return {
        type: "comment",
        text: match[1] ? match[1].trim() : "",
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createName(line) {
      var match = pattern.name.exec(line);
      var text = match[1].trim();
      return text
    }

    function createTitle(line, lineNo, elementIndex) {
      var match = pattern.title.exec(line);
      var text = match[1].trim();
      return {
        type: "title",
        text: match[1].trim(),
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createError(line, lineNo, elementIndex) {
      return {
        type: "error",
        text: line,
        lines: [lineNo],
        index: elementIndex,
        message: "Invalid syntax"
      }
    }

    function createDelay(line, lineNo, elementIndex) {
      var match = pattern.delay.exec(line);
      return {
        type: "delay",
        text: match[2].trim(),
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createAutonumber(line, lineNo, elementIndex) {
      return {
        type: "autonumber",
        lines: [lineNo],
        index: elementIndex
      }
    }

    function createAlias(line, lineNo, elementIndex) {
      var match = pattern.alias.exec(line);
      return {
        type: "alias",
        from: match[1].trim().toLowerCase(),
        to: match[2].trim(),
        lines: [lineNo],
        index: elementIndex,
        text: line
      }
    }

    function createOrder(line, lineNo, elementIndex) {
      return {
        type: "order",
        lanes: _.map(line.split(":")[1].split(","), function(lane) {
          return lane.trim().toLowerCase()
        }),
        lines: [lineNo],
        index: elementIndex,
        text: line
      }
    }
  }, {
    underscore: 47
  }],
  56: [function(require, module, exports) {
    var _ = require("underscore");
    var marked = require("marked");
    var extend = require("extend");
    var m = require("./markymark");
    var t = require("./template");
    var fa = require("./fa");

    function render(swimLanes, templates, options) {
      var attributes = extend(true, {}, swimLanes.attributes);
      var title = attributes.title;
      var lanes = attributes.lanes;
      var alias = attributes.alias;
      var elements = attributes.elements;
      var autonumber = attributes.autonumber;
      var html = "";
      var highRes = options && options.highRes ? true : false;
      var noteOverFlow = 3;
      var singleLaneNoteMultiplier = .8;
      var elementSideMargin = 3;
      var laneWidth = 100 / (lanes.length - 1);
      var nMargin = 1;
      var messageNumber = 1;
      var bottomLanes;

      function xForLane(lane, n) {
        var x = _.indexOf(lanes, lane) * ((100 - laneTitleWidth()) / (lanes.length - 1)) + laneTitleWidth() / 2;
        if (lanes.length === 1) return 50;
        if (n > 1) {
          x = (x - (n - 1) * nMargin) / (1 - 2 * (n - 1) * nMargin * .01)
        }
        return x
      }

      function laneTitleWidth() {
        return lanes.length <= 4 ? 20 : Math.round(1e4 / lanes.length * .8) / 100
      }
      if (title && title.text.length) {
        title = title.text.replace(/</g, "&lt;");
        title = fa(title);
        html += t('<h1 class="page-title">{{title}}</h1>', {
          title: title
        })
      }
      html += templates.laneTitles({
        position: "top",
        lanes: _.map(lanes, function(lane) {
          return {
            left: xForLane(lane) - laneTitleWidth() / 2,
            width: laneTitleWidth(),
            title: lane && alias[lane.toLowerCase()] ? fa(alias[lane.toLowerCase()]) : fa(lane)
          }
        })
      });
      html += templates.elements({
        elements: prepElementsForTemplate(elements, {
          autonumber: autonumber
        }),
        lanes: _.map(lanes, function(lane) {
          return {
            left: xForLane(lane)
          }
        }),
        highRes: highRes
      });
      html += templates.laneTitles({
        position: "bottom",
        lanes: _.map(lanes, function(lane) {
          return {
            left: xForLane(lane) - laneTitleWidth() / 2,
            width: laneTitleWidth(),
            title: lane && alias[lane.toLowerCase()] ? fa(alias[lane.toLowerCase()]) : fa(lane)
          }
        })
      });
      if (templates.fixedBottomLaneTitles) {
        html += templates.fixedBottomLaneTitles({
          position: "fixed",
          lanes: _.map(lanes, function(lane) {
            return {
              left: xForLane(lane) - laneTitleWidth() / 2,
              width: laneTitleWidth(),
              title: lane && alias[lane.toLowerCase()] ? fa(alias[lane.toLowerCase()]) : fa(lane)
            }
          })
        })
      }
      return html;

      function prepElementsForTemplate(elements, options) {
        var nLevel = 0;
        return _.map(elements, function(e) {
          var x1, x2, droppedDiff;
          if (e.type === "message") {
            if (e.from.lane === e.to.lane) {
              x1 = xForLane(e.from.lane, nLevel) - .2 * laneWidth;
              x2 = xForLane(e.from.lane, nLevel) + .2 * laneWidth;
              e.left = e.to;
              e.toSelf = "to-self"
            } else {
              x1 = xForLane(e.from.lane, nLevel);
              x2 = xForLane(e.to.lane, nLevel);
              e.left = x1 < x2 ? e.from : e.to;
              e.right = x1 > x2 ? e.from : e.to
            }
            e.x = Math.min(x1, x2);
            e.width = Math.abs(x1 - x2);
            if (!(e.from.lane === e.to.lane) && (e.left.arrow == "dropped" || e.right.arrow == "dropped")) {
              droppedDiff = 3;
              e.width -= droppedDiff;
              if (e.left.arrow == "dropped") e.x += droppedDiff
            }
            e.text = m(e.text);
            e.text = fa(e.text);
            if (options.autonumber) {
              e.text = "[" + messageNumber + "] " + e.text;
              messageNumber++
            }
          } else if (e.type === "note") {
            if (e.from.lane == e.to.lane) {
              x1 = Math.max(xForLane(e.from.lane, nLevel) - singleLaneNoteMultiplier * laneWidth * .5, elementSideMargin);
              x2 = Math.min(xForLane(e.from.lane, nLevel) + singleLaneNoteMultiplier * laneWidth * .5, 100 - elementSideMargin);
              e.x = Math.min(x1, x2);
              e.width = Math.abs(x1 - x2)
            } else {
              x1 = xForLane(e.from.lane, nLevel);
              x2 = xForLane(e.to.lane, nLevel);
              e.x = Math.min(x1, x2) - noteOverFlow;
              e.width = Math.abs(x1 - x2) + 2 * noteOverFlow
            }
            e.text = marked(e.text, {
              tables: false,
              sanitize: true
            });
            e.text = addTargetBlankToLinks(e.text);
            e.text = fa(e.text);
            e.text = e.text.replace(/\[escape-left-curley-bracket\]/g, "{")
          } else if (e.type === "if" || e.type === "else" || e.type === "line") {
            e.text = m(e.text);
            e.text = fa(e.text);
            if (e.type === "if") nLevel += 1
          } else if (e.type === "end") {
            nLevel -= 1
          } else if (e.type == "delay") {
            e.text = m(e.text);
            e.text = fa(e.text);
            e.x = _.map(lanes, function(lane) {
              return xForLane(lane, nLevel)
            })
          }
          return e
        })
      }

      function addTargetBlankToLinks(text) {
        var pattern = /<a(.*?)>/gi;
        if (text.match(pattern)) text = text.replace(pattern, '<a target="_blank" $1>');
        return text
      }
    }
    module.exports = render
  }, {
    "./fa": 52,
    "./markymark": 54,
    "./template": 57,
    extend: 2,
    marked: 33,
    underscore: 47
  }],
  57: [function(require, module, exports) {
    function template(template, replacers) {
      if (!replacers) return template;
      return template.replace(/{{([A-Za-z0-9_.]+)}}/g, function(w, p) {
        var matched = replacers[p];
        if (matched || matched === 0 || matched == "") return matched;
        else return w
      })
    }
    module.exports = template
  }, {}]
}, {}, [48]);