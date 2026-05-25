import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { join } from 'path';

createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports$1, module) {
    var LZString2 = (function() {
      var f5 = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i4 = 0; i4 < alphabet.length; i4++) {
            baseReverseDic[alphabet][alphabet.charAt(i4)] = i4;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString3 = {
        compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString3._compress(input, 6, function(a4) {
            return keyStrBase64.charAt(a4);
          });
          switch (res.length % 4) {
            // To produce valid Base64
            default:
            // When could this happen ?
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 15, function(a4) {
            return f5(a4 + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString3.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i4 = 0, TotalLen = compressed.length; i4 < TotalLen; i4++) {
            var current_value = compressed.charCodeAt(i4);
            buf[i4 * 2] = current_value >>> 8;
            buf[i4 * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString3.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i4 = 0, TotalLen = buf.length; i4 < TotalLen; i4++) {
              buf[i4] = compressed[i4 * 2] * 256 + compressed[i4 * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c4) {
              result.push(f5(c4));
            });
            return LZString3.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString3._compress(input, 6, function(a4) {
            return keyStrUriSafe.charAt(a4);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString3._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString3._compress(uncompressed, 16, function(a4) {
            return f5(a4);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i4, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i4 = 0; i4 < context_numBits; i4++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i4 = 0; i4 < 8; i4++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i4 = 0; i4 < context_numBits; i4++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i4 = 0; i4 < 16; i4++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i4 = 0; i4 < context_numBits; i4++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i4 = 0; i4 < context_numBits; i4++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i4 = 0; i4 < 8; i4++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i4 = 0; i4 < context_numBits; i4++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i4 = 0; i4 < 16; i4++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i4 = 0; i4 < context_numBits; i4++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i4 = 0; i4 < context_numBits; i4++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString3._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i4, w4, bits, resb, maxpower, power, c4, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i4 = 0; i4 < 3; i4 += 1) {
            dictionary[i4] = i4;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c4 = f5(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c4 = f5(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c4;
          w4 = c4;
          result.push(c4);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c4 = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f5(bits);
                c4 = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f5(bits);
                c4 = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c4]) {
              entry = dictionary[c4];
            } else {
              if (c4 === dictSize) {
                entry = w4 + w4.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w4 + entry.charAt(0);
            enlargeIn--;
            w4 = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString3;
    })();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString2;
      });
    } else if (typeof module !== "undefined" && module != null) {
      module.exports = LZString2;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString2;
      });
    }
  }
});

// node_modules/@quartz-community/utils/dist/path.js
function isRelativeURL(s4) {
  const validStart = /^\.{1,2}/.test(s4);
  const validEnding = !endsWith(s4, "index");
  return validStart && validEnding && ![".md", ".html"].includes(getFileExtension(s4) ?? "");
}
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function slugifyFilePath(fp, excludeExt) {
  fp = stripSlashes(fp);
  const ext = getFileExtension(fp);
  const withoutFileExt = fp.replace(new RegExp(ext + "$"), "");
  const finalExt = [".md", ".html", void 0].includes(ext) ? "" : ext;
  let slug2 = _sluggify(withoutFileExt);
  if (endsWith(slug2, "_index")) {
    slug2 = slug2.replace(/_index$/, "index");
  }
  const segments = slug2.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug2 = segments.join("/");
  }
  return slug2 + (finalExt ?? "");
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s4, suffix) {
  return s4 === suffix || s4.endsWith("/" + suffix);
}
function trimSuffix(s4, suffix) {
  if (endsWith(s4, suffix)) {
    s4 = s4.slice(0, -suffix.length);
  }
  return s4;
}
function stripSlashes(s4, onlyStripPrefix) {
  if (s4.startsWith("/")) {
    s4 = s4.substring(1);
  }
  if (!onlyStripPrefix && s4.endsWith("/")) {
    s4 = s4.slice(0, -1);
  }
  return s4;
}
function getFileExtension(s4) {
  return s4.match(/\.[A-Za-z0-9]+$/)?.[0];
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x4) => x4 !== "").slice(0, -1).map((_3) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}
function slugifyPath(s4) {
  return s4.split("/").map(
    (segment) => segment.replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent").replace(/\?/g, "").replace(/#/g, "").toLowerCase()
  ).join("/").replace(/\/$/, "");
}
function normalizeHastElement(rawEl, curBase, newBase) {
  const el = structuredClone(rawEl);
  _rebaseHastElement(el, "src", curBase, newBase);
  _rebaseHastElement(el, "href", curBase, newBase);
  if (el.children) {
    el.children = el.children.map(
      (child) => child.type === "element" ? normalizeHastElement(child, curBase, newBase) : child
    );
  }
  return el;
}
function _rebaseHastElement(el, attr, curBase, newBase) {
  const value = el.properties?.[attr];
  if (value === void 0 || value === null) return;
  const href = String(value);
  if (!isRelativeURL(href)) return;
  el.properties[attr] = joinSegments(resolveRelative(curBase, newBase), "..", href);
}
function _sluggify(s4) {
  return slugifyPath(s4);
}

// src/parser.ts
var import_lz_string = __toESM(require_lz_string());
var DEFAULT_APP_STATE = {
  viewBackgroundColor: "#ffffff",
  exportBackground: true,
  exportWithDarkMode: false
};
function parseExcalidraw(content, filePath) {
  if (filePath.endsWith(".excalidraw.md")) {
    return parseExcalidrawMd(content);
  }
  if (filePath.endsWith(".excalidraw")) {
    return parseExcalidrawJson(content);
  }
  return null;
}
function parseExcalidrawJson(content) {
  try {
    const data = JSON.parse(content);
    if (data.type !== "excalidraw") return null;
    return normalizeData(data);
  } catch {
    return null;
  }
}
function parseExcalidrawMd(content) {
  const json = extractJsonFromMd(content);
  if (!json) return null;
  let data;
  try {
    data = JSON.parse(json);
  } catch {
    return null;
  }
  if (data.type !== "excalidraw") return null;
  const embeddedFiles = parseEmbeddedFilesSection(content);
  const normalized = normalizeData(data);
  if (!normalized) return null;
  if (Object.keys(embeddedFiles).length > 0) {
    normalized.embeddedFiles = embeddedFiles;
  }
  return normalized;
}
function extractJsonFromMd(content) {
  const drawingMarkerIdx = content.indexOf("# Drawing");
  if (drawingMarkerIdx === -1) {
    return extractBetweenPercentDelimiters(content);
  }
  const afterMarker = content.slice(drawingMarkerIdx);
  return extractBetweenPercentDelimiters(afterMarker) ?? extractFromCodeFence(afterMarker);
}
function extractBetweenPercentDelimiters(content) {
  const firstPct = content.indexOf("%%");
  if (firstPct === -1) return null;
  const afterFirst = content.indexOf("%%", firstPct);
  const contentAfterFirstPct = content.slice(afterFirst + 2);
  const secondPct = contentAfterFirstPct.indexOf("%%");
  if (secondPct === -1) return null;
  const block = contentAfterFirstPct.slice(0, secondPct).trim();
  return extractFromCodeFence(block) ?? extractRawJson(block);
}
function extractFromCodeFence(block) {
  const compressedFenceStart = block.indexOf("```compressed-json");
  if (compressedFenceStart !== -1) {
    const afterFence2 = block.slice(compressedFenceStart + "```compressed-json".length);
    const fenceEnd2 = afterFence2.indexOf("```");
    if (fenceEnd2 === -1) return null;
    const compressedContent = afterFence2.slice(afterFence2.indexOf("\n") + 1, fenceEnd2);
    const cleaned = compressedContent.replace(/[\n\r]/g, "");
    const decompressed = import_lz_string.default.decompressFromBase64(cleaned);
    return decompressed ?? null;
  }
  const fenceStart = block.indexOf("```json");
  if (fenceStart === -1) {
    const altFenceStart = block.indexOf("```");
    if (altFenceStart === -1) return null;
    const afterFence2 = block.slice(altFenceStart + 3);
    const fenceEnd2 = afterFence2.indexOf("```");
    if (fenceEnd2 === -1) return null;
    return afterFence2.slice(afterFence2.indexOf("\n") + 1, fenceEnd2).trim();
  }
  const afterFence = block.slice(fenceStart + 7);
  const fenceEnd = afterFence.indexOf("```");
  if (fenceEnd === -1) return null;
  return afterFence.slice(afterFence.indexOf("\n") + 1, fenceEnd).trim();
}
function extractRawJson(block) {
  const lines = block.split("\n");
  const jsonStart = lines.findIndex((line) => line.trimStart().startsWith("{"));
  if (jsonStart === -1) return null;
  const jsonContent = lines.slice(jsonStart).join("\n").trim();
  if (jsonContent.startsWith("{") && jsonContent.endsWith("}")) {
    return jsonContent;
  }
  return null;
}
function parseEmbeddedFilesSection(content) {
  const result = {};
  const sectionMatch = content.match(/^##?\s+Embedded\s+[Ff]iles\s*$/im);
  if (!sectionMatch) return result;
  const sectionIdx = sectionMatch.index;
  const afterSection = content.slice(sectionIdx + sectionMatch[0].length);
  const endIdx = afterSection.indexOf("%%");
  const section = endIdx === -1 ? afterSection : afterSection.slice(0, endIdx);
  const pattern = /^([a-f0-9]+):\s+\[\[(.+?)\]\]\s*$/gm;
  let match;
  while ((match = pattern.exec(section)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}
function normalizeData(data) {
  const d4 = data;
  if (typeof d4 !== "object" || d4 === null) return null;
  const elements = Array.isArray(d4.elements) ? d4.elements.filter((el) => !el.isDeleted) : [];
  const appState = typeof d4.appState === "object" && d4.appState !== null ? d4.appState : {};
  const files = typeof d4.files === "object" && d4.files !== null ? d4.files : {};
  return {
    type: "excalidraw",
    version: typeof d4.version === "number" ? d4.version : 2,
    source: typeof d4.source === "string" ? d4.source : void 0,
    elements,
    appState: { ...DEFAULT_APP_STATE, ...appState },
    files
  };
}

// node_modules/html-void-elements/index.js
var htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

// node_modules/property-information/lib/util/schema.js
var Schema = class {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(property, normal, space) {
    this.normal = normal;
    this.property = property;
    if (space) {
      this.space = space;
    }
  }
};
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;

// node_modules/property-information/lib/util/merge.js
function merge(definitions, space) {
  const property = {};
  const normal = {};
  for (const definition of definitions) {
    Object.assign(property, definition.property);
    Object.assign(normal, definition.normal);
  }
  return new Schema(property, normal, space);
}

// node_modules/property-information/lib/normalize.js
function normalize(value) {
  return value.toLowerCase();
}

// node_modules/property-information/lib/util/info.js
var Info = class {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(property, attribute) {
    this.attribute = attribute;
    this.property = property;
  }
};
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;

// node_modules/property-information/lib/util/types.js
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}

// node_modules/property-information/lib/util/defined-info.js
var checks = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(types_exports)
);
var DefinedInfo = class extends Info {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(property, attribute, mask, space) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}

// node_modules/property-information/lib/util/create.js
function create(definition) {
  const properties = {};
  const normals = {};
  for (const [property, value] of Object.entries(definition.properties)) {
    const info = new DefinedInfo(
      property,
      definition.transform(definition.attributes || {}, property),
      value,
      definition.space
    );
    if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) {
      info.mustUseProperty = true;
    }
    properties[property] = info;
    normals[normalize(property)] = property;
    normals[normalize(info.attribute)] = property;
  }
  return new Schema(properties, normals, definition.space);
}

// node_modules/property-information/lib/aria.js
var aria = create({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  },
  transform(_3, property) {
    return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
  }
});

// node_modules/property-information/lib/util/case-sensitive-transform.js
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}

// node_modules/property-information/lib/util/case-insensitive-transform.js
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}

// node_modules/property-information/lib/html.js
var html = create({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: null,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: overloadedBoolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shadowRootClonable: boolean,
    shadowRootDelegatesFocus: boolean,
    shadowRootMode: null,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: caseInsensitiveTransform
});

// node_modules/property-information/lib/svg.js
var svg = create({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: caseSensitiveTransform
});

// node_modules/property-information/lib/xlink.js
var xlink = create({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(_3, property) {
    return "xlink:" + property.slice(5).toLowerCase();
  }
});

// node_modules/property-information/lib/xmlns.js
var xmlns = create({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: caseInsensitiveTransform
});

// node_modules/property-information/lib/xml.js
var xml = create({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(_3, property) {
    return "xml:" + property.slice(3).toLowerCase();
  }
});

// node_modules/property-information/lib/find.js
var cap = /[A-Z]/g;
var dash = /-[a-z]/g;
var valid = /^data[-\w.:]+$/i;
function find(schema, value) {
  const normal = normalize(value);
  let property = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(property, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

// node_modules/property-information/index.js
var html2 = merge([aria, html, xlink, xmlns, xml], "html");
var svg2 = merge([aria, svg, xlink, xmlns, xml], "svg");

// node_modules/zwitch/index.js
var own2 = {}.hasOwnProperty;
function zwitch(key2, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn = one2.invalid;
    const handlers = one2.handlers;
    if (value && own2.call(value, key2)) {
      const id = String(value[key2]);
      fn = own2.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}

// node_modules/stringify-entities/lib/core.js
var defaultSubsetRegex = /["&'<>`]/g;
var surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
var controlCharactersRegex = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
);
var regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
var subsetToRegexCache = /* @__PURE__ */ new WeakMap();
function core(value, options) {
  value = value.replace(
    options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
  function surrogate(pair, index, all2) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all2.charCodeAt(index + 2),
      options
    );
  }
  function basic(character, index, all2) {
    return options.format(
      character.charCodeAt(0),
      all2.charCodeAt(index + 1),
      options
    );
  }
}
function charactersToExpressionCached(subset) {
  let cached = subsetToRegexCache.get(subset);
  if (!cached) {
    cached = charactersToExpression(subset);
    subsetToRegexCache.set(subset, cached);
  }
  return cached;
}
function charactersToExpression(subset) {
  const groups = [];
  let index = -1;
  while (++index < subset.length) {
    groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}

// node_modules/stringify-entities/lib/util/to-hexadecimal.js
var hexadecimalRegex = /[\dA-Fa-f]/;
function toHexadecimal(code, next, omit) {
  const value = "&#x" + code.toString(16).toUpperCase();
  return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/stringify-entities/lib/util/to-decimal.js
var decimalRegex = /\d/;
function toDecimal(code, next, omit) {
  const value = "&#" + String(code);
  return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// node_modules/character-entities-html4/index.js
var characterEntitiesHtml4 = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
};

// node_modules/stringify-entities/lib/constant/dangerous.js
var dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];

// node_modules/stringify-entities/lib/util/to-named.js
var own3 = {}.hasOwnProperty;
var characters = {};
var key;
for (key in characterEntitiesHtml4) {
  if (own3.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
var notAlphanumericRegex = /[^\dA-Za-z]/;
function toNamed(code, next, omit, attribute) {
  const character = String.fromCharCode(code);
  if (own3.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}

// node_modules/stringify-entities/lib/util/format-smart.js
function formatSmart(code, next, options) {
  let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}

// node_modules/stringify-entities/lib/index.js
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}

// node_modules/hast-util-to-html/lib/handle/comment.js
var htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
var bogusCommentEntitySubset = [">"];
var commentEntitySubset = ["<", ">"];
function comment(node, _1, _22, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: bogusCommentEntitySubset
    })
  ) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: commentEntitySubset
      })
    );
  }
}

// node_modules/hast-util-to-html/lib/handle/doctype.js
function doctype(_1, _22, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}

// node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}

// node_modules/comma-separated-tokens/index.js
function stringify(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}

// node_modules/space-separated-tokens/index.js
function stringify2(values) {
  return values.join(" ").trim();
}

// node_modules/hast-util-whitespace/lib/index.js
var re = /[ \t\n\f\r]/g;
function whitespace(thing) {
  return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
function empty(value) {
  return value.replace(re, "") === "";
}

// node_modules/hast-util-to-html/lib/omission/util/siblings.js
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
var emptyChildren = [];
function siblings(increment2) {
  return sibling;
  function sibling(parent, index, includeWhitespace) {
    const siblings2 = parent ? parent.children : emptyChildren;
    let offset = (index || 0) + increment2;
    let next = siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment2;
        next = siblings2[offset];
      }
    }
    return next;
  }
}

// node_modules/hast-util-to-html/lib/omission/omission.js
var own4 = {}.hasOwnProperty;
function omission(handlers) {
  return omit;
  function omit(node, index, parent) {
    return own4.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
  }
}

