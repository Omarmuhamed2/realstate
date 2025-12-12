import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export interface Property {
  id?: string;
  category: string;      // tourist-apartments / for-sale / ...
  areaId: string;        // zone1 / zone2 / ...
  rooms: number;         // 1, 2, 3, 4
  title: string;
  description: string;
  imageBase64?: string;      // للصورة الأساسية (thumbnail) - اختياري
  imagesBase64?: string[];   // كل الصور
  createdAt: number;
}


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: FirebaseApp;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  // إضافة وحدة جديدة في Firestore
  async addProperty(
  data: Omit<Property, 'id' | 'createdAt'>
): Promise<string> {
  const colRef = collection(this.db, 'properties');

  const images = data.imagesBase64 && data.imagesBase64.length > 0
    ? data.imagesBase64
    : data.imageBase64
      ? [data.imageBase64]
      : [];

  const docRef = await addDoc(colRef, {
    ...data,
    imageBase64: images[0] || null,
    imagesBase64: images,
    createdAt: Date.now(),
  });

  return docRef.id;
}


  // هنستخدمها بعدين في AreaComponent
  async getPropertiesByCategoryAndArea(
    category: string,
    areaId: string
  ): Promise<Property[]> {
    const colRef = collection(this.db, 'properties');
    const q = query(
      colRef,
      where('category', '==', category),
      where('areaId', '==', areaId)
    );

    const snap = await getDocs(q);
    const result: Property[] = [];

    snap.forEach((doc) => {
      const d = doc.data() as Property;
      result.push({
        ...d,
        id: doc.id,
      });
    });

    return result;
  }
  // جلب كل الوحدات (للوحة التحكم)
async getAllProperties(): Promise<Property[]> {
  const colRef = collection(this.db, 'properties');
  const snap = await getDocs(colRef);

  const result: Property[] = [];
  snap.forEach((docSnap) => {
    const d = docSnap.data() as Property;
    result.push({
      ...d,
      id: docSnap.id,
    });
  });

  return result;
}
// حذف وحدة بالعربي: delete by id
async deleteProperty(id: string): Promise<void> {
  const docRef = doc(this.db, 'properties', id);
  await deleteDoc(docRef);
}
async getPropertiesByCategory(category: string): Promise<Property[]> {
  const colRef = collection(this.db, 'properties');
  const q = query(colRef, where('category', '==', category));

  const snap = await getDocs(q);
  const result: Property[] = [];

  snap.forEach((docSnap) => {
    const d = docSnap.data() as Property;
    result.push({
      ...d,
      id: docSnap.id,
    });
  });

  return result;
}

}
