export type MessageGeneratorProps = {
    success: boolean;
    date: string;
    author: string;
    repository: string;
    branch: string;
    commit: string;
}

export interface IMessageGenerator {
    generate (props: MessageGeneratorProps): string;
}