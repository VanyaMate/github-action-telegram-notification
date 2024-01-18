"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMessageGenerator = void 0;
var SimpleMessageGenerator = /** @class */ (function () {
    function SimpleMessageGenerator() {
    }
    SimpleMessageGenerator.prototype.generate = function (props) {
        return "\nRepository: [".concat(props.repository, "](https://github.com/").concat(props.repository, ")\nStatus: *").concat(props.success ? '✅ success' : '🔴 error', "*\nAuthor: *").concat(props.author, "*\nBranch: *").concat(props.branch, "*\nCommit: *").concat(props.commit, "*\nDate: *").concat(props.date, "*\n        ");
    };
    return SimpleMessageGenerator;
}());
exports.SimpleMessageGenerator = SimpleMessageGenerator;
