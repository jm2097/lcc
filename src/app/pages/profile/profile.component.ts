import { Component, ElementRef, Input, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SkillService } from '../../lib/services/skill.service';
import { UserService } from '../../lib/services/user.service';
import { Skill } from '../../lib/types/skill.type';
import { User } from '../../lib/types/user.type';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [RouterModule, FormsModule],
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
	@ViewChild('modalSkill') modalSkill!: ElementRef<HTMLDialogElement>;
	@ViewChild('modalUser') modalUser!: ElementRef<HTMLDialogElement>;

	@Input({ required: true }) userId!: string;

	private readonly router = inject(Router);
	private readonly userService = inject(UserService);
	private readonly skillService = inject(SkillService);

	user = signal<User | null>(null);
	currentSkill = signal<Skill | null>(null);

	name = '';
	headline = '';
	newSkill = '';
	modalTitle = '';

	get imageId(): string {
		return ((this.user()?.id ?? 1) + 105).toString();
	}

	ngOnInit(): void {
		this.getUser();
	}

	getUser() {
		this.userService
			.getUserById(Number(this.userId))
			.pipe(
				catchError(() => {
					this.router.navigateByUrl('/new-profile');
					return of(null);
				}),
			)
			.subscribe((user) => {
				this.user.set(user);
			});
	}

	handleUserEdit(): void {
		this.name = this.user()!.name;
		this.headline = this.user()!.headline;
		this.modalUser.nativeElement.showModal();
	}

	updateUser() {
		this.userService
			.updateUser(Number(this.userId), {
				name: this.name,
				headline: this.headline,
			})
			.subscribe(() => {
				this.getUser();
			});
	}

	handleSkillAdd(): void {
		this.modalTitle = 'Creating new skill';
		this.currentSkill.set(null);
		this.newSkill = '';
		this.modalSkill.nativeElement.showModal();
	}

	handleSkillEdit(skill: Skill): void {
		this.modalTitle = 'Updating skill';
		this.currentSkill.set(skill);
		this.newSkill = skill.name;
		this.modalSkill.nativeElement.showModal();
	}

	handleSkillDelete(skill: Skill): void {
		if (confirm('Ta seguro? 😊')) {
			this.skillService.delete(skill.id).subscribe(() => {
				this.getUser();
			});
		}
	}

	saveSkill() {
		const currentSkill = this.currentSkill();

		if (currentSkill) {
			this.skillService.update(currentSkill.id, { name: this.newSkill }).subscribe(() => {
				this.getUser();
				this.newSkill = '';
			});
		} else {
			this.skillService
				.create({
					name: this.newSkill,
					userId: Number(this.userId),
				})
				.subscribe(() => {
					this.getUser();
					this.newSkill = '';
				});
		}
	}
}
