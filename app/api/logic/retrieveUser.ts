import { User, UserDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors"
import validate from "@/app/validate";

function retrieveUser(userId: string, targetUserId: string): Promise<UserDoc> {
    validate.id(userId, 'userId');
    validate.id(targetUserId, 'targetUserId');

    return User.findById(userId)
        .catch(error => { throw new SystemError((error as Error).message); })
        .then(user => {
            if (!user)
                throw new MatchError('user not found');

            return User.findById(targetUserId).select('-_id name surname role').lean()
                .catch(error => { throw new SystemError((error as Error).message); })
                .then((targetUser: UserDoc | null) => {
                    if (!targetUser)
                        throw new MatchError('target user not found');

                    return targetUser;
                });
        });
}

export default retrieveUser