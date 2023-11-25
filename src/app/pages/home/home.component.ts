import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../lib/services/user.service';
import { User } from '../../lib/types/user.type';

declare let particlesJS: any;

@Component({
	selector: 'app-profiles-list',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
	@ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

	private readonly userService = inject(UserService);

	users = signal<User[]>([]);

	ngOnInit(): void {
		this.userService.getUsers().subscribe((users) => {
			this.users.set(users);
		});
	}

	ngAfterViewInit(): void {
		particlesJS.load('particles-js', 'assets/particlesjs-config.json');
	}
}
