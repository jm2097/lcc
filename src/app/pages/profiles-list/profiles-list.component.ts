import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../lib/services/user.service';
import { User } from '../../lib/types/user.type';

@Component({
	selector: 'app-profiles-list',
	standalone: true,
	imports: [RouterModule, FormsModule],
	templateUrl: './profiles-list.component.html',
})
export class ProfilesListComponent implements OnInit {
	private readonly userService = inject(UserService);

	users = signal<User[]>([]);

	ngOnInit(): void {
		this.userService.getUsers().subscribe((users) => {
			this.users.set(users);
		});
	}
}
