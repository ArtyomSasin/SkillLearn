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
}
