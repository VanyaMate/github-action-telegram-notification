export type MessageGeneratorProps = {
    success: boolean;
    date: string;
    repositoryOwner: string;
    repositoryName: string;
    repositoryUrl: string;
    commitTitle: string;
    commiterUserName: string;
    commitId: string;
    compareUrl: string;
    branch: string;
    size: number;
    actionId: string;
}

export interface IMessageGenerator {
    generate (props: MessageGeneratorProps): string;
}