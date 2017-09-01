import {
    CommandHandler, Intent, Parameter, ParseJson,
    ResponseHandler, Tags,
} from "@atomist/rug/operations/Decorators";
import {
    CommandPlan, HandleCommand, HandlerContext, HandleResponse,
    MessageMimeTypes, Response, ResponseMessage,
} from "@atomist/rug/operations/Handlers";
import * as mustache from "mustache";

const webSearchUrl = `http://stackoverflow.com/search?order=desc&sort=relevance&q=`;

@CommandHandler("startBuild", "start a Jenkins build")
@Tags("stack-overflow")
@Intent("start Jenkins build")
class startBuild implements HandleCommand {

    @Parameter({ description: "job url", pattern: "^.*$" })
    public jobUrl: string;

    public handle(ctx: HandlerContext): CommandPlan {
        const plan = new CommandPlan();

        plan.add({
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    method: "post",
                    url: encodeURI('http://fowler:3c3cee388d6cd8a8d31888bf46a4f9cb@' + this.jobUrl + '/buildWithParameters'),
                    config : '{"key1":"value1","key2":"value2"}',
                },
            },
            onSuccess: {
                kind: "respond",
                name: "SendStackOverflowResults",
                parameters: this,
            },
        });
        return plan;
    }
}
export const startBuild = new startBuild();

@ResponseHandler("TriggerBuild results",
    "Shows results of triggered jobUrl")
class jenkinsJobResponder implements HandleResponse<any> {

    @Parameter({ description: "your jobUrl", pattern: "^.*$" })
    public jobUrl: string;

    public handle( @ParseJson response: Response<any>): CommandPlan {
        return CommandPlan.ofMessage(
            new ResponseMessage("Job Triggered.",
            MessageMimeTypes.PLAIN_TEXT)
        );
    }
}

export let responder = new jenkinsJobResponder();
