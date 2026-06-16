'use client';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import { updateMe } from '@/lib/api/clientApi';
import { useState } from 'react';
import { ApiError } from '../../../../types/note';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';

type NoteFormValues = {
  username: string;
};

export default function Edit() {
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const user = useAuthStore(state => state.user);

  const avatar = user?.avatar?.trim()
    ? user.avatar
    : 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as NoteFormValues;

    try {
      const updatedUser = await updateMe(values);
      if (updatedUser) {
        setUser(updatedUser);
        router.push('/profile');
      } else {
        setError('Update failed');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt={user?.username || 'User Avatar'}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={user?.username}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}>
              Cancel
            </button>
          </div>
        </form>

        {error && <p>{error}</p>}
      </div>
    </main>
  );
}