import { CommandHandler, Intent, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { ChannelAddress, DirectedMessage, CommandPlan, HandleCommand, HandlerContext, ResponseMessage } from "@atomist/rug/operations/Handlers";
import { Pattern } from "@atomist/rug/operations/RugOperation";

/**
 * A a sample Rug TypeScript command handler.
 */
@CommandHandler("StartBuild", "a sample Rug TypeScript command handler")
@Tags("documentation")
@Intent("run StartBuild")
export class StartBuild implements HandleCommand {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public jobUrl: string = "default value";

    public handle(context: HandlerContext): CommandPlan {
        const plan = new CommandPlan();
        plan.add(
        {
            instruction: {
                kind: "execute",
                name: "http",
                parameters: {
                    url: this.jobUrl,
                    method: "post",
                    config: {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                }
            },
            onSuccess: new DirectedMessage("Woot!", new ChannelAddress("#random")),
            onError: new DirectedMessage("Un oh", new ChannelAddress("#random"))
        });
        return plan;
    }
}

export const startBuild = new StartBuild();
