import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../lib/services/user.service';

@Component({
	selector: 'app-new-profile',
	standalone: true,
	imports: [RouterModule, FormsModule],
	templateUrl: './new-profile.component.html',
})
export class NewProfileComponent {
	private readonly router = inject(Router);
	private readonly userService = inject(UserService);

	name = '';
	headline = '';

	saveUser() {
		this.userService
			.createUser({
				name: this.name,
				headline: this.headline,
			})
			.subscribe((user) => {
				this.router.navigate(['/profiles', user.id]);
			});
	}
}
