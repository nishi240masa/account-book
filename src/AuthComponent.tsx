import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { User } from "firebase/auth"; // User type imported

function AuthComponent() {
  //型はUser型かnull
  const [user, setUser] = useState<User | null>(null); //ユーザー情報を保持

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // ログインしている場合
        setUser(authUser);
      } else {
        // ログアウトしている場合
        setUser(null);
      }
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, []);

  // ログイン
  const handleSignIn = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider);
      // ログイン成功時の処理
      console.log("ログイン成功", result.user);
      // resultに入ってる情報を一つづつ確認する

      console.log("表示名", result.user?.displayName);
      console.log("メールアドレス", result.user?.email);
      console.log("プロフィール画像", result.user?.photoURL);
      console.log("ユーザーID", result.user?.uid);
      console.log("電話番号", result.user?.phoneNumber);
      console.log("メール認証", result.user?.emailVerified);
    } catch (error) {
      // エラーハンドリング
      console.error("ログインエラー", error);
    }
  };

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <div>
            <img src={user.photoURL || "デフォルトの画像URL"} alt="user" />
            <p>
              表示名: {user.displayName},型 {typeof user.displayName}
            </p>
            <p>
              メールアドレス: {user.email},型 {typeof user.email}
            </p>
            
            <p>
              ユーザーID: {user.uid},型 {typeof user.uid}
            </p>
          </div>
          <button onClick={handleSignOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
