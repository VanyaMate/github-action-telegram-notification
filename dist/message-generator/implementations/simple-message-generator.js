"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMessageGenerator = void 0;
class SimpleMessageGenerator {
    generate(props) {
        return `
Repository: [${props.repository}](https://github.com/${props.repository})
Status: *${props.success ? '✅ success' : '🔴 error'}*
Author: *${props.author}*
Branch: *${props.branch}*
Commit: *${props.commit}*
Date: *${props.date}*
        `;
    }
}
exports.SimpleMessageGenerator = SimpleMessageGenerator;
