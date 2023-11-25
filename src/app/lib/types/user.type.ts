import { Skill } from './skill.type';

export type User = {
	id: number;
	name: string;
	headline: string;
	isRemoved: boolean;
	createdAt: Date;
	updatedAt: Date;
	skills: Skill[];
};
