import { IMessageGenerator, MessageGeneratorProps } from '../message-generator.interface';


export class SimpleMessageGenerator implements IMessageGenerator {
    generate (props: MessageGeneratorProps): string {
        return `
Repository: [${ props.repository }](https://github.com/${ props.repository })
Status: *${ props.success ? '✅ success' : '🔴 error' }*
Author: *${ props.author }*
Branch: *${ props.branch }*
Commit: *${ props.commit }*
Date: *${ props.date }*
        `;
    }
}