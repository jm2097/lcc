import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Skill } from '../types/skill.type';

@Injectable({
	providedIn: 'root',
})
export class SkillService {
	private readonly http = inject(HttpClient);

	create(skill: Partial<Skill>): Observable<Skill> {
		return this.http.post<Skill>(`${environment.apiUrl}/skills`, skill);
	}

	update(id: number, skill: Partial<Skill>): Observable<Skill> {
		return this.http.put<Skill>(`${environment.apiUrl}/skills/${id}`, skill);
	}

	delete(id: number): Observable<Skill> {
		return this.http.delete<Skill>(`${environment.apiUrl}/skills/${id}`);
	}
}
