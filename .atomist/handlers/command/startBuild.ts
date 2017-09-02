import { CommandHandler, Intent, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { CommandPlan, HandleCommand, HandlerContext, ResponseMessage } from "@atomist/rug/operations/Handlers";
import { Pattern } from "@atomist/rug/operations/RugOperation";

/**
 * A a sample Rug TypeScript command handler.
 */
@CommandHandler("startBuild", "a sample Rug TypeScript command handler")
@Tags("documentation")
@Intent("run startBuild")
export class startBuild implements HandleCommand {

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
            onSuccess: new ResponseMessage("Woot!"),
            onError: new ResponseMessage("Un oh")
        });
        return plan;
    }
}

export const startBuild = new startBuild();