// node_modules/hast-util-to-html/lib/omission/closing.js
var closing = omission({
  body,
  caption: headOrColgroupOrCaption,
  colgroup: headOrColgroupOrCaption,
  dd,
  dt,
  head: headOrColgroupOrCaption,
  html: html3,
  li,
  optgroup,
  option,
  p,
  rp: rubyElement,
  rt: rubyElement,
  tbody,
  td: cells,
  tfoot,
  th: cells,
  thead,
  tr
});
function headOrColgroupOrCaption(_3, index, parent) {
  const next = siblingAfter(parent, index, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html3(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function body(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function p(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || // Confusing parent.
  !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd")
  );
}
function dd(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function thead(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot")
  );
}
function tbody(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_3, index, parent) {
  return !siblingAfter(parent, index);
}
function tr(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_3, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}

// node_modules/hast-util-to-html/lib/omission/opening.js
var opening = omission({
  body: body2,
  colgroup,
  head,
  html: html4,
  tbody: tbody2
});
function html4(node) {
  const head2 = siblingAfter(node, -1);
  return !head2 || head2.type !== "comment";
}
function head(node) {
  const seen = /* @__PURE__ */ new Set();
  for (const child2 of node.children) {
    if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
      if (seen.has(child2.tagName)) return false;
      seen.add(child2.tagName);
    }
  }
  const child = node.children[0];
  return !child || child.type === "element";
}
function body2(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
}
function tbody2(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
}

// node_modules/hast-util-to-html/lib/handle/element.js
var constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element(node, index, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node.tagName === "svg") {
    state.schema = svg2;
  }
  const attributes = serializeAttributes(state, node.properties);
  const content = state.all(
    schema.space === "html" && node.tagName === "template" ? node.content : node
  );
  state.schema = schema;
  if (content) selfClosing = false;
  if (attributes || !omit || !opening(node, index, parent)) {
    parts.push("<", node.tagName, attributes ? " " + attributes : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attributes.charAt(attributes.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, properties) {
  const values = [];
  let index = -1;
  let key2;
  if (properties) {
    for (key2 in properties) {
      if (properties[key2] !== null && properties[key2] !== void 0) {
        const value = serializeAttribute(state, key2, properties[key2]);
        if (value) values.push(value);
      }
    }
  }
  while (++index < values.length) {
    const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : void 0;
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x4 = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y4 = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
    value = Boolean(value);
  }
  if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants.name[x4][y4]
    })
  );
  if (value === true) return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify : stringify2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value) return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        attribute: true,
        subset: constants.unquoted[x4][y4]
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: (quote === "'" ? constants.single : constants.double)[x4][y4],
        attribute: true
      })
    ) + quote;
  }
  return name + (result ? "=" + result : result);
}

// node_modules/hast-util-to-html/lib/handle/text.js
var textEntitySubset = ["<", "&"];
function text(node, _3, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: textEntitySubset
    })
  );
}

// node_modules/hast-util-to-html/lib/handle/raw.js
function raw(node, index, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
}

// node_modules/hast-util-to-html/lib/handle/root.js
function root(node, _1, _22, state) {
  return state.all(node);
}

// node_modules/hast-util-to-html/lib/handle/index.js
var handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root, text }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node_) {
  const node = (
    /** @type {Nodes} */
    node_
  );
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}

// node_modules/hast-util-to-html/lib/index.js
var emptyOptions = {};
var emptyCharacterReferences = {};
var emptyChildren2 = [];
function toHtml(tree, options) {
  const options_ = options || emptyOptions;
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || emptyCharacterReferences,
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg2 : html2,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one(node, index, parent) {
  return handle(node, index, parent, this);
}
function all(parent) {
  const results = [];
  const children = parent && parent.children || emptyChildren2;
  let index = -1;
  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent);
  }
  return results.join("");
}

