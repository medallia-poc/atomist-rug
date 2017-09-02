import {
    CommandHandler, Intent, Parameter, ParseJson,
    ResponseHandler, Tags,
} from "@atomist/rug/operations/Decorators";
import {
    CommandPlan, HandleCommand, HandlerContext, HandleResponse,
    MessageMimeTypes, Response, ResponseMessage,
} from "@atomist/rug/operations/Handlers";
import * as mustache from "mustache";

const buildApi = `/buildWithParameters`;

@CommandHandler("startBuild", "start a Jenkins build")
@Tags("jenkins-build")
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
                    url: encodeURI(this.jobUrl + buildApi),
                },
            },
            onSuccess: {
                kind: "respond",
                name: "TriggerBuildResults",
                parameters: this,
            },
        });
        return plan;
    }
}
export const startBuildCommand = new startBuild();

@ResponseHandler("TriggerBuildResults",
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
