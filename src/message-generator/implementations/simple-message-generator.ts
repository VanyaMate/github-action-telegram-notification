import { IMessageGenerator, MessageGeneratorProps } from '../message-generator.interface';


export class SimpleMessageGenerator implements IMessageGenerator {
    generate (props: MessageGeneratorProps): string {
        return `
            Repository: \t[${ props.repository }](https://github.com/${ props.repository })
            Status: \t${ props.success }
            Author: \t${ props.author }
            Branch: \t${ props.branch }
            Commit: \t${ props.commit }
            Date: \t${ props.date }
        `;
    }
}