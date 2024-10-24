// pages/api/createDocument.js

import { v4 as uuidv4 } from 'uuid'; 
import { db } from '@/lib/firebaseAdmin'; // Import the db instance

export async function POST(req) {

    const { userId, content } = await req.json();
    console.log(userId, content)
    // Validate input
    if (!userId || !content) {
        return Response.json({message: 'User ID and content are required'}, {status: 500})
    }

    const documentId = uuidv4(); 
    
    // Prepare the document to upload to Firestore
    const documentData = {
        id: documentId,
        userId: userId, // Include the user's ID
        content: content, // The generated document content
        otherParties: [], // Empty array for other parties
        createdAt: new Date().toISOString(), // Timestamp
    };

    try {
        // Upload to Firebase Firestore
        await db.collection('documents').doc(documentId).set(documentData); // Use db instead of firestore
        return  Response.json({id: documentId}) // Return the document ID
    } catch (error) {
        console.error("Error uploading document:", error);
        return  Response.json({error: error}, {status:500}) // Return the document ID
    }
}
