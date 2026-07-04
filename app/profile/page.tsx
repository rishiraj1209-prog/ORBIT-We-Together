"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { getUserProfile, saveUserProfile } from "@/lib/profile";

type ProfileForm = {
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: string;
  dreamCompany: string;
  bio: string;
  skills: string;
  role: "student" | "alumni";
};

export default function ProfilePage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    email: "",
    college: "",
    branch: "",
    graduationYear: "",
    dreamCompany: "",
    bio: "",
    skills: "",
    role: "student",
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          college: data.college || "",
          branch: data.branch || "",
          graduationYear: data.graduationYear || "",
          dreamCompany: data.dreamCompany || "",
          bio: data.bio || "",
          skills: data.skills || "",
          role: data.role || "student",
        });
      } else {
        setProfile((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
      }

      setLoading(false);
    }

    loadProfile();
  }, [user]);

  function update(field: keyof ProfileForm, value: string) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    if (!user) return;

    await saveUserProfile({
      uid: user.uid,
      ...profile,
    });

    alert("Profile Saved!");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-10">
      <h1 className="mb-8 text-4xl font-bold">Complete Profile</h1>

      <div className="grid gap-5">
        <input
          className="rounded-xl border p-4 text-black"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <input
          className="rounded-xl border p-4 text-black"
          placeholder="Email"
          value={profile.email}
          disabled
        />

        <input
          className="rounded-xl border p-4 text-black"
          placeholder="College"
          value={profile.college}
          onChange={(e) => update("college", e.target.value)}
        />

        <input
          className="rounded-xl border p-4 text-black"
          placeholder="Branch"
          value={profile.branch}
          onChange={(e) => update("branch", e.target.value)}
        />

        <input
          className="rounded-xl border p-4 text-black"
          placeholder="Graduation Year"
          value={profile.graduationYear}
          onChange={(e) => update("graduationYear", e.target.value)}
        />

        <input
          className="rounded-xl border p-4 text-black"
          placeholder="Dream Company"
          value={profile.dreamCompany}
          onChange={(e) => update("dreamCompany", e.target.value)}
        />

        <select
          className="rounded-xl border p-4 text-black"
          value={profile.role}
          onChange={(e) =>
            update("role", e.target.value as "student" | "alumni")
          }
        >
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        <textarea
          className="rounded-xl border p-4 text-black"
          rows={4}
          placeholder="Skills"
          value={profile.skills}
          onChange={(e) => update("skills", e.target.value)}
        />

        <textarea
          className="rounded-xl border p-4 text-black"
          rows={5}
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => update("bio", e.target.value)}
        />

        <button
          onClick={save}
          className="rounded-xl bg-indigo-600 p-4 font-semibold text-white"
        >
          Save Profile
        </button>
      </div>
    </main>
  );
}