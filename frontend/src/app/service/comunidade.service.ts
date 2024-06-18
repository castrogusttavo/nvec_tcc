import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunidadeService {
  private communitiesSubject = new BehaviorSubject<any[]>([]);
  communities$ = this.communitiesSubject.asObservable();

  constructor() {}

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
}
