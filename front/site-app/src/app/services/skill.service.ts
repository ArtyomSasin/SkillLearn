import { Injectable } from '@angular/core';
import { SkillGroup } from '../shared/models/skill-group';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillGroups = 'skill-groups';

  constructor(private firestore: AngularFirestore) { }

  public getAllSkillGroups(): Observable<SkillGroup[]> {
    console.log('getAllSkillGroups() ');
    return this.firestore
      .collection(this.skillGroups)
      .valueChanges() as Observable<SkillGroup[]>;
  }

  public getSkillGroups(skillGroupIds: number[]): Observable<SkillGroup[]> {
    console.log('getSkillGroups() skillGroupIds: ', skillGroupIds);
    return this.firestore
      .collection(this.skillGroups, ref => ref.where('id', 'in', skillGroupIds))
      .valueChanges() as Observable<SkillGroup[]>;
  }
}
