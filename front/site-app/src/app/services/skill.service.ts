import { Injectable } from '@angular/core';
import { SkillGroup } from '../shared/models/skill-group';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillGroups = 'skill-groups';

  constructor(private firestore: AngularFirestore) { }

  public getAllSkillGroups(): Promise<SkillGroup[]> {
    console.log('getAllSkillGroups() ');
    return this.firestore
      .collection(this.skillGroups)
      .get()
      .pipe(map(value => value.docs.map(d => d.data() as SkillGroup)))
      .toPromise();
  }
}
