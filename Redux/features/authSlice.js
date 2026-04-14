import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../backend/firebaseConfig'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

// --- SIGNUP THUNK ---
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password, name, profilePicture }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Auth Profile (Internal Firebase Name)
      await updateProfile(user, { displayName: name });

      // Save to Firestore (Including the optional profile picture)
      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        profilePicture: profilePicture || null, // Stores URI string or null
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, "users", user.uid), userData);

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- LOGIN THUNK ---
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch full profile (name, email, AND profilePicture) from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); // This now returns the object with profilePicture
      } else {
        // Fallback if Firestore doc is missing
        return { 
          uid: user.uid, 
          email: user.email, 
          name: user.displayName,
          profilePicture: null 
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoading: false, error: null },
  reducers: {
    logout: (state) => {
      signOut(auth);
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;