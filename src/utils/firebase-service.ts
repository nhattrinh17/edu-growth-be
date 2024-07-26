import { Injectable } from '@nestjs/common';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@InjectFirebaseAdmin() private readonly firebaseAdmin: FirebaseAdmin) {}

  async uploadImageToStorage(
    fileLocal: {
      buffer: Buffer;
      fileName: string;
    },
    collectionName: string,
  ): Promise<string> {
    try {
      const storage = this.firebaseAdmin.storage;
      const bucket = storage.bucket(); // Use the default Firebase Storage bucket

      const uniqueFileName = `${Date.now()}-${fileLocal.fileName}`;
      const file = bucket.file(`${collectionName}/${uniqueFileName}`);

      await file.save(fileLocal.buffer);

      // Get the public URL of the uploaded image
      const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' }); // Adjust the expiration date as needed

      return url;
    } catch (error) {
      console.log('🚀 ~ file: firebase-service.ts:29 ~ FirebaseService ~ uploadImageToStorage ~ error:', error);
    }
  }
}
