import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";

const isLoginLoading = ref(false);

export const useAuth = () => {
  const token = useState<string>("token", () => "");

  /** 新規会員登録 */
  async function signUp(email: string, password: string) {
    const auth = getAuth();
    return await new Promise<void>((resolve, reject) => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve();
          navigateTo("/");
        })
        .catch(reject);
    });
  }

  /** サインイン */
  async function signIn(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();

      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken;
              resolve();
              navigateTo("/");
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  /** サインアウト */
  async function signOut() {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      firebaseSignOut(auth)
        .then(() => {
          token.value = "";
          resolve();
          navigateTo("/login");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** ログイン状態の認証 */
  async function checkAuthState() {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) {
        return resolve();
      }
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken;
                resolve();
              })
              .catch(reject);
          } else {
            token.value = "";
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  return {
    signUp,
    signIn,
    signOut,
    token,
    checkAuthState,
    isLoginLoading,
  };
};
