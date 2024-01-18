"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMessageGenerator = void 0;
class SimpleMessageGenerator {
    generate(props) {
        return `
            Repository: \t[${props.repository}](https://github.com/${props.repository})
            Status: \t${props.success}
            Author: \t${props.author}
            Branch: \t${props.branch}
            Commit: \t${props.commit}
            Date: \t${props.date}
        `;
    }
}
exports.SimpleMessageGenerator = SimpleMessageGenerator;
