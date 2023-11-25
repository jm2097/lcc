import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../types/user.type';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly http = inject(HttpClient);

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.apiUrl}/users`);
	}

	getUserById(id: number): Observable<User> {
		return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
	}

	createUser(user: Partial<User>): Observable<User> {
		return this.http.post<User>(`${environment.apiUrl}/users`, user);
	}

	updateUser(id: number, user: Partial<User>): Observable<User> {
		return this.http.put<User>(`${environment.apiUrl}/users/${id}`, user);
	}

	deleteUser(id: number): Observable<User> {
		return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
	}
}
