import { IMessageGenerator, MessageGeneratorProps } from '../message-generator.interface';


export class SimpleMessageGenerator implements IMessageGenerator {
    generate (props: MessageGeneratorProps): string {
        return `
Repository: [${ props.repositoryOwner }/${ props.repositoryName }](https://github.com/${ props.repositoryOwner }/${ props.repositoryName })
Status: *${ props.success ? '✅ success' : '🔴 error' }*
Action: [Link](https://github.com/${ props.repositoryOwner }/${ props.repositoryName }/actions/runs/${ props.actionId })
Author: [${ props.commiterUserName }](https://github.com/${ props.commiterUserName })
Branch: *${ props.branch }*
Title: *${ props.commitTitle }*
Commit: [${ props.commitId }](https://github.com/${ props.repositoryOwner }/${ props.repositoryName }/commit/${ props.commitId })
Compare: [Link](${ props.compareUrl })
Date: *${ props.date }*
        `;
    }
}