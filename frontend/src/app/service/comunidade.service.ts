import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunidadeService {
  private communitiesSubject = new BehaviorSubject<any[]>([]);
  communities$ = this.communitiesSubject.asObservable();
  private apiCommunity = 'http://localhost:3001/api/communities';

  constructor(private http: HttpClient) {}

  setCommunities(communities: any[]): void {
    this.communitiesSubject.next(communities);
  }

  addCommunity(community: any): void {
    const currentCommunities = this.communitiesSubject.getValue();
    this.communitiesSubject.next([...currentCommunities, community]);
  }

  updateCommunity(updatedCommunity: any): void {
    const currentCommunities = this.communitiesSubject.getValue();
    const communityIndex = currentCommunities.findIndex(c => c.id === updatedCommunity.id);
    if (communityIndex !== -1) {
      currentCommunities[communityIndex] = updatedCommunity;
      this.communitiesSubject.next([...currentCommunities]);
    }
  }

  deleteCommunity(communityId: number): void {
    const currentCommunities = this.communitiesSubject.getValue();
    const updatedCommunities = currentCommunities.filter(c => c.id !== communityId);
    this.communitiesSubject.next([...updatedCommunities]);
  }

  loadCommunity(communityId: number): Observable<any> {
    return this.http.get<any>(`${this.apiCommunity}/${communityId}`);
  }
}
