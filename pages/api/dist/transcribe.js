"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// exports.__esModule = true;
exports.config = void 0;
/* The code is importing the `IncomingForm` class from the "formidable" package and assigning it to the
variable `IncomingForm`. It is also importing the `fs` module from the Node.js standard library
using the `require` function. */
var formidable_1 = require("formidable");
var fs = require("fs");
/* The code is importing the `FormData` class from the "form-data" package and assigning it to the
variable `FormData`. It is also importing the `fetch` function from the "node-fetch" package. These
imports are used to handle form data and make HTTP requests respectively. */
var form_data_1 = require("form-data");
import node_fetch_1 from 'node-fetch';

/* The code `import dotenv from "dotenv";` is importing the `dotenv` package, which is used to load
environment variables from a `.env` file into the Node.js process. */
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
/* The `export const config` statement is exporting a configuration object that is used by the Next.js
framework. In this case, it is configuring the API route to disable the built-in body parsing
middleware (`bodyParser: false`). This means that the request body will not be automatically parsed
by Next.js, and you will need to handle the parsing manually in your code. */
exports.config = {
    api: {
        bodyParser: false
    }
};
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var fData, videoFile, videoFilePath, file, formData, url, options, response, data, transcript, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Here, we create a temporary file to store the audio file using Vercel's tmp directory
                    // As we compressed the file and are limiting recordings to 2.5 minutes, we won't run into trouble with storage capacity
                    console.log("Request received");
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var form = new formidable_1.IncomingForm({
                                multiples: false,
                                uploadDir: "/tmp",
                                keepExtensions: true
                            });
                            form.parse(req, function (err, fields, files) {
                                if (err)
                                    return reject(err);
                                resolve({ fields: fields, files: files });
                            });
                        })];
                case 1:
                    fData = _a.sent();
                    videoFile = fData.files.file;
                    videoFilePath = videoFile === null || videoFile === void 0 ? void 0 : videoFile.filepath;
                    console.log(videoFilePath);
                    file = fs.createReadStream(videoFilePath);
                    formData = new form_data_1["default"]();
                    formData.append("audio", file);
                    url = "https://api.worqhat.com/api/ai/speech-text";
                    options = {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer sk-02e44d2ccb164c738a6c4a65dbf75e89"
                        },
                        body: formData
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, node_fetch_1["default"](url, options)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = (_a.sent());
                    transcript = data.data.text;
                    console.log(transcript);
                    res.status(200).json({ transcript: transcript });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    res.status(500).json({ error: error_1 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = handler;
