import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthenticationService } from "../authentication.service";
import { UserInterface } from "@project/shared-types";
import { Injectable } from "@nestjs/common";

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly authenticationService: AuthenticationService ) {
        super({
            usernameField: USERNAME_FIELD_NAME
        })
    }

    public async validate(email: string, password: string) : Promise<UserInterface> {
        return this.authenticationService.verify({email, password})
    }
}
