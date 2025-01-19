import { db } from './index';
import * as table from './schema';
import { v4 } from 'uuid';

export async function createUser(username: string, { githubId }: { githubId: number }) {
	if (githubId !== undefined) {
        const user = {
            id: v4(),
            username,
            githubId
        }
		await db.insert(table.user).values(user);
        return user;
	} else {
        throw Error('Invalid githubId');
    }
}