// node_modules/roughjs/bundled/rough.esm.js
function t(t4, e4, s4) {
  if (t4 && t4.length) {
    const [n4, o4] = e4, a4 = Math.PI / 180 * s4, h4 = Math.cos(a4), r4 = Math.sin(a4);
    for (const e5 of t4) {
      const [t5, s5] = e5;
      e5[0] = (t5 - n4) * h4 - (s5 - o4) * r4 + n4, e5[1] = (t5 - n4) * r4 + (s5 - o4) * h4 + o4;
    }
  }
}
function e(t4, e4) {
  return t4[0] === e4[0] && t4[1] === e4[1];
}
function s(s4, n4, o4, a4 = 1) {
  const h4 = o4, r4 = Math.max(n4, 0.1), i4 = s4[0] && s4[0][0] && "number" == typeof s4[0][0] ? [s4] : s4, c4 = [0, 0];
  if (h4) for (const e4 of i4) t(e4, c4, h4);
  const l4 = (function(t4, s5, n5) {
    const o5 = [];
    for (const s6 of t4) {
      const t5 = [...s6];
      e(t5[0], t5[t5.length - 1]) || t5.push([t5[0][0], t5[0][1]]), t5.length > 2 && o5.push(t5);
    }
    const a5 = [];
    s5 = Math.max(s5, 0.1);
    const h5 = [];
    for (const t5 of o5) for (let e4 = 0; e4 < t5.length - 1; e4++) {
      const s6 = t5[e4], n6 = t5[e4 + 1];
      if (s6[1] !== n6[1]) {
        const t6 = Math.min(s6[1], n6[1]);
        h5.push({ ymin: t6, ymax: Math.max(s6[1], n6[1]), x: t6 === s6[1] ? s6[0] : n6[0], islope: (n6[0] - s6[0]) / (n6[1] - s6[1]) });
      }
    }
    if (h5.sort(((t5, e4) => t5.ymin < e4.ymin ? -1 : t5.ymin > e4.ymin ? 1 : t5.x < e4.x ? -1 : t5.x > e4.x ? 1 : t5.ymax === e4.ymax ? 0 : (t5.ymax - e4.ymax) / Math.abs(t5.ymax - e4.ymax))), !h5.length) return a5;
    let r5 = [], i5 = h5[0].ymin, c5 = 0;
    for (; r5.length || h5.length; ) {
      if (h5.length) {
        let t5 = -1;
        for (let e4 = 0; e4 < h5.length && !(h5[e4].ymin > i5); e4++) t5 = e4;
        h5.splice(0, t5 + 1).forEach(((t6) => {
          r5.push({ s: i5, edge: t6 });
        }));
      }
      if (r5 = r5.filter(((t5) => !(t5.edge.ymax <= i5))), r5.sort(((t5, e4) => t5.edge.x === e4.edge.x ? 0 : (t5.edge.x - e4.edge.x) / Math.abs(t5.edge.x - e4.edge.x))), (1 !== n5 || c5 % s5 == 0) && r5.length > 1) for (let t5 = 0; t5 < r5.length; t5 += 2) {
        const e4 = t5 + 1;
        if (e4 >= r5.length) break;
        const s6 = r5[t5].edge, n6 = r5[e4].edge;
        a5.push([[Math.round(s6.x), i5], [Math.round(n6.x), i5]]);
      }
      i5 += n5, r5.forEach(((t5) => {
        t5.edge.x = t5.edge.x + n5 * t5.edge.islope;
      })), c5++;
    }
    return a5;
  })(i4, r4, a4);
  if (h4) {
    for (const e4 of i4) t(e4, c4, -h4);
    !(function(e4, s5, n5) {
      const o5 = [];
      e4.forEach(((t4) => o5.push(...t4))), t(o5, s5, n5);
    })(l4, c4, -h4);
  }
  return l4;
}
function n(t4, e4) {
  var n4;
  const o4 = e4.hachureAngle + 90;
  let a4 = e4.hachureGap;
  a4 < 0 && (a4 = 4 * e4.strokeWidth), a4 = Math.round(Math.max(a4, 0.1));
  let h4 = 1;
  return e4.roughness >= 1 && ((null === (n4 = e4.randomizer) || void 0 === n4 ? void 0 : n4.next()) || Math.random()) > 0.7 && (h4 = a4), s(t4, a4, o4, h4 || 1);
}
var o = class {
  constructor(t4) {
    this.helper = t4;
  }
  fillPolygons(t4, e4) {
    return this._fillPolygons(t4, e4);
  }
  _fillPolygons(t4, e4) {
    const s4 = n(t4, e4);
    return { type: "fillSketch", ops: this.renderLines(s4, e4) };
  }
  renderLines(t4, e4) {
    const s4 = [];
    for (const n4 of t4) s4.push(...this.helper.doubleLineOps(n4[0][0], n4[0][1], n4[1][0], n4[1][1], e4));
    return s4;
  }
};
function a(t4) {
  const e4 = t4[0], s4 = t4[1];
  return Math.sqrt(Math.pow(e4[0] - s4[0], 2) + Math.pow(e4[1] - s4[1], 2));
}
var h = class extends o {
  fillPolygons(t4, e4) {
    let s4 = e4.hachureGap;
    s4 < 0 && (s4 = 4 * e4.strokeWidth), s4 = Math.max(s4, 0.1);
    const o4 = n(t4, Object.assign({}, e4, { hachureGap: s4 })), h4 = Math.PI / 180 * e4.hachureAngle, r4 = [], i4 = 0.5 * s4 * Math.cos(h4), c4 = 0.5 * s4 * Math.sin(h4);
    for (const [t5, e5] of o4) a([t5, e5]) && r4.push([[t5[0] - i4, t5[1] + c4], [...e5]], [[t5[0] + i4, t5[1] - c4], [...e5]]);
    return { type: "fillSketch", ops: this.renderLines(r4, e4) };
  }
};
var r = class extends o {
  fillPolygons(t4, e4) {
    const s4 = this._fillPolygons(t4, e4), n4 = Object.assign({}, e4, { hachureAngle: e4.hachureAngle + 90 }), o4 = this._fillPolygons(t4, n4);
    return s4.ops = s4.ops.concat(o4.ops), s4;
  }
};
var i = class {
  constructor(t4) {
    this.helper = t4;
  }
  fillPolygons(t4, e4) {
    const s4 = n(t4, e4 = Object.assign({}, e4, { hachureAngle: 0 }));
    return this.dotsOnLines(s4, e4);
  }
  dotsOnLines(t4, e4) {
    const s4 = [];
    let n4 = e4.hachureGap;
    n4 < 0 && (n4 = 4 * e4.strokeWidth), n4 = Math.max(n4, 0.1);
    let o4 = e4.fillWeight;
    o4 < 0 && (o4 = e4.strokeWidth / 2);
    const h4 = n4 / 4;
    for (const r4 of t4) {
      const t5 = a(r4), i4 = t5 / n4, c4 = Math.ceil(i4) - 1, l4 = t5 - c4 * n4, u5 = (r4[0][0] + r4[1][0]) / 2 - n4 / 4, p5 = Math.min(r4[0][1], r4[1][1]);
      for (let t6 = 0; t6 < c4; t6++) {
        const a4 = p5 + l4 + t6 * n4, r5 = u5 - h4 + 2 * Math.random() * h4, i5 = a4 - h4 + 2 * Math.random() * h4, c5 = this.helper.ellipse(r5, i5, o4, o4, e4);
        s4.push(...c5.ops);
      }
    }
    return { type: "fillSketch", ops: s4 };
  }
};
var c = class {
  constructor(t4) {
    this.helper = t4;
  }
  fillPolygons(t4, e4) {
    const s4 = n(t4, e4);
    return { type: "fillSketch", ops: this.dashedLine(s4, e4) };
  }
  dashedLine(t4, e4) {
    const s4 = e4.dashOffset < 0 ? e4.hachureGap < 0 ? 4 * e4.strokeWidth : e4.hachureGap : e4.dashOffset, n4 = e4.dashGap < 0 ? e4.hachureGap < 0 ? 4 * e4.strokeWidth : e4.hachureGap : e4.dashGap, o4 = [];
    return t4.forEach(((t5) => {
      const h4 = a(t5), r4 = Math.floor(h4 / (s4 + n4)), i4 = (h4 + n4 - r4 * (s4 + n4)) / 2;
      let c4 = t5[0], l4 = t5[1];
      c4[0] > l4[0] && (c4 = t5[1], l4 = t5[0]);
      const u5 = Math.atan((l4[1] - c4[1]) / (l4[0] - c4[0]));
      for (let t6 = 0; t6 < r4; t6++) {
        const a4 = t6 * (s4 + n4), h5 = a4 + s4, r5 = [c4[0] + a4 * Math.cos(u5) + i4 * Math.cos(u5), c4[1] + a4 * Math.sin(u5) + i4 * Math.sin(u5)], l5 = [c4[0] + h5 * Math.cos(u5) + i4 * Math.cos(u5), c4[1] + h5 * Math.sin(u5) + i4 * Math.sin(u5)];
        o4.push(...this.helper.doubleLineOps(r5[0], r5[1], l5[0], l5[1], e4));
      }
    })), o4;
  }
};
var l = class {
  constructor(t4) {
    this.helper = t4;
  }
  fillPolygons(t4, e4) {
    const s4 = e4.hachureGap < 0 ? 4 * e4.strokeWidth : e4.hachureGap, o4 = e4.zigzagOffset < 0 ? s4 : e4.zigzagOffset, a4 = n(t4, e4 = Object.assign({}, e4, { hachureGap: s4 + o4 }));
    return { type: "fillSketch", ops: this.zigzagLines(a4, o4, e4) };
  }
  zigzagLines(t4, e4, s4) {
    const n4 = [];
    return t4.forEach(((t5) => {
      const o4 = a(t5), h4 = Math.round(o4 / (2 * e4));
      let r4 = t5[0], i4 = t5[1];
      r4[0] > i4[0] && (r4 = t5[1], i4 = t5[0]);
      const c4 = Math.atan((i4[1] - r4[1]) / (i4[0] - r4[0]));
      for (let t6 = 0; t6 < h4; t6++) {
        const o5 = 2 * t6 * e4, a4 = 2 * (t6 + 1) * e4, h5 = Math.sqrt(2 * Math.pow(e4, 2)), i5 = [r4[0] + o5 * Math.cos(c4), r4[1] + o5 * Math.sin(c4)], l4 = [r4[0] + a4 * Math.cos(c4), r4[1] + a4 * Math.sin(c4)], u5 = [i5[0] + h5 * Math.cos(c4 + Math.PI / 4), i5[1] + h5 * Math.sin(c4 + Math.PI / 4)];
        n4.push(...this.helper.doubleLineOps(i5[0], i5[1], u5[0], u5[1], s4), ...this.helper.doubleLineOps(u5[0], u5[1], l4[0], l4[1], s4));
      }
    })), n4;
  }
};
var u = {};
var p2 = class {
  constructor(t4) {
    this.seed = t4;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
};
var f = 0;
var d = 1;
var g = 2;
var M = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function k(t4, e4) {
  return t4.type === e4;
}
function b(t4) {
  const e4 = [], s4 = (function(t5) {
    const e5 = new Array();
    for (; "" !== t5; ) if (t5.match(/^([ \t\r\n,]+)/)) t5 = t5.substr(RegExp.$1.length);
    else if (t5.match(/^([aAcChHlLmMqQsStTvVzZ])/)) e5[e5.length] = { type: f, text: RegExp.$1 }, t5 = t5.substr(RegExp.$1.length);
    else {
      if (!t5.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      e5[e5.length] = { type: d, text: `${parseFloat(RegExp.$1)}` }, t5 = t5.substr(RegExp.$1.length);
    }
    return e5[e5.length] = { type: g, text: "" }, e5;
  })(t4);
  let n4 = "BOD", o4 = 0, a4 = s4[o4];
  for (; !k(a4, g); ) {
    let h4 = 0;
    const r4 = [];
    if ("BOD" === n4) {
      if ("M" !== a4.text && "m" !== a4.text) return b("M0,0" + t4);
      o4++, h4 = M[a4.text], n4 = a4.text;
    } else k(a4, d) ? h4 = M[n4] : (o4++, h4 = M[a4.text], n4 = a4.text);
    if (!(o4 + h4 < s4.length)) throw new Error("Path data ended short");
    for (let t5 = o4; t5 < o4 + h4; t5++) {
      const e5 = s4[t5];
      if (!k(e5, d)) throw new Error("Param not a number: " + n4 + "," + e5.text);
      r4[r4.length] = +e5.text;
    }
    if ("number" != typeof M[n4]) throw new Error("Bad segment: " + n4);
    {
      const t5 = { key: n4, data: r4 };
      e4.push(t5), o4 += h4, a4 = s4[o4], "M" === n4 && (n4 = "L"), "m" === n4 && (n4 = "l");
    }
  }
  return e4;
}
function y(t4) {
  let e4 = 0, s4 = 0, n4 = 0, o4 = 0;
  const a4 = [];
  for (const { key: h4, data: r4 } of t4) switch (h4) {
    case "M":
      a4.push({ key: "M", data: [...r4] }), [e4, s4] = r4, [n4, o4] = r4;
      break;
    case "m":
      e4 += r4[0], s4 += r4[1], a4.push({ key: "M", data: [e4, s4] }), n4 = e4, o4 = s4;
      break;
    case "L":
      a4.push({ key: "L", data: [...r4] }), [e4, s4] = r4;
      break;
    case "l":
      e4 += r4[0], s4 += r4[1], a4.push({ key: "L", data: [e4, s4] });
      break;
    case "C":
      a4.push({ key: "C", data: [...r4] }), e4 = r4[4], s4 = r4[5];
      break;
    case "c": {
      const t5 = r4.map(((t6, n5) => n5 % 2 ? t6 + s4 : t6 + e4));
      a4.push({ key: "C", data: t5 }), e4 = t5[4], s4 = t5[5];
      break;
    }
    case "Q":
      a4.push({ key: "Q", data: [...r4] }), e4 = r4[2], s4 = r4[3];
      break;
    case "q": {
      const t5 = r4.map(((t6, n5) => n5 % 2 ? t6 + s4 : t6 + e4));
      a4.push({ key: "Q", data: t5 }), e4 = t5[2], s4 = t5[3];
      break;
    }
    case "A":
      a4.push({ key: "A", data: [...r4] }), e4 = r4[5], s4 = r4[6];
      break;
    case "a":
      e4 += r4[5], s4 += r4[6], a4.push({ key: "A", data: [r4[0], r4[1], r4[2], r4[3], r4[4], e4, s4] });
      break;
    case "H":
      a4.push({ key: "H", data: [...r4] }), e4 = r4[0];
      break;
    case "h":
      e4 += r4[0], a4.push({ key: "H", data: [e4] });
      break;
    case "V":
      a4.push({ key: "V", data: [...r4] }), s4 = r4[0];
      break;
    case "v":
      s4 += r4[0], a4.push({ key: "V", data: [s4] });
      break;
    case "S":
      a4.push({ key: "S", data: [...r4] }), e4 = r4[2], s4 = r4[3];
      break;
    case "s": {
      const t5 = r4.map(((t6, n5) => n5 % 2 ? t6 + s4 : t6 + e4));
      a4.push({ key: "S", data: t5 }), e4 = t5[2], s4 = t5[3];
      break;
    }
    case "T":
      a4.push({ key: "T", data: [...r4] }), e4 = r4[0], s4 = r4[1];
      break;
    case "t":
      e4 += r4[0], s4 += r4[1], a4.push({ key: "T", data: [e4, s4] });
      break;
    case "Z":
    case "z":
      a4.push({ key: "Z", data: [] }), e4 = n4, s4 = o4;
  }
  return a4;
}
function m(t4) {
  const e4 = [];
  let s4 = "", n4 = 0, o4 = 0, a4 = 0, h4 = 0, r4 = 0, i4 = 0;
  for (const { key: c4, data: l4 } of t4) {
    switch (c4) {
      case "M":
        e4.push({ key: "M", data: [...l4] }), [n4, o4] = l4, [a4, h4] = l4;
        break;
      case "C":
        e4.push({ key: "C", data: [...l4] }), n4 = l4[4], o4 = l4[5], r4 = l4[2], i4 = l4[3];
        break;
      case "L":
        e4.push({ key: "L", data: [...l4] }), [n4, o4] = l4;
        break;
      case "H":
        n4 = l4[0], e4.push({ key: "L", data: [n4, o4] });
        break;
      case "V":
        o4 = l4[0], e4.push({ key: "L", data: [n4, o4] });
        break;
      case "S": {
        let t5 = 0, a5 = 0;
        "C" === s4 || "S" === s4 ? (t5 = n4 + (n4 - r4), a5 = o4 + (o4 - i4)) : (t5 = n4, a5 = o4), e4.push({ key: "C", data: [t5, a5, ...l4] }), r4 = l4[0], i4 = l4[1], n4 = l4[2], o4 = l4[3];
        break;
      }
      case "T": {
        const [t5, a5] = l4;
        let h5 = 0, c5 = 0;
        "Q" === s4 || "T" === s4 ? (h5 = n4 + (n4 - r4), c5 = o4 + (o4 - i4)) : (h5 = n4, c5 = o4);
        const u5 = n4 + 2 * (h5 - n4) / 3, p5 = o4 + 2 * (c5 - o4) / 3, f5 = t5 + 2 * (h5 - t5) / 3, d4 = a5 + 2 * (c5 - a5) / 3;
        e4.push({ key: "C", data: [u5, p5, f5, d4, t5, a5] }), r4 = h5, i4 = c5, n4 = t5, o4 = a5;
        break;
      }
      case "Q": {
        const [t5, s5, a5, h5] = l4, c5 = n4 + 2 * (t5 - n4) / 3, u5 = o4 + 2 * (s5 - o4) / 3, p5 = a5 + 2 * (t5 - a5) / 3, f5 = h5 + 2 * (s5 - h5) / 3;
        e4.push({ key: "C", data: [c5, u5, p5, f5, a5, h5] }), r4 = t5, i4 = s5, n4 = a5, o4 = h5;
        break;
      }
      case "A": {
        const t5 = Math.abs(l4[0]), s5 = Math.abs(l4[1]), a5 = l4[2], h5 = l4[3], r5 = l4[4], i5 = l4[5], c5 = l4[6];
        if (0 === t5 || 0 === s5) e4.push({ key: "C", data: [n4, o4, i5, c5, i5, c5] }), n4 = i5, o4 = c5;
        else if (n4 !== i5 || o4 !== c5) {
          x(n4, o4, i5, c5, t5, s5, a5, h5, r5).forEach((function(t6) {
            e4.push({ key: "C", data: t6 });
          })), n4 = i5, o4 = c5;
        }
        break;
      }
      case "Z":
        e4.push({ key: "Z", data: [] }), n4 = a4, o4 = h4;
    }
    s4 = c4;
  }
  return e4;
}
function w(t4, e4, s4) {
  return [t4 * Math.cos(s4) - e4 * Math.sin(s4), t4 * Math.sin(s4) + e4 * Math.cos(s4)];
}
function x(t4, e4, s4, n4, o4, a4, h4, r4, i4, c4) {
  const l4 = (u5 = h4, Math.PI * u5 / 180);
  var u5;
  let p5 = [], f5 = 0, d4 = 0, g4 = 0, M4 = 0;
  if (c4) [f5, d4, g4, M4] = c4;
  else {
    [t4, e4] = w(t4, e4, -l4), [s4, n4] = w(s4, n4, -l4);
    const h5 = (t4 - s4) / 2, c5 = (e4 - n4) / 2;
    let u6 = h5 * h5 / (o4 * o4) + c5 * c5 / (a4 * a4);
    u6 > 1 && (u6 = Math.sqrt(u6), o4 *= u6, a4 *= u6);
    const p6 = o4 * o4, k5 = a4 * a4, b4 = p6 * k5 - p6 * c5 * c5 - k5 * h5 * h5, y5 = p6 * c5 * c5 + k5 * h5 * h5, m5 = (r4 === i4 ? -1 : 1) * Math.sqrt(Math.abs(b4 / y5));
    g4 = m5 * o4 * c5 / a4 + (t4 + s4) / 2, M4 = m5 * -a4 * h5 / o4 + (e4 + n4) / 2, f5 = Math.asin(parseFloat(((e4 - M4) / a4).toFixed(9))), d4 = Math.asin(parseFloat(((n4 - M4) / a4).toFixed(9))), t4 < g4 && (f5 = Math.PI - f5), s4 < g4 && (d4 = Math.PI - d4), f5 < 0 && (f5 = 2 * Math.PI + f5), d4 < 0 && (d4 = 2 * Math.PI + d4), i4 && f5 > d4 && (f5 -= 2 * Math.PI), !i4 && d4 > f5 && (d4 -= 2 * Math.PI);
  }
  let k4 = d4 - f5;
  if (Math.abs(k4) > 120 * Math.PI / 180) {
    const t5 = d4, e5 = s4, r5 = n4;
    d4 = i4 && d4 > f5 ? f5 + 120 * Math.PI / 180 * 1 : f5 + 120 * Math.PI / 180 * -1, p5 = x(s4 = g4 + o4 * Math.cos(d4), n4 = M4 + a4 * Math.sin(d4), e5, r5, o4, a4, h4, 0, i4, [d4, t5, g4, M4]);
  }
  k4 = d4 - f5;
  const b3 = Math.cos(f5), y4 = Math.sin(f5), m4 = Math.cos(d4), P4 = Math.sin(d4), v4 = Math.tan(k4 / 4), S4 = 4 / 3 * o4 * v4, O4 = 4 / 3 * a4 * v4, L4 = [t4, e4], T4 = [t4 + S4 * y4, e4 - O4 * b3], D4 = [s4 + S4 * P4, n4 - O4 * m4], A4 = [s4, n4];
  if (T4[0] = 2 * L4[0] - T4[0], T4[1] = 2 * L4[1] - T4[1], c4) return [T4, D4, A4].concat(p5);
  {
    p5 = [T4, D4, A4].concat(p5);
    const t5 = [];
    for (let e5 = 0; e5 < p5.length; e5 += 3) {
      const s5 = w(p5[e5][0], p5[e5][1], l4), n5 = w(p5[e5 + 1][0], p5[e5 + 1][1], l4), o5 = w(p5[e5 + 2][0], p5[e5 + 2][1], l4);
      t5.push([s5[0], s5[1], n5[0], n5[1], o5[0], o5[1]]);
    }
    return t5;
  }
}
var P = { randOffset: function(t4, e4) {
  return G(t4, e4);
}, randOffsetWithRange: function(t4, e4, s4) {
  return E(t4, e4, s4);
}, ellipse: function(t4, e4, s4, n4, o4) {
  const a4 = T(s4, n4, o4);
  return D(t4, e4, o4, a4).opset;
}, doubleLineOps: function(t4, e4, s4, n4, o4) {
  return $(t4, e4, s4, n4, o4, true);
} };
function v(t4, e4, s4, n4, o4) {
  return { type: "path", ops: $(t4, e4, s4, n4, o4) };
}
function S(t4, e4, s4) {
  const n4 = (t4 || []).length;
  if (n4 > 2) {
    const o4 = [];
    for (let e5 = 0; e5 < n4 - 1; e5++) o4.push(...$(t4[e5][0], t4[e5][1], t4[e5 + 1][0], t4[e5 + 1][1], s4));
    return e4 && o4.push(...$(t4[n4 - 1][0], t4[n4 - 1][1], t4[0][0], t4[0][1], s4)), { type: "path", ops: o4 };
  }
  return 2 === n4 ? v(t4[0][0], t4[0][1], t4[1][0], t4[1][1], s4) : { type: "path", ops: [] };
}
function O(t4, e4, s4, n4, o4) {
  return (function(t5, e5) {
    return S(t5, true, e5);
  })([[t4, e4], [t4 + s4, e4], [t4 + s4, e4 + n4], [t4, e4 + n4]], o4);
}
function L(t4, e4) {
  if (t4.length) {
    const s4 = "number" == typeof t4[0][0] ? [t4] : t4, n4 = j(s4[0], 1 * (1 + 0.2 * e4.roughness), e4), o4 = e4.disableMultiStroke ? [] : j(s4[0], 1.5 * (1 + 0.22 * e4.roughness), z(e4));
    for (let t5 = 1; t5 < s4.length; t5++) {
      const a4 = s4[t5];
      if (a4.length) {
        const t6 = j(a4, 1 * (1 + 0.2 * e4.roughness), e4), s5 = e4.disableMultiStroke ? [] : j(a4, 1.5 * (1 + 0.22 * e4.roughness), z(e4));
        for (const e5 of t6) "move" !== e5.op && n4.push(e5);
        for (const t7 of s5) "move" !== t7.op && o4.push(t7);
      }
    }
    return { type: "path", ops: n4.concat(o4) };
  }
  return { type: "path", ops: [] };
}
function T(t4, e4, s4) {
  const n4 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t4 / 2, 2) + Math.pow(e4 / 2, 2)) / 2)), o4 = Math.ceil(Math.max(s4.curveStepCount, s4.curveStepCount / Math.sqrt(200) * n4)), a4 = 2 * Math.PI / o4;
  let h4 = Math.abs(t4 / 2), r4 = Math.abs(e4 / 2);
  const i4 = 1 - s4.curveFitting;
  return h4 += G(h4 * i4, s4), r4 += G(r4 * i4, s4), { increment: a4, rx: h4, ry: r4 };
}
function D(t4, e4, s4, n4) {
  const [o4, a4] = F(n4.increment, t4, e4, n4.rx, n4.ry, 1, n4.increment * E(0.1, E(0.4, 1, s4), s4), s4);
  let h4 = q(o4, null, s4);
  if (!s4.disableMultiStroke && 0 !== s4.roughness) {
    const [o5] = F(n4.increment, t4, e4, n4.rx, n4.ry, 1.5, 0, s4), a5 = q(o5, null, s4);
    h4 = h4.concat(a5);
  }
  return { estimatedPoints: a4, opset: { type: "path", ops: h4 } };
}
function A(t4, e4, s4, n4, o4, a4, h4, r4, i4) {
  const c4 = t4, l4 = e4;
  let u5 = Math.abs(s4 / 2), p5 = Math.abs(n4 / 2);
  u5 += G(0.01 * u5, i4), p5 += G(0.01 * p5, i4);
  let f5 = o4, d4 = a4;
  for (; f5 < 0; ) f5 += 2 * Math.PI, d4 += 2 * Math.PI;
  d4 - f5 > 2 * Math.PI && (f5 = 0, d4 = 2 * Math.PI);
  const g4 = 2 * Math.PI / i4.curveStepCount, M4 = Math.min(g4 / 2, (d4 - f5) / 2), k4 = V(M4, c4, l4, u5, p5, f5, d4, 1, i4);
  if (!i4.disableMultiStroke) {
    const t5 = V(M4, c4, l4, u5, p5, f5, d4, 1.5, i4);
    k4.push(...t5);
  }
  return h4 && (r4 ? k4.push(...$(c4, l4, c4 + u5 * Math.cos(f5), l4 + p5 * Math.sin(f5), i4), ...$(c4, l4, c4 + u5 * Math.cos(d4), l4 + p5 * Math.sin(d4), i4)) : k4.push({ op: "lineTo", data: [c4, l4] }, { op: "lineTo", data: [c4 + u5 * Math.cos(f5), l4 + p5 * Math.sin(f5)] })), { type: "path", ops: k4 };
}
function _(t4, e4) {
  const s4 = m(y(b(t4))), n4 = [];
  let o4 = [0, 0], a4 = [0, 0];
  for (const { key: t5, data: h4 } of s4) switch (t5) {
    case "M":
      a4 = [h4[0], h4[1]], o4 = [h4[0], h4[1]];
      break;
    case "L":
      n4.push(...$(a4[0], a4[1], h4[0], h4[1], e4)), a4 = [h4[0], h4[1]];
      break;
    case "C": {
      const [t6, s5, o5, r4, i4, c4] = h4;
      n4.push(...Z(t6, s5, o5, r4, i4, c4, a4, e4)), a4 = [i4, c4];
      break;
    }
    case "Z":
      n4.push(...$(a4[0], a4[1], o4[0], o4[1], e4)), a4 = [o4[0], o4[1]];
  }
  return { type: "path", ops: n4 };
}
function I(t4, e4) {
  const s4 = [];
  for (const n4 of t4) if (n4.length) {
    const t5 = e4.maxRandomnessOffset || 0, o4 = n4.length;
    if (o4 > 2) {
      s4.push({ op: "move", data: [n4[0][0] + G(t5, e4), n4[0][1] + G(t5, e4)] });
      for (let a4 = 1; a4 < o4; a4++) s4.push({ op: "lineTo", data: [n4[a4][0] + G(t5, e4), n4[a4][1] + G(t5, e4)] });
    }
  }
  return { type: "fillPath", ops: s4 };
}
function C(t4, e4) {
  return (function(t5, e5) {
    let s4 = t5.fillStyle || "hachure";
    if (!u[s4]) switch (s4) {
      case "zigzag":
        u[s4] || (u[s4] = new h(e5));
        break;
      case "cross-hatch":
        u[s4] || (u[s4] = new r(e5));
        break;
      case "dots":
        u[s4] || (u[s4] = new i(e5));
        break;
      case "dashed":
        u[s4] || (u[s4] = new c(e5));
        break;
      case "zigzag-line":
        u[s4] || (u[s4] = new l(e5));
        break;
      default:
        s4 = "hachure", u[s4] || (u[s4] = new o(e5));
    }
    return u[s4];
  })(e4, P).fillPolygons(t4, e4);
}
function z(t4) {
  const e4 = Object.assign({}, t4);
  return e4.randomizer = void 0, t4.seed && (e4.seed = t4.seed + 1), e4;
}
function W(t4) {
  return t4.randomizer || (t4.randomizer = new p2(t4.seed || 0)), t4.randomizer.next();
}
function E(t4, e4, s4, n4 = 1) {
  return s4.roughness * n4 * (W(s4) * (e4 - t4) + t4);
}
function G(t4, e4, s4 = 1) {
  return E(-t4, t4, e4, s4);
}
function $(t4, e4, s4, n4, o4, a4 = false) {
  const h4 = a4 ? o4.disableMultiStrokeFill : o4.disableMultiStroke, r4 = R(t4, e4, s4, n4, o4, true, false);
  if (h4) return r4;
  const i4 = R(t4, e4, s4, n4, o4, true, true);
  return r4.concat(i4);
}
function R(t4, e4, s4, n4, o4, a4, h4) {
  const r4 = Math.pow(t4 - s4, 2) + Math.pow(e4 - n4, 2), i4 = Math.sqrt(r4);
  let c4 = 1;
  c4 = i4 < 200 ? 1 : i4 > 500 ? 0.4 : -16668e-7 * i4 + 1.233334;
  let l4 = o4.maxRandomnessOffset || 0;
  l4 * l4 * 100 > r4 && (l4 = i4 / 10);
  const u5 = l4 / 2, p5 = 0.2 + 0.2 * W(o4);
  let f5 = o4.bowing * o4.maxRandomnessOffset * (n4 - e4) / 200, d4 = o4.bowing * o4.maxRandomnessOffset * (t4 - s4) / 200;
  f5 = G(f5, o4, c4), d4 = G(d4, o4, c4);
  const g4 = [], M4 = () => G(u5, o4, c4), k4 = () => G(l4, o4, c4), b3 = o4.preserveVertices;
  return (h4 ? g4.push({ op: "move", data: [t4 + (b3 ? 0 : M4()), e4 + (b3 ? 0 : M4())] }) : g4.push({ op: "move", data: [t4 + (b3 ? 0 : G(l4, o4, c4)), e4 + (b3 ? 0 : G(l4, o4, c4))] })), h4 ? g4.push({ op: "bcurveTo", data: [f5 + t4 + (s4 - t4) * p5 + M4(), d4 + e4 + (n4 - e4) * p5 + M4(), f5 + t4 + 2 * (s4 - t4) * p5 + M4(), d4 + e4 + 2 * (n4 - e4) * p5 + M4(), s4 + (b3 ? 0 : M4()), n4 + (b3 ? 0 : M4())] }) : g4.push({ op: "bcurveTo", data: [f5 + t4 + (s4 - t4) * p5 + k4(), d4 + e4 + (n4 - e4) * p5 + k4(), f5 + t4 + 2 * (s4 - t4) * p5 + k4(), d4 + e4 + 2 * (n4 - e4) * p5 + k4(), s4 + (b3 ? 0 : k4()), n4 + (b3 ? 0 : k4())] }), g4;
}
function j(t4, e4, s4) {
  if (!t4.length) return [];
  const n4 = [];
  n4.push([t4[0][0] + G(e4, s4), t4[0][1] + G(e4, s4)]), n4.push([t4[0][0] + G(e4, s4), t4[0][1] + G(e4, s4)]);
  for (let o4 = 1; o4 < t4.length; o4++) n4.push([t4[o4][0] + G(e4, s4), t4[o4][1] + G(e4, s4)]), o4 === t4.length - 1 && n4.push([t4[o4][0] + G(e4, s4), t4[o4][1] + G(e4, s4)]);
  return q(n4, null, s4);
}
function q(t4, e4, s4) {
  const n4 = t4.length, o4 = [];
  if (n4 > 3) {
    const a4 = [], h4 = 1 - s4.curveTightness;
    o4.push({ op: "move", data: [t4[1][0], t4[1][1]] });
    for (let e5 = 1; e5 + 2 < n4; e5++) {
      const s5 = t4[e5];
      a4[0] = [s5[0], s5[1]], a4[1] = [s5[0] + (h4 * t4[e5 + 1][0] - h4 * t4[e5 - 1][0]) / 6, s5[1] + (h4 * t4[e5 + 1][1] - h4 * t4[e5 - 1][1]) / 6], a4[2] = [t4[e5 + 1][0] + (h4 * t4[e5][0] - h4 * t4[e5 + 2][0]) / 6, t4[e5 + 1][1] + (h4 * t4[e5][1] - h4 * t4[e5 + 2][1]) / 6], a4[3] = [t4[e5 + 1][0], t4[e5 + 1][1]], o4.push({ op: "bcurveTo", data: [a4[1][0], a4[1][1], a4[2][0], a4[2][1], a4[3][0], a4[3][1]] });
    }
  } else 3 === n4 ? (o4.push({ op: "move", data: [t4[1][0], t4[1][1]] }), o4.push({ op: "bcurveTo", data: [t4[1][0], t4[1][1], t4[2][0], t4[2][1], t4[2][0], t4[2][1]] })) : 2 === n4 && o4.push(...R(t4[0][0], t4[0][1], t4[1][0], t4[1][1], s4, true, true));
  return o4;
}
function F(t4, e4, s4, n4, o4, a4, h4, r4) {
  const i4 = [], c4 = [];
  if (0 === r4.roughness) {
    t4 /= 4, c4.push([e4 + n4 * Math.cos(-t4), s4 + o4 * Math.sin(-t4)]);
    for (let a5 = 0; a5 <= 2 * Math.PI; a5 += t4) {
      const t5 = [e4 + n4 * Math.cos(a5), s4 + o4 * Math.sin(a5)];
      i4.push(t5), c4.push(t5);
    }
    c4.push([e4 + n4 * Math.cos(0), s4 + o4 * Math.sin(0)]), c4.push([e4 + n4 * Math.cos(t4), s4 + o4 * Math.sin(t4)]);
  } else {
    const l4 = G(0.5, r4) - Math.PI / 2;
    c4.push([G(a4, r4) + e4 + 0.9 * n4 * Math.cos(l4 - t4), G(a4, r4) + s4 + 0.9 * o4 * Math.sin(l4 - t4)]);
    const u5 = 2 * Math.PI + l4 - 0.01;
    for (let h5 = l4; h5 < u5; h5 += t4) {
      const t5 = [G(a4, r4) + e4 + n4 * Math.cos(h5), G(a4, r4) + s4 + o4 * Math.sin(h5)];
      i4.push(t5), c4.push(t5);
    }
    c4.push([G(a4, r4) + e4 + n4 * Math.cos(l4 + 2 * Math.PI + 0.5 * h4), G(a4, r4) + s4 + o4 * Math.sin(l4 + 2 * Math.PI + 0.5 * h4)]), c4.push([G(a4, r4) + e4 + 0.98 * n4 * Math.cos(l4 + h4), G(a4, r4) + s4 + 0.98 * o4 * Math.sin(l4 + h4)]), c4.push([G(a4, r4) + e4 + 0.9 * n4 * Math.cos(l4 + 0.5 * h4), G(a4, r4) + s4 + 0.9 * o4 * Math.sin(l4 + 0.5 * h4)]);
  }
  return [c4, i4];
}
function V(t4, e4, s4, n4, o4, a4, h4, r4, i4) {
  const c4 = a4 + G(0.1, i4), l4 = [];
  l4.push([G(r4, i4) + e4 + 0.9 * n4 * Math.cos(c4 - t4), G(r4, i4) + s4 + 0.9 * o4 * Math.sin(c4 - t4)]);
  for (let a5 = c4; a5 <= h4; a5 += t4) l4.push([G(r4, i4) + e4 + n4 * Math.cos(a5), G(r4, i4) + s4 + o4 * Math.sin(a5)]);
  return l4.push([e4 + n4 * Math.cos(h4), s4 + o4 * Math.sin(h4)]), l4.push([e4 + n4 * Math.cos(h4), s4 + o4 * Math.sin(h4)]), q(l4, null, i4);
}
function Z(t4, e4, s4, n4, o4, a4, h4, r4) {
  const i4 = [], c4 = [r4.maxRandomnessOffset || 1, (r4.maxRandomnessOffset || 1) + 0.3];
  let l4 = [0, 0];
  const u5 = r4.disableMultiStroke ? 1 : 2, p5 = r4.preserveVertices;
  for (let f5 = 0; f5 < u5; f5++) 0 === f5 ? i4.push({ op: "move", data: [h4[0], h4[1]] }) : i4.push({ op: "move", data: [h4[0] + (p5 ? 0 : G(c4[0], r4)), h4[1] + (p5 ? 0 : G(c4[0], r4))] }), l4 = p5 ? [o4, a4] : [o4 + G(c4[f5], r4), a4 + G(c4[f5], r4)], i4.push({ op: "bcurveTo", data: [t4 + G(c4[f5], r4), e4 + G(c4[f5], r4), s4 + G(c4[f5], r4), n4 + G(c4[f5], r4), l4[0], l4[1]] });
  return i4;
}
function Q(t4) {
  return [...t4];
}
function H(t4, e4 = 0) {
  const s4 = t4.length;
  if (s4 < 3) throw new Error("A curve must have at least three points.");
  const n4 = [];
  if (3 === s4) n4.push(Q(t4[0]), Q(t4[1]), Q(t4[2]), Q(t4[2]));
  else {
    const s5 = [];
    s5.push(t4[0], t4[0]);
    for (let e5 = 1; e5 < t4.length; e5++) s5.push(t4[e5]), e5 === t4.length - 1 && s5.push(t4[e5]);
    const o4 = [], a4 = 1 - e4;
    n4.push(Q(s5[0]));
    for (let t5 = 1; t5 + 2 < s5.length; t5++) {
      const e5 = s5[t5];
      o4[0] = [e5[0], e5[1]], o4[1] = [e5[0] + (a4 * s5[t5 + 1][0] - a4 * s5[t5 - 1][0]) / 6, e5[1] + (a4 * s5[t5 + 1][1] - a4 * s5[t5 - 1][1]) / 6], o4[2] = [s5[t5 + 1][0] + (a4 * s5[t5][0] - a4 * s5[t5 + 2][0]) / 6, s5[t5 + 1][1] + (a4 * s5[t5][1] - a4 * s5[t5 + 2][1]) / 6], o4[3] = [s5[t5 + 1][0], s5[t5 + 1][1]], n4.push(o4[1], o4[2], o4[3]);
    }
  }
  return n4;
}
function N(t4, e4) {
  return Math.pow(t4[0] - e4[0], 2) + Math.pow(t4[1] - e4[1], 2);
}
function B(t4, e4, s4) {
  const n4 = N(e4, s4);
  if (0 === n4) return N(t4, e4);
  let o4 = ((t4[0] - e4[0]) * (s4[0] - e4[0]) + (t4[1] - e4[1]) * (s4[1] - e4[1])) / n4;
  return o4 = Math.max(0, Math.min(1, o4)), N(t4, J(e4, s4, o4));
}
function J(t4, e4, s4) {
  return [t4[0] + (e4[0] - t4[0]) * s4, t4[1] + (e4[1] - t4[1]) * s4];
}
function K(t4, e4, s4, n4) {
  const o4 = n4 || [];
  if ((function(t5, e5) {
    const s5 = t5[e5 + 0], n5 = t5[e5 + 1], o5 = t5[e5 + 2], a5 = t5[e5 + 3];
    let h5 = 3 * n5[0] - 2 * s5[0] - a5[0];
    h5 *= h5;
    let r4 = 3 * n5[1] - 2 * s5[1] - a5[1];
    r4 *= r4;
    let i4 = 3 * o5[0] - 2 * a5[0] - s5[0];
    i4 *= i4;
    let c4 = 3 * o5[1] - 2 * a5[1] - s5[1];
    return c4 *= c4, h5 < i4 && (h5 = i4), r4 < c4 && (r4 = c4), h5 + r4;
  })(t4, e4) < s4) {
    const s5 = t4[e4 + 0];
    if (o4.length) {
      (a4 = o4[o4.length - 1], h4 = s5, Math.sqrt(N(a4, h4))) > 1 && o4.push(s5);
    } else o4.push(s5);
    o4.push(t4[e4 + 3]);
  } else {
    const n5 = 0.5, a5 = t4[e4 + 0], h5 = t4[e4 + 1], r4 = t4[e4 + 2], i4 = t4[e4 + 3], c4 = J(a5, h5, n5), l4 = J(h5, r4, n5), u5 = J(r4, i4, n5), p5 = J(c4, l4, n5), f5 = J(l4, u5, n5), d4 = J(p5, f5, n5);
    K([a5, c4, p5, d4], 0, s4, o4), K([d4, f5, u5, i4], 0, s4, o4);
  }
  var a4, h4;
  return o4;
}
function U(t4, e4) {
  return X(t4, 0, t4.length, e4);
}
function X(t4, e4, s4, n4, o4) {
  const a4 = o4 || [], h4 = t4[e4], r4 = t4[s4 - 1];
  let i4 = 0, c4 = 1;
  for (let n5 = e4 + 1; n5 < s4 - 1; ++n5) {
    const e5 = B(t4[n5], h4, r4);
    e5 > i4 && (i4 = e5, c4 = n5);
  }
  return Math.sqrt(i4) > n4 ? (X(t4, e4, c4 + 1, n4, a4), X(t4, c4, s4, n4, a4)) : (a4.length || a4.push(h4), a4.push(r4)), a4;
}
function Y(t4, e4 = 0.15, s4) {
  const n4 = [], o4 = (t4.length - 1) / 3;
  for (let s5 = 0; s5 < o4; s5++) {
    K(t4, 3 * s5, e4, n4);
  }
  return s4 && s4 > 0 ? X(n4, 0, n4.length, s4) : n4;
}
var tt = "none";
var et = class {
  constructor(t4) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: false, disableMultiStrokeFill: false, preserveVertices: false, fillShapeRoughnessGain: 0.8 }, this.config = t4 || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(t4) {
    return t4 ? Object.assign({}, this.defaultOptions, t4) : this.defaultOptions;
  }
  _d(t4, e4, s4) {
    return { shape: t4, sets: e4 || [], options: s4 || this.defaultOptions };
  }
  line(t4, e4, s4, n4, o4) {
    const a4 = this._o(o4);
    return this._d("line", [v(t4, e4, s4, n4, a4)], a4);
  }
  rectangle(t4, e4, s4, n4, o4) {
    const a4 = this._o(o4), h4 = [], r4 = O(t4, e4, s4, n4, a4);
    if (a4.fill) {
      const o5 = [[t4, e4], [t4 + s4, e4], [t4 + s4, e4 + n4], [t4, e4 + n4]];
      "solid" === a4.fillStyle ? h4.push(I([o5], a4)) : h4.push(C([o5], a4));
    }
    return a4.stroke !== tt && h4.push(r4), this._d("rectangle", h4, a4);
  }
  ellipse(t4, e4, s4, n4, o4) {
    const a4 = this._o(o4), h4 = [], r4 = T(s4, n4, a4), i4 = D(t4, e4, a4, r4);
    if (a4.fill) if ("solid" === a4.fillStyle) {
      const s5 = D(t4, e4, a4, r4).opset;
      s5.type = "fillPath", h4.push(s5);
    } else h4.push(C([i4.estimatedPoints], a4));
    return a4.stroke !== tt && h4.push(i4.opset), this._d("ellipse", h4, a4);
  }
  circle(t4, e4, s4, n4) {
    const o4 = this.ellipse(t4, e4, s4, s4, n4);
    return o4.shape = "circle", o4;
  }
  linearPath(t4, e4) {
    const s4 = this._o(e4);
    return this._d("linearPath", [S(t4, false, s4)], s4);
  }
  arc(t4, e4, s4, n4, o4, a4, h4 = false, r4) {
    const i4 = this._o(r4), c4 = [], l4 = A(t4, e4, s4, n4, o4, a4, h4, true, i4);
    if (h4 && i4.fill) if ("solid" === i4.fillStyle) {
      const h5 = Object.assign({}, i4);
      h5.disableMultiStroke = true;
      const r5 = A(t4, e4, s4, n4, o4, a4, true, false, h5);
      r5.type = "fillPath", c4.push(r5);
    } else c4.push((function(t5, e5, s5, n5, o5, a5, h5) {
      const r5 = t5, i5 = e5;
      let c5 = Math.abs(s5 / 2), l5 = Math.abs(n5 / 2);
      c5 += G(0.01 * c5, h5), l5 += G(0.01 * l5, h5);
      let u5 = o5, p5 = a5;
      for (; u5 < 0; ) u5 += 2 * Math.PI, p5 += 2 * Math.PI;
      p5 - u5 > 2 * Math.PI && (u5 = 0, p5 = 2 * Math.PI);
      const f5 = (p5 - u5) / h5.curveStepCount, d4 = [];
      for (let t6 = u5; t6 <= p5; t6 += f5) d4.push([r5 + c5 * Math.cos(t6), i5 + l5 * Math.sin(t6)]);
      return d4.push([r5 + c5 * Math.cos(p5), i5 + l5 * Math.sin(p5)]), d4.push([r5, i5]), C([d4], h5);
    })(t4, e4, s4, n4, o4, a4, i4));
    return i4.stroke !== tt && c4.push(l4), this._d("arc", c4, i4);
  }
  curve(t4, e4) {
    const s4 = this._o(e4), n4 = [], o4 = L(t4, s4);
    if (s4.fill && s4.fill !== tt) if ("solid" === s4.fillStyle) {
      const e5 = L(t4, Object.assign(Object.assign({}, s4), { disableMultiStroke: true, roughness: s4.roughness ? s4.roughness + s4.fillShapeRoughnessGain : 0 }));
      n4.push({ type: "fillPath", ops: this._mergedShape(e5.ops) });
    } else {
      const e5 = [], o5 = t4;
      if (o5.length) {
        const t5 = "number" == typeof o5[0][0] ? [o5] : o5;
        for (const n5 of t5) n5.length < 3 ? e5.push(...n5) : 3 === n5.length ? e5.push(...Y(H([n5[0], n5[0], n5[1], n5[2]]), 10, (1 + s4.roughness) / 2)) : e5.push(...Y(H(n5), 10, (1 + s4.roughness) / 2));
      }
      e5.length && n4.push(C([e5], s4));
    }
    return s4.stroke !== tt && n4.push(o4), this._d("curve", n4, s4);
  }
  polygon(t4, e4) {
    const s4 = this._o(e4), n4 = [], o4 = S(t4, true, s4);
    return s4.fill && ("solid" === s4.fillStyle ? n4.push(I([t4], s4)) : n4.push(C([t4], s4))), s4.stroke !== tt && n4.push(o4), this._d("polygon", n4, s4);
  }
  path(t4, e4) {
    const s4 = this._o(e4), n4 = [];
    if (!t4) return this._d("path", n4, s4);
    t4 = (t4 || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const o4 = s4.fill && "transparent" !== s4.fill && s4.fill !== tt, a4 = s4.stroke !== tt, h4 = !!(s4.simplification && s4.simplification < 1), r4 = (function(t5, e5, s5) {
      const n5 = m(y(b(t5))), o5 = [];
      let a5 = [], h5 = [0, 0], r5 = [];
      const i5 = () => {
        r5.length >= 4 && a5.push(...Y(r5, e5)), r5 = [];
      }, c4 = () => {
        i5(), a5.length && (o5.push(a5), a5 = []);
      };
      for (const { key: t6, data: e6 } of n5) switch (t6) {
        case "M":
          c4(), h5 = [e6[0], e6[1]], a5.push(h5);
          break;
        case "L":
          i5(), a5.push([e6[0], e6[1]]);
          break;
        case "C":
          if (!r5.length) {
            const t7 = a5.length ? a5[a5.length - 1] : h5;
            r5.push([t7[0], t7[1]]);
          }
          r5.push([e6[0], e6[1]]), r5.push([e6[2], e6[3]]), r5.push([e6[4], e6[5]]);
          break;
        case "Z":
          i5(), a5.push([h5[0], h5[1]]);
      }
      if (c4(), !s5) return o5;
      const l4 = [];
      for (const t6 of o5) {
        const e6 = U(t6, s5);
        e6.length && l4.push(e6);
      }
      return l4;
    })(t4, 1, h4 ? 4 - 4 * (s4.simplification || 1) : (1 + s4.roughness) / 2), i4 = _(t4, s4);
    if (o4) if ("solid" === s4.fillStyle) if (1 === r4.length) {
      const e5 = _(t4, Object.assign(Object.assign({}, s4), { disableMultiStroke: true, roughness: s4.roughness ? s4.roughness + s4.fillShapeRoughnessGain : 0 }));
      n4.push({ type: "fillPath", ops: this._mergedShape(e5.ops) });
    } else n4.push(I(r4, s4));
    else n4.push(C(r4, s4));
    return a4 && (h4 ? r4.forEach(((t5) => {
      n4.push(S(t5, false, s4));
    })) : n4.push(i4)), this._d("path", n4, s4);
  }
  opsToPath(t4, e4) {
    let s4 = "";
    for (const n4 of t4.ops) {
      const t5 = "number" == typeof e4 && e4 >= 0 ? n4.data.map(((t6) => +t6.toFixed(e4))) : n4.data;
      switch (n4.op) {
        case "move":
          s4 += `M${t5[0]} ${t5[1]} `;
          break;
        case "bcurveTo":
          s4 += `C${t5[0]} ${t5[1]}, ${t5[2]} ${t5[3]}, ${t5[4]} ${t5[5]} `;
          break;
        case "lineTo":
          s4 += `L${t5[0]} ${t5[1]} `;
      }
    }
    return s4.trim();
  }
  toPaths(t4) {
    const e4 = t4.sets || [], s4 = t4.options || this.defaultOptions, n4 = [];
    for (const t5 of e4) {
      let e5 = null;
      switch (t5.type) {
        case "path":
          e5 = { d: this.opsToPath(t5), stroke: s4.stroke, strokeWidth: s4.strokeWidth, fill: tt };
          break;
        case "fillPath":
          e5 = { d: this.opsToPath(t5), stroke: tt, strokeWidth: 0, fill: s4.fill || tt };
          break;
        case "fillSketch":
          e5 = this.fillSketch(t5, s4);
      }
      e5 && n4.push(e5);
    }
    return n4;
  }
  fillSketch(t4, e4) {
    let s4 = e4.fillWeight;
    return s4 < 0 && (s4 = e4.strokeWidth / 2), { d: this.opsToPath(t4), stroke: e4.fill || tt, strokeWidth: s4, fill: tt };
  }
  _mergedShape(t4) {
    return t4.filter(((t5, e4) => 0 === e4 || "move" !== t5.op));
  }
};
var st = class {
  constructor(t4, e4) {
    this.canvas = t4, this.ctx = this.canvas.getContext("2d"), this.gen = new et(e4);
  }
  draw(t4) {
    const e4 = t4.sets || [], s4 = t4.options || this.getDefaultOptions(), n4 = this.ctx, o4 = t4.options.fixedDecimalPlaceDigits;
    for (const a4 of e4) switch (a4.type) {
      case "path":
        n4.save(), n4.strokeStyle = "none" === s4.stroke ? "transparent" : s4.stroke, n4.lineWidth = s4.strokeWidth, s4.strokeLineDash && n4.setLineDash(s4.strokeLineDash), s4.strokeLineDashOffset && (n4.lineDashOffset = s4.strokeLineDashOffset), this._drawToContext(n4, a4, o4), n4.restore();
        break;
      case "fillPath": {
        n4.save(), n4.fillStyle = s4.fill || "";
        const e5 = "curve" === t4.shape || "polygon" === t4.shape || "path" === t4.shape ? "evenodd" : "nonzero";
        this._drawToContext(n4, a4, o4, e5), n4.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(n4, a4, s4);
    }
  }
  fillSketch(t4, e4, s4) {
    let n4 = s4.fillWeight;
    n4 < 0 && (n4 = s4.strokeWidth / 2), t4.save(), s4.fillLineDash && t4.setLineDash(s4.fillLineDash), s4.fillLineDashOffset && (t4.lineDashOffset = s4.fillLineDashOffset), t4.strokeStyle = s4.fill || "", t4.lineWidth = n4, this._drawToContext(t4, e4, s4.fixedDecimalPlaceDigits), t4.restore();
  }
  _drawToContext(t4, e4, s4, n4 = "nonzero") {
    t4.beginPath();
    for (const n5 of e4.ops) {
      const e5 = "number" == typeof s4 && s4 >= 0 ? n5.data.map(((t5) => +t5.toFixed(s4))) : n5.data;
      switch (n5.op) {
        case "move":
          t4.moveTo(e5[0], e5[1]);
          break;
        case "bcurveTo":
          t4.bezierCurveTo(e5[0], e5[1], e5[2], e5[3], e5[4], e5[5]);
          break;
        case "lineTo":
          t4.lineTo(e5[0], e5[1]);
      }
    }
    "fillPath" === e4.type ? t4.fill(n4) : t4.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(t4, e4, s4, n4, o4) {
    const a4 = this.gen.line(t4, e4, s4, n4, o4);
    return this.draw(a4), a4;
  }
  rectangle(t4, e4, s4, n4, o4) {
    const a4 = this.gen.rectangle(t4, e4, s4, n4, o4);
    return this.draw(a4), a4;
  }
  ellipse(t4, e4, s4, n4, o4) {
    const a4 = this.gen.ellipse(t4, e4, s4, n4, o4);
    return this.draw(a4), a4;
  }
  circle(t4, e4, s4, n4) {
    const o4 = this.gen.circle(t4, e4, s4, n4);
    return this.draw(o4), o4;
  }
  linearPath(t4, e4) {
    const s4 = this.gen.linearPath(t4, e4);
    return this.draw(s4), s4;
  }
  polygon(t4, e4) {
    const s4 = this.gen.polygon(t4, e4);
    return this.draw(s4), s4;
  }
  arc(t4, e4, s4, n4, o4, a4, h4 = false, r4) {
    const i4 = this.gen.arc(t4, e4, s4, n4, o4, a4, h4, r4);
    return this.draw(i4), i4;
  }
  curve(t4, e4) {
    const s4 = this.gen.curve(t4, e4);
    return this.draw(s4), s4;
  }
  path(t4, e4) {
    const s4 = this.gen.path(t4, e4);
    return this.draw(s4), s4;
  }
};
var nt = "http://www.w3.org/2000/svg";
var ot = class {
  constructor(t4, e4) {
    this.svg = t4, this.gen = new et(e4);
  }
  draw(t4) {
    const e4 = t4.sets || [], s4 = t4.options || this.getDefaultOptions(), n4 = this.svg.ownerDocument || window.document, o4 = n4.createElementNS(nt, "g"), a4 = t4.options.fixedDecimalPlaceDigits;
    for (const h4 of e4) {
      let e5 = null;
      switch (h4.type) {
        case "path":
          e5 = n4.createElementNS(nt, "path"), e5.setAttribute("d", this.opsToPath(h4, a4)), e5.setAttribute("stroke", s4.stroke), e5.setAttribute("stroke-width", s4.strokeWidth + ""), e5.setAttribute("fill", "none"), s4.strokeLineDash && e5.setAttribute("stroke-dasharray", s4.strokeLineDash.join(" ").trim()), s4.strokeLineDashOffset && e5.setAttribute("stroke-dashoffset", `${s4.strokeLineDashOffset}`);
          break;
        case "fillPath":
          e5 = n4.createElementNS(nt, "path"), e5.setAttribute("d", this.opsToPath(h4, a4)), e5.setAttribute("stroke", "none"), e5.setAttribute("stroke-width", "0"), e5.setAttribute("fill", s4.fill || ""), "curve" !== t4.shape && "polygon" !== t4.shape || e5.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          e5 = this.fillSketch(n4, h4, s4);
      }
      e5 && o4.appendChild(e5);
    }
    return o4;
  }
  fillSketch(t4, e4, s4) {
    let n4 = s4.fillWeight;
    n4 < 0 && (n4 = s4.strokeWidth / 2);
    const o4 = t4.createElementNS(nt, "path");
    return o4.setAttribute("d", this.opsToPath(e4, s4.fixedDecimalPlaceDigits)), o4.setAttribute("stroke", s4.fill || ""), o4.setAttribute("stroke-width", n4 + ""), o4.setAttribute("fill", "none"), s4.fillLineDash && o4.setAttribute("stroke-dasharray", s4.fillLineDash.join(" ").trim()), s4.fillLineDashOffset && o4.setAttribute("stroke-dashoffset", `${s4.fillLineDashOffset}`), o4;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(t4, e4) {
    return this.gen.opsToPath(t4, e4);
  }
  line(t4, e4, s4, n4, o4) {
    const a4 = this.gen.line(t4, e4, s4, n4, o4);
    return this.draw(a4);
  }
  rectangle(t4, e4, s4, n4, o4) {
    const a4 = this.gen.rectangle(t4, e4, s4, n4, o4);
    return this.draw(a4);
  }
  ellipse(t4, e4, s4, n4, o4) {
    const a4 = this.gen.ellipse(t4, e4, s4, n4, o4);
    return this.draw(a4);
  }
  circle(t4, e4, s4, n4) {
    const o4 = this.gen.circle(t4, e4, s4, n4);
    return this.draw(o4);
  }
  linearPath(t4, e4) {
    const s4 = this.gen.linearPath(t4, e4);
    return this.draw(s4);
  }
  polygon(t4, e4) {
    const s4 = this.gen.polygon(t4, e4);
    return this.draw(s4);
  }
  arc(t4, e4, s4, n4, o4, a4, h4 = false, r4) {
    const i4 = this.gen.arc(t4, e4, s4, n4, o4, a4, h4, r4);
    return this.draw(i4);
  }
  curve(t4, e4) {
    const s4 = this.gen.curve(t4, e4);
    return this.draw(s4);
  }
  path(t4, e4) {
    const s4 = this.gen.path(t4, e4);
    return this.draw(s4);
  }
};
var at = { canvas: (t4, e4) => new st(t4, e4), svg: (t4, e4) => new ot(t4, e4), generator: (t4) => new et(t4), newSeed: () => et.newSeed() };

// node_modules/perfect-freehand/dist/esm/index.mjs
var { PI: e2 } = Math;
var t2 = e2 + 1e-4;
var n2 = 0.5;
var r2 = [1, 1];
function i2(e4, t4, n4, r4 = (e5) => e5) {
  return e4 * r4(0.5 - t4 * (0.5 - n4));
}
var { min: a2 } = Math;
function o2(e4, t4, n4) {
  let r4 = a2(1, t4 / n4);
  return a2(1, e4 + (a2(1, 1 - r4) - e4) * (r4 * 0.275));
}
function s2(e4) {
  return [-e4[0], -e4[1]];
}
function c2(e4, t4) {
  return [e4[0] + t4[0], e4[1] + t4[1]];
}
function l2(e4, t4, n4) {
  return e4[0] = t4[0] + n4[0], e4[1] = t4[1] + n4[1], e4;
}
function u2(e4, t4) {
  return [e4[0] - t4[0], e4[1] - t4[1]];
}
function d2(e4, t4, n4) {
  return e4[0] = t4[0] - n4[0], e4[1] = t4[1] - n4[1], e4;
}
function f2(e4, t4) {
  return [e4[0] * t4, e4[1] * t4];
}
function p3(e4, t4, n4) {
  return e4[0] = t4[0] * n4, e4[1] = t4[1] * n4, e4;
}
function m2(e4, t4) {
  return [e4[0] / t4, e4[1] / t4];
}
function h2(e4) {
  return [e4[1], -e4[0]];
}
function g2(e4, t4) {
  let n4 = t4[0];
  return e4[0] = t4[1], e4[1] = -n4, e4;
}
function ee(e4, t4) {
  return e4[0] * t4[0] + e4[1] * t4[1];
}
function _2(e4, t4) {
  return e4[0] === t4[0] && e4[1] === t4[1];
}
function v2(e4) {
  return Math.hypot(e4[0], e4[1]);
}
function y2(e4, t4) {
  let n4 = e4[0] - t4[0], r4 = e4[1] - t4[1];
  return n4 * n4 + r4 * r4;
}
function b2(e4) {
  return m2(e4, v2(e4));
}
function x2(e4, t4) {
  return Math.hypot(e4[1] - t4[1], e4[0] - t4[0]);
}
function S2(e4, t4, n4) {
  let r4 = Math.sin(n4), i4 = Math.cos(n4), a4 = e4[0] - t4[0], o4 = e4[1] - t4[1], s4 = a4 * i4 - o4 * r4, c4 = a4 * r4 + o4 * i4;
  return [s4 + t4[0], c4 + t4[1]];
}
function C2(e4, t4, n4, r4) {
  let i4 = Math.sin(r4), a4 = Math.cos(r4), o4 = t4[0] - n4[0], s4 = t4[1] - n4[1], c4 = o4 * a4 - s4 * i4, l4 = o4 * i4 + s4 * a4;
  return e4[0] = c4 + n4[0], e4[1] = l4 + n4[1], e4;
}
function w2(e4, t4, n4) {
  return c2(e4, f2(u2(t4, e4), n4));
}
function te(e4, t4, n4, r4) {
  let i4 = n4[0] - t4[0], a4 = n4[1] - t4[1];
  return e4[0] = t4[0] + i4 * r4, e4[1] = t4[1] + a4 * r4, e4;
}
function T2(e4, t4, n4) {
  return c2(e4, f2(t4, n4));
}
var E2 = [0, 0];
var D2 = [0, 0];
var O2 = [0, 0];
function k2(e4, n4) {
  let r4 = T2(e4, b2(h2(u2(e4, c2(e4, [1, 1])))), -n4), i4 = [], a4 = 1 / 13;
  for (let n5 = a4; n5 <= 1; n5 += a4) i4.push(S2(r4, e4, t2 * 2 * n5));
  return i4;
}
function A2(e4, n4, r4) {
  let i4 = [], a4 = 1 / r4;
  for (let r5 = a4; r5 <= 1; r5 += a4) i4.push(S2(n4, e4, t2 * r5));
  return i4;
}
function j2(e4, t4, n4) {
  let r4 = u2(t4, n4), i4 = f2(r4, 0.5), a4 = f2(r4, 0.51);
  return [u2(e4, i4), u2(e4, a4), c2(e4, a4), c2(e4, i4)];
}
function M2(e4, n4, r4, i4) {
  let a4 = [], o4 = T2(e4, n4, r4), s4 = 1 / i4;
  for (let n5 = s4; n5 < 1; n5 += s4) a4.push(S2(o4, e4, t2 * 3 * n5));
  return a4;
}
function ne(e4, t4, n4) {
  return [c2(e4, f2(t4, n4)), c2(e4, f2(t4, n4 * 0.99)), u2(e4, f2(t4, n4 * 0.99)), u2(e4, f2(t4, n4))];
}
function N2(e4, t4, n4) {
  return e4 === false || e4 === void 0 ? 0 : e4 === true ? Math.max(t4, n4) : e4;
}
function re2(e4, t4, n4) {
  return e4.slice(0, 10).reduce((e5, r4) => {
    let i4 = r4.pressure;
    return t4 && (i4 = o2(e5, r4.distance, n4)), (e5 + i4) / 2;
  }, e4[0].pressure);
}
function P2(e4, n4 = {}) {
  let { size: r4 = 16, smoothing: a4 = 0.5, thinning: f5 = 0.5, simulatePressure: m4 = true, easing: _3 = (e5) => e5, start: v4 = {}, end: b3 = {}, last: x4 = false } = n4, { cap: S4 = true, easing: w4 = (e5) => e5 * (2 - e5) } = v4, { cap: T4 = true, easing: P4 = (e5) => --e5 * e5 * e5 + 1 } = b3;
  if (e4.length === 0 || r4 <= 0) return [];
  let F4 = e4[e4.length - 1].runningLength, I4 = N2(v4.taper, r4, F4), L4 = N2(b3.taper, r4, F4), R3 = (r4 * a4) ** 2, z3 = [], B3 = [], V3 = re2(e4, m4, r4), H2 = i2(r4, f5, e4[e4.length - 1].pressure, _3), U2, W2 = e4[0].vector, G2 = e4[0].point, K2 = G2, q3 = G2, J2 = K2, Y2 = false;
  for (let n5 = 0; n5 < e4.length; n5++) {
    let { pressure: a5 } = e4[n5], { point: s4, vector: h4, distance: v5, runningLength: b4 } = e4[n5], x5 = n5 === e4.length - 1;
    if (!x5 && F4 - b4 < 3) continue;
    f5 ? (m4 && (a5 = o2(V3, v5, r4)), H2 = i2(r4, f5, a5, _3)) : H2 = r4 / 2, U2 === void 0 && (U2 = H2);
    let S5 = b4 < I4 ? w4(b4 / I4) : 1, T5 = F4 - b4 < L4 ? P4((F4 - b4) / L4) : 1;
    H2 = Math.max(0.01, H2 * Math.min(S5, T5));
    let k4 = (x5 ? e4[n5] : e4[n5 + 1]).vector, A4 = x5 ? 1 : ee(h4, k4), j4 = ee(h4, W2) < 0 && !Y2, M4 = A4 !== null && A4 < 0;
    if (j4 || M4) {
      g2(E2, W2), p3(E2, E2, H2);
      for (let e5 = 0; e5 <= 1; e5 += 0.07692307692307693) d2(D2, s4, E2), C2(D2, D2, s4, t2 * e5), q3 = [D2[0], D2[1]], z3.push(q3), l2(O2, s4, E2), C2(O2, O2, s4, t2 * -e5), J2 = [O2[0], O2[1]], B3.push(J2);
      G2 = q3, K2 = J2, M4 && (Y2 = true);
      continue;
    }
    if (Y2 = false, x5) {
      g2(E2, h4), p3(E2, E2, H2), z3.push(u2(s4, E2)), B3.push(c2(s4, E2));
      continue;
    }
    te(E2, k4, h4, A4), g2(E2, E2), p3(E2, E2, H2), d2(D2, s4, E2), q3 = [D2[0], D2[1]], (n5 <= 1 || y2(G2, q3) > R3) && (z3.push(q3), G2 = q3), l2(O2, s4, E2), J2 = [O2[0], O2[1]], (n5 <= 1 || y2(K2, J2) > R3) && (B3.push(J2), K2 = J2), V3 = a5, W2 = h4;
  }
  let X2 = [e4[0].point[0], e4[0].point[1]], Z2 = e4.length > 1 ? [e4[e4.length - 1].point[0], e4[e4.length - 1].point[1]] : c2(e4[0].point, [1, 1]), Q2 = [], $3 = [];
  if (e4.length === 1) {
    if (!(I4 || L4) || x4) return k2(X2, U2 || H2);
  } else {
    I4 || L4 && e4.length === 1 || (S4 ? Q2.push(...A2(X2, B3[0], 13)) : Q2.push(...j2(X2, z3[0], B3[0])));
    let t4 = h2(s2(e4[e4.length - 1].vector));
    L4 || I4 && e4.length === 1 ? $3.push(Z2) : T4 ? $3.push(...M2(Z2, t4, H2, 29)) : $3.push(...ne(Z2, t4, H2));
  }
  return z3.concat($3, B3.reverse(), Q2);
}
var F2 = [0, 0];
function I2(e4) {
  return e4 != null && e4 >= 0;
}
function L2(e4, t4 = {}) {
  let { streamline: i4 = 0.5, size: a4 = 16, last: o4 = false } = t4;
  if (e4.length === 0) return [];
  let s4 = 0.15 + (1 - i4) * 0.85, l4 = Array.isArray(e4[0]) ? e4 : e4.map(({ x: e5, y: t5, pressure: r4 = n2 }) => [e5, t5, r4]);
  if (l4.length === 2) {
    let e5 = l4[1];
    l4 = l4.slice(0, -1);
    for (let t5 = 1; t5 < 5; t5++) l4.push(w2(l4[0], e5, t5 / 4));
  }
  l4.length === 1 && (l4 = [...l4, [...c2(l4[0], r2), ...l4[0].slice(2)]]);
  let u5 = [{ point: [l4[0][0], l4[0][1]], pressure: I2(l4[0][2]) ? l4[0][2] : 0.25, vector: [...r2], distance: 0, runningLength: 0 }], f5 = false, p5 = 0, m4 = u5[0], h4 = l4.length - 1;
  for (let e5 = 1; e5 < l4.length; e5++) {
    let t5 = o4 && e5 === h4 ? [l4[e5][0], l4[e5][1]] : w2(m4.point, l4[e5], s4);
    if (_2(m4.point, t5)) continue;
    let r4 = x2(t5, m4.point);
    if (p5 += r4, e5 < h4 && !f5) {
      if (p5 < a4) continue;
      f5 = true;
    }
    d2(F2, m4.point, t5), m4 = { point: t5, pressure: I2(l4[e5][2]) ? l4[e5][2] : n2, vector: b2(F2), distance: r4, runningLength: p5 }, u5.push(m4);
  }
  return u5[0].vector = u5[1]?.vector || [0, 0], u5;
}
function R2(e4, t4 = {}) {
  return P2(L2(e4, t4), t4);
}

// src/renderer.ts
var gen = at.generator();
var FONT_FAMILIES = {
  1: "Virgil, Segoe UI Emoji, sans-serif",
  2: "Helvetica, Arial, sans-serif",
  3: "Cascadia, monospace",
  4: "Virgil, Segoe UI Emoji, sans-serif"
};
function renderToSvg(data, opts = {}, ctx) {
  const elements = data.elements.filter((el) => !el.isDeleted);
  if (elements.length === 0) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';
  }
  const padding = opts.exportPadding ?? 20;
  const bbox = computeBoundingBox(elements);
  const width = Math.ceil(bbox.width + padding * 2);
  const height = Math.ceil(bbox.height + padding * 2);
  const offsetX = -bbox.minX + padding;
  const offsetY = -bbox.minY + padding;
  const bgColor = resolveBgColor(data, opts);
  const renderedElements = elements.map((el) => renderElement(el, data, ctx)).filter(Boolean);
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" data-bg-color="${escapeAttr(bgColor ?? "#ffffff")}">`,
    `<defs>${getFontDefs()}</defs>`,
    `<g transform="translate(${offsetX}, ${offsetY})">`,
    ...renderedElements,
    "</g>",
    "</svg>"
  ];
  return parts.filter(Boolean).join("\n");
}
function resolveBgColor(data, opts) {
  const exportBg = data.appState.exportBackground ?? true;
  if (!exportBg) return null;
  if (opts.darkMode === "dark") return "#1e1e1e";
  if (opts.darkMode === "light") return data.appState.viewBackgroundColor ?? "#ffffff";
  const rawBg = data.appState.viewBackgroundColor ?? "#ffffff";
  const lower = rawBg.toLowerCase();
  if (lower === "#ffffff" || lower === "#ffffffff") return "var(--excalidraw-bg, #ffffff)";
  return rawBg;
}
function renderElement(el, data, ctx) {
  const inner = renderElementInner(el, data, ctx);
  if (!inner) return "";
  const attrs = [];
  if (el.angle && el.angle !== 0) {
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    const deg = el.angle * 180 / Math.PI;
    attrs.push(`transform="rotate(${deg.toFixed(2)}, ${cx.toFixed(2)}, ${cy.toFixed(2)})"`);
  }
  if (el.opacity != null && el.opacity < 100) {
    attrs.push(`opacity="${el.opacity / 100}"`);
  }
  if (attrs.length > 0) {
    return `<g ${attrs.join(" ")}>${inner}</g>`;
  }
  return inner;
}
function renderElementInner(el, data, ctx) {
  switch (el.type) {
    case "rectangle":
      return renderRectangle(el);
    case "ellipse":
      return renderEllipse(el);
    case "diamond":
      return renderDiamond(el);
    case "line":
    case "arrow":
      return renderLinearElement(el);
    case "text":
      return renderText(el);
    case "freedraw":
      return renderFreedraw(el);
    case "image":
      return renderImage(el, data, ctx);
    case "frame":
    case "magicframe":
      return renderFrame(el);
    case "embeddable":
    case "iframe":
      return renderEmbeddable(el, ctx?.resolvedEmbeds);
    default:
      return "";
  }
}
var DARK_MODE_MAP = {
  "#1e1e1e": "#d3d3d3",
  "#000000": "#ededed",
  "#343a40": "#b7bcc1",
  "#868e96": "#6e757c",
  "#ced4da": "#33383d",
  "#e9ecef": "#202325",
  "#f8f9fa": "#161718",
  "#e03131": "#ff8383",
  "#fa5252": "#fa6969",
  "#ff8787": "#b44d4d",
  "#ffc9c9": "#5a2c2c",
  "#fff5f5": "#1f1717",
  "#c2255c": "#ff8dbc",
  "#e64980": "#f56e9d",
  "#f783ac": "#b04d70",
  "#fcc2d7": "#602e40",
  "#fff0f6": "#26191e",
  "#9c36b5": "#e28af8",
  "#be4bdb": "#d471ed",
  "#da77f2": "#a954be",
  "#eebefa": "#5b3165",
  "#f8f0fc": "#211a25",
  "#6741d9": "#b595ff",
  "#7950f2": "#a885ff",
  "#9775fa": "#8a6cdf",
  "#d0bfff": "#4a3b72",
  "#f3f0ff": "#1f1c29",
  "#1971c2": "#56a2e8",
  "#228be6": "#3791e0",
  "#4dabf7": "#2273b4",
  "#a5d8ff": "#154162",
  "#e7f5ff": "#121e26",
  "#0c8599": "#3da5b6",
  "#15aabf": "#0f8fa1",
  "#3bc9db": "#007281",
  "#99e9f2": "#004149",
  "#e3fafc": "#0a1e20",
  "#099268": "#32a783",
  "#12b886": "#039267",
  "#38d9a9": "#00744b",
  "#96f2d7": "#00422b",
  "#e6fcf5": "#0a1d17",
  "#2f9e44": "#39994b",
  "#40c057": "#16842a",
  "#69db7c": "#056715",
  "#b2f2bb": "#043b0c",
  "#ebfbee": "#0f1d12",
  "#f08c00": "#b86200",
  "#fab005": "#905000",
  "#ffd43b": "#5f3a00",
  "#ffec99": "#362600",
  "#fff9db": "#1e1900",
  "#e8590c": "#f17634",
  "#fd7e14": "#cd6005",
  "#ffa94d": "#924800",
  "#ffd8a8": "#4c2b01",
  "#fff4e6": "#22190d",
  "#846358": "#a98d84",
  "#a18072": "#917569",
  "#d2bab0": "#5a463d",
  "#eaddd7": "#362b26",
  "#f8f1ee": "#221c1a",
  "#ffffff": "#121212"
};
function themeColor(color) {
  const lower = color.toLowerCase();
  if (lower in DARK_MODE_MAP) {
    return `var(--excalidraw-color-${lower.slice(1)}, ${color})`;
  }
  return color;
}
function roughOpts(el) {
  return {
    seed: el.seed,
    roughness: el.roughness,
    stroke: el.strokeColor === "transparent" ? "none" : themeColor(el.strokeColor),
    strokeWidth: el.strokeWidth,
    fill: el.backgroundColor === "transparent" ? void 0 : themeColor(el.backgroundColor),
    fillStyle: mapFillStyle(el.fillStyle),
    strokeLineDash: mapStrokeStyle(el.strokeStyle, el.strokeWidth)
  };
}
function mapFillStyle(style) {
  switch (style) {
    case "hachure":
      return "hachure";
    case "cross-hatch":
      return "cross-hatch";
    case "solid":
      return "solid";
    case "zigzag":
      return "zigzag";
    case "dots":
      return "dots";
    case "dashed":
      return "dashed";
    case "zigzag-line":
      return "zigzag-line";
    default:
      return "hachure";
  }
}
function mapStrokeStyle(style, width) {
  switch (style) {
    case "dashed":
      return [8 * width, 4 * width];
    case "dotted":
      return [1.5 * width, 4 * width];
    default:
      return void 0;
  }
}
function renderRectangle(el) {
  const opts = roughOpts(el);
  const drawable = gen.rectangle(el.x, el.y, el.width, el.height, opts);
  return drawableToSvg(drawable);
}
function renderEllipse(el) {
  const opts = roughOpts(el);
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  const drawable = gen.ellipse(cx, cy, el.width, el.height, opts);
  return drawableToSvg(drawable);
}
function renderDiamond(el) {
  const opts = roughOpts(el);
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  const hw = el.width / 2;
  const hh = el.height / 2;
  const points = [
    [cx, cy - hh],
    [cx + hw, cy],
    [cx, cy + hh],
    [cx - hw, cy]
  ];
  const drawable = gen.polygon(points, opts);
  return drawableToSvg(drawable);
}
function renderLinearElement(el) {
  const points = el.points ?? [];
  if (points.length < 2) return "";
  const opts = {
    ...roughOpts(el),
    fill: void 0,
    fillStyle: void 0
  };
  const absolutePoints = points.map(([px, py]) => [el.x + px, el.y + py]);
  let svg3;
  if (points.length > 2) {
    const drawable = gen.curve(absolutePoints, opts);
    svg3 = drawableToSvg(drawable);
  } else {
    const drawable = gen.linearPath(absolutePoints, opts);
    svg3 = drawableToSvg(drawable);
  }
  if (el.type === "arrow") {
    svg3 += renderArrowheads(el, absolutePoints);
  }
  return svg3;
}
function renderArrowheads(el, points) {
  let svg3 = "";
  const color = el.strokeColor === "transparent" ? "none" : el.strokeColor;
  if (el.endArrowhead && el.endArrowhead !== "none" && points.length >= 2) {
    const tip = points[points.length - 1];
    const prev = points[points.length - 2];
    svg3 += renderArrowhead(prev, tip, color, el.strokeWidth);
  }
  if (el.startArrowhead && el.startArrowhead !== "none" && points.length >= 2) {
    const tip = points[0];
    const prev = points[1];
    svg3 += renderArrowhead(prev, tip, color, el.strokeWidth);
  }
  return svg3;
}
function renderArrowhead(from, to, color, strokeWidth) {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const headLen = 10 + strokeWidth * 2;
  const headAngle = Math.PI / 6;
  const x1 = to[0] - headLen * Math.cos(angle - headAngle);
  const y1 = to[1] - headLen * Math.sin(angle - headAngle);
  const x22 = to[0] - headLen * Math.cos(angle + headAngle);
  const y22 = to[1] - headLen * Math.sin(angle + headAngle);
  return `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} L${to[0].toFixed(2)} ${to[1].toFixed(2)} L${x22.toFixed(2)} ${y22.toFixed(2)}" fill="none" stroke="${escapeAttr(color)}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
}
function renderText(el) {
  if (!el.text) return "";
  const fontFamily = FONT_FAMILIES[el.fontFamily ?? 1] ?? "Virgil, Segoe UI Emoji, sans-serif";
  const fontSize = el.fontSize ?? 20;
  const textAnchor = mapTextAlign(el.textAlign);
  const color = el.strokeColor === "transparent" ? "var(--excalidraw-fg, #000000)" : themeColor(el.strokeColor);
  const lines = el.text.split("\n");
  const lineHeight = fontSize * 1.25;
  const totalHeight = lines.length * lineHeight;
  let startY = el.y;
  if (el.verticalAlign === "middle") {
    startY = el.y + (el.height - totalHeight) / 2;
  } else if (el.verticalAlign === "bottom") {
    startY = el.y + el.height - totalHeight;
  }
  let textX = el.x;
  if (el.textAlign === "center") {
    textX = el.x + el.width / 2;
  } else if (el.textAlign === "right") {
    textX = el.x + el.width;
  }
  const tspans = lines.map((line, i4) => {
    const y4 = startY + fontSize + i4 * lineHeight;
    return `<tspan x="${textX.toFixed(2)}" y="${y4.toFixed(2)}">${escapeXml(line)}</tspan>`;
  }).join("");
  return `<text font-family="${escapeAttr(fontFamily)}" font-size="${fontSize}" fill="${escapeAttr(color)}" text-anchor="${textAnchor}" dominant-baseline="auto">${tspans}</text>`;
}
function mapTextAlign(align) {
  switch (align) {
    case "center":
      return "middle";
    case "right":
      return "end";
    default:
      return "start";
  }
}
function renderFreedraw(el) {
  const points = el.points ?? [];
  if (points.length < 2) return "";
  const absolutePoints = points.map(
    ([px, py]) => [el.x + px, el.y + py, 0.5]
  );
  const strokePoints = R2(absolutePoints, {
    size: el.strokeWidth * 4.5,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
    simulatePressure: el.simulatePressure ?? true
  });
  if (strokePoints.length < 2) return "";
  const d4 = getSvgPathFromStroke(strokePoints);
  const color = el.strokeColor === "transparent" ? "var(--excalidraw-fg, #000000)" : themeColor(el.strokeColor);
  return `<path d="${d4}" fill="${escapeAttr(color)}" stroke="none" />`;
}
function getSvgPathFromStroke(points) {
  if (points.length < 2) return "";
  const first = points[0];
  let d4 = `M${first[0].toFixed(2)} ${first[1].toFixed(2)}`;
  for (let i4 = 1; i4 < points.length - 1; i4++) {
    const curr = points[i4];
    const next = points[i4 + 1];
    const mx = (curr[0] + next[0]) / 2;
    const my = (curr[1] + next[1]) / 2;
    d4 += ` Q${curr[0].toFixed(2)} ${curr[1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  d4 += " Z";
  return d4;
}
function renderImage(el, data, ctx) {
  if (!el.fileId) return "";
  const file = data.files[el.fileId];
  if (file?.dataURL) {
    return `<image x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" href="${escapeAttr(file.dataURL)}" preserveAspectRatio="xMidYMid meet" />`;
  }
  const resolvedUrl = ctx?.resolvedImages?.[el.fileId];
  if (resolvedUrl) {
    return `<image x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" href="${escapeAttr(resolvedUrl)}" preserveAspectRatio="xMidYMid meet" />`;
  }
  return "";
}
function renderFrame(el) {
  return `<rect x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="none" stroke="#aaaaaa" stroke-width="1" stroke-dasharray="5 5" />`;
}
function renderEmbeddable(el, resolvedEmbeds) {
  const link = el.link ?? "";
  const isWikilink = link.startsWith("[[");
  const label = link.replace(/^\[\[/, "").replace(/\]\]$/, "").replace(/^https?:\/\//, "");
  const truncatedLabel = label.length > 50 ? label.slice(0, 47) + "..." : label;
  const resolved = resolvedEmbeds?.[el.id];
  if (isWikilink) {
    const noteContent = resolved ? `<a href="${escapeAttr(resolved.href)}" class="excalidraw-embed-open-link">Open note \u2192</a><div class="excalidraw-embed-body">${resolved.html}</div>` : `<span class="excalidraw-embed-missing">Note not found</span>`;
    return [
      `<foreignObject x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}">`,
      `<div xmlns="http://www.w3.org/1999/xhtml" class="excalidraw-embed-note">`,
      `<div class="excalidraw-embed-header">\u{1F4C4} ${escapeXml(truncatedLabel)}</div>`,
      `<div class="excalidraw-embed-content">${noteContent}</div>`,
      `</div>`,
      `</foreignObject>`
    ].join("\n");
  }
  return [
    `<foreignObject x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}">`,
    `<div xmlns="http://www.w3.org/1999/xhtml" class="excalidraw-embed-url">`,
    `<div class="excalidraw-embed-header">`,
    `<a href="${escapeAttr(link)}" target="_blank" rel="noopener noreferrer">\u{1F517} ${escapeXml(truncatedLabel)}</a>`,
    `</div>`,
    `<iframe src="${escapeAttr(link)}" class="excalidraw-embed-iframe" sandbox="allow-scripts allow-same-origin allow-popups" loading="lazy" referrerpolicy="no-referrer"></iframe>`,
    `</div>`,
    `</foreignObject>`
  ].join("\n");
}
function drawableToSvg(drawable) {
  const paths = [];
  for (const set of drawable.sets) {
    const d4 = opsToPath(set.ops);
    if (!d4) continue;
    if (set.type === "path") {
      paths.push(
        `<path d="${d4}" stroke="${escapeAttr(drawable.options.stroke ?? "none")}" stroke-width="${drawable.options.strokeWidth ?? 1}" fill="none"${strokeDashAttr(drawable.options.strokeLineDash)} />`
      );
    } else if (set.type === "fillPath") {
      paths.push(
        `<path d="${d4}" fill="${escapeAttr(drawable.options.fill ?? "none")}" stroke="none" />`
      );
    } else if (set.type === "fillSketch") {
      paths.push(
        `<path d="${d4}" stroke="${escapeAttr(drawable.options.fill ?? "none")}" stroke-width="${(drawable.options.fillWeight ?? drawable.options.strokeWidth ?? 1) * 0.5}" fill="none" />`
      );
    }
  }
  return paths.join("\n");
}
function strokeDashAttr(dash2) {
  if (!dash2 || dash2.length === 0) return "";
  return ` stroke-dasharray="${dash2.join(" ")}"`;
}
function opsToPath(ops) {
  let d4 = "";
  for (const item of ops) {
    const p5 = item.data;
    switch (item.op) {
      case "move":
        d4 += `M${p5[0].toFixed(2)} ${p5[1].toFixed(2)} `;
        break;
      case "lineTo":
        d4 += `L${p5[0].toFixed(2)} ${p5[1].toFixed(2)} `;
        break;
      case "bcurveTo":
        d4 += `C${p5[0].toFixed(2)} ${p5[1].toFixed(2)},${p5[2].toFixed(2)} ${p5[3].toFixed(2)},${p5[4].toFixed(2)} ${p5[5].toFixed(2)} `;
        break;
    }
  }
  return d4.trim();
}
function computeBoundingBox(elements) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const el of elements) {
    const corners = getElementCorners(el);
    for (const [cx, cy] of corners) {
      if (cx < minX) minX = cx;
      if (cy < minY) minY = cy;
      if (cx > maxX) maxX = cx;
      if (cy > maxY) maxY = cy;
    }
  }
  if (!isFinite(minX)) {
    return { minX: 0, minY: 0, maxX: 100, maxY: 100, width: 100, height: 100 };
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}
function getElementCorners(el) {
  if ((el.type === "line" || el.type === "arrow" || el.type === "freedraw") && el.points) {
    return el.points.map(([px, py]) => [el.x + px, el.y + py]);
  }
  const corners = [
    [el.x, el.y],
    [el.x + el.width, el.y],
    [el.x + el.width, el.y + el.height],
    [el.x, el.y + el.height]
  ];
  if (el.angle && el.angle !== 0) {
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    return corners.map(([x4, y4]) => rotatePoint(x4, y4, cx, cy, el.angle));
  }
  return corners;
}
function rotatePoint(x4, y4, cx, cy, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x4 - cx;
  const dy = y4 - cy;
  return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
}
function getFontDefs() {
  return `<style>
@font-face {
  font-family: "Virgil";
  src: url("https://unpkg.com/@excalidraw/excalidraw@0.17.0/dist/prod/Virgil-Regular-hO16.woff2") format("woff2");
}
</style>`;
}
function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// src/components/styles/excalidraw.scss
var excalidraw_default = '.excalidraw-page {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  max-width: none;\n  margin: 0;\n  overflow: hidden;\n  user-select: none;\n  background-color: var(--light);\n}\n\n.excalidraw-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: grab;\n  touch-action: none;\n  background-color: var(--light);\n}\n.excalidraw-container:active {\n  cursor: grabbing;\n}\n.excalidraw-container svg {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n:root {\n  --excalidraw-fg: #1e1e1e;\n  --excalidraw-bg: #ffffff;\n  --excalidraw-color-1e1e1e: #1e1e1e;\n  --excalidraw-color-000000: #000000;\n  --excalidraw-color-ffffff: #ffffff;\n  --excalidraw-color-343a40: #343a40;\n  --excalidraw-color-868e96: #868e96;\n  --excalidraw-color-ced4da: #ced4da;\n  --excalidraw-color-e9ecef: #e9ecef;\n  --excalidraw-color-f8f9fa: #f8f9fa;\n  --excalidraw-color-e03131: #e03131;\n  --excalidraw-color-fa5252: #fa5252;\n  --excalidraw-color-ff8787: #ff8787;\n  --excalidraw-color-ffc9c9: #ffc9c9;\n  --excalidraw-color-fff5f5: #fff5f5;\n  --excalidraw-color-c2255c: #c2255c;\n  --excalidraw-color-e64980: #e64980;\n  --excalidraw-color-f783ac: #f783ac;\n  --excalidraw-color-fcc2d7: #fcc2d7;\n  --excalidraw-color-fff0f6: #fff0f6;\n  --excalidraw-color-9c36b5: #9c36b5;\n  --excalidraw-color-be4bdb: #be4bdb;\n  --excalidraw-color-da77f2: #da77f2;\n  --excalidraw-color-eebefa: #eebefa;\n  --excalidraw-color-f8f0fc: #f8f0fc;\n  --excalidraw-color-6741d9: #6741d9;\n  --excalidraw-color-7950f2: #7950f2;\n  --excalidraw-color-9775fa: #9775fa;\n  --excalidraw-color-d0bfff: #d0bfff;\n  --excalidraw-color-f3f0ff: #f3f0ff;\n  --excalidraw-color-1971c2: #1971c2;\n  --excalidraw-color-228be6: #228be6;\n  --excalidraw-color-4dabf7: #4dabf7;\n  --excalidraw-color-a5d8ff: #a5d8ff;\n  --excalidraw-color-e7f5ff: #e7f5ff;\n  --excalidraw-color-0c8599: #0c8599;\n  --excalidraw-color-15aabf: #15aabf;\n  --excalidraw-color-3bc9db: #3bc9db;\n  --excalidraw-color-99e9f2: #99e9f2;\n  --excalidraw-color-e3fafc: #e3fafc;\n  --excalidraw-color-099268: #099268;\n  --excalidraw-color-12b886: #12b886;\n  --excalidraw-color-38d9a9: #38d9a9;\n  --excalidraw-color-96f2d7: #96f2d7;\n  --excalidraw-color-e6fcf5: #e6fcf5;\n  --excalidraw-color-2f9e44: #2f9e44;\n  --excalidraw-color-40c057: #40c057;\n  --excalidraw-color-69db7c: #69db7c;\n  --excalidraw-color-b2f2bb: #b2f2bb;\n  --excalidraw-color-ebfbee: #ebfbee;\n  --excalidraw-color-f08c00: #f08c00;\n  --excalidraw-color-fab005: #fab005;\n  --excalidraw-color-ffd43b: #ffd43b;\n  --excalidraw-color-ffec99: #ffec99;\n  --excalidraw-color-fff9db: #fff9db;\n  --excalidraw-color-e8590c: #e8590c;\n  --excalidraw-color-fd7e14: #fd7e14;\n  --excalidraw-color-ffa94d: #ffa94d;\n  --excalidraw-color-ffd8a8: #ffd8a8;\n  --excalidraw-color-fff4e6: #fff4e6;\n  --excalidraw-color-846358: #846358;\n  --excalidraw-color-a18072: #a18072;\n  --excalidraw-color-d2bab0: #d2bab0;\n  --excalidraw-color-eaddd7: #eaddd7;\n  --excalidraw-color-f8f1ee: #f8f1ee;\n}\n\n:root[saved-theme=dark] {\n  --excalidraw-fg: #d3d3d3;\n  --excalidraw-bg: #121212;\n  --excalidraw-color-1e1e1e: #d3d3d3;\n  --excalidraw-color-000000: #ededed;\n  --excalidraw-color-ffffff: #121212;\n  --excalidraw-color-343a40: #b7bcc1;\n  --excalidraw-color-868e96: #6e757c;\n  --excalidraw-color-ced4da: #33383d;\n  --excalidraw-color-e9ecef: #202325;\n  --excalidraw-color-f8f9fa: #161718;\n  --excalidraw-color-e03131: #ff8383;\n  --excalidraw-color-fa5252: #fa6969;\n  --excalidraw-color-ff8787: #b44d4d;\n  --excalidraw-color-ffc9c9: #5a2c2c;\n  --excalidraw-color-fff5f5: #1f1717;\n  --excalidraw-color-c2255c: #ff8dbc;\n  --excalidraw-color-e64980: #f56e9d;\n  --excalidraw-color-f783ac: #b04d70;\n  --excalidraw-color-fcc2d7: #602e40;\n  --excalidraw-color-fff0f6: #26191e;\n  --excalidraw-color-9c36b5: #e28af8;\n  --excalidraw-color-be4bdb: #d471ed;\n  --excalidraw-color-da77f2: #a954be;\n  --excalidraw-color-eebefa: #5b3165;\n  --excalidraw-color-f8f0fc: #211a25;\n  --excalidraw-color-6741d9: #b595ff;\n  --excalidraw-color-7950f2: #a885ff;\n  --excalidraw-color-9775fa: #8a6cdf;\n  --excalidraw-color-d0bfff: #4a3b72;\n  --excalidraw-color-f3f0ff: #1f1c29;\n  --excalidraw-color-1971c2: #56a2e8;\n  --excalidraw-color-228be6: #3791e0;\n  --excalidraw-color-4dabf7: #2273b4;\n  --excalidraw-color-a5d8ff: #154162;\n  --excalidraw-color-e7f5ff: #121e26;\n  --excalidraw-color-0c8599: #3da5b6;\n  --excalidraw-color-15aabf: #0f8fa1;\n  --excalidraw-color-3bc9db: #007281;\n  --excalidraw-color-99e9f2: #004149;\n  --excalidraw-color-e3fafc: #0a1e20;\n  --excalidraw-color-099268: #32a783;\n  --excalidraw-color-12b886: #039267;\n  --excalidraw-color-38d9a9: #00744b;\n  --excalidraw-color-96f2d7: #00422b;\n  --excalidraw-color-e6fcf5: #0a1d17;\n  --excalidraw-color-2f9e44: #39994b;\n  --excalidraw-color-40c057: #16842a;\n  --excalidraw-color-69db7c: #056715;\n  --excalidraw-color-b2f2bb: #043b0c;\n  --excalidraw-color-ebfbee: #0f1d12;\n  --excalidraw-color-f08c00: #b86200;\n  --excalidraw-color-fab005: #905000;\n  --excalidraw-color-ffd43b: #5f3a00;\n  --excalidraw-color-ffec99: #362600;\n  --excalidraw-color-fff9db: #1e1900;\n  --excalidraw-color-e8590c: #f17634;\n  --excalidraw-color-fd7e14: #cd6005;\n  --excalidraw-color-ffa94d: #924800;\n  --excalidraw-color-ffd8a8: #4c2b01;\n  --excalidraw-color-fff4e6: #22190d;\n  --excalidraw-color-846358: #a98d84;\n  --excalidraw-color-a18072: #917569;\n  --excalidraw-color-d2bab0: #5a463d;\n  --excalidraw-color-eaddd7: #362b26;\n  --excalidraw-color-f8f1ee: #221c1a;\n}\n\n.excalidraw-controls {\n  position: fixed;\n  bottom: 1rem;\n  right: 1rem;\n  z-index: 10;\n  display: flex;\n  flex-direction: row;\n  gap: 0.25rem;\n}\n.excalidraw-controls button {\n  width: 2rem;\n  height: 2rem;\n  border: 1px solid var(--lightgray);\n  border-radius: 6px;\n  background: var(--light);\n  color: var(--darkgray);\n  font-size: 1.2rem;\n  line-height: 1;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background-color 0.1s ease;\n}\n.excalidraw-controls button:hover {\n  background: var(--lightgray);\n}\n\n.page[data-frame=excalidraw] {\n  --excalidraw-sidebar-width: 300px;\n}\n\n.page[data-frame=excalidraw] .excalidraw-frame {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  padding-left: 0;\n  transition: padding-left 0.2s ease;\n}\n\n.page[data-frame=excalidraw] .excalidraw-stage {\n  width: 100%;\n  height: 100%;\n}\n\n.page[data-frame=excalidraw] .excalidraw-sidebar {\n  position: fixed;\n  top: 0;\n  height: 100vh;\n  width: var(--excalidraw-sidebar-width);\n  box-sizing: border-box;\n  background: var(--light);\n  border-right: 1px solid var(--lightgray);\n  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.12);\n  overflow-y: hidden;\n  left: calc(-1 * var(--excalidraw-sidebar-width));\n  transition: left 0.25s ease;\n  z-index: 20;\n}\n\n.page[data-frame=excalidraw] .excalidraw-sidebar-toggle {\n  position: fixed;\n  top: 12px;\n  left: 12px;\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--lightgray);\n  border-radius: 6px;\n  background: var(--light);\n  color: var(--darkgray);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 30;\n  transition: background 0.1s ease, left 0.25s ease;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar-toggle:hover {\n  background: var(--lightgray);\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar-toggle svg {\n  pointer-events: none;\n}\n\n.page[data-frame=excalidraw] .excalidraw-sidebar-icon-close {\n  display: none;\n}\n\n.page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-frame {\n  padding-left: var(--excalidraw-sidebar-width);\n}\n\n.page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-sidebar {\n  left: 0;\n}\n\n.page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-sidebar-toggle {\n  left: calc(var(--excalidraw-sidebar-width) + 12px);\n}\n\n.page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-sidebar-icon-open {\n  display: none;\n}\n\n.page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-sidebar-icon-close {\n  display: block;\n}\n\n@media (max-width: 800px) {\n  .page[data-frame=excalidraw] {\n    --excalidraw-sidebar-width: calc(100vw - 56px);\n  }\n  .page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-frame {\n    padding-left: 0;\n  }\n  .page[data-frame=excalidraw].excalidraw-sidebar-open .excalidraw-sidebar-toggle {\n    left: calc(var(--excalidraw-sidebar-width) + 12px);\n  }\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar .spacer {\n  display: none;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer button.desktop-explorer,\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer button.mobile-explorer {\n  display: none !important;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer {\n  order: initial;\n  overflow-y: hidden;\n  overflow: hidden;\n  flex: 1 1 0;\n  min-height: 0;\n  flex-shrink: initial;\n  align-self: initial;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer .explorer-content,\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer.collapsed > .explorer-content,\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer:not(.collapsed) > .explorer-content {\n  position: static;\n  width: auto;\n  max-width: none;\n  height: 100%;\n  max-height: 100%;\n  transform: none !important;\n  visibility: visible !important;\n  padding: 0;\n  overflow-y: auto;\n  z-index: auto;\n  background-color: transparent;\n}\n.page[data-frame=excalidraw] .excalidraw-sidebar .explorer-content > .explorer-ul {\n  overscroll-behavior: auto;\n}\n\n.excalidraw-embed-note,\n.excalidraw-embed-url {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  border-radius: 8px;\n  border: 2px solid var(--lightgray);\n  display: flex;\n  flex-direction: column;\n  background: var(--light);\n  box-sizing: border-box;\n}\n\n.excalidraw-embed-header {\n  padding: 8px 12px;\n  border-bottom: 1px solid var(--lightgray);\n  font-size: 13px;\n  font-family: var(--bodyFont, sans-serif);\n  color: var(--darkgray);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex-shrink: 0;\n}\n.excalidraw-embed-header a {\n  color: var(--darkgray);\n  text-decoration: none;\n}\n\n.excalidraw-embed-content {\n  flex: 1;\n  overflow: auto;\n  padding: 8px 12px;\n  font-family: var(--bodyFont, sans-serif);\n  font-size: 12px;\n  line-height: 1.5;\n  color: var(--darkgray);\n  background: var(--light);\n}\n\n.excalidraw-embed-open-link {\n  display: block;\n  padding: 4px 0;\n  color: var(--secondary);\n  font-size: 12px;\n  text-decoration: none;\n  font-family: var(--bodyFont, sans-serif);\n}\n\n.excalidraw-embed-body {\n  font-size: 12px;\n  line-height: 1.5;\n  color: var(--dark);\n}\n.excalidraw-embed-body h1, .excalidraw-embed-body h2, .excalidraw-embed-body h3, .excalidraw-embed-body h4, .excalidraw-embed-body h5, .excalidraw-embed-body h6 {\n  font-size: 1em;\n  margin: 0.5em 0 0.25em;\n}\n.excalidraw-embed-body h1[id] > a[href^="#"], .excalidraw-embed-body h2[id] > a[href^="#"], .excalidraw-embed-body h3[id] > a[href^="#"], .excalidraw-embed-body h4[id] > a[href^="#"], .excalidraw-embed-body h5[id] > a[href^="#"], .excalidraw-embed-body h6[id] > a[href^="#"] {\n  display: none;\n}\n\n.excalidraw-embed-missing {\n  color: var(--gray);\n  font-size: 12px;\n}\n\n.excalidraw-embed-iframe {\n  flex: 1;\n  width: 100%;\n  border: none;\n}\n\n.transclude .excalidraw-page {\n  height: auto;\n}\n.transclude .excalidraw-container {\n  height: auto;\n  min-height: 400px;\n}\n.transclude .excalidraw-controls {\n  position: absolute;\n}\n\n.popover-inner .excalidraw-page {\n  height: auto;\n}\n.popover-inner .excalidraw-container {\n  height: auto;\n  min-height: 200px;\n  max-height: 300px;\n}\n.popover-inner .excalidraw-controls {\n  display: none;\n}';

// src/components/scripts/excalidraw.inline.ts
var excalidraw_inline_default = 'function x(){let t=document.querySelector(".page[data-frame=\'excalidraw\']");if(t){L(t),E(t);return}let e=document.querySelectorAll(".excalidraw-page");for(let a of e)E(a)}function L(t){let e=t.querySelector(".excalidraw-sidebar-toggle");e&&(e.addEventListener("click",()=>{t.classList.toggle("excalidraw-sidebar-open")}),window.addCleanup(()=>{t.classList.remove("excalidraw-sidebar-open")}))}function E(t){let e=t.querySelector(".excalidraw-container");if(!e)return;let a=e.querySelector("svg");if(!a)return;e.style.backgroundColor="var(--excalidraw-bg, var(--light))";let o=1,i=0,c=0,s=!1,l=0,d=0;function r(){a.style.transform=`translate(${i}px, ${c}px) scale(${o})`}function u(n){n.preventDefault();let g=n.deltaY>0?-.15:.15;o=Math.max(.1,Math.min(5,o+g)),r()}function m(n){n.button===0&&(s=!0,l=n.clientX-i,d=n.clientY-c,e.style.cursor="grabbing")}function v(n){s&&(i=n.clientX-l,c=n.clientY-d,r())}function f(){s=!1,e.style.cursor="grab"}let M=t.querySelector(".excalidraw-zoom-in"),O=t.querySelector(".excalidraw-zoom-out"),w=t.querySelector(".excalidraw-reset");M&&M.addEventListener("click",()=>{o=Math.min(5,o+.15),r()}),O&&O.addEventListener("click",()=>{o=Math.max(.1,o-.15),r()}),w&&w.addEventListener("click",()=>{o=1,i=0,c=0,r()}),e.addEventListener("wheel",u,{passive:!1}),e.addEventListener("mousedown",m),document.addEventListener("mousemove",v),document.addEventListener("mouseup",f),window.addCleanup(()=>{e.removeEventListener("wheel",u),e.removeEventListener("mousedown",m),document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",f)})}document.addEventListener("nav",x);\n';
var l3;
l3 = { __e: function(n4, l4, u5, t4) {
  for (var i4, o4, r4; l4 = l4.__; ) if ((i4 = l4.__c) && !i4.__) try {
    if ((o4 = i4.constructor) && null != o4.getDerivedStateFromError && (i4.setState(o4.getDerivedStateFromError(n4)), r4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n4, t4 || {}), r4 = i4.__d), r4) return i4.__E = i4;
  } catch (l5) {
    n4 = l5;
  }
  throw n4;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f4 = 0;
function u4(e4, t4, n4, o4, i4, u5) {
  t4 || (t4 = {});
  var a4, c4, p5 = t4;
  if ("ref" in p5) for (c4 in p5 = {}, t4) "ref" == c4 ? a4 = t4[c4] : p5[c4] = t4[c4];
  var l4 = { type: e4, props: p5, key: n4, ref: a4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f4, __i: -1, __u: 0, __source: i4, __self: u5 };
  if ("function" == typeof e4 && (a4 = e4.defaultProps)) for (c4 in a4) void 0 === p5[c4] && (p5[c4] = a4[c4]);
  return l3.vnode && l3.vnode(l4), l4;
}

// src/components/ExcalidrawBody.tsx
function stripTranscludes(html5) {
  return html5.replace(/<blockquote[^>]*class="[^"]*transclude[^"]*"[^>]*>[\s\S]*?<\/blockquote>/gi, "").replace(/<div[^>]*class="[^"]*transclude[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");
}
function resolveEmbeds(data, currentSlug, allFiles) {
  const result = {};
  const embeddables = data.elements.filter(
    (el) => el.type === "embeddable" || el.type === "iframe"
  );
  for (const el of embeddables) {
    const link = el.link ?? "";
    if (!link.startsWith("[[")) continue;
    const target = link.replace(/^\[\[/, "").replace(/\]\]$/, "");
    const targetLower = target.toLowerCase();
    const page = allFiles.find((f5) => {
      if (!f5.slug) return false;
      if (f5.slug === targetLower) return true;
      const lastSegment = f5.slug.split("/").pop();
      return lastSegment === targetLower;
    });
    const pageSlug = page?.slug ?? slugifyFilePath(target);
    const href = resolveRelative(currentSlug, pageSlug);
    if (!page || !page.htmlAst) {
      result[el.id] = {
        html: `<a href="${href}" style="color:#228be6;text-decoration:none;font-size:13px;">${target}</a>`,
        href
      };
      continue;
    }
    const tree = page.htmlAst;
    const rebased = {
      ...tree,
      children: tree.children.map((child) => {
        if (child.type === "element") {
          return normalizeHastElement(
            child,
            currentSlug,
            pageSlug
          );
        }
        return child;
      })
    };
    let html5 = toHtml(rebased, { allowDangerousHtml: true });
    html5 = stripTranscludes(html5);
    result[el.id] = { html: html5, href };
  }
  return result;
}
function resolveImages(data, currentSlug) {
  const result = {};
  if (!data.embeddedFiles) return result;
  const images = data.elements.filter((el) => el.type === "image" && el.fileId);
  for (const img of images) {
    if (data.files[img.fileId]?.dataURL) continue;
    const wikilink = data.embeddedFiles[img.fileId];
    if (!wikilink) continue;
    const imageName = wikilink.split("/").pop() ?? wikilink;
    result[img.fileId] = `./${imageName}`;
  }
  return result;
}
var ExcalidrawBody_default = ((userOpts) => {
  const Component = (props) => {
    const { fileData, allFiles } = props;
    const data = fileData.excalidrawData;
    const options = fileData.excalidrawOptions ?? userOpts ?? {};
    const currentSlug = fileData.slug;
    const resolvedEmbedMap = allFiles ? resolveEmbeds(data, currentSlug, allFiles) : void 0;
    const resolvedImageMap = resolveImages(data);
    const renderCtx = {
      resolvedEmbeds: resolvedEmbedMap,
      resolvedImages: resolvedImageMap
    };
    const svgContent = renderToSvg(data, options, renderCtx);
    return /* @__PURE__ */ u4(
      "article",
      {
        class: "excalidraw-page",
        role: "img",
        "aria-label": fileData.frontmatter?.title ?? "Excalidraw drawing",
        children: [
          /* @__PURE__ */ u4("div", { class: "excalidraw-controls", children: [
            /* @__PURE__ */ u4("button", { class: "excalidraw-zoom-in", type: "button", "aria-label": "Zoom in", children: "+" }),
            /* @__PURE__ */ u4("button", { class: "excalidraw-zoom-out", type: "button", "aria-label": "Zoom out", children: "\u2212" }),
            /* @__PURE__ */ u4("button", { class: "excalidraw-reset", type: "button", "aria-label": "Reset view", children: "\u27F2" })
          ] }),
          /* @__PURE__ */ u4("div", { class: "excalidraw-container", dangerouslySetInnerHTML: { __html: svgContent } }),
          options.enableInteraction !== false && /* @__PURE__ */ u4(
            "script",
            {
              type: "application/json",
              class: "excalidraw-data",
              dangerouslySetInnerHTML: {
                __html: JSON.stringify({
                  elements: data.elements,
                  appState: data.appState,
                  files: data.files
                })
              }
            }
          )
        ]
      }
    );
  };
  Component.css = excalidraw_default;
  Component.afterDOMLoaded = excalidraw_inline_default;
  return Component;
});

// src/pageType.ts
var excalidrawMatcher = ({ fileData }) => {
  return "excalidrawData" in fileData;
};
var ExcalidrawPage = (opts) => ({
  name: "ExcalidrawPage",
  priority: 25,
  fileExtensions: [".excalidraw.md", ".excalidraw"],
  match: excalidrawMatcher,
  generate({ ctx }) {
    const excalidrawFiles = ctx.allFiles.filter(
      (fp) => fp.endsWith(".excalidraw.md") || fp.endsWith(".excalidraw")
    );
    const virtualPages = [];
    for (const filePath of excalidrawFiles) {
      const fullPath = join(ctx.argv.directory, filePath);
      let content;
      try {
        content = readFileSync(fullPath, "utf-8");
      } catch {
        continue;
      }
      const data = parseExcalidraw(content, filePath);
      if (!data) continue;
      const baseName = filePath.replace(/\.excalidraw\.md$/, "").replace(/\.excalidraw$/, "").split("/").pop() ?? "Excalidraw Drawing";
      const slug2 = slugifyFilePath(filePath);
      virtualPages.push({
        slug: slug2,
        title: baseName,
        data: {
          frontmatter: { title: baseName, tags: ["excalidraw"] },
          excalidrawData: data,
          excalidrawOptions: opts
        }
      });
    }
    return virtualPages;
  },
  shouldPublish(_ctx, content) {
    const relativePath = content[1].data.relativePath ?? "";
    if (relativePath.endsWith(".excalidraw.md") || relativePath.endsWith(".excalidraw")) {
      return false;
    }
    return true;
  },
  layout: "excalidraw",
  frame: "excalidraw",
  body: ExcalidrawBody_default
});

// src/frames/ExcalidrawFrame.tsx
var ExcalidrawFrame = {
  name: "excalidraw",
  css: `
.page[data-frame="excalidraw"] {
  max-width: none;
  margin: 0;
  min-height: 100vh;
}

.page[data-frame="excalidraw"] > #quartz-body {
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  grid-template-areas:
    "grid-center";
  height: 100vh;
  padding: 0;
}

.page[data-frame="excalidraw"] > #quartz-body > .center.excalidraw-frame {
  max-width: 100%;
  min-width: 100%;
  height: 100%;
  margin: 0;
}

.page[data-frame="excalidraw"] > #quartz-body.lock-scroll > * {
  transform: none;
}
`,
  render({ componentData, pageBody: Content, left }) {
    const renderSlot = (Component) => Component(componentData);
    return /* @__PURE__ */ u4("div", { class: "center excalidraw-frame", children: [
      /* @__PURE__ */ u4("button", { class: "excalidraw-sidebar-toggle", type: "button", "aria-label": "Toggle sidebar", children: [
        /* @__PURE__ */ u4(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "excalidraw-sidebar-icon-open",
            children: [
              /* @__PURE__ */ u4("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
              /* @__PURE__ */ u4("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
              /* @__PURE__ */ u4("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
            ]
          }
        ),
        /* @__PURE__ */ u4(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "excalidraw-sidebar-icon-close",
            children: [
              /* @__PURE__ */ u4("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              /* @__PURE__ */ u4("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ u4("aside", { class: "excalidraw-sidebar", children: left.map((BodyComponent) => renderSlot(BodyComponent)) }),
      /* @__PURE__ */ u4("div", { class: "excalidraw-stage", children: renderSlot(Content) })
    ] });
  }
};

export { ExcalidrawBody_default as ExcalidrawBody, ExcalidrawFrame, ExcalidrawPage };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map